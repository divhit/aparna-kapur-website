/**
 * Permanent, not temporary. A 307 leaves the old URL in the index and does
 * not consolidate its ranking signals onto the destination; a 308 does both.
 */
import { permanentRedirect } from "next/navigation";

export default function AboutPage() {
  permanentRedirect("/about/why-work-with-me");
}
