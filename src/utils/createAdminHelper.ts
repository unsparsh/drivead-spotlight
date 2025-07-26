import { supabase } from '@/integrations/supabase/client';

export const createTestAdmin = async () => {
  try {
    // First create a user in auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
      email: 'admin@test.com',
      password: 'admin123',
      options: {
        data: {
          full_name: 'Test Admin',
          username: 'admin'
        }
      }
    });

    if (signUpError) {
      console.error('Error creating admin user:', signUpError);
      return { error: signUpError };
    }

    console.log('Admin user created:', signUpData.user?.id);
    return { data: signUpData };
  } catch (error) {
    console.error('Unexpected error:', error);
    return { error };
  }
};

// Call this function to create the admin
// createTestAdmin();