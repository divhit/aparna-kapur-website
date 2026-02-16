"use client";

import { useState, useEffect, useCallback, type ReactNode } from "react";

const SLIDES = [
  {
    id: "photo-1655097777728-b9b56af9ff7e",
    alt: "Aerial view of Vancouver's Cambie Corridor with North Shore mountains",
  },
  {
    id: "photo-1680494454968-c4fbb5291231",
    alt: "Vancouver skyline at sunset with Granville Bridge and mountains",
  },
  {
    id: "photo-1672073235822-0518dc92106d",
    alt: "Vancouver downtown in winter with snowy North Shore mountains",
  },
  {
    id: "photo-1711852975328-55804925131b",
    alt: "Vancouver towers at golden hour with mountains behind",
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

  const heightClass = height === "full" ? "h-screen" : "h-[40vh]";

  return (
    <div className={`relative ${heightClass} overflow-hidden`}>
      {/* Slideshow images */}
      {SLIDES.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[2000ms] ease-in-out"
          style={{
            backgroundImage: `url('https://images.unsplash.com/${slide.id}?w=1920&h=1080&fit=crop&q=80')`,
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
