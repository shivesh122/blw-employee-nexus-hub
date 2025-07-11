
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export interface Employee {
  id: string;
  user_id?: string;
  name: string;
  email: string;
  phone?: string;
  department?: string;
  designation?: string;
  join_date?: string;
  status: 'active' | 'inactive' | 'on_leave' | 'terminated';
  created_at: string;
  updated_at: string;
  created_by?: string;
}

export interface Department {
  id: string;
  name: string;
  description?: string;
  head_id?: string;
  created_at: string;
}

export interface EmployeeStats {
  total_employees: number;
  total_departments: number;
  employees_by_department: Record<string, number>;
  employees_by_status: Record<string, number>;
  recent_hires: number;
}

export const useEmployeeManagement = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [stats, setStats] = useState<EmployeeStats | null>(null);
  const [userRole, setUserRole] = useState<'admin' | 'employee' | null>(null);

  // Fetch user role
  useEffect(() => {
    if (user) {
      fetchUserRole();
    }
  }, [user]);

  const fetchUserRole = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .rpc('get_user_role', { user_uuid: user.id });

      if (error) {
        console.error('Error fetching user role:', error);
        return;
      }

      setUserRole(data);
    } catch (error) {
      console.error('Error fetching user role:', error);
    }
  };

  // Fetch all data
  const fetchData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Fetch employees
      const { data: employeesData, error: employeesError } = await supabase
        .from('employees')
        .select('*')
        .order('created_at', { ascending: false });

      if (employeesError) {
        console.error('Error fetching employees:', employeesError);
      } else {
        setEmployees(employeesData || []);
      }

      // Fetch departments
      const { data: departmentsData, error: departmentsError } = await supabase
        .from('departments')
        .select('*')
        .order('name');

      if (departmentsError) {
        console.error('Error fetching departments:', departmentsError);
      } else {
        setDepartments(departmentsData || []);
      }

      // Fetch stats (only for admins)
      if (userRole === 'admin') {
        const { data: statsData, error: statsError } = await supabase
          .rpc('get_employee_stats');

        if (statsError) {
          console.error('Error fetching stats:', statsError);
        } else {
          setStats(statsData);
        }
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: "Error",
        description: "Failed to fetch employee data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  // Initial data fetch
  useEffect(() => {
    if (user && userRole) {
      fetchData();
    }
  }, [user, userRole]);

  // Add employee
  const addEmployee = async (employeeData: Omit<Employee, 'id' | 'created_at' | 'updated_at' | 'created_by'>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('employees')
        .insert({
          ...employeeData,
          created_by: user.id
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Employee added successfully."
      });

      await fetchData(); // Refresh data
      return { data, error: null };
    } catch (error) {
      console.error('Error adding employee:', error);
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive"
      });
      return { error, data: null };
    }
  };

  // Update employee
  const updateEmployee = async (id: string, updates: Partial<Employee>) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { data, error } = await supabase
        .from('employees')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Employee updated successfully."
      });

      await fetchData(); // Refresh data
      return { data, error: null };
    } catch (error) {
      console.error('Error updating employee:', error);
      toast({
        title: "Error",
        description: "Failed to update employee. Please try again.",
        variant: "destructive"
      });
      return { error, data: null };
    }
  };

  // Delete employee
  const deleteEmployee = async (id: string) => {
    if (!user) return { error: 'User not authenticated' };

    try {
      const { error } = await supabase
        .from('employees')
        .delete()
        .eq('id', id);

      if (error) {
        throw error;
      }

      toast({
        title: "Success",
        description: "Employee removed successfully."
      });

      await fetchData(); // Refresh data
      return { error: null };
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast({
        title: "Error",
        description: "Failed to remove employee. Please try again.",
        variant: "destructive"
      });
      return { error };
    }
  };

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const employeesChannel = supabase
      .channel('employees_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'employees'
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    const departmentsChannel = supabase
      .channel('departments_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'departments'
        },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(employeesChannel);
      supabase.removeChannel(departmentsChannel);
    };
  }, [user]);

  return {
    loading,
    employees,
    departments,
    stats,
    userRole,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    refreshData: fetchData
  };
};
