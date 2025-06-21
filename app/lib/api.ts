import axios from 'axios';

// Create an Axios instance with a base URL and credentials
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL, // Use environment variable for base URL
  withCredentials: true, // Send cookies with requests
});

// console.log('VITE_APP_API_BASE_URL:', import.meta.env.VITE_APP_API_BASE_URL);

/**
 * Sets up an Axios request interceptor to include either an X-API-KEY header or an Authorization header with a Bearer token.
 * If apiKey is provided, it sets the X-API-KEY. If an access token is found in sessionStorage, it sets the Authorization header.
 * @param apiKey The API key to set, or null to remove the X-API-KEY header.
 */
export const setAuthHeader = (apiKey: string | null = null) => {
  // Remove any existing interceptors to prevent duplicates
  api.interceptors.request.clear();

  api.interceptors.request.use(
    (config) => {
      // Set X-API-KEY if provided
      if (apiKey) {
        config.headers['X-API-KEY'] = apiKey;
      } else {
        delete config.headers['X-API-KEY'];
      }

      // Log cookies being sent
      // console.log('Request Cookies:', document.cookie);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default api;
