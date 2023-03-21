import axios from '../utils/axiosInstance';

export const getRolesAPI = async () => {
  console.log('getRolesAPI');

  const response = await axios.get('Roles/GetCompaniasRol/');
  return response;
};
