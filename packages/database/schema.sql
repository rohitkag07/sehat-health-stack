-- ====================================
-- Health Stack Database Schema
-- PostgreSQL (Supabase)
-- ====================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================
-- Users & Authentication
-- ====================================
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  full_name TEXT,
  avatar_url TEXT,
  
  -- Subscription status
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'premium', 'family')),
  subscription_expires_at TIMESTAMP,
  reports_remaining INTEGER DEFAULT 3,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_login_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_phone ON users(phone);

-- ====================================
-- Health Reports (Blood test uploads)
-- ====================================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- File info
  file_name TEXT NOT NULL,
  file_path TEXT,
  file_size INTEGER,
  mime_type TEXT,
  
  -- Patient info (extracted from PDF)
  patient_name TEXT,
  patient_age INTEGER,
  patient_gender TEXT CHECK (patient_gender IN ('male', 'female', 'other')),
  
  -- Lab info
  lab_name TEXT,
  test_date DATE,
  
  -- Analysis results (JSON from AI)
  analysis JSONB,
  -- Structure:
  -- {
  --   "summary": "Hindi summary",
  --   "abnormal_values": [...],
  --   "recommendations": [...],
  --   "urgency": "low|medium|high"
  -- }
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'analyzing', 'completed', 'error')),
  error_message TEXT,
  
  -- Privacy
  is_public BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  analyzed_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_reports_user ON reports(user_id);
CREATE INDEX idx_reports_status ON reports(status);
CREATE INDEX idx_reports_date ON reports(test_date);

-- ====================================
-- Labs (Diagnostic centers)
-- ====================================
CREATE TABLE labs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Basic info
  name TEXT NOT NULL,
  type TEXT CHECK (type IN ('chain', 'local', 'hospital')),
  
  -- Address
  address_line1 TEXT,
  address_line2 TEXT,
  city TEXT DEFAULT 'Indore',
  state TEXT DEFAULT 'Madhya Pradesh',
  pincode TEXT,
  area TEXT, -- e.g., "Vijay Nagar", "South Tukoganj"
  
  -- Location
  latitude DECIMAL(9, 6),
  longitude DECIMAL(9, 6),
  
  -- Contact
  phone TEXT,
  email TEXT,
  website TEXT,
  
  -- Services
  home_collection BOOLEAN DEFAULT FALSE,
  home_collection_charge DECIMAL(10, 2) DEFAULT 0,
  online_reports BOOLEAN DEFAULT TRUE,
  
  -- Business
  rating DECIMAL(3, 2) DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_reviews INTEGER DEFAULT 0,
  price_range TEXT CHECK (price_range IN ('budget', 'mid', 'premium')),
  
  -- Partnership
  is_partner BOOLEAN DEFAULT FALSE,
  partner_since DATE,
  commission_rate DECIMAL(5, 2) DEFAULT 10, -- percentage
  
  -- Premium features
  is_premium_listing BOOLEAN DEFAULT FALSE,
  premium_expires_at TIMESTAMP,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_labs_city ON labs(city);
CREATE INDEX idx_labs_area ON labs(area);
CREATE INDEX idx_labs_type ON labs(type);
CREATE INDEX idx_labs_rating ON labs(rating DESC);

-- ====================================
-- Test Prices (Lab-wise pricing)
-- ====================================
CREATE TABLE test_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
  
  -- Test info
  test_name TEXT NOT NULL, -- standardized: "CBC", "Lipid Profile"
  test_display_name TEXT, -- as shown on lab website
  test_category TEXT, -- "Blood", "Urine", "Hormone", etc.
  
  -- Pricing
  price DECIMAL(10, 2) NOT NULL,
  mrp DECIMAL(10, 2), -- original price (for discounts)
  home_collection_price DECIMAL(10, 2),
  
  -- Service info
  turnaround_hours INTEGER, -- report time
  pre_test_requirements TEXT, -- "Fasting required"
  
  -- Source
  source TEXT DEFAULT 'scraped' CHECK (source IN ('scraped', 'manual', 'api', 'partner')),
  verified BOOLEAN DEFAULT FALSE,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  last_verified_at TIMESTAMP WITH TIME ZONE
);

