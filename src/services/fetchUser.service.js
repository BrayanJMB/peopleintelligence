import axios from '../utils/axiosInstance';


/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchUserAPI = async (idCompany) => axios.get(`Roles/GetUsersCompany/${idCompany}`);


/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchRolesByUserAPI = async (idUser,idCompany) => axios.get(`Roles/GetRolesByUser/${idUser}/${idCompany}`);



/**
 * Post Contract Type.
 *
 * @returns {Promise<any>}
 */
export const postUserAPI = async ({idCompany, ...data}) => axios.post(`Autenticacion/AddUser/${idCompany}`, data);


/**
 * Post Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchUserGetRolsAPI = async (idUser) => axios.get(`Roles/GetRolesAdd/${idUser}`);


/**
 * Post Contract Type.
 *
 * @returns {Promise<any>}
 */
export const postUserRolsAPI = async (data) => axios.post('Roles/AddRoles/', data);



/**
 * Post Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchAllUserRolsAPI = async (companyId) => axios.get(`Roles/GetAllRolesUser/${companyId}`);



/**
 * Delete Rol User.
 *
 * @returns {Promise<any>}
 */
export const deleteUserRolsAPI = async (userId, roleId) => axios.delete(`Roles/DeleteRolesUser/${userId}/${roleId}`);


/**
 * GetCompanies User.
 *
 * @returns {Promise<any>}
 */
export const getCompaniesUserAPI = async (userId) => axios.get(`users/${userId}/unsubscribedCompanies`);


/**
 * DeleteCompanies User.
 *
 * @returns {Promise<any>}
 */
export const deleteCompaniesUserAPI = async (companyId,userId) => axios.delete(`users/${userId}/companies/${companyId}`);


export const postCompaniesUserAPI = async (data) => axios.post(`users/company-assignments`,data);

