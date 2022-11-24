import axios from "../utils/axiosInstance";

export const getTemplatesAPI = async () => {
  console.log("getTemplatesAPI");

  const response = await axios.get("GetTemplates/");
  return response;
};
