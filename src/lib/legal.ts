import { endSentence, NAP, NAP_ONE_LINE, SITE_URL } from "./agent/site";

/**
 * The site's legal pages, held as data so the HTML page and the markdown
 * representation render from one source. Both were previously linked from the
 * footer on every page and returned 404.
 *
 * This is general-purpose wording describing what this site actually does with
 * the information it collects. It is not legal advice; have a lawyer or the
 * brokerage's compliance team review it before relying on it.
 */

/** A paragraph, or a bulleted list of points. */
export type LegalBlock = string | { list: string[] };

export type LegalSection = {
  heading: string;
  blocks: LegalBlock[];
};

export type LegalDocument = {
  path: string;
  title: string;
  /** Sentence used for the meta description and the markdown summary. */
  summary: string;
  /** ISO date the current wording took effect. */
  effectiveDate: string;
  intro: string[];
  sections: LegalSection[];
};

const LAST_UPDATED = "2026-08-21";

export const PRIVACY_POLICY: LegalDocument = {
  path: "/privacy",
  title: "Privacy Policy",
  summary:
    "How Aparna Kapur collects, uses, stores, and shares personal information through aparnakapur.com, and how to access or delete yours.",
  effectiveDate: LAST_UPDATED,
  intro: [
    `This policy explains what happens to personal information you provide through ${SITE_URL}, or that this site collects automatically while you use it.`,
    `The site is operated by ${NAP.name}, a real estate agent licensed in British Columbia and registered with ${endSentence(NAP.brokerage)} Aparna is the person accountable for the information described here, and she can be reached at ${NAP.telephone} or ${NAP.email}.`,
  ],
  sections: [
    {
      heading: "The law that applies",
      blocks: [
        "Personal information collected through this site is handled under British Columbia's Personal Information Protection Act (PIPA) and, where it applies, Canada's Personal Information Protection and Electronic Documents Act (PIPEDA).",
        "Real estate services in British Columbia are separately regulated by the BC Financial Services Authority under the Real Estate Services Act. Some records must be created and kept because that legislation requires it, regardless of what you would otherwise prefer.",
      ],
    },
    {
      heading: "What this site collects",
      blocks: [
        "Information you choose to give. Every form on the site is optional, and each one tells you what it is for:",
        {
          list: [
            "Contact form: your name, email address, phone number, what you are interested in, and your message.",
            "Home valuation request: the same contact details plus the property address, property type, and your timeline.",
            "Open house sign-in: your name, contact details, whether you are already working with a REALTOR®, and that agent's name if you are.",
            "Neighbourhood report and property alert sign-ups: your email address and the areas or property types you asked to hear about.",
            "Landing page enquiry forms: your name, contact details, and the budget or property criteria the page asked about.",
          ],
        },
        "Information collected automatically. If Google Analytics is enabled on the site, it records which pages you visit, the site or search that referred you, an approximate location derived from your IP address, and basic device and browser details. Standard server logs record request details for security and troubleshooting.",
        "The site assistant. Messages you type into the chat assistant are sent to Google's Gemini API to generate a reply. The conversation is kept in your browser's local storage so it survives a page reload; it is not stored on a server tied to your identity. Please do not type financial details, government identifiers, or anything else sensitive into the assistant — use the phone number or email above instead.",
        "This site does not ask for your Social Insurance Number, banking details, or government identification. If a page ever appears to, it is not one of ours.",
      ],
    },
    {
      heading: "Why it is collected",
      blocks: [
        {
          list: [
            "To answer your question, return your call, or send the market information you asked for.",
            "To prepare a comparative market analysis when you request a valuation.",
            "To search for and show you properties that match what you described.",
            "To arrange showings, open houses, and appointments.",
            "To meet the record-keeping and disclosure obligations that British Columbia real estate legislation places on a licensed agent and their brokerage.",
            "To understand which parts of the site are useful, in aggregate, and improve them.",
          ],
        },
        "Your information is not used to build a profile for sale, and it is not sold, rented, or traded to anyone.",
      ],
    },
    {
      heading: "Consent, and how to withdraw it",
      blocks: [
        "Submitting a form is your consent to be contacted about what you asked for. Signing up for alerts is your consent to receive them until you unsubscribe.",
        `You can withdraw consent at any time by replying to any message, or by writing to ${NAP.email}. Withdrawal takes effect once we have had a reasonable chance to act on it, and it does not apply to records that real estate legislation requires be kept.`,
      ],
    },
    {
      heading: "Who it is shared with",
      blocks: [
        {
          list: [
            `${NAP.brokerage}, the brokerage Aparna is licensed with. Under British Columbia law the brokerage is a party to the services you receive and holds the transaction records.`,
            "Service providers that operate parts of this site on our behalf, under contract and only for the purpose they were engaged for: Vercel (hosting), Cloudflare (content delivery and security), Supabase (the client database), Google (Analytics, Maps and Places, the Gemini model behind the site assistant, and Sheets for a backup copy of enquiries), and Resend (email delivery).",
            "Real estate boards and the Canadian Real Estate Association, where a listing or a transaction requires information to be filed with them.",
            "Other professionals you ask to be introduced to — a mortgage broker, lawyer, notary, inspector, or stager — and only after you ask.",
            "A court, regulator, or law enforcement body where the law requires disclosure.",
          ],
        },
      ],
    },
    {
      heading: "Where it is stored",
      blocks: [
        "Hosting, database, analytics, email, and AI services used by this site operate data centres in Canada and the United States, and personal information may be stored or processed in either country. While information is in another country it is subject to that country's laws, including lawful access requests by its courts and government agencies.",
      ],
    },
    {
      heading: "Cookies and analytics",
      blocks: [
        "The site itself does not set advertising cookies. If Google Analytics is enabled, it sets cookies to tell repeat visits apart and to measure how pages are used.",
        {
          list: [
            "Most browsers let you block or delete cookies in their settings.",
            "Google publishes a browser add-on that opts you out of Google Analytics entirely: https://tools.google.com/dlpage/gaoptout",
            "The chat assistant uses your browser's local storage, not a cookie. Clearing site data for this domain erases the conversation.",
          ],
        },
      ],
    },
    {
      heading: "How long it is kept",
      blocks: [
        "Enquiries that do not lead to a working relationship are kept while there is a reasonable prospect of following up, and are deleted on request.",
        "Records connected to a real estate transaction are kept for the period British Columbia real estate legislation requires, which is longer than most people expect and is not something a request can shorten.",
        "Analytics data is kept according to the retention period configured in Google Analytics.",
      ],
    },
    {
      heading: "Keeping it secure",
      blocks: [
        "The site is served over HTTPS. Enquiries are transmitted to the client database over encrypted connections and access is limited to Aparna and, where required, her brokerage. No system is perfectly secure, and no method of transmitting information over the internet can be guaranteed — please do not send anything highly sensitive through a web form.",
      ],
    },
    {
      heading: "Your rights",
      blocks: [
        "Under BC PIPA you may ask what personal information is held about you, ask for a copy, ask that it be corrected if it is wrong, and ask that it be deleted where no legal obligation requires it be kept.",
        `Write to ${NAP.email} or call ${NAP.telephone}. We will respond within 30 days, and will ask you to confirm your identity before releasing anything.`,
      ],
    },
    {
      heading: "Children",
      blocks: [
        "This site is intended for adults engaging a real estate agent. It is not directed at children, and personal information is not knowingly collected from anyone under the age of majority in British Columbia.",
      ],
    },
    {
      heading: "Changes to this policy",
      blocks: [
        "This policy may be updated as the site or the services behind it change. The effective date at the top of the page always reflects the current wording, and material changes will be described here rather than made quietly.",
      ],
    },
    {
      heading: "Contact and complaints",
      blocks: [
        `Questions, access requests, and complaints go to ${NAP.name}, ${NAP.telephone}, ${NAP.email}, ${NAP_ONE_LINE}.`,
        "If you are not satisfied with the response, you may complain to the Office of the Information and Privacy Commissioner for British Columbia (oipc.bc.ca) or, where PIPEDA applies, to the Office of the Privacy Commissioner of Canada (priv.gc.ca).",
      ],
    },
  ],
};

