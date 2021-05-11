import axios, { AxiosInstance } from 'axios';

const req: AxiosInstance = axios.create({
  baseURL: 'http://openapi.animal.go.kr/openapi/service/rest/abandonmentPublicSrvc',
  params: {
    ServiceKey: process.env.SERVICE_KEY,
  },
  paramsSerializer: (paramObj) => {
    const params = new URLSearchParams();

    for (const key in paramObj) {
      paramObj[key] && params.append(key, paramObj[key]);
    }

    return params.toString();
  },
});

export default req;
