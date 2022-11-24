import axios from "../utils/axiosInstance";

export const getRolesAPI = async (id) => {
  console.log("getRolesAPI");

  const response = await axios.get("Roles/GetCompaniasRol/");
  return response;
};
