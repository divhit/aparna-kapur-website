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
    slug: "the-big-decision",
    step: 1,
    title: "The Big Decision",
    shortTitle: "The Big Decision",
    description:
      "Clarifying your motivations, understanding your income potential, and making sure you are ready.",
    content: [
      "Purchasing a home is a significant financial decision. I aim to guide you through the process with clarity and detail.\n\nI am here to walk with you from the moment you start tinkering with the idea to the day you hold the key to your new future.",
      "## Clarify Your Reasons for Buying\n\nBefore diving into listings, take a moment to think about what is driving your decision.\n\nIs it space? School? Shorter commute? Proximity to family? Multi-generational living? The nagging need to start building equity?\n\nUnderstanding your motivations will sharpen the search criteria and help find the right home faster.",
      "## Leveraging Your Growing Income\n\nReal estate is one of the most reliable vehicles for building long-term wealth. Whether you are purchasing your dream home, adding a rental property to your portfolio, or expanding your investments, property ownership is a tangible path to equity growth.",
    ],
    insight:
      "I always start with a real conversation about what home means to you. Not what you think you should be looking for — what actually matters in your life right now and in the next five to ten years. That clarity changes everything.",
  },
  {
    slug: "financial-preparation",
    step: 2,
    title: "Financial Preparation",
    shortTitle: "Financial Prep",
    description:
      "Credit score, keeping finances steady, and assembling the documents you need before you start looking.",
    content: [
      "## Knowing Your Credit Score\n\nYour credit score plays a major role in determining your mortgage rate and how much you can borrow. I recommend connecting with a trusted mortgage broker early in the process. They will review your credit report and help clarify your borrowing power, and also identify any issues that need to be addressed.\n\nI work with several excellent mortgage professionals in Greater Vancouver and am happy to make a referral.",
      "## Keeping Your Finances Steady\n\nThe period leading up to and during your home purchase is not the ideal time for major financial changes. Avoid switching jobs, making large discretionary purchases, or taking on new debt.\n\nLenders want to see stability, and any sudden changes could affect your pre-approval or final mortgage terms.",
      "## Assembling Your Financial Documents\n\nBefore you begin looking at properties make sure to have your financial paperwork organized. Lenders require a comprehensive look at your finances, so gathering the documents early will give you strength and confidence as you start to explore:\n\n- **Recent pay stubs** and employment verification\n- **Two years of Notices of Assessment** in Canada\n- **Bank and investment account statements**\n- **Details of existing debts** including credit cards, auto loans, and lines of credit\n- **Copies of current lease agreements** if you own rental properties\n- **RRSP, TFSA, and other registered account statements**",
    ],
    insight:
      "I always tell my clients to talk to a mortgage broker before they start browsing listings. Knowing your exact borrowing power takes the guesswork out of the process and lets us focus only on homes that are genuinely within reach.",
  },
  {
    slug: "choosing-your-agent",
    step: 3,
    title: "Choosing the Right Real Estate Professional",
    shortTitle: "Choose Your Agent",
    description:
      "What to look for in a realtor, the questions you should be asking, and why the right fit matters.",
    content: [
      "Navigating a real estate transaction involves complex decisions, significant paperwork, and high-stakes negotiations. Having the right agent in your corner makes a meaningful difference. Here are some qualities to look for:",
      "- **Seek a full-time agent** with relevant transaction experience in your target market.\n- **Deep familiarity** with the neighbourhoods you are considering.\n- **Ask them about their availability** — are they able to work the times when you are available? Are they available weekends and evenings if that is your preference?\n- **A commitment to ongoing professional education** in the field. Things change fast in this market — you want someone who is on top of it and constantly upgrading.\n- **How long do they take to answer a text?** Call you back after a missed call? Are you comfortable with their responsiveness?\n- **Ask questions about their reach** to markets beyond what is available on MLS.\n- **Ask questions about negotiating** in different market conditions. What have they found to work for them?",
      "A lot can happen between the draft of the first contract and the final push that closes the transaction — what systems are in place to make sure that you are protected through this process?\n\nFinally, look for someone you can relate to, someone who asks the right questions and gets you thinking critically and effectively about your buying needs.",
    ],
    insight:
      "I am always available to my clients. If you text me, I will get back to you quickly. If you call and I miss it, I will call you back the same day. That responsiveness is not just good service — it is how deals get done in Vancouver's market.",
  },
  {
    slug: "finding-your-home",
    step: 4,
    title: "Finding Your Home",
    shortTitle: "Finding Your Home",
    description:
      "Choosing a neighbourhood, shortlisting properties, writing a strong offer, and understanding the binding contract.",
    content: [
      "## Choosing a Neighbourhood\n\nSpend time exploring different areas. Driving or walking the neighbourhoods at different times of the day is an excellent idea. Pay close attention to the feel of the community and if you can see yourself living there. Then dive deeper into the transit, walk score, school, parks and medical amenities that support the neighbourhood.",
      "## Shortlisting Properties\n\nAfter narrowing your preferred areas, you and your agent should select some properties that align with your needs and arrange private viewings. You should also be paying close attention to long-term resale potential, which your agent should be able to help you with.",
      "## Offer\n\nWriting a compelling offer that can be accepted by the seller while also protecting your interests is a craft and your agent must be able to help you with this. You have to be aware of all the pros and cons that you are entering into with this purchase and a well-constructed offer is about much more than just the price point — it is about strategy.",
      "## Binding Contract\n\nOnce the offer is accepted, a binding contract is entered between buyer and the seller. A few important things to keep in mind during this stage:\n\n- **Written records of everything.** You and your agent should ensure all documentation is prepared and organized on your behalf.\n- **Sticking to timelines.** The contract will have key dates for subjects, financing, and closing. Meeting each deadline keeps the deal on track and protects your legal position.\n- **Your agent should keep you informed** at every stage so you always know what is coming next.",
      "## Your Right to Reconsider\n\nIn BC, residential buyers now have a right to cancel an accepted offer within 3 business days of the contract becoming binding. This rescission period applies to most residential real estate transactions. It was introduced to protect buyers from making rushed decisions in a competitive market.\n\nA rescission fee of 0.25% of the purchase price is payable to the seller. So on a $1M purchase, the fee would be $2,500.",
    ],
    insight:
      "I tell my clients to visit a neighbourhood at least three times — morning, afternoon, and evening — before committing. A street that feels quiet at noon can be a traffic corridor at 5pm. I know these areas well and will share the things you would not notice on a single visit.",
  },
  {
    slug: "due-diligence",
    step: 5,
    title: "Due Diligence & Protecting Your Investment",
    shortTitle: "Due Diligence",
    description:
      "Inspections, appraisals, cooperatives, insurance, ownership structure, and tax obligations you need to know about.",
    content: [
      "## Notary or Lawyer\n\nA notary or lawyer will act as your closing agent. They hold the deposit in trust, conduct a title search to confirm the property is free of encumbrances, and ensure everything is in order for the transfer. Some properties may be subject to easements, covenants, or building restrictions that affect how you can use the land. As your agent I would have already made you well aware of these but it is valuable to clear this again with your notary.",
      "## Ownership Structure\n\nHow you hold title to your property has important legal and tax implications, especially when selling, estate planning, or adding a co-owner. I always recommend consulting with a lawyer or tax advisor to determine the best ownership structure for your goals.",
      "## Property Inspections\n\nAfter offer acceptance, one typically has a window to arrange a professional home inspection. Your agent should be there — it is your opportunity to get to know the property deeply. If you have any pointed concerns it is advisable to bring in specialists for those areas.\n\nBased on the inspection results, one of three outcomes typically follows:\n\n1. You proceed with the purchase as agreed.\n2. Your agent renegotiates the terms — it may be on price, repairs, or a credit from the seller.\n3. You choose to walk away from the deal if the findings are beyond your comfort.",
      "## Appraisal and Financing\n\nIf your purchase is conditional on financing, the lender would arrange for an independent appraisal to confirm the property's value. The appraiser determines the current market value by researching comparable homes, sometimes conducting site visits, documenting property features, and comparing them against similar properties.\n\nStay in close contact with your mortgage broker during this stage, as they may need additional documents to finalize your approval. I recommend checking in with your lender approximately two weeks before closing.",
      "## Cooperatives\n\nWhen your purchase requires coop approval, obtain the governing documents from the seller immediately after signing. Make sure you submit your application and fees promptly, ensuring everything is complete and timely. If an interview is needed, book it right away. The Notary will require the original approval letter before closing.",
      "## Protecting Your Investment with Insurance\n\nThe lender requires you to have property insurance in place before closing:\n\n- **Shop around.** Premiums can vary significantly between providers.\n- **Consider a higher deductible** to lower your annual premium.\n- **Ask about discounts** for security features such as alarm systems, deadbolts, and smoke detectors.\n- **Insure the structure, not the land.** The land will still be there after a disaster — over-insuring inflates your premium unnecessarily.\n\nI can recommend experienced insurance brokers who specialize in residential properties across Greater Vancouver.",
      "## Ongoing Tax Obligations\n\nAside from Property Transfer Tax paid at closing, BC has tax measures aimed at improving housing availability that may apply to you as a property owner. Understanding these early avoids surprises down the road.\n\n**Speculation and Vacancy Tax** applies to residential property owners in Metro Vancouver, the Capital Regional District, Kelowna, West Kelowna, Nanaimo, Lantzville, and several Fraser Valley communities. All owners in these regions must complete an annual declaration, even if exempt. The tax rate is 0.5% of assessed value for Canadian citizens and permanent residents who are BC residents, and 2.0% for foreign owners and satellite families.\n\nIn the City of Vancouver, the municipal **Empty Homes Tax** is another declaration. This tax applies to properties that are unoccupied for more than six months in a calendar year at a rate of 5% of assessed value. Property owners must submit an annual status declaration to the City. Exemptions may apply in certain circumstances such as major renovation, medical care, or a legal proceeding that prevents occupancy.\n\nIf you are purchasing a property as a second home or investment, I strongly recommend speaking with a tax advisor. Planning ahead ensures there are no surprises.",
    ],
    insight:
      "I attend every inspection with my clients. It is your chance to understand what you are buying at a level that goes beyond the listing sheet. I also walk through tax obligations with every buyer so there are never surprises after closing.",
  },
  {
    slug: "closing-day",
    step: 6,
    title: "Closing Day",
    shortTitle: "Closing Day",
    description:
      "The final walk-through, setting up services, handling the unexpected, and the moment you get the keys.",
    content: [
      "## The Final Walk-Through\n\nThe day before closing, or the morning of, you will visit the property one last time. This is your chance to confirm the home is in the condition you expect, all agreed-upon repairs have been completed, no personal items have been left behind, and all included fixtures and appliances are present.",
      "## Setting Up Home Services\n\nJust before closing, I will give you a checklist for transferring or setting up utilities and home services including hydro, gas, water, internet, and home security. If we can get these arranged ahead of time that will mean you can settle in comfortably from day one.",
      "## The Unexpected\n\nEven at this late stage, minor issues can arise — a last-minute repair, a document that needs re-signing, or a scheduling change. I will ensure any hiccups are resolved quickly and smoothly.",
      "## The Closing\n\nAt closing, the notary or lawyer will present a settlement statement summarizing all financial details of the transaction. You and the seller will sign the necessary documents, and if you are financing, you will execute the mortgage paperwork. The seller will hand over the keys and any important property information at this time.\n\nCongratulations — you are home.",
    ],
    insight:
      "Most of my clients are surprised by how smooth closing day is when everything has been done right along the way. That is the goal — by the time you get the keys, the hard work is behind you and you can focus on what matters: settling into your new life.",
  },
];

