/**
 * Inline markdown for blog prose: links, bold, and email addresses.
 *
 * The domain is proxied through Cloudflare, whose Email Address Obfuscation
 * rewrites anything shaped like an address into a `/cdn-cgi/l/email-protection`
 * link that 404s, and shows "[email protected]" to anyone without JavaScript,
 * including every AI crawler. `EmailLink` guards Aparna's own address; this
 * guards any address that appears in an article, such as a municipal staff
 * contact, by wrapping it in Cloudflare's `email_off` markers.
 */

const EMAIL_PATTERN = /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/g;

export function formatInlineMarkdown(text: string): string {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(EMAIL_PATTERN, (address) => `<!--email_off-->${address}<!--email_on-->`);
}
