import axios from "../utils/axiosInstance";

export const getOnasDetailsAPI = async (id) => {
  console.log("getOnasDetailsAPI");

  const response = await axios.get("OnasSurvey/DetallesEncuesta/" + id);
  return response;
};