CREATE INDEX idx_test_prices_lab ON test_prices(lab_id);
CREATE INDEX idx_test_prices_name ON test_prices(test_name);
CREATE INDEX idx_test_prices_category ON test_prices(test_category);
CREATE UNIQUE INDEX idx_unique_lab_test ON test_prices(lab_id, test_name);

-- ====================================
-- Bookings (Test bookings)
-- ====================================
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  lab_id UUID REFERENCES labs(id) ON DELETE CASCADE,
  
  -- Booking details
  test_name TEXT NOT NULL,
  test_price DECIMAL(10, 2) NOT NULL,
  
  -- Patient
  patient_name TEXT NOT NULL,
  patient_age INTEGER,
  patient_gender TEXT,
  patient_phone TEXT NOT NULL,
  
  -- Collection
  collection_type TEXT CHECK (collection_type IN ('center', 'home')),
  collection_date DATE,
  collection_time_slot TEXT, -- "9:00 AM - 11:00 AM"
  collection_address TEXT,
  
  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  confirmed_at TIMESTAMP WITH TIME ZONE,
  completed_at TIMESTAMP WITH TIME ZONE,
  
  -- Payment
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded', 'failed')),
  payment_method TEXT,
  payment_id TEXT,
  
  -- Commission
  commission_amount DECIMAL(10, 2) DEFAULT 0,
  commission_status TEXT DEFAULT 'pending' CHECK (commission_status IN ('pending', 'paid', 'rejected')),
  
  -- Source
  source TEXT DEFAULT 'web' CHECK (source IN ('web', 'whatsapp', 'api', 'referral')),
  referral_code TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_bookings_user ON bookings(user_id);
CREATE INDEX idx_bookings_lab ON bookings(lab_id);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_date ON bookings(created_at);

