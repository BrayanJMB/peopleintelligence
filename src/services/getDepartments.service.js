import axios from '../utils/axiosInstance';
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

/**
 * Fetch Contract Type.
 * 
 * @returns {Promise<any>}
 */
export const fetchAreaByCompanyAPI = async (id) => axios.get(`Area/getAreaByCompany/${id}`);


/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeAreaAPI = async ({ idCompany, ...data }) => axios.post(`Area/${idCompany}`, data);

/**
 * Update Contract Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateAreaAPI = async () => axios.put('Area/');
 
/**
 * Delete Contract Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteAreaAPI = async (id) => axios.delete(`Area/${id}`);




/**
 * Fecth Area.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const fecthAreaAPI = async () => axios.get('Area/');
