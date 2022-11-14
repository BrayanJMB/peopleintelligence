import { useState, useCallback, useEffect } from "react";
import styles from "./InfoAdmin.module.css";
import { useParams } from "react-router-dom";
import Navbar from "../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Building from "../../assets/Building.svg";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import NewCompany from "../../components/NewCompany/NewCompany";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import Table from "../../components/Table";
import * as uuid from "uuid";
import axios from "axios";

const config = {
  headers: { "Content-type": "application/json" },
};

export default function InfoAdmin() {
  const { type } = useParams();
  const [open, setOpen] = useState(false);
  const [compania, setCompania] = useState({
    nombreCompania: "",
    IdPais: "",
    Sede: "",
    direccion: "",
    IdTamanoCompania: "",
    SectorId: "",
  });
  const [companias, setCompanias] = useState([]);
  const [data, setData] = useState({
    content: { country: [], sizeCompany: [], sector: [] },
    ids: { country: [], sizeCompany: [], sector: [] },
  });

  const companyConsume = async () => {
    try {
      await axios
        .create({
          baseURL: "https://dynamicliveconversationapi.azurewebsites.net/api/",
        })
        .get("companias/", config)
        .then((res) => {
          let data = [];
          res.data.forEach((val) => {
            if (!data.includes(val)) {
              data.push(val);
            }
          });
          setCompanias(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const sectorConsume = async () => {
    try {
      await axios
        .create({
          baseURL: "https://dynamicliveconversationapi.azurewebsites.net/api/",
        })
        .get("Sector/", config)
        .then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.Sector)) {
              fetch.push(val.Sector);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.sector = fetch;
          holder.ids.sector = id;
          setData(holder);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const sizeCompanyConsume = async () => {
    try {
      await axios
        .create({
          baseURL: "https://dynamicliveconversationapi.azurewebsites.net/api/",
        })
        .get("TamanoCompania/", config)
        .then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.nameSizeOfCompany)) {
              fetch.push(val.quantityOfEmployees);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.sizeCompany = fetch;
          holder.ids.sizeCompany = id;
          setData(holder);
        });
    } catch (error) {
      console.log(error);
      console.log("eror");
    }
  };
  const countryConsume = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net/api/paises/",
        })
        .get("", config)
        .then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.pais)) {
              fetch.push(val.pais);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.country = fetch;
          holder.ids.country = id;
          setData(holder);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleautocomplete = useCallback(
    (name, value) => {
      setCompania({ ...compania, [name]: value });
    },
    [compania]
  );
  const handleAddCompany = () => {
    let tmp = [...companias];
    let holder = compania;
    holder.id = uuid.v4();
    tmp.push(holder);
    setCompanias(tmp);
    setCompania({
      nombreCompania: "",
      IdPais: "",
      Sede: "",
      direccion: "",
      IdTamanoCompania: "",
      SectorId: "",
    });
    handleCloseModal();
  };
  const handlechange = useCallback(
    (event) => {
      setCompania({ ...compania, [event.target.name]: event.target.value });
    },
    [compania]
  );
  const renderSwitch = () => {
    switch (type) {
      case "Empresas":
        return (
          <NewCompany
            info={compania}
            content={data.content}
            handleAutocomplete={handleautocomplete}
            handleChange={handlechange}
            handleCloseModal={handleCloseModal}
            handleAddCompany={handleAddCompany}
          />
        );

      default:
        return null;
    }
  };
  const renderTable = () => {
    switch (type) {
      case "Empresas":
        return <Table companias={companias} type={type} ids={data.ids} />;

      default:
        return null;
    }
  };

  useEffect(() => {
    switch (type) {
      case "Empresas":
        if (data.content.country.length === 0) {
          countryConsume();
        }
        if (data.content.sizeCompany.length === 0) {
          sizeCompanyConsume();
        }
        if (data.content.sector.length === 0) {
          sectorConsume();
        }
        companyConsume();
        break;

      default:
        break;
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <div className={styles.modaltop}>
            <h2>Nueva {type}</h2>
            <div>
              <IconButton onClick={handleCloseModal}>
                <ClearIcon sx={{ fontSize: "40px" }} />
              </IconButton>
            </div>
          </div>
          <div className={styles.modalbuttom}>{renderSwitch()}</div>
        </Box>
      </Modal>
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
          <div className={styles.crud}>
            <div className={styles.top}>
              <div className={styles.type}>
                <Box
                  component="img"
                  alt="Your logo."
                  src={Building}
                  className={styles.icontype}
                />
                <h1>{type}</h1>
              </div>
              <div className={styles.new}>
                <Button
                  variant="contained"
                  style={{
                    whiteSpace: "nowrap",
                    padding: "1rem 1rem",
                    color: "white",
                  }}
                  color="primary"
                  onClick={handleOpenModal}
                >
                  nueva {type}
                </Button>
              </div>
            </div>
            <div className={styles.buttom}>{renderTable()}</div>
          </div>
        </div>
      </div>
    </Box>
  );
}
