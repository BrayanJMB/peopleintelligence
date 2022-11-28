import axios from "../utils/axiosInstance";

export const postMultiRoleAPI = async (data) => {
  console.log("postMultiRoleAPI");

  const response = await axios.put("Roles/PutMultiCompaniRol", { ...data });
  return response;
};
