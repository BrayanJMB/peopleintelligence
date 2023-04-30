import axios from '../utils/axiosInstance';

export const getSegmentsAPI = async (idSegment) => axios.get(`personas/GetSegments/${idSegment}`);
