
-- Ensure admins can view and edit all user data
CREATE POLICY "Admins can insert leave requests for users" ON leave_requests
  FOR INSERT WITH CHECK (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can view all leave requests" ON leave_requests
  FOR SELECT USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update all leave requests" ON leave_requests
  FOR UPDATE USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can delete leave requests" ON leave_requests
  FOR DELETE USING (get_user_role(auth.uid()) = 'admin');

-- Allow admins to insert notifications for users
CREATE POLICY "Admins can insert notifications" ON notifications
  FOR INSERT WITH CHECK (get_user_role(auth.uid()) = 'admin');

-- Allow admins to insert tasks for users
CREATE POLICY "Admins can insert tasks" ON tasks
  FOR INSERT WITH CHECK (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can view all tasks" ON tasks
  FOR SELECT USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can update all tasks" ON tasks
  FOR UPDATE USING (get_user_role(auth.uid()) = 'admin');

CREATE POLICY "Admins can delete tasks" ON tasks
  FOR DELETE USING (get_user_role(auth.uid()) = 'admin');
