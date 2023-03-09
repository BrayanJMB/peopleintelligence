import client from "../utils/axiosInstance";

export const fetchCategoriesAPI = async () => client.get('Categories/');
