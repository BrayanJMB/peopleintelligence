import axios from "axios";

const API = "https://peopleintelligenceapi.azurewebsites.net/api/";

const instance = axios.create({
  baseURL: API,
});
instance.interceptors.request.use(
  (config) => {
    let userParsed = JSON.parse(localStorage.getItem("userInfo"));

    if (userParsed) {
      config.headers.Authorization = `Bearer ${userParsed.accessToken}`;
    }
    console.log("request config", config);
    return config;
  },
  (error) => {
    // console.log("request error", error);
    return Promise.reject(error);
  }
);

export default instance;
