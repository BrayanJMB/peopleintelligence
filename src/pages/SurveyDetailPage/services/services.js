import axios from '../../../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const duplicateSurvey = async (idSurvey, idCompany) => axios.post(`CloneJourney/${idSurvey}/${idCompany}`);

export const templateFromSurveyAllCompanies = async (idSurvey, idCompany) => axios.post(`templateFromSurvey/${idSurvey}/${idCompany}`);

export const templateFromSurveyByCompany = async (idSurvey, idCompany, idCompanyToTemplate) => axios.post(`templateFromSurvey/${idSurvey}/${idCompany}/${idCompanyToTemplate}`);