-- ====================================
-- Medicines Database
-- ====================================
CREATE TABLE medicines (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- Names
  brand_name TEXT NOT NULL,
  generic_name TEXT,
  
  -- Composition
  composition JSONB, -- [{"salt": "Paracetamol", "strength": "500mg"}]
  
  -- Manufacturer
  manufacturer TEXT,
  
  -- Category
  category TEXT CHECK (category IN ('OTC', 'Prescription', 'Controlled')),
  therapeutic_class TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_medicines_brand ON medicines(brand_name);
CREATE INDEX idx_medicines_generic ON medicines(generic_name);
CREATE UNIQUE INDEX idx_unique_medicine ON medicines(brand_name, manufacturer);

-- ====================================
-- Medicine Prices
-- ====================================
CREATE TABLE medicine_prices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  medicine_id UUID REFERENCES medicines(id) ON DELETE CASCADE,
  
  -- Seller
  seller TEXT NOT NULL, -- "1mg", "PharmEasy", "Netmeds", "Local"
  seller_url TEXT,
  
  -- Pricing
  price DECIMAL(10, 2) NOT NULL,
  mrp DECIMAL(10, 2),
  discount DECIMAL(5, 2) DEFAULT 0,
  
  -- Availability
  in_stock BOOLEAN DEFAULT TRUE,
  delivery_hours INTEGER,
  
  -- Source
  last_scraped_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_medicine_prices_medicine ON medicine_prices(medicine_id);
CREATE INDEX idx_medicine_prices_seller ON medicine_prices(seller);
CREATE UNIQUE INDEX idx_unique_medicine_price ON medicine_prices(medicine_id, seller);

-- ====================================
-- User Activity & Analytics
-- ====================================
CREATE TABLE user_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  
  -- Activity
  event_type TEXT NOT NULL, -- "report_uploaded", "report_analyzed", "lab_searched", "booking_made", etc.
  event_data JSONB,
  
  -- Context
  ip_address INET,
  user_agent TEXT,
  session_id TEXT,
  
  -- Metadata
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_user_activities_user ON user_activities(user_id);
CREATE INDEX idx_user_activities_event ON user_activities(event_type);
CREATE INDEX idx_user_activities_date ON user_activities(created_at);

-- ====================================
-- Row Level Security (RLS) Policies
-- ====================================

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activities ENABLE ROW LEVEL SECURITY;

-- Users: Users can only see their own data
CREATE POLICY "Users can view own data"
  ON users FOR SELECT
  USING (auth.uid()::UUID = id);

-- Reports: Users can view own reports, public reports visible to all
CREATE POLICY "Users can view own reports"
  ON reports FOR SELECT
  USING (auth.uid()::UUID = user_id OR is_public = TRUE);

CREATE POLICY "Users can insert own reports"
  ON reports FOR INSERT
  WITH CHECK (auth.uid()::UUID = user_id);

CREATE POLICY "Users can update own reports"
  ON reports FOR UPDATE
  USING (auth.uid()::UUID = user_id);

-- Bookings: Users can view own bookings
CREATE POLICY "Users can view own bookings"
  ON bookings FOR SELECT
  USING (auth.uid()::UUID = user_id);

CREATE POLICY "Users can create own bookings"
  ON bookings FOR INSERT
  WITH CHECK (auth.uid()::UUID = user_id);

-- User Activities: Users can only see own activities
CREATE POLICY "Users can view own activities"
  ON user_activities FOR SELECT
  USING (auth.uid()::UUID = user_id);

CREATE POLICY "Users can insert own activities"
  ON user_activities FOR INSERT
  WITH CHECK (auth.uid()::UUID = user_id);

-- Labs, test_prices, medicines: Public read access
CREATE POLICY "Anyone can view labs"
  ON labs FOR SELECT
  USING (TRUE);

CREATE POLICY "Anyone can view test prices"
  ON test_prices FOR SELECT
  USING (TRUE);

CREATE POLICY "Anyone can view medicines"
  ON medicines FOR SELECT
  USING (TRUE);

CREATE POLICY "Anyone can view medicine prices"
  ON medicine_prices FOR SELECT
  USING (TRUE);

-- ====================================
-- Functions & Triggers
-- ====================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at BEFORE UPDATE ON reports
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_labs_updated_at BEFORE UPDATE ON labs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_test_prices_updated_at BEFORE UPDATE ON test_prices
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- Initial Data (Indore Labs)
-- ====================================
-- Insert some initial lab data (to be expanded)
INSERT INTO labs (name, type, area, phone, home_collection, rating) VALUES
('Dr. Lal PathLabs - Vijay Nagar', 'chain', 'Vijay Nagar', '+91-731-XXXXXXX', TRUE, 4.3),
('Redcliffe Labs - South Tukoganj', 'chain', 'South Tukoganj', '+91-731-XXXXXXX', TRUE, 4.1),
('Thyrocare - Indore', 'chain', 'Indore', '+91-731-XXXXXXX', TRUE, 4.2),
('Metropolis - Palasia', 'chain', 'Palasia', '+91-731-XXXXXXX', TRUE, 4.0),
('Gupta Pathology Lab', 'local', 'Vijay Nagar', '+91-731-XXXXXXX', FALSE, 4.5)
ON CONFLICT DO NOTHING;

-- ====================================
-- Comments for Documentation
-- ====================================
COMMENT ON TABLE users IS 'User accounts with subscription info';
COMMENT ON TABLE reports IS 'Blood test report uploads and AI analysis';
COMMENT ON TABLE labs IS 'Diagnostic labs in Indore';
COMMENT ON TABLE test_prices IS 'Test prices across different labs';
COMMENT ON TABLE bookings IS 'Lab test bookings through platform';
COMMENT ON TABLE medicines IS 'Medicine database (brand + generic)';
COMMENT ON TABLE medicine_prices IS 'Medicine prices across sellers (1mg, PharmEasy, etc.)';
