import axios from "../utils/axiosInstance";

export const postCompanyAPI = async (data, pais, sector, size, id) => {
  console.log("postCompanyAPI");

  const response = await axios.post("companias/" + id, {
    IdPais: pais,
    IdTamanoCompania: size,
    SectorId: sector,
    nombreCompania: data.nombreCompania,
    Sede: data.Sede,
    direccion: data.direccion,
  });
  return response;
};
