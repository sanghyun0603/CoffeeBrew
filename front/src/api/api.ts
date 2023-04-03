import axios from 'axios';
import { useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store';

const BASE_URL = 'https://j8b305.p.ssafy.io/api/v1';

export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
api.interceptors.request.use(function (config) {
  const token = localStorage.getItem('accessToken');
  config.headers.Authorization = token;

  return config;
});

export default api;

export const loginAPI = {
  login: () => api.post(`/login`),
  logout: () => api.delete(`/member`),
};

export const detailAPI = {
  getBean: (id: number) => api.get(`/item/bean/${id}`),
};

/**원두 리스트,검새,필터 가변인자 보내기 */
const getData = (...params: any) => {
  const url = `/item/bean?${params.join('&')}`;
  console.log(`test2: ${url}`);
  return api.get(url);
};
/**캡슐 리스트, 검색, 필터 가변인자 보내기 */
const getDataCapsule = (...params: any) => {
  const url = `/item/capsule?${params.join('&')}`;
  console.log(`testcap: ${url}`);
  return api.get(url);
};

export const listAPI = {
  getBeans: (...params: any) => getData(...params),
  getCapsules: (...params: any) => getDataCapsule(...params),
};

export const reviewAPI = {
  getBeanReview: (id: number) => api.get(`review/bean/${id}`),
};

export const surveyAPI = {
  postSurvey: (surveyli: number[]) =>
    api.post(`/api/v1/survey`, { surveyli: surveyli }),
};
