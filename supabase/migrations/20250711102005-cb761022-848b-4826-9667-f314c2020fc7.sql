
-- Create user role enum
CREATE TYPE user_role AS ENUM ('admin', 'employee');

-- Create department enum for better data consistency
CREATE TYPE department_type AS ENUM ('Production', 'Quality Control', 'Maintenance', 'Administration', 'Engineering', 'HR', 'Finance', 'Safety');

-- Create employee status enum
CREATE TYPE employee_status AS ENUM ('active', 'inactive', 'on_leave', 'terminated');

-- Update profiles table to include role (if not already exists)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role user_role DEFAULT 'employee';

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  department department_type,
  designation TEXT,
  join_date DATE DEFAULT CURRENT_DATE,
  status employee_status DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create departments table for reference
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name department_type UNIQUE NOT NULL,
  description TEXT,
  head_id UUID REFERENCES employees(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert default departments
INSERT INTO departments (name, description) VALUES
  ('Production', 'Manufacturing and production operations'),
  ('Quality Control', 'Quality assurance and testing'),
  ('Maintenance', 'Equipment and facility maintenance'),
  ('Administration', 'Administrative and clerical work'),
  ('Engineering', 'Design and technical engineering'),
  ('HR', 'Human resources and personnel management'),
  ('Finance', 'Financial operations and accounting'),
  ('Safety', 'Safety protocols and compliance')
ON CONFLICT (name) DO NOTHING;

-- Create function to get user role
CREATE OR REPLACE FUNCTION get_user_role(user_uuid UUID)
RETURNS user_role AS $$
  SELECT role FROM profiles WHERE user_id = user_uuid;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin(user_uuid UUID)
RETURNS BOOLEAN AS $$
  SELECT get_user_role(user_uuid) = 'admin';
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Enable RLS on employees table
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- RLS Policies for employees table
-- Admins can do everything
CREATE POLICY "Admins can view all employees" ON employees
  FOR SELECT USING (is_admin(auth.uid()));

CREATE POLICY "Admins can insert employees" ON employees
  FOR INSERT WITH CHECK (is_admin(auth.uid()));

CREATE POLICY "Admins can update all employees" ON employees
  FOR UPDATE USING (is_admin(auth.uid()));

CREATE POLICY "Admins can delete employees" ON employees
  FOR DELETE USING (is_admin(auth.uid()));

-- Employees can view their own record and colleagues (for directory purposes)
CREATE POLICY "Employees can view employee directory" ON employees
  FOR SELECT USING (auth.uid() IS NOT NULL AND status = 'active');

-- Enable RLS on departments table
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

-- Anyone authenticated can view departments
CREATE POLICY "Authenticated users can view departments" ON departments
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Only admins can modify departments
CREATE POLICY "Admins can modify departments" ON departments
  FOR ALL USING (is_admin(auth.uid()));

-- Create trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_employees_updated_at
    BEFORE UPDATE ON employees
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create function to get employee statistics (for dashboard)
CREATE OR REPLACE FUNCTION get_employee_stats()
RETURNS JSON AS $$
DECLARE
  stats JSON;
BEGIN
  SELECT json_build_object(
    'total_employees', (SELECT COUNT(*) FROM employees WHERE status = 'active'),
    'total_departments', (SELECT COUNT(*) FROM departments),
    'employees_by_department', (
      SELECT json_object_agg(department, count)
      FROM (
        SELECT department, COUNT(*) as count
        FROM employees
        WHERE status = 'active' AND department IS NOT NULL
        GROUP BY department
      ) dept_counts
    ),
    'employees_by_status', (
      SELECT json_object_agg(status, count)
      FROM (
        SELECT status, COUNT(*) as count
        FROM employees
        GROUP BY status
      ) status_counts
    ),
    'recent_hires', (
      SELECT COUNT(*)
      FROM employees
      WHERE join_date >= CURRENT_DATE - INTERVAL '30 days'
      AND status = 'active'
    )
  ) INTO stats;
  
  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable realtime for employees table
ALTER TABLE employees REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE employees;

-- Enable realtime for departments table
ALTER TABLE departments REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE departments;

-- Create an admin user function (for initial setup)
CREATE OR REPLACE FUNCTION create_admin_user(
  admin_email TEXT,
  admin_password TEXT,
  admin_name TEXT
)
RETURNS TEXT AS $$
DECLARE
  new_user_id UUID;
BEGIN
  -- This function should be called manually by database admin
  -- It's here for reference but won't work through the API
  RETURN 'Admin user creation must be done through Supabase Auth dashboard';
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
