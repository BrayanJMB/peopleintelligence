import axios from "../utils/axiosInstance";

export const postMultiRoleAPI = async ({ idUser, idrol, idCompany }) => {
  console.log("postMultiRoleAPI");

  const response = await axios.put("Roles/PutMultyCompaniRol", {
    idUser,
    idrol,
    idCompany,
  });
  return response;
};
