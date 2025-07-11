
-- Add foreign key relationship between leave_requests and profiles
ALTER TABLE public.leave_requests 
ADD CONSTRAINT leave_requests_user_id_fkey 
FOREIGN KEY (user_id) REFERENCES public.profiles(user_id);

-- Also add RLS policy to allow admins to view all leave requests with profile data
CREATE POLICY "Admins can view all leave requests with profiles" 
  ON public.leave_requests 
  FOR SELECT 
  USING (get_user_role(auth.uid()) = 'admin'::user_role);
