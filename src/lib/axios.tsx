import Axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import ApiEndpoints from '@/constants/api-endpoints';
import toast from 'react-hot-toast';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
  withCredentials: true,
  withXSRFToken: true,
});

const csrf = () => axios.get(ApiEndpoints.auth.csrf);

interface customConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

axios.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const config: customConfig = error.config;

    if (error.response?.status === 419 && !config._retry) {
      config._retry = true;
      try {
        await csrf();
        return await axios(config);
      } catch (error) {
        return Promise.reject(error);
      }
    }

    if (error.response?.status) {
      if (error.response?.status === 404) {
        toast.error(
          process.env.NODE_ENV === 'development'
            ? error.response.data.message
            : 'The requested resource was not found'
        );
      } else if (
        // all error status codes between 400 and 500 except 401 if the url is /auth/login
        error.response?.status >= 400 &&
        error.response?.status < 500 &&
        error.response?.status !== 401 &&
        error.response?.config.url !== ApiEndpoints.auth.login
      ) {
        toast.error(error.response.data.message || 'An error occurred');
      } else if (error.response?.status >= 500) {
        toast.error(
          process.env.NODE_ENV === 'development'
            ? error.response.data.message
            : 'An error occurred'
        );
      }
    }

    return Promise.reject(error);
  }
);

export default axios;
