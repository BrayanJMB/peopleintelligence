import { useCallback, useEffect,useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import * as uuid from 'uuid';

import Building from '../../assets/Building.svg';
import NewDashboard from '../../components/NewDashboard/NewDashboard';
import NewReport from '../../components/NewReport/NewReport';
import Table from '../../components/Table';
import { addItem, storeItems, updateItem } from '../../features/powerBiSlice';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import { editDashboardAPI } from '../../services/editDashboard.service';
import { editReportAPI } from '../../services/editReport.service';
import { getDashboardsAPI } from '../../services/getDashboards.service';
import { getReportsAPI } from '../../services/getReports.service';
import { postDashboardAPI } from '../../services/postDashboard.service';
import { postReportAPI } from '../../services/postReport.service';
import axios from '../../utils/axiosInstance';

import styles from './Register.module.css';

const search = (value, inputArray, field, proprety) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][proprety] === value) {
      return inputArray[i][field];
    }
  }
};

export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const powerBi = useSelector((state) => state.powerBi);
  const { type } = useParams();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  // state for input
  const [dashboard, setDashboard] = useState({
    reportId: '',
    groupId: '',
    reportName: '',
    descriptionReport: '',
    companyId: '',
  });
  const [report, setReport] = useState({
    name: '',
    descripcion: '',
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
      await axios.get('companias/').then((res) => {
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
      await axios.get('ListaDashboards/').then((res) => {
        let fetch = [];
        let id = [];
        res.data.forEach((val) => {
          if (!fetch.includes(val.name)) {
            fetch.push(val.name);
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
      if (name === 'reportName') {
        let holder = search(value, data.ids.report, 'descripcion', 'name');
        setDashboard({
          ...dashboard,
          [name]: value,
          descriptionReport: holder,
        });
      } else {
        setDashboard({ ...dashboard, [name]: value });
      }
    },
    [dashboard]
  );

  // handle data (new or edit)

  const handleDashboard = () => {
    if (edit) {
      dispatch(updateItem({ data: dashboard, type: type, id: dashboard._id }));
      editDashboardAPI(
        dashboard._id,
        dashboard.reportId,
        dashboard.groupId,
        dashboard.reportName,
        dashboard.descriptionReport,
        dashboard.companyId
      );
    } else {
      const id = uuid.v4();
      let holder = dashboard;
      holder._id = id;

      let tmp = { ...dashboard };
      tmp.companyId = search(
        dashboard.companyId,
        data.ids.company,
        'id',
        'nombreCompania'
      );
      postDashboardAPI(tmp)
        .then((res) => dispatch(addItem({ data: holder, type: type })))
        .catch((err) => {
          if (err.response.status === 500) {
            alert('no puede haber dashboard Iguales');
          }
        });
    }
    setDashboard({
      nombreCompania: '',
      IdPais: '',
      Sede: '',
      direccion: '',
      IdTamanoCompania: '',
      SectorId: '',
    });
    handleCloseModal();
  };
  const handleReport = () => {
    if (edit) {
      dispatch(updateItem({ data: report, type: type, id: report._id }));
      editReportAPI(report.id, report.name, report.descripcion);
    } else {
      const id = uuid.v4();
      let holder = report;
      holder._id = id;
      dispatch(addItem({ data: holder, type: type }));
      postReportAPI(holder);
    }
    setReport({
      name: '',
      descripcion: '',
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
      case 'dashboard':
        return (
          <NewDashboard
            info={dashboard}
            content={data.content}
            ids={data.ids}
            handleAutocomplete={handleAutoCompleteDashboard}
            handleChangeDashboard={handleChangeDashboard}
            handleCloseModal={handleCloseModal}
            handleAddDashboard={handleDashboard}
          />
        );
      case 'report':
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

  const handleSwitch = (event, row) => {
    editDashboardAPI(
      row.id,
      row.reportId,
      row.groupId,
      row.reportName,
      row.descriptionReport,
      event.target.checked,
      row.companyId
    ).then((res) => {
      let holder = res.data;
      holder._id = row._id;
      dispatch(updateItem({ data: holder, type: type, id: holder._id }));
      if (event.target.checked) {
        alert('El dashborad esta desactivado');
      } else {
        alert('El dashboard esta activo');
      }
    });
  };

  //edit item
  const handleEditItem = (row) => {
    switch (type) {
      case 'dashboard':
        setDashboard({
          ...row,
        });
        break;
      case 'report':
        setReport({ ...row });
        break;
      default:
        break;
    }
    setEdit(true);
  };

  const getTableData = () => {
    switch (type) {
      case 'dashboard':
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
      case 'report':
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
    if (userInfo?.role.findIndex((p) => p === 'PowerBiAdministrator') < 0) {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }
    getTableData();
  }, [type]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <IconSidebar />
      <Modal
        open={open || edit}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <div className={styles.modaltop}>
            <h2>
              {open ? 'Nueva' : 'Editar'} {type}
            </h2>
            <div>
              <IconButton onClick={handleCloseModal}>
                <ClearIcon sx={{ fontSize: '40px' }} />
              </IconButton>
            </div>
          </div>
          <div className={styles.modalbuttom}>{renderModal()}</div>
        </Box>
      </Modal>
      <div style={{ backgroundColor: 'white' }}>
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
                    whiteSpace: 'nowrap',
                    padding: '1rem 1rem',
                    color: 'white',
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
                  handleSwitch={handleSwitch}
                />
              }
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
