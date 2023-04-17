import axios from '../utils/axiosInstance';
/**
 * Fetch Organizational Level.
 *
 * @returns {Promise<any>}
 */
export const fetchOrganizationalLevelAPI = async () => axios.get('OrganizationalLevel/');


/**
 * Fetch Organizational Level by companyId.
 *
 * @returns {Promise<any>}
 */
export const fetchOrganizationalLevelByCompanyAPI = async (idCompany) => axios.get(`OrganizationalLevel/Company/${idCompany}`);


/**
 * Store Organizational Level.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeOrganizationalLevelAPI = async ({idCompany, ...data}) => axios.post(`OrganizationalLevel/${idCompany}`, data);


/**
 * Update Organizational Level Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateOrganizationalLevelAPI = async ({...data}) => axios.put('OrganizationalLevel/', data);

/**
 * Delete Organizational Level.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteOrganizationalLevelAPI = async (id, idCompany) => axios.delete(`OrganizationalLevel/${id}/${idCompany}`);

