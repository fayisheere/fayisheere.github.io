-- =====================================================
-- Supabase Database Setup for Portfolio Contact Form
-- =====================================================
-- Run this in your Supabase SQL Editor
-- This creates the contacts table and sets up security

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL CHECK (char_length(name) >= 2 AND char_length(name) <= 100),
  email TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  message TEXT NOT NULL CHECK (char_length(message) >= 10 AND char_length(message) <= 5000),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc', now()),
  read BOOLEAN DEFAULT false,
  replied BOOLEAN DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (for public contact form)
CREATE POLICY "Anyone can submit contact form"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create policy to allow authenticated users to view all contacts
-- (for admin panel - you'll need to authenticate)
CREATE POLICY "Authenticated users can view contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

-- Create policy to allow authenticated users to update contacts
-- (for marking as read/replied)
CREATE POLICY "Authenticated users can update contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_contacts_created_at ON contacts(created_at DESC);
CREATE INDEX idx_contacts_read ON contacts(read) WHERE read = false;

-- Optional: Create a view for unread messages
CREATE OR REPLACE VIEW unread_contacts AS
SELECT * FROM contacts
WHERE read = false
ORDER BY created_at DESC;

-- Grant access to the view
GRANT SELECT ON unread_contacts TO authenticated;

-- =====================================================
-- Optional: Email Notification Setup
-- =====================================================
-- If you want to receive email notifications when someone contacts you,
-- you can set up a Supabase Edge Function or use Database Webhooks.
--
-- See README.md for detailed instructions on setting up email notifications.

-- =====================================================
-- Testing the Setup
-- =====================================================
-- Run these queries to test:

-- Test insert (as anon user - should work)
-- INSERT INTO contacts (name, email, message) 
-- VALUES ('Test User', 'test@example.com', 'This is a test message');

-- View all contacts (requires authentication)
-- SELECT * FROM contacts ORDER BY created_at DESC;

-- View unread contacts (requires authentication)
-- SELECT * FROM unread_contacts;

-- Mark a message as read (requires authentication)
-- UPDATE contacts SET read = true WHERE id = 'your-message-id';

-- Delete test data
-- DELETE FROM contacts WHERE email = 'test@example.com';

-- =====================================================
-- Success!
-- =====================================================
-- Your database is now ready to receive contact form submissions!
-- 
-- Next steps:
-- 1. Copy your Supabase URL and anon key
-- 2. Update them in your React app
-- 3. Test the contact form
-- 4. Set up email notifications (optional)
