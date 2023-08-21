import axios from 'axios';

export const API = '${process.env.REACT_APP_API_URL}';

const instance = axios.create({
  baseURL: API,
});
instance.interceptors.request.use(
  (config) => {
    let userParsed = JSON.parse(localStorage.getItem('userInfo'));

    if (userParsed) {
      config.headers.Authorization = `Bearer ${userParsed.accessToken}`;
    }
    return config;
  },
  (error) => {
    // console.log("request error", error);
    return Promise.reject(error);
  }
);

export default instance;
