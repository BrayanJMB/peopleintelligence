import axios from '../utils/axiosInstance';

export const editDashboardAPI = async (
  id,
  reportId,
  groupId,
  reportName,
  descriptionReport,
  isActive,
  companyId
) => {
  console.log('editDashboardAPI');

  const response = await axios.put('PowerBy/UpdateDashboard', {
    id: id,
    reportId: reportId,
    groupId: groupId,
    reportName: reportName,
    descriptionReport: descriptionReport,
    isActive: isActive,
    companyId: companyId,
  });
  return response;
};
