# 🏥 Health Stack — Complete Project Roadmap

> **Mission:** Build India's most trusted healthcare comparison ecosystem, starting from Indore.

---

## 📋 **Executive Summary**

| Metric | Target |
|--------|--------|
| **Launch Market** | Indore, Madhya Pradesh |
| **Products** | 3 (Health Report AI, MedCompare, GenericDawa) |
| **Timeline** | 6 weeks to MVP, 6 months to pan-India |
| **Initial Cost** | ₹0 - ₹2,500/month |
| **Revenue Target (Month 6)** | ₹1-2L/month |
| **Revenue Target (Year 1)** | ₹5-9L/month |

---

## 🎯 **Phase 0: Foundation (Week 0 — Preparation)**

### **0.1 Market Research & Validation**

| Task | Description | Status |
|------|-------------|--------|
| Competitor Analysis | Study 1mg, Practo, BookMeriLab, Eka Care | ⏳ Pending |
| User Interviews | Talk to 20-30 Indore residents about healthcare pain points | ⏳ Pending |
| Lab Identification | List top 50 labs in Indore (chains + local) | ⏳ Pending |
| Price Data Collection | Manually collect prices for 10 common tests from 20 labs | ⏳ Pending |

**Common Tests to Track:**
- CBC (Complete Blood Count)
- Lipid Profile
- Liver Function Test (LFT)
- Kidney Function Test (KFT)
- Thyroid Profile (TSH, T3, T4)
- HbA1c (Diabetes)
- Vitamin B12
- Vitamin D3
- Urine Routine
- Stool Routine

**Deliverable:** Google Sheet with 50 labs × 10 tests = 500 data points

---

### **0.2 Tech Stack Finalization**

| Component | Choice | Reason |
|-----------|--------|--------|
| **Frontend** | Next.js 14 (App Router) | SEO-first, server components, Vercel deploy |
| **Backend** | Next.js API Routes + Python FastAPI | Hybrid approach (JS for web, Python for AI/scraping) |
| **Database** | Supabase (PostgreSQL) | Free tier, easy scaling, real-time |
| **AI/LLM** | Claude API (report analysis) + Gemini (fallback) | Best for medical text understanding |
| **PDF Parsing** | pdfplumber (Python) + Azure Form Recognizer | Accurate table extraction from reports |
| **Hosting** | Vercel (frontend) + Railway/Render (backend) | Free tiers, easy CI/CD |
| **Scraping** | Playwright + BeautifulSoup | Handle JS-heavy sites |
| **Payments** | Razorpay | Best for India, UPI support |
| **Analytics** | PostHog (self-hosted) | Privacy-first, free tier |
| **Email** | Resend | Simple API, free tier |

**Total Monthly Cost (Start):**
- Supabase: Free → ₹500 (after free tier)
- Claude API: ₹500-2000 (usage-based)
- Hosting: Free (Vercel + Railway free tiers)
- Domain: ₹800/year
- **Total: ₹0-2,500/month**

---

### **0.3 Project Structure Setup**

```
health-stack/
├── apps/
│   ├── web/                    # Next.js frontend (all 3 products)
│   ├── backend/                # FastAPI backend (AI, scraping)
│   └── mobile/                 # React Native (Phase 3)
│
├── packages/
│   ├── database/               # Supabase schema, migrations
│   ├── shared/                 # Shared utilities, types
│   └── ui/                     # Reusable UI components
│
├── tools/
│   ├── scraper/                # Lab price scraping scripts
│   ├── pdf-parser/             # Blood report PDF parser
│   └── seo-generator/          # Auto-generate SEO pages
│
├── data/
│   ├── labs/                   # Lab database (CSV/JSON)
│   ├── medicines/              # Generic medicine database
│   └── test-ranges/            # Normal ranges reference
│
├── docs/
│   ├── ROADMAP.md              # This file
│   ├── ARCHITECTURE.md         # System design
│   ├── API.md                  # API documentation
│   └── DEPLOYMENT.md           # Deployment guide
│
└── infra/
    ├── vercel.json             # Vercel config
    ├── docker-compose.yml      # Local development
    └── terraform/              # Infra as code (Phase 3)
```

---

## 🚀 **Phase 1: Health Report AI (Week 1-2)**

### **Week 1: Core Development**

#### **Day 1-2: Setup & PDF Parsing**

