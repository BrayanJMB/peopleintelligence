import { useState, useCallback, useEffect } from "react";
import styles from "./Register.module.css";
import { useParams } from "react-router-dom";
import Navbar from "../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Building from "../../assets/Building.svg";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import NewDashboard from "../../components/NewDashboard/NewDashboard";
import NewReport from "../../components/NewReport/NewReport";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import Table from "../../components/Table";
import * as uuid from "uuid";
import axios from "axios";

const config = {
  headers: { "Content-type": "application/json" },
};

export default function Register() {
  const { type } = useParams();
  const [open, setOpen] = useState(false);

  // state for input
  const [dashboard, setDashboard] = useState({
    nombreCompania: "",
    IdPais: "",
  });
  const [report, setReport] = useState({
    name: "",
    description: "",
  });

  //state for data
  const [dashboards, setDashboards] = useState([]);
  const [reports, setReports] = useState([]);

  //state for ids
  const [data, setData] = useState({
    content: { country: [], sizeCompany: [], sector: [], company: [] },
    ids: { country: [], sizeCompany: [], sector: [], company: [] },
  });

  // get data

  const getDashboards = async () => {
    try {
      await axios
        .create({
          baseURL: "https://peopleintelligenceapi.azurewebsites.net/api/",
        })
        .get("ListaDashboards/", config)
        .then((res) => {
          let data = [];
          res.data.forEach((val) => {
            if (!data.includes(val)) {
              data.push(val);
            }
          });
          setDashboards(data);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const getReports = async () => {
    try {
      await axios
        .create({
          baseURL: "https://peopleintelligenceapi.azurewebsites.net/api/",
        })
        .get("ListaReports/", config)
        .then((res) => {
          let data = [];
          res.data.forEach((val) => {
            if (!data.includes(val)) {
              data.push(val);
            }
          });
          setReports(data);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // get ids data

  // handle modal
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);

  // handle autocomplete change

  const handleAutoCompleteDashboard = useCallback(
    (name, value) => {
      setDashboard({ ...dashboard, [name]: value });
    },
    [dashboard]
  );

  // handle add data

  const handleAddDashboard = () => {
    let tmp = [...dashboards];
    let holder = dashboard;
    holder.id = uuid.v4();
    tmp.push(holder);
    setDashboards(tmp);
    setDashboard({
      nombreCompania: "",
      IdPais: "",
      Sede: "",
      direccion: "",
      IdTamanoCompania: "",
      SectorId: "",
    });
    handleCloseModal();
  };
  const handleAddReport = () => {
    let tmp = [...reports];
    let holder = report;
    holder.id = uuid.v4();
    tmp.push(holder);
    setReports(tmp);
    setReport({
      name: "",
      description: "",
    });
    handleCloseModal();
  };

  // handle change input

  const handleChangeDashboard = useCallback(
    (event) => {
      setDashboard({ ...dashboard, [event.target.name]: event.target.value });
    },
    [dashboard]
  );
  const handleChangeReport = useCallback(
    (event) => {
      setReport({ ...report, [event.target.name]: event.target.value });
    },
    [report]
  );

  const renderSwitch = () => {
    switch (type) {
      case "dashboard":
        return (
          <NewDashboard
            info={dashboard}
            content={data.content}
            handleAutocomplete={handleAutoCompleteDashboard}
            handleChangeDashboard={handleChangeDashboard}
            handleCloseModal={handleCloseModal}
            handleAddDashboard={handleAddDashboard}
          />
        );
      case "report":
        return (
          <NewReport
            info={report}
            content={data.content}
            handleChangeReport={handleChangeReport}
            handleCloseModal={handleCloseModal}
            handleAddReport={handleAddReport}
          />
        );

      default:
        return null;
    }
  };
  const renderTable = () => {
    switch (type) {
      case "dashboard":
        return <Table dashboards={dashboards} type={type} ids={data.ids} />;

      case "report":
        return <Table reports={reports} type={type} ids={data.ids} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    switch (type) {
      case "dashboard":
        getDashboards();
        break;
      case "report":
        getReports();
        break;

      default:
        break;
    }
  }, [type]);

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
