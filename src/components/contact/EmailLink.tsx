import { NAP } from "@/lib/agent/site";

/**
 * A `mailto:` link that survives Cloudflare's Email Address Obfuscation.
 *
 * The site sits behind Cloudflare, whose Scrape Shield rewrites every
 * `mailto:` anchor into `/cdn-cgi/l/email-protection#…` and replaces the
 * visible address with "[email protected]". Browsers repair it with
 * JavaScript; AI crawlers reading the raw HTML do not, so the contact address
 * — a NAP fact that entity resolution depends on — disappeared from every
 * rendered page, and the rewritten href 404s for anything following links.
 *
 * Cloudflare's documented opt-out is a pair of HTML comments around the
 * content to leave alone. React cannot emit a comment node, so the anchor is
 * rendered as markup. Everything interpolated here is a literal from this
 * repository; nothing user-supplied reaches it.
 *
 * Turning off Scrape Shield → Email Address Obfuscation in the Cloudflare
 * dashboard would make this component unnecessary, but this keeps the address
 * readable whatever that setting is.
 */

type EmailLinkProps = {
  /** Classes for the anchor itself. */
  className?: string;
  /**
   * Classes for the wrapper that stands in for the anchor in its parent's
   * layout. Pass `block` when the anchor was a block-level child (a
   * `space-y-*` stack, or a flex item); leave empty to stay inline in a
   * sentence.
   */
  wrapperClassName?: string;
  /** Text of the link. Defaults to the address itself. */
  label?: string;
  /** Heroicons-style path data rendered before the label. */
  iconPath?: string | string[];
  iconClassName?: string;
  iconStrokeWidth?: number;
  /**
   * Complete inner markup for the anchor, when a label and an icon are not
   * enough. Must be a literal from this repository.
   */
  innerHtml?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function iconMarkup({
  iconPath,
  iconClassName,
  iconStrokeWidth,
}: Pick<
  EmailLinkProps,
  "iconPath" | "iconClassName" | "iconStrokeWidth"
>): string {
  if (!iconPath) return "";
  const paths = Array.isArray(iconPath) ? iconPath : [iconPath];
  const width = iconStrokeWidth ?? 2;
  const d = paths
    .map(
      (path) =>
        `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="${width}" d="${escapeHtml(path)}"></path>`,
    )
    .join("");
  return `<svg class="${escapeHtml(iconClassName ?? "w-4 h-4")}" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">${d}</svg>`;
}

export default function EmailLink({
  className,
  wrapperClassName,
  label,
  iconPath,
  iconClassName,
  iconStrokeWidth,
  innerHtml,
}: EmailLinkProps) {
  const inner =
    innerHtml ??
    `${iconMarkup({ iconPath, iconClassName, iconStrokeWidth })}${escapeHtml(label ?? NAP.email)}`;

  const anchor = `<a href="mailto:${escapeHtml(NAP.email)}"${
    className ? ` class="${escapeHtml(className)}"` : ""
  }>${inner}</a>`;

  return (
    <span
      className={wrapperClassName}
      dangerouslySetInnerHTML={{
        __html: `<!--email_off-->${anchor}<!--email_on-->`,
      }}
    />
  );
}

/**
 * The bare address as text, protected the same way. Cloudflare rewrites plain
 * email addresses in body copy too, not only `mailto:` anchors.
 */
export function EmailText({ className }: { className?: string }) {
  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{
        __html: `<!--email_off-->${escapeHtml(NAP.email)}<!--email_on-->`,
      }}
    />
  );
}

/**
 * Render a run of prose, swapping any occurrence of the contact address for a
 * protected one. Use it wherever body copy comes from a data string.
 */
export function protectEmails(text: string): React.ReactNode[] {
  return text
    .split(NAP.email)
    .flatMap((chunk, index) =>
      index === 0
        ? [<span key={`t${index}`}>{chunk}</span>]
        : [
            <EmailText key={`e${index}`} />,
            <span key={`t${index}`}>{chunk}</span>,
          ],
    );
}
