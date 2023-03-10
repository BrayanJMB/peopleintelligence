import client from "../utils/axiosInstance";

/**
 * Fetch categories from API.
 *
 * @returns {Promise<AxiosResponse<any>>}
 */
export const fetchCategoriesAPI = async () => client.get('Categories/');

/**
 * Update category from API.
 *
 * @param id
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const updateCategoryAPI = async (id, data) => client.put(`Categories/${id}`, data);

/**
 * Delete category from API.
 *
 * @param id
 * @returns {Promise<AxiosResponse<any>>}
 */
export const deleteCategoryAPI = async (id) => client.delete(`Categories/${id}`);

/**
 * Store category from API.
 *
 * @param data
 * @returns {Promise<AxiosResponse<any>>}
 */
export const storeCategoryAPI = async (data) => client.post('Categories/', data);