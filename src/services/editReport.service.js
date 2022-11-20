import axios from "../utils/axiosInstance";

export const editReportAPI = async (id, name, descripcion) => {
  console.log("editReportAPI");

  const response = await axios.put("ListaDashboards?Id=" + id, {
    name: name,
    descripcion: descripcion,
    id: id,
  });
  return response;
};
