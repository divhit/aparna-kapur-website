import Image from "next/image";

type AgentTrustStripProps = {
  context?: string;
};

export default function AgentTrustStrip({ context }: AgentTrustStripProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-5 py-6 px-6 bg-teal-950 rounded-2xl text-white">
      <Image
        src="/images/about/aparna-kapur.webp"
        alt="Aparna Kapur - Vancouver Realtor with Oakwyn Realty"
        width={80}
        height={80}
        className="rounded-full object-cover w-20 h-20 border-2 border-teal-400/30 shrink-0"
      />
      <div className="text-center sm:text-left">
        <p
          className="text-lg font-bold leading-tight mb-0.5"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Aparna Kapur
        </p>
        <p className="text-teal-300 text-xs uppercase tracking-widest mb-2">
          Licensed REALTOR&reg; &bull; Oakwyn Realty
        </p>
        <p className="text-white/70 text-sm leading-relaxed max-w-md">
          {context ||
            "I know every street, every building, every opportunity in Vancouver. Let me find the right one for you."}
        </p>
      </div>
    </div>
  );
}
