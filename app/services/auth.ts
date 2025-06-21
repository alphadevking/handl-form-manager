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
 * Expects a 401 (Unauthorized) response if no active session exists,
 * which indicates an unauthenticated state.
 * @returns A promise that resolves with the authentication status.
 */
export const getAuthStatus = async () => {
  const response = await api.get('/auth/status');
  // console.log(response.data);
  return response.data;
};

/**
 * Logs out the current user session using a POST request.
 * @returns A promise that resolves upon successful logout.
 */
export const logout = async () => {
  const response = await api.post('/auth/logout');
  return response.data;
};

/**
 * Generates a new API key for the authenticated user.
 * @returns A promise that resolves with the new API key.
 */
export const generateApiKey = async () => {
  const response = await api.get('/auth/generate-api-key');
  return response.data.apiKey;
};

// TODO: Handle Google OAuth Callback (Internal) if needed for client-side logic
