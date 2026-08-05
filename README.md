# Aeli AdOps — Publisher Monetisation & Ad Operations Platform

> **Full-stack Next.js 16 platform** for digital publisher monetization, Ad Operations management, and CRM — built with a complete internal admin dashboard, WhatsApp CRM integration, Supabase database, and automated email notifications.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black)
![React](https://img.shields.io/badge/React-19.2.3-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-06B6D4)
![Supabase](https://img.shields.io/badge/Supabase-Connected-3ECF8E)
![License](https://img.shields.io/badge/License-Private-red)

---

## 🌐 Live Website

**Production URL**: [https://www.aeliadops.com](https://www.aeliadops.com)  
**GitHub**: [https://github.com/aeiladops/aeli-adops](https://github.com/aeiladops/aeli-adops)

---

## 🏢 About Aeli AdOps

Aeli AdOps helps digital publishers simplify Ad Operations, optimize website monetisation, manage Google Ad Manager, improve yield, and uncover advertising revenue opportunities.

**Leadership Team:**
| Name | Role | Contact |
|------|------|---------|
| Durgam Vijay | Founder & Managing Director | durgamvijju8@gmail.com |
| Durgam Sanjeev | Co-Founder | durgamsanjay@gmail.com |
| Munjam Anjanna | Technical & Operational Head | munjam.myn@proton.me |

**WhatsApp**: [+91 7095185429](https://wa.me/917095185429)

---

## ✨ Features

### 🌍 Public Website
- **Home Page** — Hero, About, Features, Benefits, Process, Free Audit CTA, Staggered Grid
- **Services** — Yield Optimization, Google Ad Manager, Ad Operations, Programmatic Direct, Technical Support, Website Monetization
- **Free Publisher Audit** — Full audit request form with CRM integration + WhatsApp redirect
- **Team Page** — Executive leadership profiles with glassmorphic cards
- **Blog** — 10 SEO-optimised articles on Ad Operations & Publisher Monetization
- **Contact** — Contact form with Google Maps (Hyderabad office)
- **FAQ, Pricing, Sitemap, Privacy, Terms, Cookie Policy, GDPR Compliance**

### 🔧 CRM & Admin Dashboard (`/admin`)
- **Leads Management** — View, filter, update status, add notes, set follow-ups
- **Clients Database** — Track converted clients and service history
- **Audit Requests** — Manage free publisher audit pipeline
- **Service Requests** — Track all inbound service inquiries
- **Follow-ups** — Scheduled follow-up tracking with dates and notes
- **Settings** — Admin profile and credential management
- **JWT Authentication** — Secure admin login with cookie-based sessions

### 📲 Integrations
- **WhatsApp Auto-redirect** — All form submissions open WhatsApp chat to `+91 7095185429`
- **Supabase** — PostgreSQL database for persistent CRM data
- **Resend Email** — Transactional emails (publisher confirmation + admin notifications)
- **Google Sheets** — Webhook-based form submission logging
- **Google Maps** — Office location embed on contact page

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript 5.x |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion, GSAP, Lenis |
| Database | Supabase (PostgreSQL) |
| Email | Resend API |
| Auth | JWT + HTTP-only cookies |
| Icons | Lucide React + custom icon font |
| Markdown | gray-matter, react-markdown |
| Forms | React Hook Form + Zod validation |
| Deployment | Vercel (recommended) |

---

## 📋 Prerequisites

- **Node.js** 20.0.0 or higher
- **npm** / **yarn** / **pnpm**
- **Git**
- A **Supabase** account (for database)
- A **Resend** account (for emails)

---

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/aeiladops/aeli-adops.git
cd aeli-adops
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your values (see [Environment Variables](#-environment-variables) below).

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env.local` file at the project root with the following:

```env
# ── Email (Resend) ─────────────────────────────────────────────
RESEND_API_KEY=re_xxxxxxxxxxxx
ADMIN_EMAIL=admin@aeliadops.com
FROM_EMAIL=notifications@aeliadops.com

# ── Google Sheets Integration ───────────────────────────────────
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/xxxx/exec

# ── WhatsApp ────────────────────────────────────────────────────
# Phone with country code, no + or spaces
WHATSAPP_NUMBER=917095185429

# ── Admin CRM Auth ──────────────────────────────────────────────
ADMIN_USERNAME=adminvijay
ADMIN_PASSWORD=your_secure_password
JWT_SECRET=your_long_random_jwt_secret_min_32_chars

# ── Supabase ────────────────────────────────────────────────────
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6...
SUPABASE_SERVICE_ROLE_KEY=
```

---

## 📁 Project Structure

```
aeli-adops/
├── public/
│   └── images/
│       ├── logo/                   # Brand logo files
│       ├── team/                   # Team member photos
│       └── ...                     # Page images
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── admin/                  # CRM admin dashboard
│   │   │   ├── dashboard/
│   │   │   ├── leads/
│   │   │   ├── clients/
│   │   │   ├── audit-requests/
│   │   │   ├── service-requests/
│   │   │   ├── follow-ups/
│   │   │   ├── settings/
│   │   │   └── login/
│   │   ├── api/                    # API routes
│   │   │   ├── admin/              # CRM API (leads, clients, auth)
│   │   │   ├── publisher-audit/    # Audit form handler
│   │   │   ├── service-request/    # Service form handler
│   │   │   └── contact/            # Contact form handler
│   │   ├── blog/[slug]/            # Blog pages
│   │   ├── services/[slug]/        # Service detail pages
│   │   ├── team/[slug]/            # Team member profile pages
│   │   ├── publisher-audit/
│   │   ├── contact/
│   │   ├── about/
│   │   ├── features/
│   │   ├── pricing/
│   │   ├── faq/
│   │   └── page.tsx                # Homepage
│   ├── components/
│   │   ├── admin/                  # CRM dashboard components
│   │   ├── home/                   # Home page sections
│   │   ├── services/               # Service page components
│   │   ├── publisher-audit/        # Audit form components
│   │   ├── team/                   # Team page components
│   │   ├── blog/                   # Blog components
│   │   ├── shared/
│   │   │   ├── layout/             # Navbar, Footer, Mobile Menu
│   │   │   ├── ui/                 # Badge, Button, Card, Modal
│   │   │   └── cta.tsx             # Shared CTA section
│   │   └── animation/              # Reveal, Text animations
│   ├── lib/
│   │   ├── supabase.ts             # Supabase client + CRM store
│   │   ├── auth/                   # JWT admin authentication
│   │   ├── services/               # Resend, WhatsApp, Sheets services
│   │   ├── email-templates/        # HTML email templates
│   │   └── validation/             # Zod form schemas
│   ├── data/
│   │   ├── blog/                   # Markdown blog posts (.md)
│   │   ├── team/                   # Team member profiles (.md)
│   │   └── services/               # Service descriptions (.md)
│   ├── interface/                  # TypeScript interfaces
│   ├── hooks/                      # Custom React hooks
│   ├── context/                    # React context (Mobile Menu)
│   ├── styles/                     # CSS variables, typography
│   └── utils/                      # Helpers (cn, metadata, markdown)
├── .env.example                    # Environment variables template
├── .env.local                      # Your local secrets (gitignored)
├── next.config.ts                  # Next.js + security headers config
├── tsconfig.json
└── package.json
```

---

## 🧪 Available Scripts

```bash
npm run dev        # Start development server (Turbopack)
npm run build      # Create production build
npm run start      # Serve production build locally
npm run lint       # Run ESLint
```

---

## 🔑 Admin CRM Access

The internal CRM dashboard is available at `/admin/login`.

| Field | Default |
|-------|---------|
| Username | `adminvijay` |
| Password | *(set in `.env.local` → `ADMIN_PASSWORD`)* |

> ⚠️ Change the default credentials before deploying to production.

---

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub (already done ✅)
2. Go to [https://vercel.com/new](https://vercel.com/new)
3. Import the `aeiladops/aeli-adops` repository
4. Add all environment variables from `.env.local`
5. Click **Deploy** — live in ~2 minutes

### Other Platforms

The app works on any Node.js host that supports Next.js:
- **Netlify** — set build command `npm run build`, publish `.next`
- **Railway** — auto-detected as Next.js
- **DigitalOcean App Platform** — supported
- **AWS Amplify** — supported

---

## 📄 Pages Reference

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | About Aeli AdOps |
| `/services` | All services overview |
| `/services/[slug]` | Individual service pages |
| `/publisher-audit` | Free audit request form |
| `/team` | Leadership team |
| `/team/[slug]` | Individual team profiles |
| `/blog` | Blog listing |
| `/blog/[slug]` | Blog article |
| `/contact` | Contact form + map |
| `/pricing` | Pricing plans |
| `/faq` | Frequently asked questions |
| `/admin/dashboard` | CRM dashboard |
| `/admin/leads` | Leads management |
| `/admin/clients` | Clients database |
| `/admin/audit-requests` | Audit request pipeline |
| `/admin/service-requests` | Service request tracking |
| `/admin/follow-ups` | Follow-up scheduler |

---

## 🔒 Security

- Admin routes protected with JWT (HTTP-only cookies)
- Security headers: `X-Frame-Options`, `X-XSS-Protection`, `X-Content-Type-Options`, `Referrer-Policy`
- No sensitive keys exposed to client
- `.env.local` excluded from git via `.gitignore`

---

## 📧 Contact & Support

| Channel | Details |
|---------|---------|
| Email | durgamvijju8@gmail.com |
| WhatsApp | [+91 7095185429](https://wa.me/917095185429) |
| Website | [www.aeliadops.com](https://www.aeliadops.com) |

---

**Built with ❤️ by the Aeli AdOps Team — Durgam Vijay, Durgam Sanjeev & Munjam Anjanna**
