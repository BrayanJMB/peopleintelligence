import axios from '../utils/axiosInstance';

export const getOfficesAPI = async () => {
  console.log('getOfficesAPI');

  const response = await axios.get('Campus/');
  return response;
};



export const postOfficeAPI = async (
  data,
  idCompany
) => {
  console.log(data, idCompany);
  
  const response = await axios.post('Campus/', {
    sede: data.sede,
    IdCompania: idCompany,
  });
  return response;
};




