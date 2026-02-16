"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import { SPEC_DATA_PART_TYPE } from "@json-render/core";
import { useJsonRenderMessage } from "@json-render/react";
import { ChatRenderer } from "@/lib/render/renderer";
import MiniMortgageCalc from "./tools/MiniMortgageCalc";
import PropertyTaxBreakdown from "./tools/PropertyTaxBreakdown";
import ContactCard from "./tools/ContactCard";
import ScheduleViewing from "./tools/ScheduleViewing";
import NeighbourhoodMapCard from "./tools/NeighbourhoodMapCard";
import PlacesResultCard from "./tools/PlacesResultCard";
import PlacesSearchCard from "./tools/PlacesSearchCard";

const QUICK_QUESTIONS = [
  "I'm looking to buy in Vancouver",
  "Tell me about Oakridge",
  "Compare neighbourhoods for me",
  "What can I afford?",
];

const STORAGE_KEY = "aparna-chat-messages";

function loadMessages(): UIMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveMessages(messages: UIMessage[]) {
  try {
    // Only save text + tool input parts (outputs may be too large)
    const slim = messages.map((m) => ({
      ...m,
      parts: m.parts.filter(
        (p) => p.type === "text" || (p.type.startsWith("tool-") && ("input" in p))
      ),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
  } catch {
    // Storage full or unavailable
  }
}

function AssistantMessage({
  message,
  renderPart,
}: {
  message: UIMessage;
  renderPart: (part: UIMessage["parts"][number], i: number) => React.ReactNode;
}) {
  const { spec, hasSpec } = useJsonRenderMessage(message.parts);
  let specRendered = false;

  return (
    <div className="flex justify-start">
      <div className="max-w-[95%] space-y-1">
        {message.parts.map((part, i) => {
          if (part.type === "text" && part.text) {
            return (
              <div
                key={i}
                className="px-4 py-2.5 rounded-2xl rounded-bl-md bg-warm-100 text-warm-900 text-sm leading-relaxed"
              >
                {part.text}
              </div>
            );
          }
          if (part.type === SPEC_DATA_PART_TYPE && hasSpec && !specRendered) {
            specRendered = true;
            return (
              <div key={i} className="w-full my-1">
                <ChatRenderer spec={spec} />
              </div>
            );
          }
          return renderPart(part, i);
        })}
        {hasSpec && !specRendered && (
          <div className="w-full my-1">
            <ChatRenderer spec={spec} />
          </div>
        )}
      </div>
    </div>
  );
}

export default function ChatWidget() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Hide floating widget on homepage (HeroChat is used there instead)
  const isHomepage = pathname === "/";

  const { messages, sendMessage, status, stop } = useChat({
    messages: loadMessages(),
  });

  // Persist messages to localStorage when they change
  useEffect(() => {
    if (messages.length > 0) {
      saveMessages(messages);
    }
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const isLoading = status === "submitted" || status === "streaming";

  const renderPart = (part: (typeof messages)[number]["parts"][number], i: number) => {
    switch (part.type) {
      case "text":
        return part.text ? (
          <span key={i} className="whitespace-pre-wrap">
            {part.text}
          </span>
        ) : null;

      case "tool-showMortgageCalculator":
        if (part.state === "input-available" || part.state === "output-available") {
          return <MiniMortgageCalc key={i} {...(part.input as Parameters<typeof MiniMortgageCalc>[0])} />;
        }
        return (
          <div key={i} className="text-xs text-warm-400 italic">
            Loading calculator...
          </div>
        );

      case "tool-showPropertyTaxEstimate":
        if (part.state === "input-available" || part.state === "output-available") {
          return <PropertyTaxBreakdown key={i} {...(part.input as Parameters<typeof PropertyTaxBreakdown>[0])} />;
        }
        return (
          <div key={i} className="text-xs text-warm-400 italic">
            Calculating tax...
          </div>
        );

      case "tool-showContactCard":
        if (part.state === "input-available" || part.state === "output-available") {
          return <ContactCard key={i} />;
        }
        return null;

      case "tool-scheduleViewing":
        if (part.state === "input-available" || part.state === "output-available") {
          return <ScheduleViewing key={i} {...(part.input as Parameters<typeof ScheduleViewing>[0])} />;
        }
        return (
          <div key={i} className="text-xs text-warm-400 italic">
            Loading form...
          </div>
        );

      case "tool-showNeighbourhoodMap":
        if (part.state === "input-available" || part.state === "output-available") {
          return <NeighbourhoodMapCard key={i} {...(part.input as Parameters<typeof NeighbourhoodMapCard>[0])} />;
        }
        return (
          <div key={i} className="text-xs text-warm-400 italic">
            Loading map...
          </div>
        );

      case "tool-searchNearbyPlaces":
        if (part.state === "output-available") {
          const output = (part as { output?: { query: string; neighbourhood: string; lat?: number; lng?: number; places: Parameters<typeof PlacesResultCard>[0]["places"]; error?: string } }).output;
          if (output) {
            // Use Google Places UI Kit if API key is available
            if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && output.lat && output.lng) {
              return <PlacesSearchCard key={i} query={output.query} neighbourhood={output.neighbourhood} lat={output.lat} lng={output.lng} />;
            }
            return <PlacesResultCard key={i} query={output.query} neighbourhood={output.neighbourhood} places={output.places} error={output.error} />;
          }
        }
        if (part.state === "input-available") {
          return (
            <div key={i} className="text-xs text-warm-400 italic flex items-center gap-1.5">
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Searching Google Maps...
            </div>
          );
        }
        return (
          <div key={i} className="text-xs text-warm-400 italic">
            Searching nearby places...
          </div>
        );

      default:
        return null;
    }
  };

  if (isHomepage) return null;

  return (
    <>
      {/* Chat toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-teal-700 hover:bg-teal-800 text-white rounded-full shadow-lg flex items-center justify-center transition-all hover:scale-105"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        {isOpen ? (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        )}
      </button>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] max-h-[520px] bg-white rounded-2xl shadow-2xl border border-warm-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-teal-800 px-5 py-4 text-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-teal-600 flex items-center justify-center text-sm font-serif font-semibold">
                AK
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm">Aparna&apos;s Assistant</p>
                <p className="text-xs text-teal-200">
                  {status === "streaming"
                    ? "Typing..."
                    : "Ask me about Vancouver real estate"}
                </p>
              </div>
              <div className="flex items-center gap-1.5">
                {isLoading && (
                  <button
                    onClick={stop}
                    className="text-xs text-teal-300 hover:text-white transition-colors px-2 py-1 rounded border border-teal-600 hover:border-teal-400"
                  >
                    Stop
                  </button>
                )}
                {messages.length > 0 && !isLoading && (
                  <button
                    onClick={() => {
                      localStorage.removeItem(STORAGE_KEY);
                      window.location.reload();
                    }}
                    className="text-xs text-teal-300 hover:text-white transition-colors px-2 py-1 rounded border border-teal-600 hover:border-teal-400"
                    title="Start new conversation"
                  >
                    New
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px] max-h-[360px]">
            {messages.length === 0 && (
              <div className="text-center py-6">
                <p className="text-sm text-warm-500 mb-4">
                  Hi! Ask me anything about Vancouver real estate &mdash;
                  neighbourhoods, buying, selling, mortgages, and more.
                </p>
                <div className="space-y-2">
                  {QUICK_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        sendMessage({ text: q });
                      }}
                      className="block w-full text-left text-xs px-3 py-2 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div key={message.id}>
                {message.role === "user" ? (
                  <div className="flex justify-end">
                    <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md bg-teal-700 text-white text-sm leading-relaxed">
                      {message.parts
                        .filter((p) => p.type === "text")
                        .map((p, i) =>
                          p.type === "text" ? (
                            <span key={i}>{p.text}</span>
                          ) : null
                        )}
                    </div>
                  </div>
                ) : (
                  <AssistantMessage message={message} renderPart={renderPart} />
                )}
              </div>
            ))}

            {status === "submitted" && (
              <div className="flex justify-start">
                <div className="bg-warm-100 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 bg-warm-400 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-warm-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                    <span className="w-2 h-2 bg-warm-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-warm-100 p-3 shrink-0">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!input.trim() || isLoading) return;
                sendMessage({ text: input });
                setInput("");
              }}
              className="flex gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about Vancouver real estate..."
                className="flex-1 px-4 py-2.5 text-sm border border-warm-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-4 py-2.5 bg-teal-700 text-white rounded-xl hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
