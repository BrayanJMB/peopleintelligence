import axios from "../utils/axiosInstance";

export const getCategoriesAPI = async () => {
  console.log("getCategoriesAPI");

  const response = await axios.get("Categories/");
  return response;
};
