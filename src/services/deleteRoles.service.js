import axios from '../utils/axiosInstance';

export const deleteRolesAPI = async (userid, roleid) => {
  const response = await axios.get(
    'Roles/DeleteRoles/' + userid + '/' + roleid
  );
  return response;
};