| Task | Details | Done |
|------|---------|------|
| Initialize Next.js project | `npx create-next-app@latest` | ⏳ |
| Setup Supabase | Create project, tables, RLS policies | ⏳ |
| PDF upload component | React dropzone, file validation | ⏳ |
| PDF parsing backend | Python script with pdfplumber | ⏳ |
| Test with sample reports | 10 real blood reports | ⏳ |

**PDF Parsing Requirements:**
- Extract patient name, age, gender
- Extract test name, value, unit, normal range
- Handle tables (most reports are tabular)
- Handle different lab formats (Dr. Lal, Redcliffe, local labs)

---

#### **Day 3-4: AI Analysis Engine**

| Task | Details | Done |
|------|---------|------|
| Claude API integration | Setup API, test prompts | ⏳ |
| Analysis prompt engineering | Create system prompt for medical analysis | ⏳ |
| Hindi/Hinglish output | Configure AI to respond in simple Hindi | ⏳ |
| Normal range comparison | Flag high/low values | ⏳ |
| Generate summary | 3-5 line plain language summary | ⏳ |

**Example AI Prompt:**
```
You are a helpful medical report analyzer for Indian users.

INPUT:
- Patient: {name}, {age} years, {gender}
- Test Results: [{test_name}: {value} {unit} (normal: {range})]

TASK:
1. Compare each value against normal range
2. Flag abnormal values (HIGH/LOW)
3. Explain what each abnormal value means in simple Hindi/Hinglish
4. Suggest if doctor consultation is needed
5. Keep it friendly, not alarming

OUTPUT FORMAT (JSON):
{
  "summary": "2-3 line overall health summary in Hindi",
  "abnormal_values": [
    {"test": "Hemoglobin", "value": 10.5, "status": "LOW", "explanation": "..."}
  ],
  "recommendations": ["Iron-rich khana khao", "Doctor ko dikhao"],
  "urgency": "low|medium|high"
}
```

---

#### **Day 5-6: Frontend UI**

| Task | Details | Done |
|------|---------|------|
| Upload page | Clean, simple hero + dropzone | ⏳ |
| Loading state | Progress indicator during analysis | ⏳ |
| Results page | Card layout for each test, color-coded | ⏳ |
| Summary section | Top of page, plain Hindi | ⏳ |
| Download PDF | Generate shareable report card | ⏳ |
| Share button | WhatsApp, Telegram share links | ⏳ |

