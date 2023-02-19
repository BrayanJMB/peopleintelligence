import axios from "../utils/axiosInstance";

export const getJourneyMapAPI = async () => axios.get("GetJorneyMap/");
