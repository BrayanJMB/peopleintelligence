import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchContractTypeAPI = async () => axios.get('ContractType/');



/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchContractTypeByCompanyAPI = async (idCompany) => axios.get(`ContractType/${idCompany}`);

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
export const deleteContractTypeAPI = async (id, idCompany) => axios.delete(`ContractType/${id}/${idCompany}`);


/**
 * Store Contract Type.
 *
 * @returns {Promise<any>}
 */
export const storeContractTypeByCompanyIdAPI = async ({ idCompany, tipoContrato }) => axios.post(`ContractType/${idCompany}`, { tipoContrato });

