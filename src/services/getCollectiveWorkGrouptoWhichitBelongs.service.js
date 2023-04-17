import axios from '../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const fetchCollectiveWorkGrouptoWhichitBelongsAPI = async () => axios.get('CollectiveWorkGrouptoWhichitBelongs/');


/**
 * Store Contract Type.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeCollectiveWorkGrouptoWhichitBelongsAPI = async ({ idCompany, ...data }) => axios.post('CollectiveWorkGrouptoWhichitBelongs/', data);

/**
 * Update Contract Type.
 *
 * @param id
 * @param data
 * @returns {Promise<any>}
 */
export const updateCollectiveWorkGrouptoWhichitBelongsAPI = async ({...data}) => axios.put('CollectiveWorkGrouptoWhichitBelongs/', data);

/**
 * Delete Contract Type.
 *
 * @param id
 * @returns {Promise<any>}
 */
export const deleteCollectiveWorkGrouptoWhichitBelongsAPI = async (id) => axios.delete(`CollectiveWorkGrouptoWhichitBelongs/${id}`);


