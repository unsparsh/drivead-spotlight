
import { supabase } from '@/integrations/supabase/client';

// For the end-user: Run this function in the browser console to create an admin user
export const createAdmin = async (email: string, password: string, fullName: string) => {
  try {
    // 1. Attempt to create a new user
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName
        }
      }
    });
    
    if (authError) throw authError;
    
    if (!authData.user) {
      throw new Error('Failed to create user');
    }
    
    // 2. Set the is_admin flag to true in the profiles table
    const { error: updateError } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', authData.user.id);
      
    if (updateError) throw updateError;
    
    console.log('Admin user created successfully:', email);
    return { success: true, message: 'Admin user created successfully!' };
    
  } catch (error) {
    console.error('Error creating admin:', error);
    return { success: false, message: error.message || 'Failed to create admin user' };
  }
};

// If you want to make an existing user an admin
export const makeUserAdmin = async (userId: string) => {
  try {
    const { error } = await supabase
      .from('profiles')
      .update({ is_admin: true })
      .eq('id', userId);
      
    if (error) throw error;
    
    return { success: true, message: 'User has been granted admin privileges' };
  } catch (error) {
    return { success: false, message: error.message || 'Failed to update user role' };
  }
};
