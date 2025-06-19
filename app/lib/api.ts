import axios from 'axios';

// Create an Axios instance with a base URL and credentials
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL, // Use environment variable for base URL
  withCredentials: true, // Send cookies with requests
});

// console.log('VITE_APP_API_BASE_URL:', import.meta.env.VITE_APP_API_BASE_URL);

/**
 * Sets up an Axios request interceptor to include the X-API-KEY header.
 * If apiKey is null or undefined, the interceptor will remove the header.
 * @param apiKey The API key to set, or null to remove the header.
 */
export const setAuthHeader = (apiKey: string | null) => {
  // Remove any existing interceptors to prevent duplicates
  api.interceptors.request.clear();

  if (apiKey) {
    api.interceptors.request.use(
      (config) => {
        config.headers['X-API-KEY'] = apiKey;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
};

export default api;
