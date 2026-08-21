"use client";

import Script from "next/script";

/**
 * The measurement ID reaches the bundle from an environment variable, and the
 * value configured in production carries a trailing newline. Interpolated into
 * the inline `gtag('config', '…')` call that newline opened a string literal
 * that never closed, so the browser refused the whole script — analytics never
 * loaded on any page, and every page threw "Failed to execute 'appendChild' on
 * 'Node': Invalid or unexpected token".
 *
 * Trimming here fixes it wherever the variable is set. Anything that is not a
 * plausible GA4 or Universal Analytics ID is dropped rather than injected.
 */
const RAW_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export function normalizeMeasurementId(
  value: string | undefined | null,
): string | null {
  const id = value?.trim();
  if (!id) return null;
  return /^(G|AW|DC|UA|GT)-[A-Za-z0-9-]+$/.test(id) ? id : null;
}

const GA_MEASUREMENT_ID = normalizeMeasurementId(RAW_ID);

export default function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', ${JSON.stringify(GA_MEASUREMENT_ID)});
        `}
      </Script>
    </>
  );
}
