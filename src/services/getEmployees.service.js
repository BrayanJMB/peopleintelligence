import axios from "../utils/axiosInstance";

export const getEmployeesAPI = async () => {
  console.log("getEmployeesAPI");

  const response = await axios.get("Employee/");
  return response;
};
