import axios, { AxiosInstance } from 'axios';

const req: AxiosInstance = axios.create({
  baseURL: '/api',
});

export default req;
