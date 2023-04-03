import axios from '../utils/axiosInstance';
const userInfo = JSON.parse(localStorage.getItem('userInfo'));
export const getDepartmentsAPI = async () => {
  console.log('getDepartmentsAPI');

  const response = await axios.get('departamentos/');
  return response;
};
/**
 * Fetch Contract Type.
 * 
 * @returns {Promise<any>}
 */
export const fetchAreaAPI = async () => axios.get(`Area/getAreaByCompany/${userInfo.Company}`);

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
