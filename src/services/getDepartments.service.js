import axios from "../utils/axiosInstance";

export const getDepartmentsAPI = async () => {
  console.log("getDepartmentsAPI");

  const response = await axios.get("departamentos/");
  return response;
};
