# Ully Business Platform — Vision & Roadmap

> This document captures the product direction and roadmap for the Ully Business
> web platform. It is scoped to this repo only.
>
> For the full Ully product vision — crop-to-cup data platform, vertical expansion,
> GTM strategy, and pricing — see the canonical vision document in the mobile app repo:
> **[Ully-Coffee / VISION.md](https://github.com/chrisdarvelo/Ully-Coffee/blob/main/VISION.md)**

---

## Where This Fits in the Ully Vision

The full Ully vision is a **crop-to-cup professional intelligence platform** spanning
agriculture, logistics, roasting, business operations, and consumer experience.

The Ully Business Platform is the **Phase 3 — Ully Business** node of that vision,
built as a web-first product ahead of the mobile app's business tier. It exists at
the operator layer of the supply chain:

```
Ully Agriculture    →  farm data, soil, harvest, certifications
Ully Logistics      →  lot tracking, shipping, transit
Ully Roaster        →  roast profiles, cupping scores, blend formulation
Ully Business       →  ← THIS PLATFORM
                        cafe operations, team, equipment, revenue, inventory
Ully Coffee (app)   →  barista technique, consumer feedback, brew preference
```

The Business Platform gives café owners and managers the operational layer that
the mobile consumer app does not cover — multi-user, org-scoped, business-data-aware.

---

## What the Platform Is

A web-based operations hub for coffee business owners and managers, connected
to Ully AI. Every AI interaction is grounded in the organisation's actual data:
active machines, team size, low-stock items, and business type.

**This is not a generic SaaS tool adapted for coffee.
It is purpose-built for coffee professionals.**

---

## Current Status

| Module | Status |
|---|---|
| Auth (signup, login, invite-based team join) | Done |
| Dashboard — operations overview | Done |
| Ully AI chat — streaming, business-context-aware | Done |
| Equipment — machine registry | Done |
| Service Records — per-machine maintenance history | Done |
| Team — staff profiles, invite system | Done |
| Training Logs — sessions, scores, topics | Done |
| Inventory — stock levels, par alerts | Done |
| Schedule — weekly shift calendar | Done |
| Revenue & Expenses — financial tracking | Done |
| Settings — org profile, account, password, danger zone | Done |
| Landing page — marketing, app download links | Done |
| Email (Resend) | Wired, not actively used yet |
| Report generation (Excel, PDF, DOCX) | Wired, not actively used yet |
| Deployment to ullyapp.com | Pending (Railway, tomorrow) |

---

## Roadmap

### Near-term (pre-launch)

- **Deploy to ullyapp.com** via Railway — SQLite filesystem requires persistent
  Node.js server, not Vercel serverless
- **Persistent AI chat history** — currently ephemeral per session; persist to
  SQLite per user so history survives logout
- **Automated reports** — weekly/monthly summaries as PDF or Excel, generated
  from revenue, training, and service record data using existing `report-generator.ts`
- **Email notifications** — low stock alerts, upcoming service intervals,
  training reminders via `email.ts` (Resend)

### Phase 3a — POS Integration (Square)

Square is the most widely deployed POS in independent specialty cafés. Connecting
it to Ully transforms the AI from a reactive assistant to a proactive business advisor.

**What Ully ingests (read-only OAuth):**
- Daily, weekly, monthly revenue by location, shift, and item
- Labour cost as a percentage of sales
- Top-selling items and revenue contribution by category
- Hourly transaction volume — identifies peak and dead periods

**AI layer:** Owner asks "Why was Tuesday revenue down 18%?" — Ully correlates
POS data with weather context, staffing, and prior-week trends and surfaces a
plain-language answer with a recommended action.

**Future:** Toast, Lightspeed, Kounta follow the same pattern once Square is live.

### Phase 3b — QuickBooks Integration

**Target:** Café owners already using QuickBooks Online.

**Data Ully ingests (read-only OAuth):**
- Monthly P&L — revenue, COGS, gross margin
- Labour cost tracking against revenue
- Supplier invoices — cost-per-kg green coffee, consumables trend
- Cash flow position vs prior period

**AI layer:** "Am I on track to hit my margin target this quarter?" — Ully pulls
the QuickBooks data, cross-references it with POS revenue, and answers directly.

### Phase 3c — Machine Volumetrics

**v1 — Structured manual input**
Most commercial machines do not expose an API. The v1 approach is structured
input by the technician or head barista — shots pulled, average extraction time,
machine temperature log — with optional photo.

**v2 — Native machine API (where supported)**
La Marzocco (Linea PB, KB90), Sanremo, and growing commercial machines expose
Bluetooth or Wi-Fi APIs. Ully will integrate these where accessible — live
group temperature, shot counter, boiler pressure directly in the dashboard.

### Phase 3d — Multi-location Support

A single organisation account managing multiple cafe locations, each with
its own equipment, team, inventory, and revenue — unified in one dashboard.

Owner-level view sees aggregate performance across all locations.
Location-manager view is scoped to their site only.

### Phase 4 — Ully Roaster (web companion)

When the mobile Ully Roaster tier ships, the web platform becomes the desktop
companion for roasters and Q Graders who need larger screens for:
- Cupping score comparison across lots
- Roast profile visualisation
- Blend formulation and target profile matching
- Green coffee inventory and freshness window management

---

## How It Connects to Ully AI

The AI system prompt is built dynamically at request time from the org's live data:

```
buildSystemPrompt({
  orgName,
  orgType,
  equipmentList,   // active machines by brand/model
  teamCount,       // active staff
  lowStockItems,   // items below par level
})
```

This means every AI conversation is contextually grounded. When an owner asks
"do we have enough oat milk for the week?" — Ully already knows the current
stock level and par setting for oat milk in their inventory.

As POS, QuickBooks, and machine volumetric integrations are added, the system
prompt context expands — the AI becomes progressively more useful without any
change to the conversation interface.

---

## Data Privacy Principle

All business data is private by default and never shared:
- Data is scoped to `org_id` — no cross-org access is possible at the DB level
- Ully AI may only use business data to improve the product if the org explicitly opts in
- This consent is separate from the consumer privacy policy
- All org data is deletable on demand — Settings → Danger Zone wipes everything

---

## Principles

1. **Purpose-built, not adapted.** Every feature is designed for the coffee operator's
   workflow — not repurposed from generic SaaS.
2. **AI is grounded in real data.** The AI assistant is only as useful as the business
   context it receives. Enriching that context is the primary product lever.
3. **Web-first for operators, mobile-first for baristas.** The platform complements
   the mobile app — it does not duplicate it.
4. **No analytics SDK.** No Mixpanel, no Amplitude. Privacy is a product feature.
5. **Persistent Node.js deployment.** SQLite is the right database for this scale
   and this team. Serverless platforms (Vercel) are not compatible — deploy to Railway.
