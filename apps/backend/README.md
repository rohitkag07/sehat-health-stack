# 🏥 Health Stack - Backend

FastAPI backend for Health Stack platform.

## 🚀 Setup

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Install playwright browsers
playwright install
```

## 🏃 Run

```bash
# Development
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## 📁 Structure

```
app/
├── main.py              # FastAPI app entry
├── config.py            # Configuration
├── models/              # Pydantic models
│   ├── reports.py       # Report schemas
│   ├── labs.py          # Lab schemas
│   └── bookings.py      # Booking schemas
├── services/            # Business logic
│   ├── pdf_parser.py    # PDF parsing
│   ├── ai_analyzer.py   # Claude AI analysis
│   ├── scraper.py       # Lab price scraping
│   └── supabase.py      # DB client
└── api/                 # API routes
    ├── reports.py       # Report endpoints
    ├── labs.py          # Lab endpoints
    └── bookings.py      # Booking endpoints
```

## 🔑 Environment

Set these in root `.env.local`:
- `ANTHROPIC_API_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_SUPABASE_URL`

---

Version: 0.1.0
