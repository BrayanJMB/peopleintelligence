import axios from '../utils/axiosInstance';

export const fetchTemplatesAPI = async () => axios.get('GetTemplates/');
