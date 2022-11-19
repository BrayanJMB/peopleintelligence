import axios from "axios";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNzcxYzAxZWEtZGVjZi00NmYxLWI4ZjQtOTA0OGE4NjUzMmQ5IiwiQ29tcGFueSI6IjAiLCJuYmYiOjE2Njg4Nzk2NTIsImV4cCI6MTY2ODg5MDQ1MiwiaWF0IjoxNjY4ODc5NjUyfQ.RaouR5Rnr2Wveokn9_7XY_Yo2KUT9_4KKHGDUwR7Qw4";

const API = "https://peopleintelligenceapi.azurewebsites.net/api/";
const config = {
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

export const getDashboardsAPI = async () => {
  console.log("getDashboardsAPI");
  const response = await axios
    .create({
      baseURL: API,
    })
    .get("PowerBy/AllDashboards/", config);
  return response;
};
