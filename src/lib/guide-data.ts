export type GuideStep = {
  slug: string;
  step: number;
  title: string;
  shortTitle: string;
  description: string;
  content: string[];
  insight: string;
};

export const buyingGuideSteps: GuideStep[] = [
  {
    slug: "deciding-to-buy",
    step: 1,
    title: "Deciding to Buy a Home in Vancouver",
    shortTitle: "Deciding to Buy",
    description: "Understanding your motivations, the Vancouver market, and whether now is the right time for you.",
    content: [
      "Buying a home is one of the biggest financial and lifestyle decisions you'll ever make. Before diving into property listings, it's worth taking a step back to understand your motivations and make sure you're set up for success.",
      "## Why Do You Want to Buy?\n\nPeople buy homes for many reasons — and understanding yours will help guide every decision that follows. Are you looking for more space? A better neighborhood for your family? A smart investment in Vancouver's growing market? Maybe you're tired of renting and want to build equity. Whatever your reason, clarity here will save you time and help me find exactly what you need.",
      "## Is Now the Right Time?\n\nVancouver's real estate market is dynamic. With the Oakridge Park redevelopment bringing 3,300+ new homes and a 9-acre public park, neighborhoods like Oakridge, Marpole, and South Cambie are seeing increased interest. The Canada Line provides quick access to downtown, and property values in transit-oriented neighborhoods have historically appreciated strongly.\n\nThat said, the 'right time' is personal. It depends on your financial readiness, your life situation, and your long-term plans. I can help you understand current market conditions and how they apply to your specific situation.",
      "## What Can You Afford?\n\nBefore you fall in love with a property, it's important to understand your budget. In Vancouver, this means considering not just the purchase price, but also the Property Transfer Tax, strata fees (for condos and townhomes), property taxes, and maintenance costs.\n\nA general rule of thumb: your total monthly housing costs (mortgage, taxes, strata, insurance) shouldn't exceed 32% of your gross monthly income. But every situation is unique — a mortgage broker can give you a precise pre-approval that accounts for your specific finances.",
    ],
    insight: "Many of my clients are surprised to learn about BC's first-time home buyer programs. If this is your first home, you may qualify for the First-Time Home Buyers' Program which exempts you from Property Transfer Tax on homes up to $835,000. We'll explore all the programs you might qualify for.",
  },
  {
    slug: "preparing-to-buy",
    step: 2,
    title: "Preparing to Buy: Finances & Pre-Approval",
    shortTitle: "Preparing to Buy",
    description: "Getting your finances in order, securing mortgage pre-approval, and understanding BC-specific programs.",
    content: [
      "## Get Mortgage Pre-Approved\n\nThis is the single most important step before you start house hunting. A pre-approval tells you exactly how much you can borrow, locks in an interest rate (usually for 90-120 days), and shows sellers you're a serious buyer.\n\nIn Vancouver's competitive market, going in without pre-approval puts you at a disadvantage. I can connect you with trusted mortgage brokers who specialize in the Vancouver market.",
      "## Understand Your Down Payment\n\nIn Canada, the minimum down payment depends on the purchase price:\n- **Under $500,000:** 5% minimum\n- **$500,000 to $999,999:** 5% on the first $500K, 10% on the remainder\n- **$1,000,000+:** 20% minimum\n\nFor example, a $800,000 home requires at least $55,000 down (5% of $500K + 10% of $300K). If you put less than 20% down, you'll need mortgage insurance (CMHC), which adds to your costs.",
      "## BC First-Time Buyer Programs\n\nBC offers several programs that can save you thousands:\n\n- **First-Time Home Buyers' Program:** Full exemption from Property Transfer Tax on homes up to $835,000 (partial exemption up to $860,000)\n- **Home Buyer Rescission Period:** You have 3 business days to rescind an accepted offer (with a 0.25% penalty)\n- **First Home Savings Account (FHSA):** Save up to $8,000/year (tax-deductible) toward your first home\n- **Home Buyers' Plan (HBP):** Withdraw up to $60,000 from your RRSP for a down payment\n\nThese programs can significantly reduce your upfront costs. I'll make sure we take advantage of every one you qualify for.",
      "## Budget for Closing Costs\n\nBeyond the down payment, budget 1.5-3% of the purchase price for closing costs including:\n- Property Transfer Tax (unless exempt)\n- Legal fees ($1,000-$2,000)\n- Home inspection ($400-$600)\n- Strata document review ($200-$400 for condos)\n- Property insurance\n- Moving costs",
    ],
    insight: "I always recommend my clients talk to at least two mortgage brokers to compare rates. Even a 0.1% difference in interest rate can save you tens of thousands over the life of your mortgage. I have a list of trusted brokers who consistently get the best rates for Vancouver buyers.",
  },
  {
    slug: "choosing-your-realtor",
    step: 3,
    title: "Choosing the Right Realtor for You",
    shortTitle: "Choose a Realtor",
    description: "What to look for in a Vancouver realtor, how buyer representation works, and why it matters.",
    content: [
      "## Why You Need a Buyer's Agent\n\nIn BC, both the buyer and seller typically have their own agent. As your buyer's agent, I represent YOUR interests exclusively. I negotiate on your behalf, identify potential issues with properties, and guide you through the complex process of buying in Vancouver.\n\nImportantly, in most transactions, the seller's side pays the commission for both agents — so having expert representation often costs you nothing directly.",
      "## What to Look for in a Realtor\n\nNot all realtors are created equal. Here's what matters:\n\n- **Local knowledge:** Do they know the neighborhoods you're interested in? Can they tell you about upcoming developments, school catchments, and neighborhood dynamics?\n- **Communication style:** How responsive are they? Do they explain things clearly?\n- **Market expertise:** Can they analyze data to help you make smart offers?\n- **Negotiation skills:** In Vancouver's market, a skilled negotiator can save you thousands\n- **Brokerage backing:** A strong brokerage provides resources, market data, and professional support",
      "## How I Work With Buyers\n\nMy approach is straightforward:\n\n1. **Discovery meeting:** We sit down (in person or virtual) to understand your needs, budget, timeline, and priorities\n2. **Market education:** I'll walk you through current market conditions in your target neighborhoods\n3. **Curated search:** Rather than flooding your inbox, I send you carefully selected properties that match your criteria\n4. **Viewings:** We tour properties together. I point out things you might miss — both good and concerning\n5. **Offer strategy:** When you find the one, I develop a competitive offer strategy based on market data\n6. **Negotiation:** I handle all negotiations to get you the best possible terms\n7. **Through to closing:** I coordinate inspections, appraisals, and paperwork through to completion day",
    ],
    insight: "As part of Oakwyn Realty — Vancouver's fastest-growing brokerage with $6.3B in sales — I have access to market data, a network of 900+ agents, and resources that independent agents simply can't match. You get personal attention with institutional backing.",
  },
  {
    slug: "house-hunting",
    step: 4,
    title: "House Hunting in Vancouver",
    shortTitle: "House Hunting",
    description: "How to search effectively, what to look for in Vancouver properties, and red flags to watch for.",
    content: [
      "## How Property Search Works\n\nIn Vancouver, the MLS (Multiple Listing Service) is the primary database of homes for sale. As your agent, I have full access to MLS and can set up automated alerts based on your exact criteria. You'll get notified the moment a property matching your needs hits the market — often before it appears on public websites.",
      "## Types of Properties in Vancouver\n\n- **Detached homes:** Single-family houses, typically the most expensive option. Oakridge and Kerrisdale have excellent inventory.\n- **Townhomes/Rowhomes:** Multi-level homes sharing walls with neighbors. Great middle ground for families wanting space without detached home prices.\n- **Condos:** Apartments in strata buildings. Popular in the Cambie Corridor and near SkyTrain stations. Pay attention to strata fees and building age.\n- **Half-duplexes:** A growing option in Vancouver. Two separate homes in one building, offering more space than condos at lower cost than detached.",
      "## What to Look for (Vancouver-Specific)\n\nVancouver has unique considerations:\n\n- **Building envelope:** Rain is a reality here. Look for updated roofs, proper drainage, and no signs of water damage. Buildings from the 1990s \"leaky condo\" era need extra scrutiny.\n- **Strata documents:** For condos/townhomes, review meeting minutes, depreciation reports, and financials carefully. I'll help you spot red flags.\n- **Natural light:** Vancouver's grey winters make south-facing units and large windows especially valuable.\n- **Transit proximity:** Properties near SkyTrain stations (like Oakridge-41st) have historically appreciated faster.\n- **Upcoming developments:** A new tower going up next door can impact your view and construction noise for years.",
      "## Open Houses vs. Private Showings\n\nBoth have value. Open houses let you casually explore, while private showings give us time to thoroughly inspect a property. I recommend a mix of both, and I always attend viewings with you to provide expert perspective on condition, value, and negotiation strategy.",
    ],
    insight: "One of the biggest mistakes I see buyers make is falling in love with staging rather than the property itself. I'll help you look past the furniture and focus on what matters: layout, natural light, condition, and location. A well-staged home can mask a lot of issues.",
  },
  {
    slug: "inspections-appraisals",
    step: 5,
    title: "Inspections, Subjects & Due Diligence",
    shortTitle: "Inspections",
    description: "Navigating the subject removal process, home inspections, and protecting yourself in BC.",
    content: [
      "## How Subjects Work in BC\n\nWhen you make an offer in BC, it typically includes 'subjects' — conditions that must be satisfied before the sale is final. Common subjects include:\n\n- **Subject to financing:** Your mortgage is formally approved\n- **Subject to inspection:** A professional inspection reveals no major issues\n- **Subject to strata documents:** Review of strata financials and minutes (for condos)\n- **Subject to title search:** Confirming clean title with no surprises\n\nYou typically have 5-10 business days to remove subjects. If any subject isn't satisfied, you can walk away with your deposit returned.",
      "## The Home Inspection\n\nA professional home inspection costs $400-$600 and is worth every penny. The inspector will examine:\n\n- Structural integrity (foundation, framing)\n- Roof condition and age\n- Electrical systems\n- Plumbing\n- HVAC systems\n- Moisture and water intrusion (critical in Vancouver)\n- Insulation and ventilation\n\nI attend every inspection with my clients. I'll help you understand what's a deal-breaker versus what's normal wear and tear.",
      "## Strata Document Review\n\nFor condos and townhomes, strata documents are essential reading. Key things I look for:\n\n- **Depreciation report:** Shows the building's condition and upcoming maintenance needs\n- **Meeting minutes:** Reveals ongoing issues, disputes, and planned assessments\n- **Financial statements:** Is the contingency fund healthy? Are fees likely to increase?\n- **Bylaws and rules:** Pet restrictions, rental restrictions, renovation rules\n- **Insurance:** Is the building adequately insured? What's the deductible?\n\nI've reviewed hundreds of strata packages and can quickly identify concerns that might take a first-time buyer days to spot.",
      "## The Appraisal\n\nIf you're getting a mortgage, your lender will order an appraisal to confirm the property's value matches (or exceeds) the purchase price. This protects both you and the lender from overpaying. If the appraisal comes in low, we have options — and I'll guide you through them.",
    ],
    insight: "In competitive markets, some buyers are tempted to remove subjects quickly or waive inspections entirely. I strongly advise against skipping inspections. The risk of hidden issues — especially in Vancouver's wet climate — far outweighs the competitive advantage. There are smarter ways to make your offer competitive.",
  },
  {
    slug: "closing-moving-in",
    step: 6,
    title: "Closing Day & Moving Into Your New Home",
    shortTitle: "Closing & Moving In",
    description: "The final steps: completion day, possession, Property Transfer Tax, and settling into your new home.",
    content: [
      "## Completion vs. Possession\n\nIn BC, there are two important dates:\n\n- **Completion date:** This is when the legal transfer happens and money changes hands. Your lawyer and the seller's lawyer handle this.\n- **Possession date:** Usually 1-2 days after completion. This is when you get the keys and can move in.\n\nThis gap exists to allow the lawyers to register the transfer of title and handle the financial adjustments.",
      "## What Happens on Completion Day\n\nYour lawyer will:\n1. Register the property transfer at the Land Title Office\n2. Pay the seller from your mortgage funds and down payment\n3. Pay the Property Transfer Tax (if applicable)\n4. Handle adjustments for property taxes, strata fees, etc.\n5. Provide you with a Statement of Adjustments showing all final costs\n\nYou don't need to be present — your lawyer handles everything.",
      "## Property Transfer Tax\n\nBC's Property Transfer Tax is:\n- 1% on the first $200,000\n- 2% on the portion between $200,000 and $2,000,000\n- 3% on the portion over $2,000,000\n- Plus a 2% foreign buyers tax (if applicable)\n\nFor a $900,000 home, that's $16,000. First-time buyers may be exempt on homes up to $835,000. I'll make sure we calculate this accurately for your budget.",
      "## Moving In: Your First Month\n\nCongratulations — you're a homeowner! Here's your first-month checklist:\n\n- Change the locks (always a good idea)\n- Set up utilities (BC Hydro, FortisBC, internet)\n- File your homeowner grant application (reduces property taxes)\n- Update your address (BC driver's license, banks, subscriptions)\n- Meet your neighbors\n- If it's a strata property, introduce yourself to the council\n\nAnd remember — I'm still here after closing. Have a question about your home, your neighborhood, or the market? I'm always just a call or text away.",
    ],
    insight: "Many of my buyers are surprised by how smooth closing day actually is. All the hard work happens in the weeks before. By the time completion day arrives, your lawyer handles everything and you simply wait for the call that the keys are ready. I'll be checking in to make sure everything goes perfectly.",
  },
];

