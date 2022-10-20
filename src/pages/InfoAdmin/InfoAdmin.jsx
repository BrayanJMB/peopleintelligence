import React, { useState, useCallback, useEffect } from "react";
import styles from "./InfoAdmin.module.css";
import { useParams } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Building from "../../assets/Building.svg";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import NewCompany from "../../components/NewCompany/NewCompany";
import Sidebar from "../../components/Sidebar/Sidebar";
import axios from "axios";

const config = {
  headers: { "Content-type": "application/json" },
};

export default function InfoAdmin() {
  const { type } = useParams();
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const [info, setInfo] = useState({
    Usuario: {
      IdTipoDocumento: "",
      numeroDocumento: "",
      NombreCompleto: "",
      Cargo: "",
      correoElectronico: "",
      phoneNumber: "",
    },
  });
  const [data, setData] = useState({
    content: { documentType: [] },
    ids: { documentType: [] },
  });

  const documentTypeConsume = async () => {
    try {
      await axios
        .create({
          baseURL:
            "https://dynamicliveconversationapi.azurewebsites.net/api/tipo-documentos/",
        })
        .get("", config)
        .then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.tipoDocumento)) {
              fetch.push(val.tipoDocumento);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.documentType = fetch;
          holder.ids.documentType = id;
          setData(holder);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const handleautocomplete = useCallback(
    (part, name, value) => {
      let holder = info[part];
      holder[name] = value;
      setInfo({ ...info, [part]: holder });
    },
    [info]
  );

  const handlechange = useCallback(
    (part) => (event) => {
      let holder = info[part];
      holder[event.target.name] = event.target.value;
      setInfo({ ...info, [part]: holder });
    },
    [info]
  );

  const renderSwitch = () => {
    switch (type) {
      case "Empresas":
        return (
          <NewCompany
            info={info}
            content={data.content}
            handleAutocomplete={handleautocomplete}
            handleChange={handlechange}
          />
        );

      default:
        return null;
    }
  };

  useEffect(() => {
    switch (type) {
      case "Empresas":
        if (data.content.documentType.length === 0) {
          documentTypeConsume();
        }
        break;

      default:
        break;
    }
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
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
              </div>
            </div>
            <div className={styles.buttom}></div>
          </div>
        </div>
      </div>
    </Box>
  );
}
