import axios from "axios";

//////////////////////////////////Company information///////////////////////////
//Country
const [data, setData] = useState("");
const country = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net/api/paises/",
        })
        .get(config)
        .then((res) => {
          setData(res.data);
          //setSuccess(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

// sizeCompany
const sizeCompany = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net/api/TamanoCompania/",
        })
        .get(config)
        .then((res) => {
          setData(res.data);
          //setSuccess(true);
        });
    } catch (error) {
      console.log(error);
    }
  };



// sector
const sector = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net/api/Sector/",
        })
        .get(config)
        .then((res) => {
          setData(res.data);
          //setSuccess(true);
        });
    } catch (error) {
      console.log(error);
    }
  };

//////////////////////////////////Administrator Data/////////////////////////
//DocumentType

const documentType = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net/api/tipo-documentos/",
        })
        .get(config)
        .then((res) => {
          setData(res.data);
          //setSuccess(true);
        });
    } catch (error) {
      console.log(error);
    }
  };
