<div align="center">
  <h1>Ully Business Platform</h1>
  <p><em>The operations platform for coffee professionals.</em></p>

  <p>
    <img src="https://img.shields.io/badge/stack-Next.js%2015-000000?style=flat-square&logo=nextdotjs" />
    <img src="https://img.shields.io/badge/language-TypeScript-3178C6?style=flat-square&logo=typescript" />
    <img src="https://img.shields.io/badge/database-SQLite%20%2B%20Drizzle-003B57?style=flat-square&logo=sqlite" />
    <img src="https://img.shields.io/badge/AI-Claude%20Sonnet-C8923C?style=flat-square" />
    <img src="https://img.shields.io/badge/deploy-Railway-7B36B6?style=flat-square" />
  </p>
</div>

---

## What is Ully Business Platform?

Ully Business Platform is a web-based operations suite for cafe owners and multi-location operators. Manage your team, track equipment, control inventory, plan shifts, and monitor your business — with an AI assistant that knows your entire operation.

Business at **$49.99/location/month**. Business Pro at **$79/location/month**.

> For individual baristas and enthusiasts, see [Ully AI — Mobile App](https://github.com/chrisdarvelo/Ully-Coffee).

---

## Modules

| Module | Route | Description |
|---|---|---|
| Dashboard | `/dashboard` | Operations overview — equipment status, team, low stock alerts |
| Chat | `/chat` | Streaming AI assistant with full business context injected |
| Equipment | `/equipment` | Machine registry + full service record history |
| Team | `/team` | Staff management + secure invite system |
| Schedule | `/schedule` | Weekly shift calendar |
| Inventory | `/inventory` | Stock tracking with par levels and low-stock alerts |
| Revenue | `/revenue` | Revenue and expense tracking |
| Training | `/training` | Barista training logs with scores and topics |
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
| Deploy | Railway |

---

## Project Structure

```
ully-web/
├── src/
│   ├── app/
│   │   ├── (auth)/          # login, signup, join (invite)
│   │   ├── (legal)/         # privacy, terms, support, data, delete-account
│   │   ├── (marketing)/     # /, /products, /pricing, /about
│   │   ├── (platform)/      # authenticated platform modules
│   │   └── api/             # all API routes
│   ├── components/
│   │   ├── LandingPage.tsx
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

```env
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
- Owners generate invite codes (7-day expiry) to add team members
- All data is scoped to `org_id` — no cross-org data access possible
- Sessions are JWT stored in an HTTP-only cookie (7-day expiry)

---

## Deployment

Deployed on Railway (SQLite filesystem requirement makes Vercel unsuitable).

```bash
npm run build
npm start
```

Set all `.env.example` variables in your hosting environment before deploying.

---

## Contact

Support: [support@ullycoffee.com](mailto:support@ullycoffee.com)

---

<div align="center">
  <sub>Brewing at the edge of technology ☕</sub>
</div>
