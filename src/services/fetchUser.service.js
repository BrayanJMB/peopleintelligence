import axios from '../utils/axiosInstance';


/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchUserAPI = async (idCompany) => axios.get(`Roles/GetUsersCompany/${idCompany}`);


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
export const postUserRolsAPI = async (data) => axios.post(`Roles/AddRoles/`, data);



/**
 * Post Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchAllUserRolsAPI = async (companyId) => axios.get(`Roles/GetAllRolesUser/${companyId}`);

