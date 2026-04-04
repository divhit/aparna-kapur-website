# Landing Page Funnels — URL Reference

All landing pages live at `aparnakapur.com/lp/*`. They are **not linked** from the main site navigation — accessible only via direct URL (from FB/Google ads).

## Seller Funnels

| URL                                                         | Hook                                | Target Audience                                         |
| ----------------------------------------------------------- | ----------------------------------- | ------------------------------------------------------- |
| [/lp/home-value](https://www.aparnakapur.com/lp/home-value) | "What's Your Vancouver Home Worth?" | Homeowners curious about their property value           |
| [/lp/equity](https://www.aparnakapur.com/lp/equity)         | "How Much Equity Have You Built?"   | Long-term homeowners considering selling or refinancing |

## Buyer Funnels — Price Tiers

| URL                                                                             | Hook                              | Target Audience                             |
| ------------------------------------------------------------------------------- | --------------------------------- | ------------------------------------------- |
| [/lp/condos-under-750k](https://www.aparnakapur.com/lp/condos-under-750k)       | "Condos Under $750K in Vancouver" | First-time buyers, downsizers               |
| [/lp/east-side-under-1-5m](https://www.aparnakapur.com/lp/east-side-under-1-5m) | "East Side Homes Under $1.5M"     | Families looking for value on the East Side |
| [/lp/duplexes-under-1-7m](https://www.aparnakapur.com/lp/duplexes-under-1-7m)   | "Duplexes Under $1.7M"            | Mortgage-helper buyers, multi-gen families  |
| [/lp/homes-under-2-2m](https://www.aparnakapur.com/lp/homes-under-2-2m)         | "Homes Under $2.2M"               | Move-up buyers, broader search              |

## Buyer Funnels — Specialty

| URL                                                             | Hook                                    | Target Audience                              |
| --------------------------------------------------------------- | --------------------------------------- | -------------------------------------------- |
| [/lp/new-listings](https://www.aparnakapur.com/lp/new-listings) | "See New Listings Before Everyone Else" | Active buyers who want first-mover advantage |
| [/lp/investment](https://www.aparnakapur.com/lp/investment)     | "Investment Properties & Opportunities" | Investors, flippers, income-property seekers |

## Buyer Funnels — Neighbourhood-Specific (24 pages)

| URL                                                                                     | Neighbourhood            |
| --------------------------------------------------------------------------------------- | ------------------------ |
| [/lp/oakridge](https://www.aparnakapur.com/lp/oakridge)                                 | Oakridge                 |
| [/lp/marpole](https://www.aparnakapur.com/lp/marpole)                                   | Marpole                  |
| [/lp/south-cambie](https://www.aparnakapur.com/lp/south-cambie)                         | South Cambie             |
| [/lp/riley-park](https://www.aparnakapur.com/lp/riley-park)                             | Riley Park               |
| [/lp/kerrisdale](https://www.aparnakapur.com/lp/kerrisdale)                             | Kerrisdale               |
| [/lp/cambie-corridor](https://www.aparnakapur.com/lp/cambie-corridor)                   | Cambie Corridor          |
| [/lp/kitsilano](https://www.aparnakapur.com/lp/kitsilano)                               | Kitsilano                |
| [/lp/ubc](https://www.aparnakapur.com/lp/ubc)                                           | UBC                      |
| [/lp/arbutus-ridge](https://www.aparnakapur.com/lp/arbutus-ridge)                       | Arbutus Ridge            |
| [/lp/dunbar-southlands](https://www.aparnakapur.com/lp/dunbar-southlands)               | Dunbar-Southlands        |
| [/lp/shaughnessy](https://www.aparnakapur.com/lp/shaughnessy)                           | Shaughnessy              |
| [/lp/west-point-grey](https://www.aparnakapur.com/lp/west-point-grey)                   | West Point Grey          |
| [/lp/grandview-woodland](https://www.aparnakapur.com/lp/grandview-woodland)             | Grandview-Woodland       |
| [/lp/hastings-sunrise](https://www.aparnakapur.com/lp/hastings-sunrise)                 | Hastings-Sunrise         |
| [/lp/kensington-cedar-cottage](https://www.aparnakapur.com/lp/kensington-cedar-cottage) | Kensington-Cedar Cottage |
| [/lp/downtown](https://www.aparnakapur.com/lp/downtown)                                 | Downtown                 |
| [/lp/fairview](https://www.aparnakapur.com/lp/fairview)                                 | Fairview                 |
| [/lp/west-end](https://www.aparnakapur.com/lp/west-end)                                 | West End                 |
| [/lp/mount-pleasant](https://www.aparnakapur.com/lp/mount-pleasant)                     | Mount Pleasant           |
| [/lp/killarney](https://www.aparnakapur.com/lp/killarney)                               | Killarney                |
| [/lp/renfrew-collingwood](https://www.aparnakapur.com/lp/renfrew-collingwood)           | Renfrew-Collingwood      |
| [/lp/sunset](https://www.aparnakapur.com/lp/sunset)                                     | Sunset                   |
| [/lp/victoria-fraserview](https://www.aparnakapur.com/lp/victoria-fraserview)           | Victoria-Fraserview      |
| [/lp/strathcona](https://www.aparnakapur.com/lp/strathcona)                             | Strathcona               |

## How It Works

1. **FB/Google ad** links to one of these URLs
2. Visitor sees **teaser data** (blurred listings, counts, market stats) — enough to intrigue, not enough to self-serve
3. Visitor fills out **lead capture form** (name, email, phone + variant-specific fields)
4. Lead is captured in **Supabase CRM** + emailed to ak@aparnakapur.com + backed up to Google Sheets
5. Aparna follows up within 24 hours using **LPMAMA script** + personalized outreach
6. **10-14 day drip** for unresponsive leads, then long-term nurture

## Technical Notes

- All pages are `noindex` (won't appear in Google search — ad-only)
- Main site Header/Footer/ChatWidget are hidden via CSS
- Live MLS data from DDF/GV Realtors API (refreshes on every visit)
- Leads tagged by source (e.g., "LP: Condos Under 750K") for campaign ROI tracking
