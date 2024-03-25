import axios from '../utils/axiosInstance';

export const postMultiRoleAPI = async ({ idUser, idrol, idCompany }) => {
  const response = await axios.put('Roles/PutMultyCompaniRol', {
    idUser,
    idrol,
    idCompany,
  });
  return response;
};