export const TERMS_OF_USE: LegalDocument = {
  path: "/terms",
  title: "Terms of Use",
  summary:
    "The terms that apply to using aparnakapur.com, including how listing and market data may be used, and what automated agents are permitted to do.",
  effectiveDate: LAST_UPDATED,
  intro: [
    `These terms apply to everyone who uses ${SITE_URL}. Using the site means you accept them. If you do not, please stop using the site.`,
    `The site is published by ${NAP.name}, a real estate agent licensed in British Columbia and registered with ${endSentence(NAP.brokerage)}`,
  ],
  sections: [
    {
      heading: "Using this site does not make us your agent",
      blocks: [
        "Reading this site, submitting a form, or exchanging messages does not create an agency relationship and does not make Aparna your REALTOR®. In British Columbia that relationship begins only when you and the brokerage sign a written service agreement, after the required disclosures have been given to you.",
        "Until that happens, treat everything here as general information offered to the public rather than advice given to you as a client.",
      ],
    },
    {
      heading: "Not professional advice",
      blocks: [
        "Nothing on this site is legal, tax, accounting, mortgage, appraisal, or engineering advice. The guides explain how a British Columbia purchase or sale generally works; your own transaction will have facts they do not cover.",
        "Tax figures, government program rules, and closing costs change. Confirm anything you plan to rely on with the relevant authority or a qualified professional before you act on it.",
      ],
    },
    {
      heading: "Market data and listing information",
      blocks: [
        "Benchmark prices, year-over-year changes, sales-to-active ratios, and inventory figures on this site are MLS® Home Price Index numbers published by Greater Vancouver REALTORS®. They describe a neighbourhood and a property type. They are not an appraisal or a valuation of any particular property.",
        "Active listing information is supplied through the Canadian Real Estate Association's Data Distribution Facility (DDF®) and comes from participating boards and brokerages. It is deemed reliable but is not guaranteed accurate, is not independently verified, and may be out of date or withdrawn by the time you see it. Always confirm details with Aparna before making a decision.",
        "Walk Score and Transit Score are third-party measures reproduced for orientation only.",
      ],
    },
    {
      heading: "Trademarks",
      blocks: [
        "REALTOR®, REALTORS®, and the REALTOR® logo are trademarks owned by the Canadian Real Estate Association (CREA) and identify real estate professionals who are members of CREA. MLS®, Multiple Listing Service®, and the associated logos are also owned by CREA and identify the quality of services its members provide. These marks are used under licence.",
        "Oakwyn Realty and the Oakwyn Realty logo belong to Oakwyn Realty Ltd.",
      ],
    },
    {
      heading: "Automated access, crawlers, and AI agents",
      blocks: [
        "Automated clients are welcome here. This site publishes machine-readable representations on purpose, and crawling within the limits of its robots.txt is permitted.",
        {
          list: [
            `Read the agent instructions first: ${SITE_URL}/agents.md sets out what the site is good for, what it will not answer, and how to fetch it efficiently.`,
            `Prefer the bulk files over crawling page by page: ${SITE_URL}/llms.txt and ${SITE_URL}/llms-full.txt.`,
            "Every page also answers to `Accept: text/markdown`, or to its URL with `.md` appended.",
            "You may quote and summarize the written content of this site — the neighbourhood guides, the buying and selling guides, the articles — provided you attribute it to Aparna Kapur, Oakwyn Realty, and link the page you drew from.",
            "You may not redistribute MLS® listing data obtained from this site, or use it to build or supplement a competing property database. That data is licensed to us by CREA and the licence does not extend to you.",
            "Do not present this site's content as your own, as the output of a different agent, or as advice given to a specific person. Do not alter figures, dates, or contact details when you quote them.",
            "When you surface contact details, use the published phone number and email rather than a scraped variant, and send booking requests to the contact page.",
          ],
        },
        "Automated activity that degrades the site for other users — aggressive request rates, credential guessing, attempts to submit forms in bulk — is not permitted and may be blocked.",
      ],
    },
    {
      heading: "Your responsibilities",
      blocks: [
        {
          list: [
            "Give accurate information in forms. A valuation built on a wrong address is worth nothing.",
            "Use the site lawfully, and do not attempt to interfere with it or gain access to parts of it that are not public.",
            "Do not submit anyone else's personal information without their knowledge.",
          ],
        },
      ],
    },
    {
      heading: "Content ownership",
      blocks: [
        "The written content, guides, market commentary, photographs, and design of this site belong to Aparna Kapur unless credited otherwise, and are protected by copyright. Personal, non-commercial use — reading, printing, sharing a link — is fine. Republishing substantial portions commercially is not, except as the section on automated access permits.",
      ],
    },
    {
      heading: "Links to other sites",
      blocks: [
        "This site links to third parties — the brokerage, government pages, mapping services, mortgage resources. Those sites are not under our control and their content and privacy practices are their own responsibility.",
      ],
    },
    {
      heading: "Availability and warranties",
      blocks: [
        'The site is provided "as is" and "as available". No warranty is given that it will be uninterrupted, error-free, or that every figure on it is current. Features that depend on third-party services — mapping, listing search, the chat assistant — may be unavailable at times.',
      ],
    },
    {
      heading: "Limitation of liability",
      blocks: [
        "To the extent the law allows, Aparna Kapur and Oakwyn Realty Ltd. are not liable for indirect or consequential loss arising from your use of this site, or from reliance on information published here that turns out to be inaccurate or out of date. Nothing in these terms limits liability that cannot be limited by law, including the duties a licensed real estate agent owes a client.",
      ],
    },
    {
      heading: "Privacy",
      blocks: [
        `Personal information is handled as described in the privacy policy at ${SITE_URL}/privacy, which forms part of these terms.`,
      ],
    },
    {
      heading: "Governing law",
      blocks: [
        "These terms are governed by the laws of British Columbia and the laws of Canada that apply there. The courts of British Columbia have jurisdiction over any dispute arising from them.",
      ],
    },
    {
      heading: "Changes",
      blocks: [
        "These terms may change as the site changes. The effective date at the top of the page reflects the current version, and continuing to use the site after a change means you accept it.",
      ],
    },
    {
      heading: "Contact",
      blocks: [
        `Questions about these terms: ${NAP.name}, ${NAP.telephone}, ${NAP.email}, ${NAP_ONE_LINE}.`,
      ],
    },
  ],
};

export const LEGAL_DOCUMENTS: LegalDocument[] = [PRIVACY_POLICY, TERMS_OF_USE];

export function findLegalDocument(path: string): LegalDocument | undefined {
  return LEGAL_DOCUMENTS.find((doc) => doc.path === path);
}

/** Render a legal document as markdown, for the `.md` twin and llms-full.txt. */
export function legalDocumentToMarkdown(doc: LegalDocument): string {
  const lines: string[] = [
    `Effective ${doc.effectiveDate}.`,
    "",
    ...doc.intro.flatMap((p) => [p, ""]),
  ];

  for (const section of doc.sections) {
    lines.push(`## ${section.heading}`, "");
    for (const block of section.blocks) {
      if (typeof block === "string") {
        lines.push(block, "");
      } else {
        lines.push(...block.list.map((item) => `- ${item}`), "");
      }
    }
  }

  return lines.join("\n").trim();
}
