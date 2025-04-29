import axios from '../../../../../utils/axiosInstance';

/**
 * Statics Mail.
 * 
 * @returns {Promise<any>}
 */
export const fetchStaticsMailAPI = async (idSurvey) => axios.get(`Mail/statics/${idSurvey}`);


export const fetchStaticsMailSenderAPI = async (idSurvey) => {
    const response = await axios.get(`Mail/GroupByFirstSend/${idSurvey}`);
    return response.data; // 👈 Retornas directamente el "data" limpio
  };

export const fetchStaticsMailReminderAPI = async (idSurvey) => {
    const response = await axios.get(`Mail/GroupByReminder/${idSurvey}`);
    return response.data; // 👈 Retornas directamente el "data" limpio
  };

  export const getDownloadMaisAPI = async (idSurvey, date, tipoEnvio) => {
    const response = await axios.get(`Mail/DownloadMails/${idSurvey}/${date}/${tipoEnvio}`);
    return response.data; // 👈 Retornas directamente el "data" limpio
  };
