import axios from '../utils/axiosInstance';

export const getOfficesAPI = async (idCompany) => {
  const response = await axios.get(`Campus/Company/${idCompany}`);
  return response;
};


/**
 * Store category from API.
 *
 * @param data
 * @returns {Promise<any>}
 */
export const storeOfficeAPI = async (data) => axios.post('Campus/', data);

export const postOfficeAPI = async (
  data,
  idCompany
) => {
  const response = await axios.post('Campus/', {
    sede: data.sede,
    IdCompania: idCompany,
  });
  return response;
};


export const deleteOfficeAPI = async (id) => axios.delete('Campus/' + id);




