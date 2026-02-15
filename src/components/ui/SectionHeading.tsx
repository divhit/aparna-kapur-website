type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <div className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-12`}>
      {eyebrow && (
        <p
          className={`text-xs uppercase tracking-[0.2em] font-semibold mb-3 ${
            light ? "text-teal-300" : "text-teal-600"
          }`}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-serif text-3xl md:text-4xl leading-tight mb-4 ${
          light ? "text-white" : "text-teal-950"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`text-base leading-relaxed ${
            light ? "text-white/70" : "text-warm-600"
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
