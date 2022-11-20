import axios from "../utils/axiosInstance";

export const deleteReportAPI = async (id) => {
  console.log("deleteReportAPI");

  const response = await axios.delete("ListaDashboards/" + id);
  return response;
};
