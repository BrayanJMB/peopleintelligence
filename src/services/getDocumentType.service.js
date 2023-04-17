import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchDocumentTypeAPI = async () => axios.get('tipo-documentos/');

/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeDocumentTypeAPI = async (data) => axios.post('tipo-documentos/', data);


/**
 * Update Contract Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateDocumentTypeAPI = async ({...data}) => axios.put('tipo-documentos/', data);

/**
 * Delete Contract Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteDocumentTypeAPI = async (id) => axios.delete(`tipo-documentos/${id}`);

