import axios from "../utils/axiosInstance";

export const getJourneyMapAPI = async () => {
  console.log("getJourneyMapAPI");

  const response = await axios.get("GetJorneyMap/");
  return response;
};