**UI Design Principles:**
- Mobile-first (90% users on phone)
- Large fonts (elderly users)
- Color-blind friendly (don't rely only on red/green)
- Simple Hindi (8th grade reading level)

---

#### **Day 7: Testing & Polish**

| Task | Details | Done |
|------|---------|------|
| Test with 50 reports | Different formats, ages, conditions | ⏳ |
| Fix parsing errors | Handle edge cases | ⏳ |
| Performance optimization | <5 second analysis time | ⏳ |
| Error handling | Graceful failures, retry logic | ⏳ |
| Analytics setup | Track uploads, errors, time | ⏳ |

---

### **Week 2: Launch Prep**

#### **Day 8-9: Monetization Setup**

| Task | Details | Done |
|------|---------|------|
| Freemium logic | 3 free reports → paywall | ⏳ |
| Razorpay integration | ₹99/month subscription | ⏳ |
| User accounts | Email/password + Google login | ⏳ |
| Usage tracking | Count reports per user | ⏳ |
| Payment webhooks | Activate subscription on payment | ⏳ |

---

#### **Day 10-11: Growth Features**

| Task | Details | Done |
|------|---------|------|
| Referral system | "Invite 3 friends → unlimited reports" | ⏳ |
| WhatsApp bot | Upload report via WhatsApp, get analysis | ⏳ |
| Social sharing | Auto-generate image for Instagram/Twitter | ⏳ |
| Email reports | Send analysis to user's email | ⏳ |

---

#### **Day 12-13: Marketing Prep**

| Task | Details | Done |
|------|---------|------|
| Landing page | SEO-optimized, clear value prop | ⏳ |
| Demo video | 2-min Loom showing how it works | ⏳ |
| Social media accounts | Twitter, Instagram, LinkedIn | ⏳ |
| Launch post | Draft for Product Hunt, Reddit, Twitter | ⏳ |
| Press release | Local Indore news outlets | ⏳ |

---

#### **Day 14: SOFT LAUNCH 🚀**

**Launch Checklist:**
- [ ] Deploy to production (Vercel)
- [ ] Test payment flow end-to-end
- [ ] Verify all analytics working
- [ ] Setup error monitoring (Sentry)
- [ ] Create support email/WhatsApp
- [ ] Invite 50 beta users (friends, family)
- [ ] Collect feedback, fix critical bugs

**Success Metrics (Week 1):**
- 100 report uploads
- 10 paid conversions
- <2% error rate
- 4+ star average rating

---

## 🔬 **Phase 2: MedCompare (Week 3-4)**

### **Week 3: Data & Scraping**

#### **Day 15-17: Lab Price Scraping**

| Task | Details | Done |
|------|---------|------|
| Identify target labs | 50 labs in Indore (20 chains + 30 local) | ⏳ |
| Build scrapers | Playwright scripts for each lab website | ⏳ |
| Handle anti-scraping | Rotating proxies, rate limiting | ⏳ |
| Data normalization | Standardize test names across labs | ⏳ |
| Database population | Store in Supabase `labs` and `test_prices` tables | ⏳ |

**Scraping Targets:**
| Lab Type | Count | Priority |
|----------|-------|----------|
| Dr. Lal PathLabs | 5 locations | HIGH |
| Redcliffe Labs | 4 locations | HIGH |
| Thyrocare | Home collection | HIGH |
| Metropolis | 3 locations | MEDIUM |
| Local labs (Vijay Nagar, etc.) | 30+ | HIGH |

**Data Schema:**
```sql
CREATE TABLE labs (
  id UUID PRIMARY KEY,
  name TEXT,
  type TEXT, -- chain|local
  address TEXT,
  phone TEXT,
  website TEXT,
  home_collection BOOLEAN,
  rating DECIMAL,
  created_at TIMESTAMP
);

CREATE TABLE test_prices (
  id UUID PRIMARY KEY,
  lab_id UUID REFERENCES labs(id),
  test_name TEXT, -- standardized
  test_display_name TEXT, -- as shown on lab website
  price DECIMAL,
  home_collection_price DECIMAL,
  turnaround_hours INTEGER,
  last_updated TIMESTAMP
);
```

---

#### **Day 18-19: Manual Data Collection**

**Why Manual?**
- Not all labs have websites
- Some sites are hard to scrape
- Verify scraped data accuracy
- Build relationships with lab owners

**Collection Script:**
```
For each lab in Indore:
1. Visit physically or call
2. Ask for price list for 10 common tests
3. Note: Home collection? Discount? Report time?
4. Enter in Google Sheet
5. Import to database
```

**Target:** 50 labs × 10 tests = 500 data points

---

### **Week 4: Comparison Platform**

#### **Day 20-22: Search & Comparison UI**

| Task | Details | Done |
|------|---------|------|
| Search page | Google-like search bar, autocomplete | ⏳ |
| Results page | Table view (labs × prices), sort/filter | ⏳ |
| Lab cards | Rating, distance, turnaround time | ⏳ |
| Price history | Show if price changed recently | ⏳ |
| Map integration | Show lab locations on map | ⏳ |

**Search Experience:**
```
User types: "CBC test near me"
             ↓
Autocomplete: "CBC test in Vijay Nagar"
              "CBC test home collection"
              "CBC test cheap"
             ↓
Results:      23 labs found
              Sort by: Price (low→high)
              Filters: Home collection, Rating 4+, <24hr
```

---

#### **Day 23-24: Booking Flow**

| Task | Details | Done |
|------|---------|------|
| Booking form | Name, phone, test, preferred date | ⏳ |
| WhatsApp integration | Send booking details to lab via WhatsApp | ⏳ |
| Call integration | Click-to-call from app | ⏳ |
| Booking confirmation | SMS/WhatsApp to user | ⏳ |
| Lab dashboard | Simple web portal for labs to see bookings | ⏳ |

**Booking Flow:**
```
User selects lab
    ↓
Fills: Name, Phone, Test, Date
    ↓
Option A: WhatsApp → Opens chat with pre-filled message
Option B: Call → Opens phone dialer with lab number
Option C: Form submit → We forward to lab via WhatsApp API
    ↓
User gets confirmation: "Booking confirmed! Lab will call you."
```

---

#### **Day 25-26: Monetization**

| Task | Details | Done |
|------|---------|------|
| Affiliate tracking | Track which user booked which lab | ⏳ |
| Commission logic | 10-15% per booking | ⏳ |
| Premium listings | Labs can pay for top placement | ⏳ |
| Lab dashboard (paid) | Analytics, lead management | ⏳ |
| Razorpay for labs | UPI/Card payment for premium | ⏳ |

---

#### **Day 27-28: Integration + Launch**

| Task | Details | Done |
|------|---------|------|
| Integrate with Health Report AI | "Your cholesterol is high" → "Book Lipid Profile" | ⏳ |
| SEO pages | Auto-generate 500 pages (test × location) | ⏳ |
| Soft launch | Invite beta users, labs | ⏳ |
| Collect feedback | Fix bugs, improve UX | ⏳ |

---

## 💊 **Phase 3: GenericDawa (Week 5-6)**

### **Week 5: Medicine Database**

#### **Day 29-31: Data Collection**

| Task | Details | Done |
|------|---------|------|
| Download CDSCO database | Government's drug database (public) | ⏳ |
| Parse medicine data | Brand name → Generic name → Composition | ⏳ |
| Price data | Scrape 1mg, PharmEasy, Netmeds | ⏳ |
| Build matching algo | "Crocin" → "Paracetamol 500mg" | ⏳ |
| Database population | Store in Supabase `medicines` table | ⏳ |

**Data Schema:**
```sql
CREATE TABLE medicines (
  id UUID PRIMARY KEY,
  brand_name TEXT, -- Crocin
  generic_name TEXT, -- Paracetamol
  composition JSONB, -- [{"salt": "Paracetamol", "strength": "500mg"}]
  manufacturer TEXT, -- GSK
  category TEXT, -- OTC|Prescription
  created_at TIMESTAMP
);

CREATE TABLE medicine_prices (
  id UUID PRIMARY KEY,
  medicine_id UUID REFERENCES medicines(id),
  seller TEXT, -- 1mg|PharmEasy|Netmeds|Local
  price DECIMAL,
  url TEXT,
  last_updated TIMESTAMP
);
```

---

#### **Day 32-33: Search UI**

| Task | Details | Done |
|------|---------|------|
| Search page | Medicine name search | ⏳ |
| Results page | Brand vs Generic comparison | ⏳ |
| Savings calculator | "You save ₹23 (92%)" | ⏳ |
| Nearby pharmacies | Show local pharmacies with stock | ⏳ |
| Buy online links | Affiliate links to 1mg, etc. | ⏳ |

---

### **Week 6: Full Integration**

#### **Day 34-36: Ecosystem Integration**

| Task | Details | Done |
|------|---------|------|
| Single user account | One login for all 3 products | ⏳ |
| Cross-sell flows | Report AI → MedCompare → GenericDawa | ⏳ |
| Unified dashboard | User sees all health data in one place | ⏳ |
| WhatsApp bot | All 3 products accessible via WhatsApp | ⏳ |

**User Journey:**
```
1. User uploads blood report (Health Report AI)
   → "Aapka cholesterol high hai"
   
2. Suggests: "Lipid Profile test karwao" (MedCompare)
   → User books test at ₹299 (saves ₹200)
   
3. Test confirms issue → Doctor prescribes Atorvastatin
   → GenericDawa: "Brand ₹500, Generic ₹50"
   → User buys generic, saves ₹450
   
4. User trusts platform → Returns for next test
```

---

#### **Day 37-39: Marketing + Scale Prep**

| Task | Details | Done |
|------|---------|------|
| SEO audit | All 1500 pages indexed | ⏳ |
| Content marketing | 10 blog posts on health topics | ⏳ |
| Social proof | Collect 50+ testimonials | ⏳ |
| Press coverage | Indore news, health blogs | ⏳ |
| Partnership talks | Labs, pharmacies, clinics | ⏳ |

---

#### **Day 40: GRAND LAUNCH 🚀**

**Launch Checklist:**
- [ ] All 3 products live
- [ ] Integration tested end-to-end
- [ ] Payment flows working
- [ ] Support system ready
- [ ] Analytics dashboard
- [ ] Launch announcement (Twitter, LinkedIn, Product Hunt)
- [ ] Press release
- [ ] Influencer outreach

**Success Metrics (Month 1):**
- 1,000 report uploads
- 200 lab bookings
- 500 medicine searches
- ₹50K revenue
- 4.5+ star rating

---

## 📈 **Phase 4: Growth & Scaling (Month 2-6)**

### **Month 2: Indore Domination**

| Goal | Target |
|------|--------|
| Labs onboarded | 100+ |
| Monthly users | 5,000+ |
| Monthly revenue | ₹1L+ |
| Team | 2-3 interns (data collection) |

**Key Initiatives:**
- Offline marketing (flyers in clinics, gyms)
- Partnership with 20+ doctors (referrals)
- Corporate wellness (employee health checks)
- WhatsApp community building

---

### **Month 3-4: MP Expansion**

| City | Priority |
|------|----------|
| Bhopal | HIGH |
| Gwalior | MEDIUM |
| Jabalpur | MEDIUM |
| Ujjain | LOW |

**Expansion Playbook:**
1. Scrape/collect lab data for new city
2. Local SEO pages (auto-generated)
3. Partner with 5-10 key labs
4. Launch Facebook/Instagram ads (geo-targeted)
5. Local press coverage

---

### **Month 5-6: Pan-India Prep**

| Milestone | Target |
|-----------|--------|
| Cities covered | 20+ |
| Labs onboarded | 500+ |
| Monthly users | 50,000+ |
| Monthly revenue | ₹5-10L |
| Team | 8-10 people |

**Fundraising Prep:**
- Pitch deck ready
- Metrics dashboard (MoM growth)
- Customer testimonials
- Unit economics (CAC, LTV)
- Target investors: Healthtech VCs

---

## 🔐 **Phase 5: Moat Building (Month 6-12)**

### **Competitive Advantages**

| Moat | How |
|------|-----|
| **Data Network Effect** | More users → more price data → better comparisons |
| **Lab Relationships** | Direct integration with labs (API, not scraping) |
| **Brand Trust** | Become synonymous with "healthcare comparison" |
| **Regional Language** | Hindi + 5 more languages (Tamil, Telugu, etc.) |
| **Ecosystem Lock-in** | 3 products = 3x retention |

---

### **New Features (Year 1)**

| Feature | Description | Priority |
|---------|-------------|----------|
| **Doctor Connect** | Book doctors based on report analysis | HIGH |
| **Health Packages** | Curated checkup bundles | HIGH |
| **Family Accounts** | Manage family health in one place | MEDIUM |
| **Medicine Reminders** | Daily pill reminders via WhatsApp | MEDIUM |
| **Health Insurance** | Compare & buy insurance | LOW |
| **Teleconsultation** | Video calls with doctors | LOW |

---

## 📊 **Financial Projections**

### **Revenue Model Breakdown**

| Stream | Month 1 | Month 6 | Month 12 |
|--------|---------|---------|----------|
| Health Report AI (subscriptions) | ₹5K | ₹50K | ₹2L |
| MedCompare (commissions) | ₹10K | ₹1L | ₹3L |
| GenericDawa (affiliates) | ₹5K | ₹50K | ₹2L |
| Premium Listings (labs) | ₹0 | ₹30K | ₹1.5L |
| Data Licensing | ₹0 | ₹0 | ₹50K |
| Ads | ₹0 | ₹20K | ₹1L |
| **TOTAL** | **₹20K** | **₹2.5L** | **₹10L** |

---

### **Cost Structure**

| Expense | Month 1 | Month 6 | Month 12 |
|---------|---------|---------|----------|
| Infrastructure (hosting, APIs) | ₹2K | ₹10K | ₹50K |
| Marketing | ₹5K | ₹50K | ₹2L |
| Team (interns/employees) | ₹10K | ₹1L | ₹4L |
| Legal/Compliance | ₹5K | ₹10K | ₹20K |
| Office/Admin | ₹0 | ₹20K | ₹50K |
| **TOTAL** | **₹22K** | **₹1.9L** | **₹7.6L** |

---

### **Profitability**

| Metric | Month 1 | Month 6 | Month 12 |
|--------|---------|---------|----------|
| Revenue | ₹20K | ₹2.5L | ₹10L |
| Costs | ₹22K | ₹1.9L | ₹7.6L |
| **Profit/Loss** | **-₹2K** | **₹60K** | **₹2.4L** |
| **Margin** | -10% | 24% | 24% |

**Break-even:** Month 4-5

---

## ⚠️ **Risk Assessment**

### **High Risks**

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **Legal (medical advice)** | Medium | High | Disclaimers, "not medical advice", doctor partnerships |
| **Lab partnerships fail** | Medium | Medium | Start with scraping, build relationships later |
| **Low user adoption** | Low | High | Aggressive marketing, referral incentives |
| **Competition copies us** | High | Medium | Speed, network effects, brand building |

### **Medium Risks**

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| **API costs spike** | Low | Medium | Cache responses, optimize AI calls |
| **Scraping blocked** | Medium | Low | Manual data collection, partnerships |
| **Payment failures** | Low | Medium | Multiple gateways (Razorpay + Instamojo) |
| **Team attrition** | Low | Medium | Equity pool, good culture |

---

## ✅ **Success Metrics**

### **North Star Metric**
> **"Healthy Actions Completed"** = Reports analyzed + Tests booked + Medicines saved

### **KPIs by Product**

| Product | Metric | Target (Month 6) |
|---------|--------|------------------|
| Health Report AI | Reports/month | 5,000 |
| Health Report AI | Conversion to paid | 5% |
| MedCompare | Lab bookings/month | 500 |
| MedCompare | Avg commission/booking | ₹100 |
| GenericDawa | Searches/month | 10,000 |
| GenericDawa | Affiliate conversion | 3% |

### **Company-Level KPIs**

| Metric | Month 1 | Month 6 | Month 12 |
|--------|---------|---------|----------|
| MAU (Monthly Active Users) | 500 | 10,000 | 100,000 |
| Revenue | ₹20K | ₹2.5L | ₹10L |
| CAC (Customer Acquisition Cost) | ₹200 | ₹100 | ₹50 |
| LTV (Lifetime Value) | ₹500 | ₹1,000 | ₹2,000 |
| LTV:CAC Ratio | 2.5:1 | 10:1 | 40:1 |
| NPS (Net Promoter Score) | 30 | 50 | 70 |

---

## 🎯 **Milestone Checklist**

### **✅ Phase 1 (Week 2): Health Report AI Live**
- [ ] 100 beta users
- [ ] 10 paid conversions
- [ ] <2% error rate

### **✅ Phase 2 (Week 4): MedCompare Live**
- [ ] 50 labs listed
- [ ] 20 bookings
- [ ] ₹5K commission

### **✅ Phase 3 (Week 6): GenericDawa Live**
- [ ] 1,000 medicines in database
- [ ] 100 searches/day
- [ ] ₹5K affiliate revenue

### **✅ Phase 4 (Month 3): MP Expansion**
- [ ] 3 cities live
- [ ] 100 labs onboarded
- [ ] ₹1L/month revenue

### **✅ Phase 5 (Month 6): Scale**
- [ ] 10 cities live
- [ ] 500 labs onboarded
- [ ] ₹2.5L/month revenue
- [ ] Team of 5-8

### **✅ Phase 6 (Month 12): Market Leader**
- [ ] Pan-India presence
- [ ] 1,000+ labs
- [ ] ₹10L/month revenue
- [ ] Fundraising ready

---

## 📞 **Next Actions (This Week)**

### **Day 1 (Today):**
- [ ] Finalize this roadmap
- [ ] Setup project repo structure
- [ ] Create Supabase project
- [ ] Start lab data collection (first 10 labs)

### **Day 2-3:**
- [ ] Initialize Next.js project
- [ ] Build PDF upload component
- [ ] Test PDF parsing with 5 sample reports

### **Day 4-5:**
- [ ] Claude API integration
- [ ] Prompt engineering for analysis
- [ ] Hindi output testing

### **Day 6-7:**
- [ ] UI polish
- [ ] Beta user recruitment (20 people)
- [ ] Soft launch prep

---

## 📚 **Resources**

### **Documentation:**
- [ARCHITECTURE.md](./ARCHITECTURE.md) — System design
- [API.md](./API.md) — API documentation
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Deployment guide

### **External Links:**
- Supabase: https://supabase.com
- Next.js: https://nextjs.org
- Claude API: https://anthropic.com
- Razorpay: https://razorpay.com

### **Competitors:**
- 1mg: https://1mg.com
- Practo: https://practo.com
- Eka Care: https://ekacare.com

---

## 💬 **Questions?**

This roadmap is a living document. Update it as you learn and iterate.

**Remember:** Speed > Perfection. Launch fast, learn faster.

---

*Last Updated: February 20, 2026*
*Version: 1.0*
