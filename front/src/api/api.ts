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
  /**카카오 로그인 */
  login: () => api.post(`/login`),
  /**로그아웃 */
  logout: () => api.get(`/logout`),
  /**회원탈퇴 */
  withdraw: () => api.delete(`/member`),
};

export const detailAPI = {
  /**원두 상세 조회 */
  getBean: (id: number) => api.get(`/item/bean/${id}`),
  /**원두 좋아요 조회 */
  beanLike: (id: number) => api.get(`member/like/toggle/bean/${id}`),
  /**원두 아이템 기반 추천 */
  recommendBean: (id: number) => api.get(`recom/item/bean/${id}`),
  /**캡슐 상세 조회 */
  getCapsule: (id: number) => api.get(`/item/capsule/${id}`),
  /**캡슐 좋아요 */
  capsuleLike: (id: number) => api.get(`member/like/toggle/capsule/${id}`),
  /**캡슐 아이템 기반 추천 */
  recommendCapsule: (id: number) => api.get(`recom/item/capsule/${id}`),
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
  /**원두 리스트 조회 */
  getBeans: (...params: any) => getData(...params),
  /**캡슐 리스트 조회 */
  getCapsules: (...params: any) => getDataCapsule(...params),
};

export const reviewAPI = {
  /**원두에 대한 리뷰 불러오기 */
  getCapsuleReview: (id: number) => api.get(`review/capsule/${id}`),
  /**캡슐에 대한 리뷰 불러오기 */
  getBeanReview: (id: number) => api.get(`review/bean/${id}`),
  /**리뷰작성 */
  createBeanReview: (
    id: number,
    Type: string,
    content: string,
    overall: number,
    flavor: number,
    acidity: number,
    sweetness: number,
    bitterness: number,
    body: number,
  ) =>
    api.post(`member/review`, {
      itemType: Type,
      itemIdx: id,
      content: content,
      overall: overall,
      flavor: flavor,
      acidity: acidity,
      sweetness: sweetness,
      bitterness: bitterness,
      body: body,
      coffeeing_note: 'none',
      expired: true,
    }),
  /**리뷰 삭제 */
  deleteReview: (id: number) => api.delete(`member/review/${id}`),
};

// 메인페이지
export const mainAPI = {
  /** 비회원 추천 */
  getNonRecom: (itemType: string) => api.get(`recom/item/${itemType}`),
  /** 회원 추천 */
  getRecommend: (itemType: string) => api.get(`member/recom/user/${itemType}`),
  /** 연령대별 추천 */
  getAgeRecom: (ageRange: string, type: string) =>
    api.get(`recom/age/${ageRange}/${type}`),
};

// 설문조사
export const surveyAPI = {
  /**설문조사 결과 전송 */
  postSurvey: (surveyli: number[]) =>
    api.post(`member/survey`, {
      param1: surveyli[0],
      param2: surveyli[1],
      param3: surveyli[2],
      param4: surveyli[3],
      param5: surveyli[4],
      param6: surveyli[5],
      param7: surveyli[6],
      param8: surveyli[7],
    }),
};

export const memberAPI = {
  /** 사용자 프로필 조회 */
  memberInfo: () => api.get(`member/profile`),
  /**사용자 원두 좋아요 조회 */
  memberLikesBeans: () => api.get(`member/like/mylist?itemType=bean`),
  /**사용자 캡슐 좋아요 조회 */
  memberLiskeCapsules: () => api.get(`member/like/mylist?itemType=capsule`),
  /**사용자 리뷰 쓴거 조회 */
  memberReviews: (pages: string) => api.get(`member/review?${pages}`),
  /**사용자 성향 분석 조회 */
  memberSurvey: () => api.get(`/member/analysis`),
};
export const detailLikeAPI = {
  /**사용자 원두 좋아요 */
  beanLike: (id: number) => api.get(`member/like/toggle/bean/${id}`),
};
