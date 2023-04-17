import axios from '../utils/axiosInstance';

export const postEmployeeAPI = async (
  data,
  pais,
  sector,
  size,
  id,
) => {
  console.log('postCompanyAPI');

  const response = await axios.post('Employee/', {
      person: {
        numeroDocumento: 'string',
        nombres: 'string',
        apellIdos: 'string',
        edad: 120,
        numeroTelefonico: 'string',
        direccion: 'string',
        correoElectronico: 'user@example.com',
        fechaNacimiento: '2023-04-02',
        IdTipoDocumento: 0,
        IdGenero: 0,
        IdCiudad: 0,
        IdSegmentos: 0,
      },
      employee: {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        FechaAdmision: '2023-04-02',
        supervisor: 'string',
        IdCompania: 0,
        rollCompania: 0,
        areaId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
  });
  return response;
};
