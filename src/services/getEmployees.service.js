import axios from "../utils/axiosInstance";

export const getEmployeesAPI = async (id) => {
  console.log("getEmployeesAPI");

  const response = await axios.get("Employee/" + id);
  return response;
};
