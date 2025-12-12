-- Create subscribers table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  product TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_subscribers_email ON subscribers(email);

-- Enable Row Level Security (optional, but recommended)
ALTER TABLE subscribers ENABLE ROW LEVEL SECURITY;

-- Create policy to allow service role to insert (for API)
-- Note: Service role bypasses RLS, but this is good practice
CREATE POLICY "Service role can insert subscribers"
  ON subscribers
  FOR INSERT
  WITH CHECK (true);

-- Optional: Create a view for analytics
CREATE OR REPLACE VIEW subscriber_stats AS
SELECT 
  COUNT(*) as total_subscribers,
  COUNT(DISTINCT product) as unique_products,
  DATE_TRUNC('day', subscribed_at) as date,
  COUNT(*) as daily_count
FROM subscribers
GROUP BY DATE_TRUNC('day', subscribed_at)
ORDER BY date DESC;

