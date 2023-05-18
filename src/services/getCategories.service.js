import client from '../utils/axiosInstance';

/**
 * Fetch categories from API.
 *
 * @returns {Promise<any>}
 */
export const fetchCategoriesAPI = async () => client.get('Categories/');


/**
 * Fetch categories from API.
 *
 * @returns {Promise<any>}
 */
export const fetchCategoriesByCompanyAPI = async (companyId) => client.get(`Categories/Company/${companyId}`);

/**
 * Update category from API.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateCategoryAPI = async ({id, ...data}) => client.put(`Categories/${id}`, data);

/**
 * Delete category from API.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteCategoryAPI = async (categoryId, companyId) => client.delete(`Categories/${categoryId}/${companyId}`);

/**
 * Store category from API.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeCategoryAPI = async ({companyId, ...data}) => client.post(`Categories/Company/${companyId}`, data);