export const sellingGuideSteps: GuideStep[] = [
  {
    slug: "deciding-to-sell",
    step: 1,
    title: "The Decision to Sell",
    shortTitle: "The Decision",
    description:
      "Understanding what is driving your decision, the financial picture, and how timing affects your outcome.",
    content: [
      "Selling your home is one of the most significant financial decisions you will make. I am here to guide you through every stage — from the first conversation about whether now is the right time, to the moment the sale closes and you move forward with confidence.",
      "## Clarify Your Reasons for Selling\n\nBefore we talk strategy, let us talk about why. Are you upsizing for a growing family? Downsizing now that the kids have moved on? Relocating for work or lifestyle? Looking to unlock the equity you have built?\n\nYour reason for selling shapes every decision that follows — pricing, timing, preparation, and how aggressively we market the property. When I understand your motivation, I can build a plan that is designed around your specific goals.",
      "## Financial Considerations\n\nBefore we list, I want you to have a clear picture of what you will walk away with. That means understanding:\n\n- **Capital gains:** If this is not your principal residence, capital gains tax applies. Consult your accountant before we proceed.\n- **Mortgage penalties:** If you are breaking your mortgage early, there may be penalties. Check with your lender so there are no surprises.\n- **Selling costs:** Agent commissions, legal fees, potential staging costs, and any pre-sale repairs.\n- **Net proceeds:** I will prepare a detailed net sheet so you know exactly what to expect after all costs are accounted for.",
      "## Timing Your Sale\n\nVancouver's market has seasonal rhythms. Spring typically brings the highest buyer activity, with families wanting to settle before the school year. But selling in quieter months can work to your advantage — less competition means your property stands out more.\n\nBeyond seasonality, neighbourhood-level developments matter. With the Oakridge Park redevelopment nearing completion and continued investment across Vancouver's south side, buyer interest in areas like Oakridge, Marpole, and South Cambie is strong. I will help you time your sale to take advantage of what is happening in your specific market.",
    ],
    insight:
      "One of the most common questions I get is whether to buy first or sell first. The answer depends on your financial situation and risk tolerance. In most cases I recommend selling first — it gives you negotiating power and removes the pressure of carrying two properties.",
  },
  {
    slug: "pricing-strategy",
    step: 2,
    title: "Pricing Your Home Strategically",
    shortTitle: "Pricing Strategy",
    description:
      "How I determine the right price, the strategies available to you, and why getting it right from day one matters.",
    content: [
      "## The Comparative Market Analysis\n\nPricing a home is a craft. I prepare a thorough analysis that examines:\n\n- **Recent sales** of comparable properties in your neighbourhood\n- **Currently listed properties** — your direct competition\n- **Expired listings** — homes that did not sell, and what went wrong\n- **Market trends** and average days on market\n- **Your home's unique features,** upgrades, condition, and location\n\nThe goal is to arrive at a price that creates buyer interest while maximizing your return. I do not guess. I use data.",
      "## Pricing Strategies\n\nThere are several approaches and the right one depends on your goals and market conditions:\n\n- **Market value pricing:** Listing at fair market value based on comparable sales. Reliable, data-driven, and the approach I use most often.\n- **Strategic underpricing:** Listing slightly below market value to generate competition and multiple offers. This works in strong markets but needs to be executed carefully.\n- **Aspirational pricing:** Listing above market value to test demand. This can work for truly unique properties, but in most cases it leads to longer days on market and eventual price reductions.\n\nI will recommend a strategy based on your property, your neighbourhood, and what the data is telling us right now.",
      "## What Drives Value in Vancouver\n\nBuyers in this market are paying close attention to:\n\n- **Transit proximity** — homes near SkyTrain stations consistently outperform\n- **School catchments** — top-rated schools directly impact demand\n- **Lot size and zoning** — development potential adds significant value\n- **Condition and updates** — modern kitchens, bathrooms, and systems command premiums\n- **Views** — mountain, water, or city views are always in demand\n- **Upcoming developments** — the Oakridge Park redevelopment is raising values across surrounding neighbourhoods\n\nI will walk through what specifically drives value for your property and how we can position it effectively.",
    ],
    insight:
      "Overpricing is the most common mistake sellers make. A home that sits on the market develops a stigma — buyers start wondering what is wrong with it. I would rather price it right from day one, create urgency, and let the market compete for your property.",
  },
  {
    slug: "preparing-your-home",
    step: 3,
    title: "Preparing Your Home for Sale",
    shortTitle: "Prepare Your Home",
    description:
      "What to fix, what to leave alone, how to present the property, and getting the details right before we go to market.",
    content: [
      "## First Impressions Are Everything\n\nBuyers form their opinion fast — often within seconds of walking through the front door, and before that from the photos they see online. How your home is presented directly affects how much you sell for and how quickly it sells.",
      "## Declutter and Depersonalize\n\nThis costs nothing and has the biggest impact. Remove personal photos, collections, excess furniture, and anything that does not contribute to a clean, spacious feel. Buyers need to see themselves living in the space — not you.\n\nFor each room, ask: does this make the room feel bigger or smaller? Keep what enhances the space. Store the rest.",
      "## Repairs That Matter\n\nNot every repair is worth doing before a sale. I will walk through your home and give you a prioritized list based on return on investment:\n\n- **High impact:** Fresh paint in neutral tones, clean carpets, functioning fixtures, clean grout, tidy landscaping\n- **Worth considering:** Updated light fixtures, new cabinet hardware, pressure-washed exterior, polished hardwood floors\n- **Usually not worth it:** Major kitchen or bathroom renovations before selling. You rarely recoup the full cost. Better to price accordingly and let the buyer customize.",
      "## Professional Photography and Marketing\n\nYour listing photos are your first showing. I make sure every listing includes:\n\n- **Professional photography** with proper lighting and angles\n- **Virtual tour** so buyers can explore the property remotely\n- **A compelling listing description** that highlights what makes your home stand out\n- **Targeted marketing** to reach qualified buyers where they are looking\n- **Full MLS exposure** syndicated across all major real estate platforms\n\nI do not cut corners on marketing. Your home deserves to be seen in its best light by the right audience.",
    ],
    insight:
      "I have seen homes sell for significantly more simply because the preparation was done right. A weekend of decluttering and a few hundred dollars in touch-up paint can translate into tens of thousands at the offer table. I will give you a specific, actionable plan for your property — not generic advice.",
  },
  {
    slug: "offers-and-negotiation",
    step: 4,
    title: "Offers & Negotiation",
    shortTitle: "Offers & Negotiation",
    description:
      "Understanding what makes a strong offer, managing multiple bids, and how I negotiate to protect your interests.",
    content: [
      "## What an Offer Includes\n\nEvery offer in BC contains several components beyond just the price:\n\n- **Price:** The offered purchase price\n- **Deposit:** Demonstrates buyer commitment, typically 5% within 24 hours of acceptance\n- **Subjects:** Conditions such as financing, inspection, and strata document review, each with deadlines\n- **Completion date:** When the legal transfer of ownership happens\n- **Possession date:** When the buyer gets the keys\n- **Inclusions and exclusions:** What stays and what goes\n\nI analyze every element of each offer — not just the number at the top. A slightly lower offer with fewer conditions and a cleaner timeline can be the stronger choice.",
      "## Managing Multiple Offers\n\nIn a competitive market, multiple offers are common. Here is how I handle them:\n\n1. Set a clear offer deadline to create fair, structured competition\n2. Review each offer as a complete package — price, subjects, timeline, financing strength\n3. We may counter one offer or invite all parties to submit their best and final\n4. I advise you on the strongest overall offer, which is not always the highest price\n\nTransparency and professionalism in multiple offer situations protect you and maintain trust with the buying community.",
      "## Negotiation\n\nThis is where the right agent makes a measurable difference. I will:\n\n- Counter strategically based on market data and what I know about buyer motivation\n- Protect your interests on subjects, timelines, and terms\n- Keep emotions out of the process — this is business, even when it feels personal\n- Know when to push and when a compromise serves you better\n- Ensure every agreement is documented properly to protect you legally\n\nA well-constructed offer is about much more than just the price point — it is about strategy.",
    ],
    insight:
      "The highest offer is not always the best offer. I once had a client receive three offers — the highest was significantly more but had financing conditions that carried real risk. We went with the second offer, which was subject-free with a clean close. It saved my client weeks of uncertainty.",
  },
  {
    slug: "inspections-and-subject-removal",
    step: 5,
    title: "Inspections & Subject Removal",
    shortTitle: "Inspections",
    description:
      "What to expect during the buyer's due diligence, handling inspection results, and the pre-listing inspection advantage.",
    content: [
      "## The Subject Removal Period\n\nOnce you accept an offer with subjects, the buyer typically has 5 to 10 business days to complete their due diligence. During this time, expect:\n\n- A professional home inspection — you will need to provide access\n- Possible strata document requests for condos and townhomes\n- The buyer's lender ordering an independent appraisal\n- Potential follow-up questions or requests from the buyer's side\n\nThe deal is not done until subjects are removed. I keep you informed at every stage so you always know exactly where things stand.",
      "## Handling Inspection Results\n\nInspectors will find something — they always do. The question is how significant the findings are:\n\n1. **Minor items:** Most buyers accept these as normal. No renegotiation needed.\n2. **Moderate repairs:** The buyer may request a credit, price adjustment, or specific repairs. I will advise you on what is reasonable and negotiate fairly.\n3. **Major issues:** Foundation problems, significant water damage, or serious electrical concerns can threaten a deal. This is exactly why a pre-listing inspection can be so valuable.",
      "## The Pre-Listing Inspection Advantage\n\nConsider getting your own inspection before we go to market. The benefits are real:\n\n- **No surprises** during the buyer's due diligence\n- **Fix issues on your terms** and your timeline, often at lower cost\n- **Build buyer confidence** by providing a recent inspection report upfront\n- **Strengthen your negotiating position** — informed sellers are harder to push around\n\nThe cost is typically $400 to $600 and it often pays for itself many times over in smoother negotiations and faster closings.",
      "## The Rescission Period\n\nRemember that in BC, buyers have a 3-business-day rescission period after an accepted offer becomes binding. The rescission fee is 0.25% of the purchase price. As your agent, I factor this into our strategy and timeline so you are never caught off guard.",
    ],
    insight:
      "I prepare my sellers before the inspection by walking through the home and identifying anything an inspector is likely to flag. We address what we can proactively and prepare responses for the rest. No surprises means smoother negotiations.",
  },
  {
    slug: "closing-the-sale",
    step: 6,
    title: "Closing the Sale & Moving Forward",
    shortTitle: "Closing",
    description:
      "From subject removal to completion day, handing over the keys, and planning your next chapter.",
    content: [
      "## Subject Removal\n\nWhen the buyer removes all subjects, you have a firm deal. At this point:\n\n- The buyer's deposit is delivered to the listing brokerage's trust account\n- Both lawyers begin preparing for completion\n- You can confidently plan your move and next steps\n\nUntil subjects are removed, I recommend keeping a backup plan in place and not making commitments based on a conditional sale.",
      "## Completion Day\n\nYour notary or lawyer handles the closing logistics:\n\n1. The buyer's lawyer sends the purchase funds\n2. Your lawyer confirms receipt and registers the title transfer\n3. The mortgage is paid out if applicable\n4. Adjustments are made for property taxes, strata fees, and other costs\n5. Net proceeds are deposited to your account\n6. You provide vacant possession on the agreed possession date\n\nI coordinate with all parties to ensure everything proceeds smoothly and on schedule.",
      "## Preparing for Your Move\n\nIn the weeks between subject removal and possession:\n\n- Book movers early — especially at month-end, which is peak moving time in Vancouver\n- Start packing non-essentials\n- Arrange utility disconnections for the possession date\n- Complete a thorough clean or hire professional cleaners\n- Finish any agreed-upon repairs from the inspection\n- Leave all keys, garage remotes, and manuals for the new owners",
      "## What Comes Next\n\nWhether you are buying your next home, downsizing, relocating, or investing the proceeds — I am here for the next chapter too. Many of my clients work with me on both sides of the transaction.\n\nAnd even after the sale is complete, I am always available. A question about the market, a referral to a trusted contractor, or just a conversation about what is happening in your old neighbourhood. My goal is to be your realtor for life.\n\nCongratulations — on to what is next.",
    ],
    insight:
      "The period between subject removal and completion is usually three to six weeks. I use that time to keep you updated, coordinate every last detail, and make sure the transition is seamless. My job does not end when subjects are removed — it ends when you are settled and confident in what comes next.",
  },
];
