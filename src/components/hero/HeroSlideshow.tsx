"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";

const SLIDES = [
  {
    id: "11455843",
    alt: "Lions Gate Bridge spanning the harbor with lush forest and North Shore mountains",
  },
  {
    id: "2416606",
    alt: "Tranquil sunset over Vancouver's waters with boats and mountains",
  },
  {
    id: "8997731",
    alt: "Aerial view of Lighthouse Park on rocky shoreline surrounded by forest in West Vancouver",
  },
  {
    id: "30996166",
    alt: "Misty mountain landscape with island and trees in West Vancouver",
  },
];

const INTERVAL = 10000;

interface HeroSlideshowProps {
  height?: "full" | "banner";
  children?: ReactNode;
}

export default function HeroSlideshow({
  height = "full",
  children,
}: HeroSlideshowProps) {
  const [current, setCurrent] = useState(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(advance, INTERVAL);
    return () => clearInterval(timer);
  }, [advance]);

  const heightClass = height === "full" ? "h-screen" : "min-h-[50vh] md:h-[40vh]";

  return (
    <div className={`relative ${heightClass} overflow-hidden`}>
      {/* Slideshow images */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out"
          style={{
            backgroundImage: `url('https://images.pexels.com/photos/${slide.id}/pexels-photo-${slide.id}.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop')`,
            opacity: i === current ? 1 : 0,
          }}
          role="img"
          aria-label={slide.alt}
          aria-hidden={i !== current}
        />
      ))}
      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-teal-950/30 to-teal-950/70" />
      {/* Optional overlay content */}
      {children && (
        <div className="relative z-10 h-full flex items-center justify-center">
          {children}
        </div>
      )}
    </div>
  );
}
