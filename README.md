<div align="center">
  <h1>Ully Business Platform</h1>
  <p><em>Professional operations platform for coffee businesses — powered by Ully AI</em></p>

  <p>
    <img src="https://img.shields.io/badge/stack-Next.js%2015-000000?style=flat-square&logo=nextdotjs" />
    <img src="https://img.shields.io/badge/language-TypeScript-3178C6?style=flat-square&logo=typescript" />
    <img src="https://img.shields.io/badge/database-SQLite%20%2B%20Drizzle-003B57?style=flat-square&logo=sqlite" />
    <img src="https://img.shields.io/badge/AI-Claude%20Sonnet-C8923C?style=flat-square" />
  </p>
</div>

---

## Overview

Ully Business Platform is a web-based operations tool built for coffee shop owners and managers. It connects directly with Ully AI to give teams intelligent, context-aware assistance — aware of their specific equipment, staff, inventory, and business data.

This is a separate product from the [Ully AI mobile app](https://github.com/chrisdarvelo/Ully-Coffee), which serves individual consumers and baristas. The Business Platform is designed for professional use: managing the full operation of a cafe or coffee business from a single dashboard.

---

## Modules

| Module | Route | Description |
|---|---|---|
| Dashboard | `/dashboard` | Operations overview — equipment status, team, low stock alerts |
| Ully AI Chat | `/chat` | Streaming AI assistant with full business context injected |
| Equipment | `/equipment` | Machine registry + service record history |
| Team | `/team` | Staff management + invite system |
| Training | `/training` | Barista training logs with scores and topics |
| Inventory | `/inventory` | Stock tracking with par levels and low-stock alerts |
| Schedule | `/schedule` | Weekly shift calendar |
| Revenue | `/revenue` | Revenue and expense tracking |
| Settings | `/settings` | Org profile, account, password, danger zone |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict) |
| Styling | Inline design tokens — dark espresso theme |
| Auth | JWT via `jose` + HTTP-only cookies |
| Database | SQLite (`better-sqlite3`) + Drizzle ORM |
| AI | Anthropic Claude Sonnet (streaming via API route) |
| Email | Resend |
| Reports | ExcelJS, pdf-lib, docx |

---

## Project Structure

```
ully-web/
├── src/
│   ├── app/
│   │   ├── (auth)/          # login, signup, join (invite)
│   │   ├── (legal)/         # privacy, terms, support, data, delete-account
│   │   ├── (platform)/      # authenticated platform modules
│   │   └── api/             # all API routes
│   ├── components/
│   │   ├── Sidebar.tsx
│   │   ├── PlatformShell.tsx
│   │   └── ChatInterface.tsx
│   └── lib/
│       ├── auth.ts          # JWT session management
│       ├── claude.ts        # Claude API client + system prompt
│       ├── db.ts            # SQLite connection + table init
│       ├── schema.ts        # Drizzle schema + types
│       ├── email.ts         # Resend email utility
│       └── report-generator.ts
├── data/                    # SQLite DB lives here (gitignored)
├── .env.example
└── next.config.ts
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
CLAUDE_API_KEY=sk-ant-...
JWT_SECRET=<run: openssl rand -hex 32>
RESEND_API_KEY=re_...          # optional — for email features
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Run

```bash
npm run dev
```

The SQLite database is created automatically at `data/ully.db` on first run. Open `http://localhost:3000` and sign up to create your organization.

---

## Auth & Multi-tenancy

- Each signup creates an **organization** and an **owner** account
- Owners can generate invite codes (7-day expiry) to add team members
- All data is scoped to `org_id` — no cross-org data access possible
- Sessions are JWT stored in an HTTP-only cookie (7-day expiry)

---

## Deployment

> See deployment decision notes — Railway recommended over Vercel due to SQLite filesystem requirements.

```bash
# Production build
npm run build
npm start
```

Set all `.env.example` variables in your hosting environment before deploying.

---

## Related

- **Mobile app (consumer):** [Ully AI — React Native / Expo](https://github.com/chrisdarvelo/Ully-Coffee)
- **Support:** support@ullycoffee.com
