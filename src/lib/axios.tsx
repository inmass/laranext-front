import Axios, { AxiosError, AxiosRequestConfig } from 'axios';
import ApiEndpoints from '@/constants/ApiEndpoints';

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
    return Promise.reject(error);
  }
);

export default axios;
