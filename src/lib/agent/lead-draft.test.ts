import { beforeAll, beforeEach, describe, expect, it } from "vitest";
import {
  LEAD_DRAFT_TTL_MS,
  LEAD_DRAFT_STORAGE_KEY,
  clearLeadDraft,
  readLeadDraft,
  storeLeadDraft,
  validateLeadDraft,
} from "./lead-draft";

/**
 * These tests exist because the draft is the one place an agent's output
 * reaches the visitor's screen and, if they confirm it, Aparna's inbox.
 * Whatever comes out of validation is treated downstream as plain text.
 */

describe("validateLeadDraft", () => {
  it("accepts a well-formed draft", () => {
    const result = validateLeadDraft({
      name: "Priya Sharma",
      email: "Priya@Example.com",
      phone: "604-555-0142",
      interest: "buying",
      message: "Looking in Oakridge, around $1.4M, hoping to move by spring.",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.draft.email).toBe("priya@example.com");
    expect(result.draft.interest).toBe("buying");
  });

  it("refuses a draft with no usable email, and explains why", () => {
    const result = validateLeadDraft({
      name: "Priya Sharma",
      email: "not-an-email",
    });

    expect(result.ok).toBe(false);
    if (result.ok) return;
    expect(result.problems.join(" ")).toMatch(/email/i);
    // The message is read by a model, so it must say what to do next.
    expect(result.problems.join(" ")).toMatch(/do not guess/i);
  });

  it("refuses a draft with no name", () => {
    const result = validateLeadDraft({ name: "", email: "priya@example.com" });
    expect(result.ok).toBe(false);
  });

  it("strips control characters and newlines out of every field", () => {
    const result = validateLeadDraft({
      name: "Priya\u0000 Sharma",
      email: "priya@example.com",
      message: "Line one\nLine two\u001BLine three",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.draft.name).toBe("Priya Sharma");
    expect(result.draft.message).toBe("Line one Line two Line three");
    expect(result.draft.message).not.toMatch(/[\u0000-\u001F\u007F]/);
  });

  it("caps field lengths so a draft cannot be used as a payload carrier", () => {
    const result = validateLeadDraft({
      name: "a".repeat(500),
      email: "priya@example.com",
      message: "b".repeat(5000),
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.draft.name.length).toBeLessThanOrEqual(80);
    expect(result.draft.message.length).toBeLessThanOrEqual(1000);
  });

  it("drops an interest that is not one of the form's options", () => {
    const result = validateLeadDraft({
      name: "Priya Sharma",
      email: "priya@example.com",
      interest: "urgent-wire-transfer",
    });

    expect(result.ok).toBe(true);
    if (!result.ok) return;
    expect(result.draft.interest).toBe("");
  });

  it("leaves out a phone number that is not plausibly one", () => {
    const result = validateLeadDraft({
      name: "Priya Sharma",
      email: "priya@example.com",
      phone: "call me maybe",
    });
    expect(result.ok).toBe(false);
  });
});

describe("draft storage", () => {
  // The vitest environment is "node", so give the module the two globals it
  // feature-detects for. A real sessionStorage is not needed to prove the
  // validation and expiry rules hold.
  beforeAll(() => {
    const store = new Map<string, string>();
    Object.defineProperty(globalThis, "window", {
      configurable: true,
      value: {
        sessionStorage: {
          getItem: (key: string) => store.get(key) ?? null,
          setItem: (key: string, value: string) => void store.set(key, value),
          removeItem: (key: string) => void store.delete(key),
          clear: () => store.clear(),
        },
        dispatchEvent: () => true,
      },
    });
  });

  beforeEach(() => {
    window.sessionStorage.clear();
  });

  it("round-trips a draft", () => {
    const result = validateLeadDraft({
      name: "Priya Sharma",
      email: "priya@example.com",
    });
    expect(result.ok).toBe(true);
    if (!result.ok) return;

    storeLeadDraft(result.draft);
    expect(readLeadDraft()?.email).toBe("priya@example.com");

    clearLeadDraft();
    expect(readLeadDraft()).toBeNull();
  });

  it("ignores a draft that has expired", () => {
    window.sessionStorage.setItem(
      LEAD_DRAFT_STORAGE_KEY,
      JSON.stringify({
        name: "Priya Sharma",
        email: "priya@example.com",
        phone: "",
        interest: "",
        message: "",
        preparedAt: Date.now() - LEAD_DRAFT_TTL_MS - 1000,
      }),
    );

    expect(readLeadDraft()).toBeNull();
  });

  it("ignores a draft that was tampered with in storage", () => {
    window.sessionStorage.setItem(
      LEAD_DRAFT_STORAGE_KEY,
      JSON.stringify({ name: "x", email: "nope", preparedAt: Date.now() }),
    );

    expect(readLeadDraft()).toBeNull();
  });

  it("ignores unparseable storage without throwing", () => {
    window.sessionStorage.setItem(LEAD_DRAFT_STORAGE_KEY, "{not json");
    expect(readLeadDraft()).toBeNull();
  });
});
