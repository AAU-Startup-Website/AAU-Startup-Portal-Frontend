-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.announcements (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT announcements_pkey PRIMARY KEY (id)
);
CREATE TABLE public.bookings (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  resource_id uuid NOT NULL,
  user_id uuid NOT NULL,
  start_time timestamp with time zone NOT NULL,
  end_time timestamp with time zone NOT NULL,
  status text DEFAULT 'Pending'::text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT bookings_pkey PRIMARY KEY (id),
  CONSTRAINT bookings_resource_id_fkey FOREIGN KEY (resource_id) REFERENCES public.resources(id),
  CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.education (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  profile_id uuid NOT NULL,
  school_name text NOT NULL,
  degree_lvl text,
  field_of_study text,
  start_date date,
  finish_date date,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT education_pkey PRIMARY KEY (id),
  CONSTRAINT education_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.events (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  description text,
  event_date timestamp with time zone,
  location text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT events_pkey PRIMARY KEY (id)
);
CREATE TABLE public.ideas (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  startup_id uuid NOT NULL,
  description text NOT NULL,
  competitors text,
  income_source text,
  category USER-DEFINED,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT ideas_pkey PRIMARY KEY (id),
  CONSTRAINT ideas_startup_id_fkey FOREIGN KEY (startup_id) REFERENCES public.startups(id)
);
CREATE TABLE public.investor_interests (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  startup_id uuid NOT NULL,
  investor_id uuid NOT NULL,
  interest_level text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT investor_interests_pkey PRIMARY KEY (id),
  CONSTRAINT investor_interests_startup_id_fkey FOREIGN KEY (startup_id) REFERENCES public.startups(id),
  CONSTRAINT investor_interests_investor_id_fkey FOREIGN KEY (investor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.mentor_assignments (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  startup_id uuid NOT NULL,
  mentor_id uuid NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT mentor_assignments_pkey PRIMARY KEY (id),
  CONSTRAINT mentor_assignments_startup_id_fkey FOREIGN KEY (startup_id) REFERENCES public.startups(id),
  CONSTRAINT mentor_assignments_mentor_id_fkey FOREIGN KEY (mentor_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.messages (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  sender_id uuid NOT NULL,
  recipient_id uuid NOT NULL,
  content text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT messages_pkey PRIMARY KEY (id),
  CONSTRAINT messages_sender_id_fkey FOREIGN KEY (sender_id) REFERENCES public.users(id),
  CONSTRAINT messages_recipient_id_fkey FOREIGN KEY (recipient_id) REFERENCES public.users(id)
);
CREATE TABLE public.milestones_kpis (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  startup_id uuid NOT NULL,
  phase_id uuid NOT NULL,
  title text NOT NULL,
  target numeric NOT NULL,
  current numeric NOT NULL,
  evidence_url text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT milestones_kpis_pkey PRIMARY KEY (id),
  CONSTRAINT milestones_kpis_startup_id_fkey FOREIGN KEY (startup_id) REFERENCES public.startups(id),
  CONSTRAINT milestones_kpis_phase_id_fkey FOREIGN KEY (phase_id) REFERENCES public.phases(id)
);
CREATE TABLE public.notifications (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  type text NOT NULL,
  content text NOT NULL,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT notifications_pkey PRIMARY KEY (id),
  CONSTRAINT notifications_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.phases (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name USER-DEFINED NOT NULL,
  order_number integer NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT phases_pkey PRIMARY KEY (id)
);
CREATE TABLE public.profiles (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL UNIQUE,
  age integer,
  phone_number text,
  gender USER-DEFINED,
  location text,
  responsibility text,
  equity_percent numeric,
  status USER-DEFINED,
  availability text,
  linkedin text,
  personal_website text,
  github text,
  twitter text,
  accomplishments text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  skills text,
  CONSTRAINT profiles_pkey PRIMARY KEY (id),
  CONSTRAINT profiles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id)
);
CREATE TABLE public.resources (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  availability text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT resources_pkey PRIMARY KEY (id)
);
CREATE TABLE public.reviews (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  startup_id uuid NOT NULL,
  reviewer_id uuid NOT NULL,
  innovation_score integer CHECK (innovation_score >= 1 AND innovation_score <= 10),
  market_potential_score integer CHECK (market_potential_score >= 1 AND market_potential_score <= 10),
  feasibility_score integer CHECK (feasibility_score >= 1 AND feasibility_score <= 10),
  comments text,
  status USER-DEFINED DEFAULT 'Pending'::review_status_type,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT reviews_pkey PRIMARY KEY (id),
  CONSTRAINT reviews_startup_id_fkey FOREIGN KEY (startup_id) REFERENCES public.startups(id),
  CONSTRAINT reviews_reviewer_id_fkey FOREIGN KEY (reviewer_id) REFERENCES public.users(id)
);
CREATE TABLE public.startup_attachments (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  startup_id uuid NOT NULL,
  file_url text NOT NULL,
  file_name text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT startup_attachments_pkey PRIMARY KEY (id),
  CONSTRAINT startup_attachments_startup_id_fkey FOREIGN KEY (startup_id) REFERENCES public.startups(id)
);
CREATE TABLE public.startup_founders (
  startup_id uuid NOT NULL,
  profile_id uuid NOT NULL,
  is_main_founder boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT startup_founders_pkey PRIMARY KEY (startup_id, profile_id),
  CONSTRAINT startup_founders_startup_id_fkey FOREIGN KEY (startup_id) REFERENCES public.startups(id),
  CONSTRAINT startup_founders_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);
CREATE TABLE public.startups (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  description text,
  product_link text,
  product_credentials text,
  company_url text,
  product_description text,
  startup_location text,
  status USER-DEFINED DEFAULT 'Idea Submission'::startup_status,
  team_status USER-DEFINED DEFAULT 'Incomplete'::team_status,
  tech_stack text,
  usability text,
  revenue numeric,
  changes text,
  previous_incubator text,
  current_financial_status text,
  review_status USER-DEFINED DEFAULT 'Pending'::review_status_type,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  attachments text,
  CONSTRAINT startups_pkey PRIMARY KEY (id)
);
CREATE TABLE public.stories (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  content text NOT NULL,
  startup_id uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT stories_pkey PRIMARY KEY (id),
  CONSTRAINT stories_startup_id_fkey FOREIGN KEY (startup_id) REFERENCES public.startups(id)
);
CREATE TABLE public.team_briefs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  startup_id uuid NOT NULL,
  bio text NOT NULL,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT team_briefs_pkey PRIMARY KEY (id),
  CONSTRAINT team_briefs_startup_id_fkey FOREIGN KEY (startup_id) REFERENCES public.startups(id)
);
CREATE TABLE public.users (
  id uuid NOT NULL,
  first_name text,
  last_name text,
  username text UNIQUE,
  email text UNIQUE,
  role USER-DEFINED DEFAULT 'Founder'::user_role,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT users_pkey PRIMARY KEY (id),
  CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id)
);
CREATE TABLE public.work_history (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  profile_id uuid NOT NULL,
  company text NOT NULL,
  position text,
  start_date date,
  finish_date date,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT work_history_pkey PRIMARY KEY (id),
  CONSTRAINT work_history_profile_id_fkey FOREIGN KEY (profile_id) REFERENCES public.profiles(id)
);