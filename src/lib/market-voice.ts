import {
  AREA_BENCHMARKS,
  formatPrice,
  REGION_BENCHMARKS,
  type PropertyType,
} from "./market-data";
import { getMarketNote } from "./market-notes";

/**
 * Aparna's read on a benchmark, in her own voice.
 *
 * The figures above this paragraph tell a buyer what a market did. They do not
 * tell anyone what to make of it, and a number without a reading is where most
 * agent sites stop. This composes that reading from the data: where the type
 * sits in its own area, how it moved against the region, and what usually
 * matters about that type — warm, direct, and willing to say the unhelpful
 * thing when the unhelpful thing is true.
 *
 * Two rules held to deliberately:
 *
 * 1. Nothing here invents a first-hand event. No "I showed a place on that
 *    street last week", no client stories, no claims about specific listings.
 *    Aparna can add those — they would be the best thing on these pages — but
 *    they have to be hers, not generated. Everything below is interpretation
 *    of published figures, which is honest to attribute to her.
 * 2. Nothing promises a direction. Benchmarks describe what happened; a
 *    licensed agent forecasting prices in writing is both bad practice and a
 *    regulatory problem.
 */

type Voice = {
  areaName: string;
  type: PropertyType;
  /** "condo", "townhouse", "detached" — how she'd say it aloud. */
  label: string;
  /** "condos", "townhouses", "houses" */
  plural: string;
  walkScore: number;
  transitScore: number;
};

/** Where this type sits in its own area's range, and what that means for a buyer. */
function positionRead(slug: string, v: Voice): string {
  const area = AREA_BENCHMARKS[slug];
  const own = area[v.type]!;
  const others = (["detached", "townhouse", "apartment"] as PropertyType[])
    .filter((other) => other !== v.type && area[other])
    .map((other) => ({ type: other, price: area[other]!.price }));

  if (others.length === 0) {
    return `${v.plural[0].toUpperCase()}${v.plural.slice(1)} are the only property type with enough sales in ${v.areaName} for the index to track, which tells you something in itself: this is a ${v.label} neighbourhood, and if you are looking for anything else here you will be waiting for the rare listing rather than choosing between several.`;
  }

  const dearest = others.reduce((a, b) => (a.price > b.price ? a : b));
  const cheapest = others.reduce((a, b) => (a.price < b.price ? a : b));

  if (own.price <= cheapest.price) {
    // How much less this type costs than the dearest — expressed as a share of
    // the dearest, because "266% less" is not a thing anyone can pay.
    const less = Math.round((1 - own.price / dearest.price) * 100);
    return `This is the most affordable way into ${v.areaName}, and I do not mean that as a consolation. The ${v.areaName} address, the same shops, the same catchment — a ${v.label} buys all of it for about ${less}% less than a house here. If you love the neighbourhood and the house number is out of reach, this is the honest answer to that problem.`;
  }

  if (own.price >= dearest.price) {
    const gap = Math.round((own.price / cheapest.price - 1) * 100);
    return `${v.plural[0].toUpperCase()}${v.plural.slice(1)} sit at the top of what ${v.areaName} costs — about ${gap}% above the entry point here. That gap is worth sitting with before you start looking. Some buyers stretch for it and are glad they did; others find that the same money in a neighbouring area buys more space than the address is worth to them. There is no right answer, only the one that fits how you actually live.`;
  }

  return `${v.plural[0].toUpperCase()}${v.plural.slice(1)} land in the middle of ${v.areaName}'s range, between ${formatPrice(cheapest.price)} and ${formatPrice(dearest.price)}. That middle is often the most competitive part of a neighbourhood, because it is where two sets of buyers meet: people moving up from a condo and people who have decided a house is more than they want to maintain.`;
}

