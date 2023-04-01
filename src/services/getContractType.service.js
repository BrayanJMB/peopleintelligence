import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchContractTypeAPI = async () => axios.get('ContractType/');

/**
 * Update Contract Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateContractTypeAPI = async ({...data}) => axios.put('ContractType/', data);

/**
 * Delete Contract Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteContractTypeAPI = async (id) => axios.delete(`ContractType/${id}`);

/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeContractTypeAPI = async (data) => axios.post('ContractType/', data);

