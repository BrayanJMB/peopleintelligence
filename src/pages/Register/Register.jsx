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
import { getReportsAPI } from "../../services/getReports.service";
import { getDashboardsAPI } from "../../services/getDashboards.service";
import { useSelector, useDispatch } from "react-redux";
import { addItem, storeItems, updateItem } from "../../features/powerBiSlice";

const config = {
  headers: { "Content-type": "application/json" },
};

export default function Register() {
  const dispatch = useDispatch();
  const powerBi = useSelector((state) => state.powerBi);
  const { type } = useParams();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);

  // state for input
  const [dashboard, setDashboard] = useState({
    reportId: "",
    groupId: "",
    reportName: "",
    descriptionReport: "",
    isActive: "",
    companyId: "",
  });
  const [report, setReport] = useState({
    name: "",
    description: "",
  });

  const tableData = powerBi[type];

  // state for ids
  const [data, setData] = useState({
    content: { company: [], report: [] },
    ids: { company: [], report: [] },
  });

  // get ids data

  const companyConsume = async () => {
    try {
      await axios
        .create({
          baseURL: "https://peopleintelligenceapi.azurewebsites.net/api/",
        })
        .get("companias/", config)
        .then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.nombreCompania)) {
              fetch.push(val.nombreCompania);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.company = fetch;
          holder.ids.company = id;
          setData(holder);
        });
    } catch (error) {
      console.log(error);
    }
  };
  const reportConsume = async () => {
    try {
      await axios
        .create({
          baseURL: "https://peopleintelligenceapi.azurewebsites.net/api/",
        })
        .get("ListaDashboards/", config)
        .then((res) => {
          let fetch = [];
          let id = [];
          res.data.forEach((val) => {
            if (!fetch.includes(val.nombreCompania)) {
              fetch.push(val.nombreCompania);
              id.push(val);
            }
          });
          let holder = data;
          holder.content.report = fetch;
          holder.ids.report = id;
          setData(holder);
        });
    } catch (error) {
      console.log(error);
    }
  };

  // handle modal
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setEdit(false);
  };

  // handle autocomplete change

  const handleAutoCompleteDashboard = useCallback(
    (name, value) => {
      setDashboard({ ...dashboard, [name]: value });
    },
    [dashboard]
  );

  // handle data (new or edit)

  const handleDashboard = () => {
    if (edit) {
      dispatch(updateItem({ data: dashboard, type: type, id: dashboard._id }));
    } else {
      const id = uuid.v4();
      let holder = dashboard;
      holder._id = id;
      dispatch(addItem({ data: holder, type: type }));
    }
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
  const handleReport = () => {
    if (edit) {
      dispatch(updateItem({ data: report, type: type, id: report._id }));
    } else {
      const id = uuid.v4();
      let holder = report;
      holder._id = id;
      dispatch(addItem({ data: holder, type: type }));
    }
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

  // show modal

  const renderModal = () => {
    switch (type) {
      case "dashboard":
        return (
          <NewDashboard
            info={dashboard}
            content={data.content}
            handleAutocomplete={handleAutoCompleteDashboard}
            handleChangeDashboard={handleChangeDashboard}
            handleCloseModal={handleCloseModal}
            handleAddDashboard={handleDashboard}
          />
        );
      case "report":
        return (
          <NewReport
            info={report}
            content={data.content}
            handleChangeReport={handleChangeReport}
            handleCloseModal={handleCloseModal}
            handleAddReport={handleReport}
          />
        );

      default:
        return null;
    }
  };

  //edit item
  const handleEditItem = (row) => {
    switch (type) {
      case "dashboard":
        setDashboard({
          ...row,
        });
        break;
      case "report":
        setReport({ ...row });
        break;
      default:
        break;
    }
    setEdit(true);
  };

  const getTableData = () => {
    switch (type) {
      case "dashboard":
        reportConsume();
        companyConsume();
        getDashboardsAPI()
          .then((res) => {
            let data = [];
            res.data.forEach((val) => {
              let id = uuid.v4();
              if (!data.includes(val)) {
                let holder = val;
                holder._id = id;
                data.push(val);
              }
            });
            dispatch(storeItems({ data, type: type }));
          })
          .catch((e) => console.log(e));
        break;
      case "report":
        companyConsume();
        getReportsAPI()
          .then((res) => {
            let data = [];
            res.data.forEach((val) => {
              let id = uuid.v4();
              if (!data.includes(val)) {
                let holder = val;
                holder._id = id;
                data.push(val);
              }
            });
            dispatch(storeItems({ data, type: type }));
          })
          .catch((e) => console.log(e));
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getTableData();
  }, [type]);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <Modal
        open={open || edit}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <div className={styles.modaltop}>
            <h2>
              {open ? "Nueva" : "Editar"} {type}
            </h2>
            <div>
              <IconButton onClick={handleCloseModal}>
                <ClearIcon sx={{ fontSize: "40px" }} />
              </IconButton>
            </div>
          </div>
          <div className={styles.modalbuttom}>{renderModal()}</div>
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
            <div className={styles.buttom}>
              {
                <Table
                  tableData={tableData}
                  type={type}
                  ids={data.ids}
                  content={data.content}
                  handleEditItem={handleEditItem}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
