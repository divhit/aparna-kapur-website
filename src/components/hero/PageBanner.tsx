import HeroSlideshow from "./HeroSlideshow";

/**
 * The banner at the top of an interior page.
 *
 * It took `eyebrow`, `title` and `description` and rendered none of them — the
 * props were destructured away and the body returned an empty div. Twenty-one
 * indexable pages passed a title that was silently discarded, so every guide
 * step and resource page shipped with no H1 at all, and a reader landing on one
 * saw a photo and then body copy with no indication of what the page was.
 *
 * The title is the page's H1. The photo slideshow stays behind it.
 */

interface PageBannerProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
  /**
   * Set to false on a page that renders its own H1 further down, so the two do
   * not compete. The banner then shows the photo only, as it did before.
   */
  heading?: boolean;
}

export default function PageBanner({
  eyebrow,
  title,
  description,
  align = "center",
  heading = true,
}: PageBannerProps) {
  if (!heading) {
    return (
      <HeroSlideshow height="banner">
        <div />
      </HeroSlideshow>
    );
  }

  const alignment =
    align === "left"
      ? "text-left items-start"
      : "text-center items-center mx-auto";

  return (
    <HeroSlideshow height="banner">
      <div className={`flex flex-col ${alignment} px-6 max-w-3xl mx-auto`}>
        {eyebrow && (
          <p className="text-[11px] uppercase tracking-[0.3em] text-white/70 font-medium mb-4">
            {eyebrow}
          </p>
        )}
        <h1
          className="font-serif text-3xl md:text-5xl text-white leading-tight"
          style={{ textShadow: "0 2px 24px rgba(0,0,0,0.45)" }}
        >
          {title}
        </h1>
        {description && (
          <p
            className="text-white/85 text-base md:text-lg leading-relaxed mt-5 max-w-2xl"
            style={{ textShadow: "0 1px 16px rgba(0,0,0,0.45)" }}
          >
            {description}
          </p>
        )}
      </div>
    </HeroSlideshow>
  );
}
