# Facebook Lead Generation Playbook — Aparna Kapur Real Estate

## How This Playbook Works

This is a step-by-step guide. Follow it in order. Every section builds on the previous one. By the end, you'll have a fully functioning Facebook ad system that generates buyer and seller leads on autopilot.

**What you'll need before starting:**

- A personal Facebook account
- A Facebook Business Page for Aparna Kapur Real Estate (if you don't have one, Step 1 covers creating it)
- A credit card for ad spending
- Your website: aparnakapur.com
- About 2-3 hours for initial setup, then 30 minutes/week to manage

---

# Part 1: Understanding the System

## What Is a Lead Magnet?

A lead magnet is something valuable you give away for FREE in exchange for someone's contact information (name, email, phone number). The key word is **valuable** — it has to be something the person actually wants.

**Why it works:** People don't give their phone number to strangers. But they WILL give it to someone who's offering them something they want — like a free list of homes in their price range, or a free home valuation.

**Your lead magnets (already built into your landing pages):**

| Lead Magnet                 | What You're Offering                                       | Who Wants It                      | Landing Page             |
| --------------------------- | ---------------------------------------------------------- | --------------------------------- | ------------------------ |
| Free Home Valuation         | "I'll tell you what your home is worth — free, no strings" | Homeowners thinking about selling | /lp/home-value           |
| Equity Report               | "Find out how much equity you've built"                    | Long-term homeowners              | /lp/equity               |
| Curated Listing List        | "I'll send you the best condos under $750K"                | First-time buyers                 | /lp/condos-under-750k    |
| East Side Homes List        | "Get the full list of East Side homes under $1.5M"         | Families looking for value        | /lp/east-side-under-1-5m |
| Duplex Opportunity List     | "I'll send you duplexes with rental income potential"      | Income-property buyers            | /lp/duplexes-under-1-7m  |
| Homes Under $2.2M List      | "The complete list with my top picks"                      | Move-up buyers                    | /lp/homes-under-2-2m     |
| New Listings Alert          | "See new listings before everyone else"                    | Active buyers                     | /lp/new-listings         |
| Investment Opportunity List | "Below-market deals with my analysis"                      | Investors                         | /lp/investment           |
| Neighbourhood Expert List   | "I'm the [Area] specialist — get my picks"                 | Area-specific buyers              | /lp/oakridge, etc.       |

## What Is a Funnel?

A funnel is the path someone takes from "I've never heard of you" to "I want to work with you." Think of it like a real funnel — wide at the top, narrow at the bottom.

```
        Facebook Ad (thousands of people see it)
                    |
                    v
         Landing Page (hundreds click through)
                    |
                    v
          Lead Form (dozens fill it out)
                    |
                    v
         Your Follow-Up Call (you talk to them)
                    |
                    v
           Client (they list/buy with you)
```

**Your funnel is already built.** The landing pages at aparnakapur.com/lp/\* ARE the funnel. The only thing missing is the top of the funnel — the Facebook ad that sends people to those pages. That's what we're setting up now.

## How Facebook Ads Work (The Basics)

Facebook lets you show ads to very specific groups of people. You can target:

- **Location:** Only people in Vancouver (or specific neighbourhoods)
- **Age:** Only people aged 30-55 (likely homebuyers)
- **Interests:** People who follow real estate pages, home renovation, etc.
- **Life events:** People who recently got married, had a baby, or got a new job (all triggers for home buying/selling)
- **Homeowner status:** Facebook knows if someone owns or rents

You set a daily budget (even $10/day works to start), and Facebook shows your ad to people matching your criteria. When they click, they go to your landing page. When they fill out the form, you get a lead.

**What it costs:** In Vancouver real estate, expect to pay $10-30 per lead. That means if you spend $20/day, you'll get roughly 1-2 leads per day, or 30-60 leads per month. One closed deal ($15,000-$30,000 commission) pays for an entire year of ads.

---

# Part 2: One-Time Setup (Do This Once)

## Step 1: Create Your Facebook Business Page

_Skip this if you already have a Facebook Business Page for your real estate business._

1. Go to facebook.com and log into your personal account
2. Click the **"+"** icon in the top-right, then **"Page"**
3. Fill in:
   - Page name: **Aparna Kapur | Vancouver Real Estate**
   - Category: Search for **"Real Estate Agent"**
   - Bio: "Helping buyers and sellers navigate Vancouver's most exciting neighbourhoods. Oakwyn Realty."
4. Add your profile photo (your professional headshot)
5. Add a cover photo (a beautiful Vancouver neighbourhood shot)
6. Click **Create Page**

## Step 2: Set Up Meta Business Suite

Meta Business Suite is where you'll manage your ads. It's free.

1. Go to **business.facebook.com**
2. Click **"Create Account"**
3. Enter your business name: **Aparna Kapur Real Estate**
4. Enter your name and business email (ak@aparnakapur.com)
5. Follow the prompts to connect your Facebook Page
6. Add your payment method (credit card) under **Business Settings > Payments**

## Step 3: Install the Facebook Pixel on Your Website

The Facebook Pixel is a tiny piece of code that goes on your website. It tracks who visits your landing pages so you can:

- Show ads to people who visited but didn't fill out the form (retargeting)
- Find new people similar to your leads (lookalike audiences)
- Measure which ads are actually generating leads

**How to install it:**

1. In Meta Business Suite, go to **Events Manager** (left sidebar)
2. Click **"Connect Data Sources"** > **"Web"** > **"Facebook Pixel"**
3. Name it: **Aparna Kapur Website**
4. Click **"Connect"**
5. You'll get a Pixel ID (a number like `123456789012345`)
6. **Send this Pixel ID to Divhit** — he'll add it to your website's Google Analytics setup. It takes 5 minutes.

_Alternatively, if you have access to your Vercel dashboard, you can add it as an environment variable: `NEXT_PUBLIC_FB_PIXEL_ID`_

## Step 4: Set Up Your Ad Account

1. In Meta Business Suite, go to **Ads Manager** (or go directly to adsmanager.facebook.com)
2. Click **"Create"** to start a new campaign (we'll set up the real one in Part 3, this is just to verify your ad account is active)
3. If prompted, set your:
   - Currency: **CAD**
   - Time zone: **Pacific Time**
   - Account name: **Aparna Kapur Real Estate**

---

# Part 3: Your First Campaign (Start Here)

Don't try to launch everything at once. Start with ONE campaign, learn how it works, then expand. Your first campaign should be the one with the highest chance of success.

## Your First Campaign: "What's Your Home Worth?"

**Why start here:** Seller leads are the highest-value leads in real estate. One listing can generate $15,000-$30,000+ in commission. The "What's your home worth?" hook is the most proven lead magnet in real estate — every homeowner is curious.

### Step-by-Step: Creating the Campaign

**Open Ads Manager** (adsmanager.facebook.com) and click **"Create"**

#### Screen 1: Campaign Objective

- Select **"Leads"** as your campaign objective
- Campaign name: **Sellers - Home Value**
- Click **Continue**

#### Screen 2: Ad Set (Who Sees Your Ad)

**Ad Set Name:** Sellers - Vancouver Homeowners

**Budget:**

- Select **"Daily Budget"**
- Set to **$15/day** to start (you can adjust later)
- Start date: Today
- End date: Leave blank (runs continuously)

**Audience:**

- **Location:** Vancouver, BC, Canada
  - Click "Browse" > type "Vancouver" > select "Vancouver, British Columbia, Canada"
  - Set radius to **25 km**
- **Age:** 35 to 65
- **Gender:** All

- **Detailed Targeting:** Click "Browse" and add these interests:
  - Real estate
  - Home improvement
  - Interior design
  - Zillow (yes, even in Canada — it indicates real estate interest)
  - Realtor.com
  - Home renovation
- **Narrow Audience Further:** Click "Narrow Audience" and add:
  - Homeowners (under Demographics > Home > Home Ownership > Homeowners)

_Note: Facebook's Special Ad Category rules for housing may limit some targeting options. If prompted, select "Housing" as your Special Ad Category — this is legally required for real estate ads in Canada._

**Placements:**

- Select **"Advantage+ Placements"** (let Facebook decide where to show your ad — it's smarter than manual selection)

#### Screen 3: Ad Creative (What People See)

**Ad Name:** Home Value - Curiosity Hook

**Format:** Single Image

**Media:** Upload a photo. Best options:

- A beautiful shot of a Vancouver neighbourhood (aerial view works great)
- OR your professional headshot with a warm, approachable expression
- Image size: 1080x1080 pixels (square) works best for mobile

**Primary Text** (the main text above the image):

```
Your Vancouver home's value has changed.

Some neighbourhoods are up. Others have shifted. And your home's
unique features — that renovated kitchen, the extra parking, the
view — could push your value higher than the neighbourhood average.

I'll prepare a free Comparative Market Analysis for your specific
property. No obligation. No pressure. Just real data.

Tap "Learn More" to get started.
```

**Headline** (bold text below the image):

```
Free Home Valuation — 24hr Turnaround
```

**Description** (smaller text below headline):

```
Aparna Kapur | Oakwyn Realty | 604-612-7694
```

**Call-to-Action Button:** Select **"Learn More"**

**Website URL:** `https://www.aparnakapur.com/lp/home-value`

#### Click "Publish"

That's it. Your first ad is live. Facebook will review it (usually takes a few hours) and then start showing it to Vancouver homeowners.

---

## What Happens Next

1. **Within 24 hours:** Your ad will be approved and start running
2. **Within 2-3 days:** You'll start getting your first leads (emails to ak@aparnakapur.com)
3. **Each lead email** will show: their name, phone, email, property type, neighbourhood, and timeline
4. **Your job:** Call them within 24 hours (see Part 5: Follow-Up System)

---

# Part 4: Expanding Your Campaigns

Once your first campaign has been running for 1-2 weeks and you're comfortable with how it works, add these campaigns one at a time. **Don't launch them all at once** — add one new campaign every 3-5 days so you can see what's working.

## Campaign 2: "Condos Under $750K" (Week 2)

**Objective:** Leads
**Budget:** $12/day
**Audience:**

- Location: Vancouver + Burnaby + Richmond (people looking to move INTO Vancouver)
- Age: 25-40
- Interests: First-time home buyer, apartment living, condo living, mortgage
- Life events: Recently engaged, recently married

**Ad Text:**

```
Still renting in Vancouver?

There are condos under $750K right now — with solid strata
councils, good layouts, and real upside potential. But the best
ones sell in under a week.

I monitor every new listing the moment it hits MLS. Let me send
you a curated list of the best-value condos matched to your
budget and lifestyle.

Tap "Learn More" to get your list.
```

**Headline:** Vancouver Condos Under $750K — Updated Daily
**CTA:** Learn More
**URL:** `https://www.aparnakapur.com/lp/condos-under-750k`

---

## Campaign 3: "New Listings Alert" (Week 3)

**Objective:** Leads
**Budget:** $12/day
**Audience:**

- Location: Vancouver, BC (25km)
- Age: 28-55
- Interests: Real estate, home buying, property search, moving

**Ad Text:**

```
By the time you see a listing on Realtor.ca, three other
buyers have already booked viewings.

In Vancouver's market, speed wins. I'll send you new listings
the moment they hit MLS — before the open house signs go up,
before the bidding wars start.

Tell me what you're looking for and I'll match you to the
freshest listings every week.
```

**Headline:** See New Listings First — Before Open Houses
**CTA:** Sign Up
**URL:** `https://www.aparnakapur.com/lp/new-listings`

---

## Campaign 4: "East Side Under $1.5M" (Week 3-4)

**Objective:** Leads
**Budget:** $10/day
**Audience:**

- Location: Vancouver East Side + Burnaby (people already near the area)
- Age: 30-50
- Interests: Family, parenting, schools, home buying

**Ad Text:**

```
Vancouver's East Side has the best value for families right now.

Detached homes under $1.5M. Great schools. Parks on every
block. Growing communities with new restaurants and shops
opening every month.

I know every East Side neighbourhood inside and out — every
pocket of value, every school catchment. Let me find the right
home for your family.
```

**Headline:** East Side Family Homes Under $1.5M
**CTA:** Learn More
**URL:** `https://www.aparnakapur.com/lp/east-side-under-1-5m`

---

## Campaign 5: "Duplexes Under $1.7M" (Week 4)

**Objective:** Leads
**Budget:** $10/day
**Audience:**

- Age: 30-55
- Interests: Investment property, rental income, passive income, real estate investing

**Ad Text:**

```
What if your tenant covered half your mortgage?

Vancouver duplexes under $1.7M let you live in one unit and
rent the other. Build equity while collecting rent — and with
Vancouver's R1-1 zoning, many lots have future development
potential too.

I'll send you the current list with rental income estimates
and my assessment of each property's potential.
```

**Headline:** Duplexes Under $1.7M — Mortgage Helper Built In
**CTA:** Learn More
**URL:** `https://www.aparnakapur.com/lp/duplexes-under-1-7m`

---

## Campaign 6: "Equity Check" (Week 4-5)

**Objective:** Leads
**Budget:** $10/day
**Audience:**

- Same as Campaign 1 (homeowners) but add:
- Narrow by: Homeowner tenure 5+ years (if available)
- Interests: Financial planning, retirement, refinancing

**Ad Text:**

```
If you bought your Vancouver home 5+ years ago, you could be
sitting on significant equity.

But the market has shifted. Some neighbourhoods are up. Others
have adjusted. And without a proper analysis, you're just
guessing.

I'll prepare a personalized equity report for your specific
property — what you bought for, what it's worth today, and
what that means for your options. Free. No strings.
```

**Headline:** Free Equity Report — How Much Have You Built?
**CTA:** Learn More
**URL:** `https://www.aparnakapur.com/lp/equity`

---

## Campaign 7: "Investment Opportunities" (Week 5)

**Objective:** Leads
**Budget:** $10/day
**Audience:**

- Age: 35-65
- Interests: Real estate investing, stocks, financial planning, wealth management, investment property

**Ad Text:**

```
Right now in Vancouver, there are motivated sellers who need to
close quickly — estate sales, relocations, financial pressure.

These properties have been on the market long enough that the
sellers are flexible on price. That's where smart investors
find their deals.

I track every one of them. Let me send you the current list
with my analysis of each property's potential.
```

**Headline:** Below-Market Vancouver Properties — Updated Daily
**CTA:** Learn More
**URL:** `https://www.aparnakapur.com/lp/investment`

---

## Campaign 8: Neighbourhood-Specific (Week 6+)

Run separate campaigns for your strongest neighbourhoods. Start with 2-3.

**Recommended first neighbourhoods:** Oakridge, Kerrisdale, Kitsilano

**Budget:** $8/day per neighbourhood
**Audience:**

- Location: The specific neighbourhood + 5km radius
- Age: 28-60
- Interests: Real estate, home buying

**Ad Text Template (customize per neighbourhood):**

```
Looking for a home in [Oakridge/Kerrisdale/etc.]?

I'm the [neighbourhood] specialist. I know every building,
every street, every pocket of value — and I know which
properties are priced right and which ones aren't.

Right now there are homes available here that won't last long.
Let me send you a curated list with my insider notes on each one.
```

**Headline:** Homes for Sale in [Neighbourhood] — Updated Daily
**CTA:** Learn More
**URLs:**

- `https://www.aparnakapur.com/lp/oakridge`
- `https://www.aparnakapur.com/lp/kerrisdale`
- `https://www.aparnakapur.com/lp/kitsilano`

---

## Campaign 9: Retargeting (Start After Week 3)

This is the most important campaign you'll run. It shows ads to people who ALREADY visited your landing pages but didn't fill out the form. These people are warm — they were interested enough to click but didn't commit. A gentle reminder often converts them.

**How to set it up:**

1. In Ads Manager, go to **Audiences** (hamburger menu > All Tools > Audiences)
2. Click **"Create Audience"** > **"Custom Audience"**
3. Select **"Website"**
4. Set the rules:
   - People who visited: URL contains `/lp/`
   - In the last: **30 days**
   - Exclude: People who visited URL contains `/lp/` AND submitted a form (if your pixel tracks form submissions)
5. Name it: **LP Visitors - No Conversion**
6. Click **Create Audience**

Now create the retargeting campaign:

**Objective:** Leads
**Budget:** $8/day
**Audience:** Select the custom audience you just created ("LP Visitors - No Conversion")
**Placement:** Advantage+ Placements

**Ad Text:**

```
Still thinking about it?

The listings you were looking at have been updated since your
last visit. New properties added, prices changed.

When you're ready, I'm here. No pressure — just real data and
honest advice. Tap below to take another look.
```

**Headline:** Updated Listings — Take Another Look
**CTA:** Learn More
**URL:** `https://www.aparnakapur.com/lp/new-listings` (send them to the most general buyer page)

---

# Part 5: The Follow-Up System (This Is Where Deals Close)

**The landing pages capture the lead. YOUR follow-up closes the deal.** Most agents fail not because they don't get leads, but because they don't follow up properly. The slides you shared had this exactly right — here's how to implement it.

## The LPMAMA Script

When you call a lead, follow this framework. It gives you a structure so you're never awkward or lost on the phone.

**L — Location**
"I saw you were looking at [area/price range from the lead source tag]. Is that still the area you're focused on, or are you open to other neighbourhoods?"

**P — Price**
"What's your comfortable budget range? And is that flexible if the right property comes along?"

**M — Mortgage**
"Are you pre-approved for a mortgage? If so, with who? If not, I can connect you with a great mortgage broker."

**A — Agent**
_Assume they don't have one._ If they say they do, be gracious and move on. If they hesitate, they probably don't — gently say: "I'd love to help you with your search. No pressure."

**M — Motivation**
"What's driving your timeline? Is there something specific happening — job change, growing family, lease ending?"

**A — Appointment**
"I have a few properties I think you'd really like. How about we meet for coffee this week and I can walk you through them? I'm free [Tuesday at 10am / Thursday at 2pm]."

## The 14-Day Follow-Up Sequence

### Day 0 (Immediately)

The website automatically:

- Sends you an email with the lead's details (name, phone, email, what they're looking for)
- Saves the lead in your CRM (Supabase) with a source tag so you know which ad they came from

**Your action:** Call them within 2-4 hours. If they don't answer, leave a voicemail and send a text:

> "Hi [Name], this is Aparna Kapur — I'm a realtor here in Vancouver. I saw you were looking at [homes in Oakridge / condos under $750K / etc.]. I have a few options I think you'd love. When's a good time for a quick chat? No pressure at all."

### Day 1-2 (If No Response)

Send a **personal video text message.** This is the secret weapon from the slides. Here's how:

1. Open your phone camera
2. Hold up a small whiteboard (or piece of paper) with their **first name** written on it
3. Record a 15-30 second video: "Hi [Name]! I'm Aparna. I saw you were looking at [context]. I've actually got a few properties that just came on the market that I think would be perfect for you. Give me a call or text me back when you have a minute — I'd love to share them with you."
4. Text them the video

**Why this works:** It's personal. Nobody else does this. They'll remember you.

### Day 3-4 (Second Call Attempt)

Call again. This time, lead with new information:

> "Hi [Name], it's Aparna. I wanted to let you know that [2 new listings / a price drop / an open house] just came up in [their area of interest]. I thought of you. Call me back at 604-612-7694."

### Day 5-7 (Email)

Send a personal email with 2-3 curated listings based on their stated preferences (from the lead form data). Keep it short:

> Subject: [Name] — 3 properties I picked for you
>
> Hi [Name],
>
> Based on what you told me, I pulled three properties I think you'll find interesting:
>
> 1. [Brief description — neighbourhood, price, key feature]
> 2. [Brief description]
> 3. [Brief description]
>
> Want to see any of these in person? I'm free this week.
>
> Aparna
> 604-612-7694

### Day 8-10 (Third Call / Text)

One more personal outreach:

> "Hi [Name], just checking in. I've been keeping an eye on [their area/price range] for you. A couple of interesting things have come up. Let me know if you'd like to chat — even just for a few minutes."

### Day 14 (The Breakup Message)

This is from the slides and it's brilliant. If they haven't responded after 14 days, send this text:

> "Hi [Name], I haven't heard back from you, so I'm going to assume you've either found a home or your plans have changed. I'll stop reaching out so I'm not bugging you. If your situation changes down the road, I'm always here. All the best — Aparna"

**Why this works:** About 20-30% of people who get a breakup message suddenly respond. It triggers loss aversion — they realize they're about to lose access to someone who was trying to help them.

### Day 14+ (Long-Term Nurture)

For leads who never responded, move them to your long-term email list. Send them a monthly email with:

- Market update for their neighbourhood
- 1-2 interesting new listings
- A quick personal note

**The ZMOT principle (Zero Moment of Truth):** You want to be the last agent in their inbox when they're finally ready to buy or sell. That might be 3 months from now. Or 2 years. But when they Google "Vancouver realtor," they'll already know your name.

---

# Part 6: Budget & ROI

## Recommended Starting Budget

| Week | Campaigns Running                | Daily Budget | Monthly Cost |
| ---- | -------------------------------- | ------------ | ------------ |
| 1-2  | Home Value only                  | $15/day      | ~$450        |
| 3    | + Condos + New Listings          | $39/day      | ~$1,170      |
| 4    | + East Side + Duplexes           | $59/day      | ~$1,770      |
| 5+   | + Equity + Investment            | $79/day      | ~$2,370      |
| 6+   | + 3 Neighbourhoods + Retargeting | $103/day     | ~$3,090      |

**Start at $15/day. Don't spend more until you've closed your first lead.**

## Expected Returns

| Metric                         | Conservative | Optimistic |
| ------------------------------ | ------------ | ---------- |
| Cost per lead                  | $25          | $12        |
| Leads per month (at $2,000/mo) | 80           | 167        |
| Lead-to-appointment rate       | 10%          | 20%        |
| Appointments per month         | 8            | 33         |
| Appointment-to-client rate     | 25%          | 40%        |
| New clients per month          | 2            | 13         |
| Avg commission per deal        | $15,000      | $20,000    |
| Monthly revenue from ads       | $30,000      | $260,000   |
| **ROI**                        | **15x**      | **130x**   |

Even the conservative estimate shows $30,000 revenue on $2,000 ad spend — a 15x return. That's why every successful agent runs Facebook ads.

---

# Part 7: Weekly Management (30 Minutes/Week)

Every Monday morning, spend 30 minutes checking your ads:

## Your Weekly Checklist

1. **Open Ads Manager** (adsmanager.facebook.com)

2. **Check each campaign's performance** (last 7 days):
   - **CTR (Click-Through Rate):** Should be above 1.5%. If it's below 1%, your ad creative isn't resonating — try a new image or different text.
   - **CPL (Cost Per Lead):** Should be under $30. If it's above $40, your landing page or audience targeting needs adjustment.
   - **Leads:** How many leads did each campaign generate? Which campaign is your best performer?

3. **Kill underperformers:** If a campaign has spent $50+ and generated zero leads, pause it. Either the audience is wrong or the ad creative isn't working.

4. **Increase budget on winners:** If a campaign is generating leads under $15/each, increase its daily budget by $5.

5. **Check your lead follow-up:** Did you call every lead from last week? Are any leads in your 14-day sequence that need the next touch?

## Monthly: Refresh Your Ads

Every 4 weeks, create new ad variations. People get "ad fatigue" — they've seen your ad enough times and start ignoring it. Signs of fatigue:

- CTR drops below 1%
- Your "Frequency" metric goes above 3.0 (means the average person has seen your ad 3+ times)

When this happens, keep the same targeting and landing page, but change:

- The image (try a different photo)
- The primary text (try a different angle or hook)
- The headline

You don't need to start from scratch — just freshen the creative.

---

# Part 8: A/B Testing (How to Find What Works Best)

A/B testing means running two versions of an ad at the same time to see which one performs better. Facebook makes this easy.

## How to A/B Test

1. Create your campaign as normal
2. At the Ad level, click **"Create A/B Test"** (or just create two ads within the same ad set)
3. Change ONE thing between the two versions:
   - Different image (same text)
   - Different headline (same image)
   - Different primary text (same everything else)
4. Let both run for 5-7 days
5. The one with more leads at a lower cost wins
6. Pause the loser, increase budget on the winner

## What to Test First

| Test        | Version A               | Version B                        |
| ----------- | ----------------------- | -------------------------------- |
| Image       | Vancouver skyline photo | Your professional headshot       |
| Headline    | "Free Home Valuation"   | "What's Your Home Really Worth?" |
| Text length | Short (3 lines)         | Long (full story)                |
| CTA button  | "Learn More"            | "Get Quote"                      |

**Rule of thumb:** Test one variable at a time. If you change the image AND the text, you won't know which change made the difference.

---

# Part 9: Advanced Moves (Month 2+)

Once you're comfortable and generating leads consistently:

## Lookalike Audiences

After you've generated 50+ leads, Facebook can find NEW people who look like your existing leads. These perform incredibly well.

1. Go to **Audiences** > **Create Audience** > **Lookalike Audience**
2. Source: Your Facebook Pixel > leads from landing pages
3. Location: Canada
4. Size: 1% (most similar to your leads — start narrow)
5. Use this as a new audience for a campaign

## Video Ads

Video ads tend to get higher engagement and lower costs. You don't need professional production.

**Simple video ad recipe:**

1. Stand in front of a beautiful Vancouver view (English Bay, Stanley Park, a nice neighbourhood street)
2. Look at camera, smile, say: "Hi, I'm Aparna. If you're thinking about buying or selling a home in Vancouver, I'd love to help. I've put together a free [home valuation / listing list / etc.] just for you. Tap the link below."
3. Keep it under 30 seconds
4. Upload to your ad as a Video format

## Instagram Stories Ads

Your ads automatically show on Instagram too (if using Advantage+ Placements). But you can create Stories-specific creative:

- Vertical format (1080x1920)
- Short text overlay on a photo
- "Swipe up" CTA
- These work especially well for the 25-40 age group

---

# Part 10: Tracking Your Results

## How to Know Which Campaign Generated a Client

Every lead that comes through your website is tagged with its source. When you get an email notification, it will say something like:

- **Source: LP: Home Value** (came from the home valuation landing page)
- **Source: LP: Condos Under 750K** (came from the condos page)
- **Source: LP: Oakridge** (came from the Oakridge neighbourhood page)

**Keep a simple spreadsheet:**

| Lead Name | Source                | Date  | Called? | Appointment? | Listed/Bought? | Commission |
| --------- | --------------------- | ----- | ------- | ------------ | -------------- | ---------- |
| John S.   | LP: Home Value        | Apr 5 | Yes     | Apr 8        | Listed May 1   | $18,000    |
| Sarah M.  | LP: Condos Under 750K | Apr 7 | Yes     | Apr 10       | Bought May 15  | $12,000    |

After 3 months, you'll see exactly which campaigns are generating real revenue — and which ones to double down on.

---

# Quick Reference: All Landing Page URLs

## Seller Pages

- **aparnakapur.com/lp/home-value** — "What's Your Home Worth?"
- **aparnakapur.com/lp/equity** — "How Much Equity Have You Built?"

## Buyer Pages — Price Tiers

- **aparnakapur.com/lp/condos-under-750k** — Condos Under $750K
- **aparnakapur.com/lp/east-side-under-1-5m** — East Side Under $1.5M
- **aparnakapur.com/lp/duplexes-under-1-7m** — Duplexes Under $1.7M
- **aparnakapur.com/lp/homes-under-2-2m** — Homes Under $2.2M

## Buyer Pages — Specialty

- **aparnakapur.com/lp/new-listings** — New Listings First
- **aparnakapur.com/lp/investment** — Investment Opportunities

## Buyer Pages — Neighbourhoods

- **aparnakapur.com/lp/oakridge** | **aparnakapur.com/lp/kerrisdale** | **aparnakapur.com/lp/kitsilano**
- **aparnakapur.com/lp/marpole** | **aparnakapur.com/lp/south-cambie** | **aparnakapur.com/lp/riley-park**
- **aparnakapur.com/lp/cambie-corridor** | **aparnakapur.com/lp/mount-pleasant** | **aparnakapur.com/lp/fairview**
- **aparnakapur.com/lp/shaughnessy** | **aparnakapur.com/lp/dunbar-southlands** | **aparnakapur.com/lp/west-point-grey**
- **aparnakapur.com/lp/grandview-woodland** | **aparnakapur.com/lp/hastings-sunrise** | **aparnakapur.com/lp/kensington-cedar-cottage**
- **aparnakapur.com/lp/downtown** | **aparnakapur.com/lp/west-end** | **aparnakapur.com/lp/strathcona**
- **aparnakapur.com/lp/ubc** | **aparnakapur.com/lp/arbutus-ridge** | **aparnakapur.com/lp/killarney**
- **aparnakapur.com/lp/sunset** | **aparnakapur.com/lp/victoria-fraserview**
