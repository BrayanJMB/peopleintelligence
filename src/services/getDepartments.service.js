import axios from '../utils/axiosInstance';
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

export const storeDepartmentsAPI = async (data) => axios.post(`Area/${userInfo.Company}`, data);
/**
 * Fetch Contract Type.
 * 
 * @returns {Promise<any>}
 */
export const fetchAreaByCompanyAPI = async (id) => axios.get(`Area/getAreaByCompany/${id}`);

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
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeAreaAPI = async (id) => axios.post(`Area/${userInfo.Company}`);


/**
 * Fecth Area.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const fecthAreaAPI = async () => axios.get('Area/');
