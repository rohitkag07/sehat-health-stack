# 🏥 Health Stack

> **India's most trusted healthcare comparison ecosystem**  
> Starting from Indore → Pan-India

![Health Stack](https://img.shields.io/badge/Status-In%20Development-orange)
![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![FastAPI](https://img.shields.io/badge/FastAPI-Python-green?logo=fastapi)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ECF8E?logo=supabase)

---

## 🎯 Vision

Build **3 interconnected products**:

1. 🤖 **Health Report AI** — Blood test reports analyze karo Hindi/Hinglish mein
2. 🔬 **MedCompare** — Lab test prices compare karo across all labs
3. 💊 **GenericDawa** — Generic medicines dhundo, 70-90% bachao

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Python 3.8+
- Supabase account (free tier)
- Anthropic API key (Claude)

### 1. Clone & Install

```bash
cd health-stack

# Install all dependencies
npm install
```

### 2. Environment Setup

```bash
# Copy env example
cp .env.example .env.local

# Fill in your API keys
# - Supabase URL & Keys
# - Anthropic API Key
# - Razorpay Keys (for payments)
```

### 3. Database Setup

```bash
# Go to Supabase Dashboard
# SQL Editor mein paste karo: packages/database/schema.sql

# Run all migrations
npm run db:migrate
```

### 4. Development

```bash
# Start both frontend & backend
npm run dev

# Frontend: http://localhost:3000
# Backend:  http://localhost:8000
```

---

## 📁 Project Structure

```
health-stack/
├── apps/
│   ├── web/                    # Next.js 14 frontend
│   │   ├── src/
│   │   │   ├── app/           # App router pages
│   │   │   ├── components/    # React components
│   │   │   ├── lib/           # Utilities
│   │   │   └── styles/        # Tailwind CSS
│   │   ├── package.json
│   │   └── next.config.mjs
│   │
│   ├── backend/               # FastAPI backend
│   │   ├── app/
│   │   │   ├── api/          # API routes
│   │   │   ├── services/     # Business logic
│   │   │   ├── models/       # Pydantic models
│   │   │   └── main.py       # FastAPI app
│   │   ├── requirements.txt
│   │   └── README.md
│   │
│   └── mobile/               # React Native (Phase 3)
│
├── packages/
│   ├── database/             # Supabase schema & types
│   │   ├── schema.sql
│   │   ├── types.ts
│   │   └── README.md
│   │
│   ├── shared/               # Shared utilities
│   │   ├── constants.ts
│   │   ├── utils.ts
│   │   └── types.ts
│   │
│   └── ui/                   # Reusable UI components
│       ├── Button.tsx
│       ├── Card.tsx
│       └── index.ts
│
├── tools/
│   ├── scraper/              # Lab price scraping
│   │   ├── scrapers/
│   │   │   ├── lal_pathlabs.py
│   │   │   ├── redcliffe.py
│   │   │   └── thyrocare.py
│   │   └── main.py
│   │
│   ├── pdf-parser/           # Blood report PDF parser
│   │   ├── parser.py
│   │   └── test_samples/
│   │
│   └── seo-generator/        # Auto SEO pages
│       ├── generator.py
│       └── templates/
│
├── data/
│   ├── labs/                 # Lab database CSV
│   ├── medicines/            # Medicine database
│   └── test-ranges/          # Normal ranges reference
│
├── docs/
│   ├── ROADMAP.md            # Complete project roadmap
│   ├── ARCHITECTURE.md       # System design
│   ├── API.md                # API documentation
│   └── DEPLOYMENT.md         # Deployment guide
│
├── package.json              # Root package (monorepo)
├── .env.example              # Environment variables template
└── README.md                 # This file
```

---

## 🛠️ Tech Stack

### Frontend (apps/web)
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State:** Zustand / React Context
- **Forms:** React Hook Form + Zod

### Backend (apps/backend)
- **Framework:** FastAPI
- **Language:** Python 3.10+
- **PDF Parsing:** pdfplumber, PyMuPDF
- **AI:** Claude API, LangChain
- **Scraping:** Playwright, BeautifulSoup

### Database
- **Provider:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth
- **Storage:** Supabase Storage (PDF uploads)
- **Real-time:** Supabase Realtime

### Infrastructure
- **Frontend Hosting:** Vercel
- **Backend Hosting:** Railway / Render
- **Database:** Supabase
- **Payments:** Razorpay
- **Email:** Resend
- **Analytics:** PostHog

---

## 📋 Key Features (Planned)

### Health Report AI
- [ ] PDF upload & parsing
- [ ] AI analysis in Hindi/Hinglish
- [ ] Abnormal value highlighting
- [ ] Doctor recommendations
- [ ] Shareable report cards
- [ ] WhatsApp integration

### MedCompare
- [ ] Lab test search
- [ ] Price comparison table
- [ ] Filters (home collection, rating, distance)
- [ ] Booking via WhatsApp/Call
- [ ] Lab partnerships
- [ ] Premium listings

### GenericDawa
- [ ] Medicine search
- [ ] Brand → Generic mapping
- [ ] Price comparison
- [ ] Affiliate links (1mg, PharmEasy)
- [ ] Nearby pharmacy locator

---

## 🤝 Contributing

This is an open-source project (MIT License).

### Ways to Contribute:
1. **Code:** New features, bug fixes, tests
2. **Data:** Add lab prices, medicine database
3. **Design:** UI/UX improvements
4. **Docs:** Better documentation, translations
5. **Outreach:** Spread the word, partner with labs

### Development Setup

```bash
# Fork the repo
git clone https://github.com/your-username/health-stack.git
cd health-stack

# Create branch
git checkout -b feature/your-feature

# Make changes, commit
git commit -m "feat: add your feature"

# Push & create PR
git push origin feature/your-feature
```

---

## 📊 Roadmap

### Phase 1 (Week 1-2): MVP Launch
- [ ] Health Report AI (basic)
- [ ] PDF upload + AI analysis
- [ ] 50 beta users

### Phase 2 (Week 3-4): MedCompare
- [ ] 50 Indore labs listed
- [ ] Price comparison UI
- [ ] Booking flow

### Phase 3 (Week 5-6): GenericDawa
- [ ] Medicine database
- [ ] Generic finder
- [ ] Integration with other products

### Phase 4 (Month 2-6): Growth
- [ ] Indore domination
- [ ] MP expansion
- [ ] Pan-India prep

---

## 📈 Metrics

### Current Status
- **Labs Listed:** 0
- **Users:** 0
- **Reports Analyzed:** 0
- **Revenue:** ₹0

### Month 6 Targets
- **Labs:** 500+
- **Users:** 10,000+
- **Reports:** 5,000+
- **Revenue:** ₹2.5L/month

---

## 📞 Contact

- **Website:** (coming soon)
- **Twitter:** @healthstack_in
- **Email:** hello@healthstack.in

---

## 📄 License

MIT License — see [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

Built with ❤️ for India's healthcare accessibility.

**Inspired by:**
- GasBuddy (price comparison model)
- 1mg, Practo (healthcare aggregation)
- Eka Care (health records)

**Powered by:**
- Open Source (Next.js, FastAPI, Supabase)
- AI (Claude, Gemini)
- India Stack (UPI, Aadhaar, ONDC)

---

*Last Updated: February 20, 2026*

*Version: 0.1.0 (In Development)*
