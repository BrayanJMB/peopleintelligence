import axios from '../utils/axiosInstance';

export const getRolesAPI = async () => {
  const response = await axios.get('Roles/GetCompaniasRol/');
  return response;
};
