"use client";

import { useState } from "react";

type Props = {
  photos: string[];
  alt: string;
};

export default function PropertyGallery({ photos, alt }: Props) {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);

  if (photos.length === 0) {
    return (
      <div className="w-full aspect-[16/9] bg-warm-100 flex items-center justify-center">
        <span className="text-warm-500">No photos available</span>
      </div>
    );
  }

  const hero = photos[active] ?? photos[0];

  return (
    <>
      <div className="bg-warm-100">
        <div className="max-w-7xl mx-auto px-0 md:px-6">
          {/* Hero */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="block w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden md:rounded-b-2xl"
            aria-label="Open full-size photo"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={hero}
              alt={alt}
              className="w-full h-full object-cover hover:opacity-95 transition"
            />
          </button>

          {/* Thumbnail strip */}
          {photos.length > 1 && (
            <div className="overflow-x-auto px-6 md:px-0 py-3">
              <div className="flex gap-2">
                {photos.slice(0, 16).map((p, i) => (
                  <button
                    key={p + i}
                    type="button"
                    onClick={() => setActive(i)}
                    className={`relative shrink-0 w-24 h-16 md:w-28 md:h-20 overflow-hidden rounded-lg border-2 transition ${
                      i === active
                        ? "border-teal-600"
                        : "border-transparent hover:border-warm-300"
                    }`}
                    aria-label={`View photo ${i + 1}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
                {photos.length > 16 && (
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="shrink-0 w-24 h-16 md:w-28 md:h-20 rounded-lg bg-teal-900/90 text-white text-sm flex items-center justify-center"
                  >
                    +{photos.length - 16} more
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setOpen(false);
            }}
            className="absolute top-4 right-4 text-white text-2xl px-3 py-1"
            aria-label="Close"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={hero}
            alt={alt}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          {photos.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active - 1 + photos.length) % photos.length);
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl px-3"
                aria-label="Previous photo"
              >
                ‹
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive((active + 1) % photos.length);
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl px-3"
                aria-label="Next photo"
              >
                ›
              </button>
              <p className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white text-xs">
                {active + 1} / {photos.length}
              </p>
            </>
          )}
        </div>
      )}
    </>
  );
}
