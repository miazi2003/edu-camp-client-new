import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_DOMAIN ,
  withCredentials: true,
});

// Add interceptors ONCE
axiosInstance.interceptors.request.use(config => {
  config.withCredentials = true;
  return config;
});

const useAxiosSecure = () => axiosInstance;

export default useAxiosSecure;