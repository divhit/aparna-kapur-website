import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { TERMS_OF_USE } from "@/lib/legal";

export const metadata: Metadata = {
  title: TERMS_OF_USE.title,
  description: TERMS_OF_USE.summary,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return <LegalPage doc={TERMS_OF_USE} />;
}
