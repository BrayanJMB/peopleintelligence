import axios from "axios";

const API = "https://peopleintelligenceapi.azurewebsites.net/api/";
const userParsed = JSON.parse(localStorage.getItem("userInfo"));

const instance = axios.create({
  baseURL: API,
});
instance.defaults.headers.common[
  "Authorization"
] = `Bearer ${userParsed?.accessToken}`;
export default instance;