export const sellingGuideSteps: GuideStep[] = [
  {
    slug: "deciding-to-sell",
    step: 1,
    title: "Deciding to Sell Your Vancouver Home",
    shortTitle: "Deciding to Sell",
    description: "Understanding your motivations, timing the market, and setting yourself up for a successful sale.",
    content: [
      "Selling your home is a significant decision with major financial and emotional implications. Taking time to understand your motivations and plan strategically will help you achieve the best possible outcome.",
      "## Why Do You Want to Sell?\n\nYour reason for selling shapes your entire strategy. Are you upsizing for a growing family? Downsizing after the kids have left? Relocating for work? Capitalizing on strong market conditions? Each scenario calls for a different approach and timeline.\n\nUnderstanding your 'why' helps me tailor a selling strategy that aligns with your goals — whether that's maximum price, quick sale, or a specific timeline.",
      "## When Should You Sell?\n\nVancouver's market has seasonal patterns. Historically, spring (March-May) sees the highest activity, with families wanting to move during summer. However, selling in quieter months can sometimes work to your advantage — less competition means more attention on your listing.\n\nWith the Oakridge Park redevelopment nearing completion and major infrastructure investments across Vancouver's south side, neighborhoods like Oakridge, Marpole, and South Cambie are seeing increased buyer interest. Timing your sale to coincide with development milestones can be strategic.",
      "## Financial Considerations\n\nBefore listing, understand the financial picture:\n\n- **Capital gains:** If this is not your principal residence, capital gains tax applies. Consult your accountant.\n- **Mortgage penalties:** If you're breaking your mortgage early, there may be penalties. Check with your lender.\n- **Selling costs:** Agent commissions, legal fees, potential staging costs, and any repairs needed.\n- **Net proceeds:** What will you actually walk away with? I'll provide a detailed net sheet so there are no surprises.",
    ],
    insight: "One of the most common questions I get is 'Should I buy first or sell first?' The answer depends on your financial situation and risk tolerance. In Vancouver's market, having a firm sale before buying gives you stronger negotiating power. I'll help you evaluate the best sequence for your situation.",
  },
  {
    slug: "pricing-your-home",
    step: 2,
    title: "Pricing Your Home Strategically",
    shortTitle: "Pricing Strategy",
    description: "How Comparative Market Analysis works, pricing strategies, and getting the best value for your Vancouver home.",
    content: [
      "## The Comparative Market Analysis (CMA)\n\nPricing is both an art and a science. I'll prepare a detailed CMA that analyzes:\n\n- Recent sales of comparable properties in your neighborhood\n- Currently listed properties (your competition)\n- Expired listings (homes that didn't sell — and why)\n- Market trends and days on market\n- Your home's unique features, upgrades, and condition\n\nThe goal is to find the sweet spot — a price that attracts serious buyers while maximizing your return.",
      "## Pricing Strategies\n\nThere are several approaches, and the right one depends on your goals:\n\n- **Market value pricing:** Listing at fair market value based on comparable sales. This is the most common and reliable approach.\n- **Strategic underpricing:** Listing slightly below market value to generate multiple offers. This can work in hot markets but carries risk.\n- **Aspirational pricing:** Listing above market value to 'test the waters.' This can work for unique properties but often leads to longer days on market.\n\nI'll recommend a strategy based on your specific property, neighborhood, and current market conditions.",
      "## What Affects Your Home's Value\n\nIn Vancouver, key value drivers include:\n\n- **Location:** Proximity to SkyTrain, schools, parks (Queen Elizabeth Park adds significant value)\n- **Lot size and zoning:** Development potential can add significant value\n- **Condition and updates:** Modern kitchens, bathrooms, and systems command premiums\n- **View:** Mountain, water, or city views are highly valued\n- **Building age and maintenance:** For condos, the building's condition matters as much as the unit\n- **Upcoming developments:** The Oakridge Park redevelopment is positively impacting values in surrounding neighborhoods",
    ],
    insight: "Overpricing is the most common mistake sellers make. A home that sits on the market too long develops a stigma — buyers wonder 'what's wrong with it?' I'd rather price it right from day one and create urgency than chase the market down with price reductions.",
  },
  {
    slug: "preparing-to-sell",
    step: 3,
    title: "Preparing Your Home for Sale",
    shortTitle: "Prepare to Sell",
    description: "Staging, repairs, photography, and making your home irresistible to Vancouver buyers.",
    content: [
      "## First Impressions Matter\n\nBuyers form an opinion within the first 30 seconds of walking through a door — and often before that, from photos online. Preparing your home properly can add thousands to your final sale price and significantly reduce time on market.",
      "## Declutter and Depersonalize\n\nThis is free and has the biggest impact. Remove personal photos, collections, and excess furniture. Buyers need to envision THEIR life in the space, not yours. Pack away anything that doesn't contribute to a clean, spacious feel.\n\nFor each room, ask: does this furniture make the room feel bigger or smaller? Keep what enhances the space, store what doesn't.",
      "## Repairs and Updates\n\nNot every repair has equal ROI. Focus on:\n\n- **High impact:** Fresh paint (neutral colors), clean carpets, functioning fixtures, clean grout\n- **Worth considering:** Updated light fixtures, new cabinet hardware, pressure-washed exterior\n- **Usually not worth it before selling:** Major renovations like kitchen or bathroom overhauls (you rarely recoup the full cost)\n\nI'll walk through your home and give you a prioritized list of improvements with the best return on investment.",
      "## Professional Photography and Marketing\n\nIn today's market, your listing photos ARE your first showing. I ensure every listing includes:\n\n- Professional photography with proper lighting and wide-angle lenses\n- Virtual tour / 3D walkthrough\n- Compelling listing description highlighting your home's best features\n- Targeted digital marketing to reach qualified buyers\n- MLS listing syndicated to major real estate websites",
    ],
    insight: "I've seen homes sell for $20,000-$50,000 more just because of good preparation and staging. It's the best investment you can make before listing. I'll provide specific, actionable recommendations for your home — not generic advice, but a customized plan based on your property and your target buyer.",
  },
  {
    slug: "accepting-offers",
    step: 4,
    title: "Reviewing & Accepting Offers",
    shortTitle: "Accepting Offers",
    description: "Understanding offer structure, negotiation strategies, and managing multiple offers in Vancouver.",
    content: [
      "## Anatomy of an Offer\n\nEvery offer in BC includes:\n\n- **Price:** The offered purchase price\n- **Deposit:** Shows buyer commitment (typically 5% within 24 hours of acceptance)\n- **Subjects:** Conditions (financing, inspection, strata docs) and deadlines\n- **Completion date:** When the legal transfer happens\n- **Possession date:** When the buyer takes the keys\n- **Inclusions/exclusions:** What stays and what goes (appliances, fixtures, etc.)\n\nI'll analyze every aspect of each offer — not just the price. A slightly lower offer with fewer subjects and a better timeline might actually be the stronger choice.",
      "## Multiple Offers\n\nIn a competitive market, you may receive multiple offers. Here's how I manage this:\n\n1. Set a clear offer deadline to create fair competition\n2. Review each offer's complete package (price, subjects, timeline, financing strength)\n3. We may counter one offer or ask all parties for their 'best and final'\n4. I'll advise you on the strongest overall offer — which isn't always the highest price\n\nTransparency and professionalism in multiple offer situations protects you and maintains your reputation in the market.",
      "## Negotiation Strategy\n\nNegotiation is where my value as your agent becomes most tangible. I'll:\n\n- Counter strategically based on market data and buyer motivation\n- Protect your interests on subjects, timelines, and terms\n- Keep emotions out of the process (this is business, even though it's personal)\n- Know when to push and when to compromise\n- Ensure everything is documented properly to protect you legally",
    ],
    insight: "The highest offer isn't always the best offer. I had a client receive three offers — the highest was $15,000 more but had financing subjects that were risky. We went with the second-highest offer, which was subject-free with a clean close. It saved my client weeks of uncertainty and risk.",
  },
  {
    slug: "inspections-appraisals-seller",
    step: 5,
    title: "Managing Inspections & Subject Removal",
    shortTitle: "Inspections",
    description: "What to expect during the buyer's due diligence period and how to navigate inspection results.",
    content: [
      "## The Subject Removal Period\n\nOnce you accept an offer with subjects, the buyer typically has 5-10 business days to complete their due diligence. During this time, expect:\n\n- A home inspection (you'll need to provide access)\n- Possible strata document requests (for condos/townhomes)\n- The buyer's lender ordering an appraisal\n- Potential follow-up questions or requests\n\nThis is a sensitive period. The deal isn't done until subjects are removed.",
      "## Handling Inspection Results\n\nInspectors will find something — they always do. The question is how significant the findings are. Common scenarios:\n\n- **Minor items:** Most buyers accept these as normal. No action needed.\n- **Moderate repairs:** The buyer may ask for a credit or price reduction. I'll advise you on what's reasonable.\n- **Major issues:** Foundation problems, major water damage, or electrical issues can potentially kill a deal. This is why pre-listing inspections can be strategic.\n\nI'll help you evaluate any repair requests and negotiate fair solutions that keep the deal together.",
      "## Pre-Listing Inspection: A Strategic Move\n\nConsider getting your own inspection before listing. Benefits:\n\n- No surprises during the subject period\n- Fix issues on your own terms and timeline\n- Provide the report to buyers to build confidence\n- Potentially justify a subject-free offer from buyers\n\nThe $400-$600 cost often pays for itself many times over in smoother negotiations and faster closings.",
    ],
    insight: "I always prepare my sellers for the inspection period by walking through the home beforehand and identifying anything an inspector might flag. This way, we can address things proactively or prepare responses. No surprises means smoother negotiations.",
  },
  {
    slug: "closing-seller",
    step: 6,
    title: "Closing the Sale & Moving Forward",
    shortTitle: "Closing",
    description: "The final steps from subject removal to completion day, and planning your next chapter.",
    content: [
      "## Subject Removal\n\nWhen the buyer removes all subjects, you have a firm deal. At this point:\n\n- The buyer's deposit is delivered to the listing brokerage's trust account\n- Both lawyers begin preparing for completion\n- You can confidently plan your move and next steps\n\nUntil subjects are removed, I recommend having a backup plan and not making commitments based on a conditional sale.",
      "## Completion Day\n\nYour lawyer handles the closing logistics:\n\n1. The buyer's lawyer sends the funds\n2. Your lawyer confirms receipt and registers the title transfer\n3. The mortgage is paid out (if applicable)\n4. Adjustments are made for property taxes, strata fees, etc.\n5. Net proceeds are deposited to your account\n6. You provide vacant possession on the possession date\n\nI'll coordinate with all parties to ensure everything goes smoothly.",
      "## Preparing for Your Move\n\nIn the weeks between subject removal and possession:\n\n- Book movers early (especially at month-end, which is peak moving time in Vancouver)\n- Start packing non-essentials\n- Arrange utility disconnections for the possession date\n- Do a final deep clean (or hire professional cleaners — it's worth it)\n- Complete any agreed-upon repairs from the inspection\n- Leave all keys, garage remotes, and manuals for the new owners",
      "## What's Next?\n\nWhether you're buying your next home, downsizing, or relocating, I'm here to help with the next chapter too. Many of my clients work with me on both sides of the transaction.\n\nAnd even after the sale is complete, I'm always available for questions about the market, referrals to trusted contractors, or just to catch up. My goal is to be your realtor for life.",
    ],
    insight: "The period between subject removal and completion is usually 3-6 weeks. I use this time to keep you updated on any developments, coordinate final details, and make sure the transition is as smooth as possible. My job doesn't end when the subjects are removed — it ends when you're happily settled.",
  },
];
