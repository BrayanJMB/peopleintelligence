import axios from '../utils/axiosInstance';


export const fetchEmployeeAPI = async (idCompany) => axios.get(`Employee/Company/${idCompany}`);

export const storeEmployeeAPI = async (data) => axios.post('Employee/FormEmployee', data);

export const deleteEmployeeAPI = async (id) => axios.delete(`Employee/${id}`);

export const updateEmployeeAPI = async (data) => axios.put('Employee/', data);
