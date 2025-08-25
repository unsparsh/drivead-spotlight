// Utility to clean up any lingering Supabase auth state in browser storage
export const cleanupAuthState = () => {
  try {
    // LocalStorage cleanup
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        localStorage.removeItem(key);
      }
    });

    // SessionStorage cleanup
    Object.keys(sessionStorage || {}).forEach((key) => {
      if (key.startsWith('supabase.auth.') || key.includes('sb-')) {
        sessionStorage.removeItem(key);
      }
    });
  } catch (_) {
    // Ignore storage access issues (e.g., private mode)
  }
};
