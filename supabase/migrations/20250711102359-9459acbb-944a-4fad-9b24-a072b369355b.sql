
-- Update the user_role enum to include 'employee' instead of 'user'
ALTER TYPE user_role RENAME TO user_role_old;
CREATE TYPE user_role AS ENUM ('admin', 'employee');

-- Update the profiles table to use the new enum
ALTER TABLE profiles ALTER COLUMN role TYPE user_role USING 
  CASE 
    WHEN role::text = 'user' THEN 'employee'::user_role
    ELSE role::text::user_role
  END;

-- Drop the old enum
DROP TYPE user_role_old;

-- Create employees table
CREATE TABLE IF NOT EXISTS employees (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT,
  department TEXT,
  designation TEXT,
  join_date DATE DEFAULT CURRENT_DATE,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'on_leave', 'terminated')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  created_by UUID REFERENCES auth.users(id)
);

-- Create departments table
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT UNIQUE NOT NULL,
  description TEXT,
  head_id UUID REFERENCES employees(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Insert some default departments
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

-- Enable RLS on employees table
ALTER TABLE employees ENABLE ROW LEVEL SECURITY;

-- Create policies for employees table
CREATE POLICY "Admins can view all employees" ON employees
  FOR SELECT USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can insert employees" ON employees
  FOR INSERT WITH CHECK (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update all employees" ON employees
  FOR UPDATE USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can delete employees" ON employees
  FOR DELETE USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Employees can view employee directory" ON employees
  FOR SELECT USING (auth.uid() IS NOT NULL AND status = 'active');

-- Enable RLS on departments table
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;

-- Create policies for departments table
CREATE POLICY "Authenticated users can view departments" ON departments
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins can modify departments" ON departments
  FOR ALL USING (get_user_role(auth.uid()) = 'admin');

-- Create function to get employee statistics
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

-- Enable realtime for employees table
ALTER TABLE employees REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE employees;

-- Enable realtime for departments table
ALTER TABLE departments REPLICA IDENTITY FULL;
ALTER PUBLICATION supabase_realtime ADD TABLE departments;
