import axios from '../utils/axiosInstance';

export const deleteRolesAPI = async (userid, roleid) => {
  console.log('deleteReportAPI');

  const response = await axios.get(
    'Roles/DeleteRoles/' + userid + '/' + roleid
  );
  return response;
};
