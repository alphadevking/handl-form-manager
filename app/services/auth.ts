import api from '~/lib/api';

/**
 * Initiates the Google OAuth login process.
 * This will redirect to Google.
 */
export const googleLogin = () => {
  window.location.href = `${api.defaults.baseURL}/auth/google`;
};

/**
 * Checks if a user is currently authenticated via session.
 * @returns A promise that resolves with the authentication status.
 */
export const getAuthStatus = async () => {
  const response = await api.get('/auth/status');
  // console.log(response.data);
  return response.data;
};

/**
 * Logs out the current user session.
 * @returns A promise that resolves upon successful logout.
 */
export const logout = async () => {
  const response = await api.get('/auth/logout');
  return response.data;
};

// TODO: Handle Google OAuth Callback (Internal) if needed for client-side logic
