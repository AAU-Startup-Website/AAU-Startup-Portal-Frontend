-- Minimal schema for AAU Startup Portal Apply page
-- This creates only the tables needed for application submissions

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types if they don't exist
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('Founder', 'Investor', 'Mentor', 'Admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE application_status AS ENUM ('draft', 'submitted', 'under_review', 'approved', 'rejected');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create users table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.users (
  id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name text,
  last_name text,
  username text UNIQUE,
  email text UNIQUE,
  role user_role DEFAULT 'Founder'::user_role,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id)
);

-- Create applications table
CREATE TABLE IF NOT EXISTS public.applications (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  status application_status DEFAULT 'submitted'::application_status,

  -- Problem step
  problem_statement text NOT NULL,
  target_audience text,
  problem_size text,
  urgency text,
  current_solutions text,

  -- Solution step
  solution_description text NOT NULL,
  value_proposition text,
  product_type text,
  development_stage text,

  -- Market step
  market_size text,
  target_market text,
  competitors text,
  customer_acquisition text,
  revenue_model text,

  -- Team step
  team_vision text,
  team_members jsonb, -- Array of team member objects
  team_gaps text,

  -- Business step
  company_name text NOT NULL,
  sectors text,
  business_stage text,
  business_model text,
  funding_needs text,
  traction text,
  challenges text,
  timeline text,

  -- Additional info
  additional_info text,
  agreements jsonb,

  -- Metadata
  submitted_at timestamp with time zone DEFAULT now(),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),

  CONSTRAINT applications_pkey PRIMARY KEY (id)
  -- Removed unique constraint on user_id to allow application updates
);

-- Drop the unique constraint if it exists (for existing databases)
ALTER TABLE public.applications DROP CONSTRAINT IF EXISTS applications_user_id_unique;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_status ON public.applications(status);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
DROP POLICY IF EXISTS "Users can view their own profile" ON public.users;
CREATE POLICY "Users can view their own profile" ON public.users
  FOR SELECT USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.users;
CREATE POLICY "Users can update their own profile" ON public.users
  FOR UPDATE USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert their own profile" ON public.users;
CREATE POLICY "Users can insert their own profile" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for applications table
DROP POLICY IF EXISTS "Users can view their own applications" ON public.applications;
CREATE POLICY "Users can view their own applications" ON public.applications
  FOR SELECT USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can create their own applications" ON public.applications;
CREATE POLICY "Users can create their own applications" ON public.applications
  FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own applications" ON public.applications;
CREATE POLICY "Users can update their own applications" ON public.applications
  FOR UPDATE USING (auth.uid() = user_id);

-- Admin policies (for future admin functionality)
DROP POLICY IF EXISTS "Admins can view all applications" ON public.applications;
CREATE POLICY "Admins can view all applications" ON public.applications
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()
      AND users.role = 'Admin'::user_role
    )
  );

DROP POLICY IF EXISTS "Admins can update all applications" ON public.applications;
CREATE POLICY "Admins can update all applications" ON public.applications
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.users
      WHERE users.id = auth.uid()
      AND users.role = 'Admin'::user_role
    )
  );

-- Function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.users (id, email, first_name, last_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    (NEW.raw_user_meta_data->>'role')::user_role
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create user profile on signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
DROP TRIGGER IF EXISTS update_users_updated_at ON public.users;
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON public.users
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

DROP TRIGGER IF EXISTS update_applications_updated_at ON public.applications;
CREATE TRIGGER update_applications_updated_at
  BEFORE UPDATE ON public.applications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();