import HeroSlideshow from "./HeroSlideshow";

interface PageBannerProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}

export default function PageBanner({
}: PageBannerProps) {
  return (
    <HeroSlideshow height="banner">
      {/* Photos only — no text overlay */}
      <div />
    </HeroSlideshow>
  );
}
