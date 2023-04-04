import axios from '../utils/axiosInstance';
/**
 * Fetch Profession Type.
 *
 * @returns {Promise<any>}
 */
export const fetchOrganizationalLevelAPI = async () => axios.get('OrganizationalLevel/');

/**
 * Update Profession Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateOrganizationalLevelAPI = async ({...data}) => axios.put('OrganizationalLevel/', data);

/**
 * Delete Profession Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteOrganizationalLevelAPI = async (id) => axios.delete(`OrganizationalLevel/${id}`);

/**
 * Store Profession Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeOrganizationalLevelAPI = async (data) => axios.post('OrganizationalLevel/', data);