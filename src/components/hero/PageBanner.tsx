import HeroSlideshow from "./HeroSlideshow";

interface PageBannerProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function PageBanner({
  eyebrow,
  title,
  description,
  align = "center",
}: PageBannerProps) {
  return (
    <HeroSlideshow height="banner">
      <div
        className={`w-full max-w-7xl mx-auto px-6 pt-24 md:pt-16 ${
          align === "center" ? "text-center" : "text-left"
        }`}
      >
        {eyebrow && (
          <p className="text-teal-300 text-sm uppercase tracking-[0.2em] font-medium mb-3">
            {eyebrow}
          </p>
        )}
        <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg text-white/80 max-w-2xl leading-relaxed mx-auto">
            {description}
          </p>
        )}
      </div>
    </HeroSlideshow>
  );
}
