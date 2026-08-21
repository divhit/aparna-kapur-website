"use client";

import { Component, type ReactNode } from "react";

/**
 * Keeps a failing map from taking the page down with it.
 *
 * The Google Maps SDK throws from inside React's render when the API key is
 * rejected (`ApiTargetBlockedMapError`), when billing lapses, or when a marker
 * mounts against a map that never initialised. Nothing was catching those, so
 * a single map failure replaced the whole page with Next.js's client-side
 * exception screen — the homepage went blank, contact details and all.
 *
 * A map is decoration around the content, never the content itself, so a
 * failure degrades to a quiet placeholder and the rest of the page survives.
 */

type Props = {
  children: ReactNode;
  /** Shown in place of the map. Keep the same footprint to avoid layout shift. */
  fallback?: ReactNode;
};

type State = { failed: boolean };

export default class MapErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error) {
    console.error("[map] disabled after a rendering error:", error.message);
  }

  render() {
    if (!this.state.failed) return this.props.children;

    return (
      this.props.fallback ?? (
        <div className="w-full h-full min-h-[300px] flex items-center justify-center bg-warm-100 text-warm-500 text-sm">
          Map unavailable right now.
        </div>
      )
    );
  }
}
