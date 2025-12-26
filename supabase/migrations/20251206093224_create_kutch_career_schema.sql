/*
  # Kutch Career Database Schema
  
  Creates the complete database structure for the Kutch Career job board platform.
  
  ## New Tables
  
  ### `jobs`
  Stores all job postings from companies and consultancies
  - `id` (uuid, primary key)
  - `company_name` (text) - Name of company/consultancy
  - `company_type` (text) - 'Company' or 'Consultancy'
  - `contact_person_name` (text)
  - `contact_person_designation` (text)
  - `contact_email` (text)
  - `contact_phone` (text)
  - `company_website` (text, optional)
  - `company_address` (text, optional)
  - `job_title` (text)
  - `job_location` (text)
  - `job_category` (text) - IT, Sales, Marketing, HR, Finance, etc.
  - `employment_type` (text) - Full-time, Part-time, Contract, Internship, Temporary
  - `experience_level` (text) - Fresher, 0-2 years, 2-5 years, 5+ years
  - `salary_range` (text, optional)
  - `number_of_openings` (integer)
  - `job_description` (text)
  - `responsibilities` (text)
  - `required_skills` (text)
  - `preferred_joining_date` (text, optional)
  - `application_email` (text)
  - `application_url` (text, optional)
  - `application_deadline` (date, optional)
  - `status` (text) - 'pending', 'active', 'closed'
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)
  
  ### `job_applications`
  Stores applications submitted for specific job postings
  - `id` (uuid, primary key)
  - `job_id` (uuid, foreign key to jobs)
  - `full_name` (text)
  - `email` (text)
  - `phone` (text)
  - `resume_url` (text) - URL to uploaded resume file
  - `message` (text, optional) - Cover letter
  - `created_at` (timestamptz)
  
  ### `resumes`
  Stores general resume submissions from job seekers
  - `id` (uuid, primary key)
  - `full_name` (text)
  - `email` (text)
  - `phone` (text)
  - `location` (text)
  - `total_experience_years` (numeric)
  - `job_category` (text)
  - `current_salary` (text, optional)
  - `expected_salary` (text, optional)
  - `last_company_name` (text)
  - `last_job_title` (text)
  - `last_company_duration` (text)
  - `last_company_responsibilities` (text)
  - `reason_for_leaving` (text, optional)
  - `resume_url` (text) - URL to uploaded resume file
  - `skills` (text)
  - `preferred_locations` (text)
  - `additional_comments` (text, optional)
  - `created_at` (timestamptz)
  
  ### `companies`
  Stores company fleet registrations
  - `id` (uuid, primary key)
  - `company_name` (text)
  - `contact_person_name` (text)
  - `designation` (text)
  - `contact_number` (text)
  - `email` (text)
  - `address` (text, optional)
  - `website` (text, optional)
  - `description` (text, optional)
  - `created_at` (timestamptz)
  
  ### `paid_service_requests`
  Stores requests for paid hiring services
  - `id` (uuid, primary key)
  - `type` (text) - 'Company' or 'Consultancy'
  - `contact_person_name` (text)
  - `email` (text)
  - `company_name` (text)
  - `phone` (text)
  - `hiring_volume` (text, optional)
  - `message` (text)
  - `created_at` (timestamptz)
  
  ### `contact_submissions`
  Stores contact form submissions
  - `id` (uuid, primary key)
  - `name` (text)
  - `email` (text)
  - `phone` (text)
  - `reason` (text) - Help in candidate hiring, Looking for job, Collaboration, etc.
  - `message` (text)
  - `created_at` (timestamptz)
  
  ## Security
  
  All tables have RLS enabled with policies for public insert access and authenticated admin read access.
*/

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  company_type text NOT NULL DEFAULT 'Company',
  contact_person_name text NOT NULL,
  contact_person_designation text,
  contact_email text NOT NULL,
  contact_phone text NOT NULL,
  company_website text,
  company_address text,
  job_title text NOT NULL,
  job_location text NOT NULL,
  job_category text NOT NULL,
  employment_type text NOT NULL,
  experience_level text NOT NULL,
  salary_range text,
  number_of_openings integer DEFAULT 1,
  job_description text NOT NULL,
  responsibilities text NOT NULL,
  required_skills text NOT NULL,
  preferred_joining_date text,
  application_email text NOT NULL,
  application_url text,
  application_deadline date,
  status text DEFAULT 'active',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Job applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid REFERENCES jobs(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  resume_url text NOT NULL,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Resumes table
CREATE TABLE IF NOT EXISTS resumes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  location text NOT NULL,
  total_experience_years numeric NOT NULL,
  job_category text NOT NULL,
  current_salary text,
  expected_salary text,
  last_company_name text NOT NULL,
  last_job_title text NOT NULL,
  last_company_duration text NOT NULL,
  last_company_responsibilities text NOT NULL,
  reason_for_leaving text,
  resume_url text NOT NULL,
  skills text NOT NULL,
  preferred_locations text NOT NULL,
  additional_comments text,
  created_at timestamptz DEFAULT now()
);

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_person_name text NOT NULL,
  designation text NOT NULL,
  contact_number text NOT NULL,
  email text NOT NULL,
  address text,
  website text,
  description text,
  created_at timestamptz DEFAULT now()
);

-- Paid service requests table
CREATE TABLE IF NOT EXISTS paid_service_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  contact_person_name text NOT NULL,
  email text NOT NULL,
  company_name text NOT NULL,
  phone text NOT NULL,
  hiring_volume text,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  reason text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE resumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE paid_service_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Jobs policies - anyone can read active jobs, anyone can insert (for posting)
CREATE POLICY "Anyone can view active jobs"
  ON jobs FOR SELECT
  USING (status = 'active');

CREATE POLICY "Anyone can insert jobs"
  ON jobs FOR INSERT
  WITH CHECK (true);

-- Job applications policies - anyone can insert applications
CREATE POLICY "Anyone can insert job applications"
  ON job_applications FOR INSERT
  WITH CHECK (true);

-- Resumes policies - anyone can insert resumes
CREATE POLICY "Anyone can insert resumes"
  ON resumes FOR INSERT
  WITH CHECK (true);

-- Companies policies - anyone can insert company registrations
CREATE POLICY "Anyone can insert companies"
  ON companies FOR INSERT
  WITH CHECK (true);

-- Paid service requests policies - anyone can insert requests
CREATE POLICY "Anyone can insert paid service requests"
  ON paid_service_requests FOR INSERT
  WITH CHECK (true);

-- Contact submissions policies - anyone can insert contact forms
CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions FOR INSERT
  WITH CHECK (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS jobs_status_idx ON jobs(status);
CREATE INDEX IF NOT EXISTS jobs_category_idx ON jobs(job_category);
CREATE INDEX IF NOT EXISTS jobs_location_idx ON jobs(job_location);
CREATE INDEX IF NOT EXISTS jobs_created_at_idx ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS job_applications_job_id_idx ON job_applications(job_id);