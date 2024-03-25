import axios from '../utils/axiosInstance';

export const editReportAPI = async (id, name, descripcion) => {
  const response = await axios.put('ListaDashboards?Id=' + id, {
    name: name,
    descripcion: descripcion,
  });
  return response;
};
