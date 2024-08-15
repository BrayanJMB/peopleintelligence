import axios from '../../utils/axiosInstance';

/**
 * Fetch Contract Type.
 *
 * @returns {Promise<any>}
 */
export const patchVisilibitySurvey = async (journeyId, visibility) => axios.patch(`SurveyVisibility/${journeyId}/${visibility}`);
