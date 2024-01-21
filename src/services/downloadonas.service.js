import axios from '../utils/axiosInstance';

export const downloadOnasAPI = async (company, version) => {
  const response = await axios.get(
    'OnasSurvey/OnasDownload/' + company + '/' + version
  );
  return response;
};
