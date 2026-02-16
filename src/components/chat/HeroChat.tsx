"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import type { UIMessage } from "ai";
import NeighbourhoodCard from "./tools/NeighbourhoodCard";
import MiniMortgageCalc from "./tools/MiniMortgageCalc";
import PropertyTaxBreakdown from "./tools/PropertyTaxBreakdown";
import ContactCard from "./tools/ContactCard";
import MarketSnapshot from "./tools/MarketSnapshot";
import BuyerSellerGuide from "./tools/BuyerSellerGuide";
import ScheduleViewing from "./tools/ScheduleViewing";
import NeighbourhoodMapCard from "./tools/NeighbourhoodMapCard";
import PlacesResultCard from "./tools/PlacesResultCard";
import PlacesSearchCard from "./tools/PlacesSearchCard";

const QUICK_QUESTIONS = [
  "Tell me about Oakridge",
  "How do I buy my first home in BC?",
  "What's the Property Transfer Tax on a $750K home?",
  "What would my mortgage payments be?",
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
    const slim = messages.map((m) => ({
      ...m,
      parts: m.parts.filter(
        (p) => p.type === "text" || (p.type.startsWith("tool-") && "input" in p)
      ),
    }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(slim));
  } catch {
    // Storage full or unavailable
  }
}

export default function HeroChat() {
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  const isLoading = status === "submitted" || status === "streaming";

  const renderPart = (part: (typeof messages)[number]["parts"][number], i: number) => {
    switch (part.type) {
      case "text":
        return part.text ? (
          <span key={i} className="whitespace-pre-wrap">
            {part.text}
          </span>
        ) : null;

      case "tool-showNeighbourhoodCard":
        if (part.state === "input-available" || part.state === "output-available") {
          return <NeighbourhoodCard key={i} {...(part.input as Parameters<typeof NeighbourhoodCard>[0])} />;
        }
        return (
          <div key={i} className="text-xs text-white/50 italic">
            Loading neighbourhood info...
          </div>
        );

      case "tool-showMortgageCalculator":
        if (part.state === "input-available" || part.state === "output-available") {
          return <MiniMortgageCalc key={i} {...(part.input as Parameters<typeof MiniMortgageCalc>[0])} />;
        }
        return (
          <div key={i} className="text-xs text-white/50 italic">
            Loading calculator...
          </div>
        );

      case "tool-showPropertyTaxEstimate":
        if (part.state === "input-available" || part.state === "output-available") {
          return <PropertyTaxBreakdown key={i} {...(part.input as Parameters<typeof PropertyTaxBreakdown>[0])} />;
        }
        return (
          <div key={i} className="text-xs text-white/50 italic">
            Calculating tax...
          </div>
        );

      case "tool-showContactCard":
        if (part.state === "input-available" || part.state === "output-available") {
          return <ContactCard key={i} />;
        }
        return null;

      case "tool-showMarketSnapshot":
        if (part.state === "input-available" || part.state === "output-available") {
          return <MarketSnapshot key={i} {...(part.input as Parameters<typeof MarketSnapshot>[0])} />;
        }
        return (
          <div key={i} className="text-xs text-white/50 italic">
            Loading market data...
          </div>
        );

      case "tool-showBuyerSellerGuide":
        if (part.state === "input-available" || part.state === "output-available") {
          return <BuyerSellerGuide key={i} {...(part.input as Parameters<typeof BuyerSellerGuide>[0])} />;
        }
        return (
          <div key={i} className="text-xs text-white/50 italic">
            Loading guide...
          </div>
        );

      case "tool-scheduleViewing":
        if (part.state === "input-available" || part.state === "output-available") {
          return <ScheduleViewing key={i} {...(part.input as Parameters<typeof ScheduleViewing>[0])} />;
        }
        return (
          <div key={i} className="text-xs text-white/50 italic">
            Loading form...
          </div>
        );

      case "tool-showNeighbourhoodMap":
        if (part.state === "input-available" || part.state === "output-available") {
          return <NeighbourhoodMapCard key={i} {...(part.input as Parameters<typeof NeighbourhoodMapCard>[0])} />;
        }
        return (
          <div key={i} className="text-xs text-white/50 italic">
            Loading map...
          </div>
        );

      case "tool-searchNearbyPlaces":
        if (part.state === "output-available") {
          const output = (part as { output?: { query: string; neighbourhood: string; lat?: number; lng?: number; places: Parameters<typeof PlacesResultCard>[0]["places"]; error?: string } }).output;
          if (output) {
            if (process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY && output.lat && output.lng) {
              return <PlacesSearchCard key={i} query={output.query} neighbourhood={output.neighbourhood} lat={output.lat} lng={output.lng} />;
            }
            return <PlacesResultCard key={i} query={output.query} neighbourhood={output.neighbourhood} places={output.places} error={output.error} />;
          }
        }
        if (part.state === "input-available") {
          return (
            <div key={i} className="text-xs text-white/50 italic flex items-center gap-1.5">
              <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Searching Google Maps...
            </div>
          );
        }
        return (
          <div key={i} className="text-xs text-white/50 italic">
            Searching nearby places...
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto lg:mx-0">
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl flex flex-col overflow-hidden h-[440px]">
        {/* Header */}
        <div className="px-5 py-3.5 border-b border-white/10 shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {/* Sparkle / AI icon */}
              <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center">
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z"
                  />
                </svg>
              </div>
              <p className="text-sm font-medium text-white">
                Ask me anything about Vancouver real estate
              </p>
            </div>
            <div className="flex items-center gap-1.5">
              {isLoading && (
                <button
                  onClick={stop}
                  className="text-xs text-white/60 hover:text-white transition-colors px-2 py-1 rounded border border-white/20 hover:border-white/40"
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
                  className="text-xs text-white/60 hover:text-white transition-colors px-2 py-1 rounded border border-white/20 hover:border-white/40"
                  title="Start new conversation"
                >
                  New
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-4">
              <p className="text-sm text-white/60 mb-5 text-center px-4">
                Neighbourhoods, buying, selling, mortgages &mdash; I can help with it all.
              </p>
              <div className="grid grid-cols-2 gap-2 w-full px-2">
                {QUICK_QUESTIONS.map((q) => (
                  <button
                    key={q}
                    onClick={() => {
                      sendMessage({ text: q });
                    }}
                    className="text-left text-xs px-3 py-2.5 rounded-xl bg-white/10 text-white/80 hover:bg-white/20 hover:text-white transition-colors leading-snug"
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
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl rounded-br-md bg-teal-600 text-white text-sm leading-relaxed">
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
                <div className="flex justify-start">
                  <div className="max-w-[95%] space-y-1">
                    {message.parts.map((part, i) => {
                      if (part.type === "text" && part.text) {
                        return (
                          <div
                            key={i}
                            className="px-4 py-2.5 rounded-2xl rounded-bl-md bg-white/15 text-white text-sm leading-relaxed"
                          >
                            {part.text}
                          </div>
                        );
                      }
                      return renderPart(part, i);
                    })}
                  </div>
                </div>
              )}
            </div>
          ))}

          {status === "submitted" && (
            <div className="flex justify-start">
              <div className="bg-white/15 px-4 py-3 rounded-2xl rounded-bl-md">
                <div className="flex gap-1.5">
                  <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce" />
                  <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-2 h-2 bg-white/50 rounded-full animate-bounce [animation-delay:0.3s]" />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-white/10 p-3 shrink-0">
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
              className="flex-1 px-4 py-2.5 text-sm bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/20 focus:border-white/30"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 py-2.5 bg-white/20 text-white rounded-xl hover:bg-white/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
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
    </div>
  );
}
