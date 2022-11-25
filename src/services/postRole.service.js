import axios from "../utils/axiosInstance";

export const postRoleAPI = async (data) => {
  console.log("postRoleAPI");

  const response = await axios.post("Roles/AddRoles/", [data]);
  return response;
};
