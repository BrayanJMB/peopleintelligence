import axios from 'axios';

export const storeSurveyImageQuestion = async (filesImage, questions, surveyId) => {
    const promises = questions.map(async (question, index) => {
      const formData = new FormData();
      formData.append('questionImage', filesImage[index]);
      formData.append('questionNumber', question.orderNumber);
      formData.append('surveyId', surveyId);

      try {
        const response = await axios.post(
          'https://chatapppeopleintelligence.azurewebsites.net/api/CustomCahtApi/UploadImagesQuestion',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response.data; // Retorna los datos de respuesta para su uso posterior
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error; // Lanza el error para manejar rechazos en Promise.all
      }
    });

    try {
      const results = await Promise.all(promises); // Espera a que todas las promesas se resuelvan// Aquí manejas las respuestas
    } catch (error) {
      console.error('Error en alguna solicitud:', error);
    }
  };

export const storeSurveyVideoQuestion = async (filesVideo, questions, surveyId, currentCompany) => {
    const promises = questions.map(async (question, index) => {
      const formData = new FormData();
      formData.append('questionImage', filesVideo[index]);
      formData.append('questionNumber', question.orderNumber);
      formData.append('surveyId', surveyId);
      formData.append('companyId', currentCompany?.id);
      try {
        const response = await axios.post(
          'https://chatapppeopleintelligence.azurewebsites.net/api/CustomCahtApi/UploadImagesQuestion',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        return response.data; // Retorna los datos de respuesta para su uso posterior
      } catch (error) {
        console.error('Error al subir la imagen:', error);
        throw error; // Lanza el error para manejar rechazos en Promise.all
      }
    });

    try {
      const results = await Promise.all(promises); // Espera a que todas las promesas se resuelvan// Aquí manejas las respuestas
    } catch (error) {
      console.error('Error en alguna solicitud:', error);
    }
  };

export const storeAvatarAndSurveyImage = async (surveyId, surveyImage, avatarImage, currentCompany) => {
    const formData = new FormData();
    formData.append('surveyImage', surveyImage);
    formData.append('moderatorAvatar', avatarImage);
    formData.append('companyId', currentCompany?.id);
    formData.append('surveyId', surveyId);
    try {
      const response = await axios.post(
        'https://chatapppeopleintelligence.azurewebsites.net/api/CustomCahtApi/UploadImages',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response) {
        return response;
      } else {
        console.error('Error al subir la imagen:', response);
      }
    } catch (error) {}
  };