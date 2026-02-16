"use client";

import { useState, type ReactNode } from "react";
import { defineRegistry } from "@json-render/react";
import { realestateCatalog } from "./catalog";

// =============================================================================
// Registry — React implementations for the real estate catalog
// Styled to match the site's teal/warm design language
// =============================================================================

export const { registry } = defineRegistry(realestateCatalog, {
  components: {
    Stack: ({ props, children }) => {
      const gapClass =
        { sm: "gap-1.5", md: "gap-3", lg: "gap-4" }[props.gap ?? "md"] ??
        "gap-3";
      return (
        <div
          className={`flex ${props.direction === "horizontal" ? "flex-row flex-wrap items-start" : "flex-col"} ${gapClass}`}
        >
          {children}
        </div>
      );
    },

    Card: ({ props, children }) => (
      <div className="bg-white rounded-xl border border-warm-200 shadow-sm overflow-hidden w-full">
        {props.title && (
          <div className="bg-teal-800 px-4 py-2.5 flex items-center justify-between">
            <h4 className="text-white text-sm font-semibold">{props.title}</h4>
            {props.subtitle && (
              <span className="text-teal-200 text-xs">{props.subtitle}</span>
            )}
          </div>
        )}
        <div className="p-3 flex flex-col gap-3">{children}</div>
      </div>
    ),

    Grid: ({ props, children }) => {
      const colsClass =
        {
          "2": "grid-cols-2",
          "3": "grid-cols-3",
        }[props.columns ?? "2"] ?? "grid-cols-2";
      const gapClass =
        { sm: "gap-1.5", md: "gap-2", lg: "gap-3" }[props.gap ?? "md"] ??
        "gap-2";
      return <div className={`grid ${colsClass} ${gapClass}`}>{children}</div>;
    },

    Heading: ({ props }) => {
      const Tag = (props.level ?? "h3") as "h2" | "h3" | "h4";
      const sizeClass = {
        h2: "text-base font-bold text-teal-900",
        h3: "text-sm font-bold text-teal-900",
        h4: "text-sm font-semibold text-warm-800",
      }[props.level ?? "h3"];
      return <Tag className={sizeClass}>{props.text}</Tag>;
    },

    Text: ({ props }) => (
      <p
        className={`text-xs leading-relaxed ${props.muted ? "text-warm-400" : "text-warm-700"}`}
      >
        {props.content}
      </p>
    ),

    Metric: ({ props }) => {
      const trendIcon =
        props.trend === "up" ? "↑" : props.trend === "down" ? "↓" : null;
      const trendColor =
        props.trend === "up"
          ? "text-emerald-600"
          : props.trend === "down"
            ? "text-red-600"
            : "text-warm-500";
      return (
        <div className="bg-warm-50 rounded-lg p-2.5 text-center">
          <div className="flex items-center justify-center gap-1">
            <span className="text-lg font-bold text-teal-900 leading-none">
              {props.value}
            </span>
            {trendIcon && (
              <span className={`text-xs font-bold ${trendColor}`}>
                {trendIcon}
              </span>
            )}
          </div>
          <div className="text-[10px] text-warm-500 uppercase tracking-wider mt-0.5">
            {props.label}
          </div>
          {props.detail && (
            <div className={`text-[10px] mt-0.5 ${trendColor}`}>
              {props.detail}
            </div>
          )}
        </div>
      );
    },

    Badge: ({ props }) => {
      const colors = {
        default: "bg-warm-100 text-warm-700",
        success: "bg-emerald-50 text-emerald-700",
        warning: "bg-amber-50 text-amber-700",
        danger: "bg-red-50 text-red-700",
      }[props.variant ?? "default"];
      return (
        <span
          className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${colors}`}
        >
          {props.text}
        </span>
      );
    },

    Table: ({ props }) => {
      const items: Array<Record<string, unknown>> = Array.isArray(props.data)
        ? props.data
        : [];

      if (items.length === 0) return null;

      return (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-warm-200">
                {props.columns.map((col) => (
                  <th
                    key={col.key}
                    className="text-left py-1.5 px-2 text-[10px] uppercase tracking-wider text-warm-500 font-semibold"
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr
                  key={i}
                  className="border-b border-warm-100 last:border-0"
                >
                  {props.columns.map((col) => (
                    <td
                      key={col.key}
                      className="py-1.5 px-2 text-warm-700"
                    >
                      {String(item[col.key] ?? "")}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    },

    Callout: ({ props }) => {
      const config = {
        info: {
          border: "border-l-teal-500",
          bg: "bg-teal-50",
          icon: "ℹ",
        },
        tip: {
          border: "border-l-emerald-500",
          bg: "bg-emerald-50",
          icon: "💡",
        },
        warning: {
          border: "border-l-amber-500",
          bg: "bg-amber-50",
          icon: "⚠",
        },
        important: {
          border: "border-l-red-500",
          bg: "bg-red-50",
          icon: "❗",
        },
      }[props.type ?? "info"] ?? {
        border: "border-l-teal-500",
        bg: "bg-teal-50",
        icon: "ℹ",
      };
      return (
        <div
          className={`border-l-3 ${config.border} ${config.bg} rounded-r-lg p-3`}
        >
          <div className="flex items-start gap-2">
            <span className="text-sm shrink-0">{config.icon}</span>
            <div className="flex-1 min-w-0">
              {props.title && (
                <p className="font-semibold text-xs text-warm-800 mb-0.5">
                  {props.title}
                </p>
              )}
              <p className="text-xs text-warm-600 leading-relaxed">
                {props.content}
              </p>
            </div>
          </div>
        </div>
      );
    },

    Accordion: ({ props }) => {
      const [openIndex, setOpenIndex] = useState<number | null>(null);
      return (
        <div className="divide-y divide-warm-100 border border-warm-200 rounded-lg overflow-hidden">
          {(props.items ?? []).map((item, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-medium text-warm-800 hover:bg-warm-50 transition-colors text-left"
              >
                <span>{item.title}</span>
                <svg
                  className={`w-3.5 h-3.5 text-warm-400 transition-transform ${openIndex === i ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {openIndex === i && (
                <div className="px-3 pb-2 text-xs text-warm-600 leading-relaxed">
                  {item.content}
                </div>
              )}
            </div>
          ))}
        </div>
      );
    },

    Timeline: ({ props }) => (
      <div className="relative pl-6">
        <div className="absolute left-[5px] top-1.5 bottom-1.5 w-px bg-warm-200" />
        <div className="flex flex-col gap-3">
          {(props.items ?? []).map((item, i) => {
            const dotColor =
              item.status === "completed"
                ? "bg-emerald-500"
                : item.status === "current"
                  ? "bg-teal-500 ring-2 ring-teal-200"
                  : "bg-warm-300";
            return (
              <div key={i} className="relative">
                <div
                  className={`absolute -left-6 top-0.5 h-2.5 w-2.5 rounded-full ${dotColor}`}
                />
                <div>
                  <p className="text-xs font-semibold text-warm-800">
                    {item.title}
                  </p>
                  {item.description && (
                    <p className="text-[11px] text-warm-500 mt-0.5">
                      {item.description}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ),

    Progress: ({ props }) => {
      const max = props.max ?? 100;
      const pct = Math.min(100, Math.max(0, (props.value / max) * 100));
      const color =
        pct >= 80
          ? "bg-emerald-500"
          : pct >= 60
            ? "bg-teal-500"
            : pct >= 40
              ? "bg-amber-500"
              : "bg-red-500";
      return (
        <div>
          <div className="flex items-center justify-between mb-0.5">
            <span className="text-[10px] text-warm-500 uppercase tracking-wider">
              {props.label}
            </span>
            <span className="text-xs font-bold text-teal-900">
              {props.value}/{max}
            </span>
          </div>
          <div className="h-1.5 bg-warm-100 rounded-full overflow-hidden">
            <div
              className={`h-full ${color} rounded-full transition-all`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      );
    },

    Separator: () => <div className="border-t border-warm-100 my-1" />,

    Link: ({ props }) => (
      <a
        href={props.href}
        className="text-xs font-semibold text-teal-700 hover:text-teal-800 underline underline-offset-2"
      >
        {props.text}
      </a>
    ),
  },

  actions: {},
});

export function Fallback({ type }: { type: string }) {
  return (
    <div className="p-2 border border-dashed border-warm-200 rounded-lg text-warm-400 text-xs">
      Unknown: {type}
    </div>
  );
}