/** How it moved, and what she'd caution about reading too much into that. */
function movementRead(slug: string, v: Voice): string {
  const own = AREA_BENCHMARKS[slug][v.type]!;
  const region = REGION_BENCHMARKS[v.type];
  const gap = Number((Math.abs(region.yoy) - Math.abs(own.yoy)).toFixed(1));
  const price = formatPrice(own.price);
  const monthly = own.mom;
  const monthNote =
    Math.abs(monthly) < 0.3
      ? `The last month barely moved it.`
      : monthly < 0
        ? `It came off another ${Math.abs(monthly)}% just in the last month.`
        : `It actually ticked up ${monthly}% in the last month.`;

  if (own.yoy >= 0) {
    return `The benchmark is up over the past year while the region is down ${Math.abs(region.yoy)}%, which is unusual enough to be worth asking about rather than celebrating. Sometimes it means genuine demand. Sometimes it means very few sales and a mix that skewed larger. I would want to look at what actually traded before drawing a conclusion, and that is a quick conversation.`;
  }

  if (gap >= 2) {
    return `It is down ${Math.abs(own.yoy)}% over the year, but the wider market is down ${Math.abs(region.yoy)}%, so ${v.plural} here have held up about ${gap} points better than Vancouver as a whole. ${monthNote} If you own a ${v.label} in ${v.areaName}, that is genuinely reassuring. If you are buying at ${price}, it means you should not expect the discounts you may have read about citywide to show up in this pocket.`;
  }

  if (gap <= -2) {
    return `It is down ${Math.abs(own.yoy)}% over the year against ${Math.abs(region.yoy)}% for the region, so ${v.areaName} has softened faster than the wider market. ${monthNote} I would rather tell you that plainly than let you find it out later. For a buyer, ${price} is a better entry than it would have been a year ago. For an owner thinking about selling, it means pricing to today rather than to what a neighbour achieved eighteen months ago.`;
  }

  return `It is down ${Math.abs(own.yoy)}% over the year, tracking the wider market closely — Vancouver as a whole was ${region.yoy < 0 ? "down" : "up"} ${Math.abs(region.yoy)}%. Nothing unusual is happening in ${v.areaName}, which is its own kind of useful: at ${price}, you can read the citywide commentary and trust that it applies here. ${monthNote}`;
}

/** What she'd actually tell someone to look at for this property type. */
function practicalRead(slug: string, v: Voice): string {
  const own = AREA_BENCHMARKS[slug][v.type]!;
  const price = formatPrice(own.price);
  if (v.type === "apartment") {
    const transit =
      v.transitScore >= 80
        ? ` With a Transit Score of ${v.transitScore}, plenty of people here genuinely do not need a car, and that changes what you can afford in a way the sticker price does not show.`
        : "";
    return `The number that matters most on a condo is rarely the asking price. It is the depreciation report, the contingency reserve, and whether the building has a special levy coming. Two units on the same floor of two different buildings can both be listed near ${price} in ${v.areaName} and be a very different decision. I read the minutes before you write an offer, every time.${transit}`;
  }

  if (v.type === "townhouse") {
    return `Townhouses are the thinnest slice of the Vancouver market, and ${v.areaName}\u2019s ${price} benchmark moves on relatively few sales — so treat month-to-month wobbles as noise rather than signal. The practical consequence is that when the right one comes up in ${v.areaName}, there often is not a second option to compare it against. That is worth knowing before you are standing in one deciding in an afternoon.`;
  }

  const walk =
    v.walkScore >= 80
      ? ` A Walk Score of ${v.walkScore} on detached stock is unusual — most areas trade walkability away as lots get larger, and this one has not.`
      : "";
  return `With a house, a good part of what you are buying is the lot, and lots are where the differences hide: frontage, lane access, what the zoning would let you or a future owner build. Two ${v.areaName} homes listed near ${price} on the same street can have quite different long-term value for reasons that never appear in a listing photo.${walk}`;
}

/** The close: what to do next, without pressure. */
function closingRead(slug: string, v: Voice): string {
  const own = AREA_BENCHMARKS[slug][v.type]!;
  const price = formatPrice(own.price);

  if (v.type === "apartment") {
    return `If you are trying to work out whether a particular ${v.areaName} ${v.label} is worth its asking price against this ${price} benchmark — or what yours would fetch today — just ask me. No obligation and no sales pitch. I would rather you had a real number and a straight answer than a good feeling about an index.`;
  }
  if (v.type === "townhouse") {
    return `Townhouse listings in ${v.areaName} come up rarely enough that it helps to be ready before one does. If you want to talk through what ${price} realistically buys here, or what yours is worth now, just ask. No obligation, and I will tell you if I think you should wait.`;
  }
  return `If you are weighing a house in ${v.areaName} against somewhere else, or wondering what yours would fetch against this ${price} benchmark, just ask me. No obligation and no sales pitch — I would rather you had a real number and a straight answer than a good feeling about an index.`;
}

/**
 * Aparna's commentary for one benchmark page: four short paragraphs, each
 * chosen by what the data actually says, so no two pages read the same way.
 */
export function marketCommentary(
  slug: string,
  type: PropertyType,
  hood: {
    name: string;
    walkScore: number;
    transitScore: number;
  },
): string[] {
  const label =
    type === "apartment"
      ? "condo"
      : type === "townhouse"
        ? "townhouse"
        : "detached";
  const plural =
    type === "apartment"
      ? "condos"
      : type === "townhouse"
        ? "townhouses"
        : "houses";

  const voice: Voice = {
    areaName: hood.name,
    type,
    label,
    plural,
    walkScore: hood.walkScore,
    transitScore: hood.transitScore,
  };

  // A note Aparna has written herself leads, because it is the part a portal
  // cannot reproduce.
  const note = getMarketNote(slug, type);

  return [
    ...(note ? [note] : []),
    positionRead(slug, voice),
    movementRead(slug, voice),
    practicalRead(slug, voice),
    closingRead(slug, voice),
  ];
}
