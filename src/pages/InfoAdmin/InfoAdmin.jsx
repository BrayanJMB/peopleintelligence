import { useCallback, useEffect, useRef,useState } from 'react';
import { CSVLink } from 'react-csv';
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
import NewCompany from '../../components/NewCompany/NewCompany';
import NewDepartment from '../../components/NewDepartment/NewDepartment';
import NewOffice from '../../components/NewOffice/NewOffice';
import Notification from '../../components/Notification';
import Table from '../../components/Table';
import { addItem, storeItems, updateItem } from '../../features/adminSlice';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import { getCompaniesAPI } from '../../services/getCompanies.service';
import { getDepartmentsAPI } from '../../services/getDepartments.service';
import { getEmployeesAPI } from '../../services/getEmployees.service';
import { getOfficesAPI, postOfficeAPI } from '../../services/getOffices.service';
import { postCompanyAPI } from '../../services/postCompany.service';
import axios from '../../utils/axiosInstance';

import styles from './InfoAdmin.module.css';

const search = (value, inputArray, field, proprety) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][proprety] === value) {
      return inputArray[i][field];
    }
  }
};

export default function InfoAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { type } = useParams();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [compania, setCompania] = useState({
    nombreCompania: '',
    IdPais: '',
    Sede: '',
    direccion: '',
    IdTamanoCompania: '',
    SectorId: '',
    Logotipo: null,
  });
  const [oficina, setOficina] = useState({
    sede: '',
    IdCompania: '',
  });
  const [department, setDepartement] = useState({
    IdPais: '',
    codigoDepartamento: '',
    departamento: '',
  });
  const tableData = admin[type];

  // state for ids
  const [data, setData] = useState({
    content: { country: [], sizeCompany: [], sector: [], company: [] },
    ids: { country: [], sizeCompany: [], sector: [], company: [] },
  });
  const csvLink = useRef();
  const importcsv = useRef();

  const [values, setValues] = useState({
    isOpen: false,
    message: '',
    severity: '',
  });

  const [employecsv, setEmployecsv] = useState('');

  // get ids data

  const sectorConsume = async () => {
    try {
      await axios.get('Sector/').then((res) => {
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
      await axios.get('TamanoCompania/').then((res) => {
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
        console.log(holder.content.sizeCompany);
        setData(holder);
      });
    } catch (error) {
      console.log(error);
      console.log('eror');
    }
  };
  const countryConsume = async () => {
    try {
      await axios.get('paises/').then((res) => {
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
        console.log('hola' + holder.content.company);

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

  const handleAutoCompleteCompany = useCallback(
    (name, value) => {
      setCompania({ ...compania, [name]: value });
    },
    [compania]
  );
  const handleAutoCompleteOficina = useCallback(
    (name, value) => {
      setOficina({ ...oficina, [name]: value });
    },
    [oficina]
  );
  const handleAutoCompleteDepartment = useCallback(
    (name, value) => {
      setDepartement({ ...department, [name]: value });
    },
    [department]
  );

  const handlephoto = (event) => {
    if (event.target.files[0].size < 500000) {
      setCompania({ ...compania, Logotipo: event.target.files[0] });
    } else {
      setValues({
        ...values,
        message:
          'El tamaño de la imagen para el logotipo no puede ser mayor a 500kB',
        isOpen: true,
        severity: 'error',
      });
    }
  };

  // handle data (new or edit)

  const handleCompany = async () => {
    if (edit) {
      dispatch(updateItem({ data: compania, type: type, id: compania._id }));
    } else {
      const id = uuid.v4();
      let holder = compania;
      holder._id = id;
      dispatch(addItem({ data: holder, type: type }));
      let idpais = search(compania.IdPais, data.ids.country, 'id', 'pais');
      let sectorid = search(compania.SectorId, data.ids.sector, 'id', 'Sector');
      let sizeid = search(
        compania.IdTamanoCompania,
        data.ids.sizeCompany,
        'id',
        'quantityOfEmployees'
      );
      let logoTipo = null;

      if (compania.Logotipo !== null) {
        let bodyFormData = new FormData();
        bodyFormData.append('logoTipo', compania.Logotipo);

        await fetch(
          `https://peopleintelligenceapi.azurewebsites.net/api/Autenticacion/LogoCompany?BussinesName=${compania.nombreCompania}`,
          {
            method: 'POST',
            body: bodyFormData,
          }
        )
          .then((response) => response.json())
          .then((res) => {
            logoTipo = res.urlLogo;
          })
          .catch((err) => console.log(err));
      }
      postCompanyAPI(
        oficina,
        idpais,
        sectorid,
        sizeid,
        userInfo.user,
        logoTipo
      );
    }

    setCompania({
      nombreCompania: '',
      IdPais: '',
      Sede: '',
      direccion: '',
      IdTamanoCompania: '',
      SectorId: '',
      Logotipo: null,
    });
    handleCloseModal();
  };
  
  const handleOficina = () => {
    if (edit) {
      dispatch(updateItem({ data: oficina, type: type, id: oficina._id }));
    } else {
      const id = '';
      let holder = oficina;
      holder._id = id;
      dispatch(addItem({ data: holder, type: type }));

      postOfficeAPI(
        oficina,
        userInfo.Company
      );
    }
    setOficina({
      sede: '',
      IdCompania: '',
    });
    handleCloseModal();
  };

  const handleDepartment = () => {
    if (edit) {
      dispatch(
        updateItem({ data: department, type: type, id: department._id })
      );
    } else {
      const id = uuid.v4();
      let holder = department;
      holder._id = id;
      dispatch(addItem({ data: holder, type: type }));
    }
    setDepartement({
      IdPais: '',
      codigoDepartamento: '',
      departamento: '',
    });
    handleCloseModal();
  };

  // handle change input

  const handleChangeCompania = useCallback(
    (event) => {
      setCompania({ ...compania, [event.target.name]: event.target.value });
    },
    [compania]
  );
  const handleChangeOficina = useCallback(
    (event) => {
      setOficina({ ...oficina, [event.target.name]: event.target.value });
    },
    [oficina]
  );
  const handleChangeDepartment = useCallback(
    (event) => {
      setDepartement({
        ...department,
        [event.target.name]: event.target.value,
      });
    },
    [department]
  );

  const handleDownload = () => {
    axios
      .get('Employee/DownloadCsvEmployee')
      .then((res) => setEmployecsv(res.data));
  };

  // show modal

  const renderModal = () => {
    switch (type) {
      case 'Empresas':
        return (
          <NewCompany
            info={compania}
            ids={data.ids}
            content={data.content}
            handleAutocomplete={handleAutoCompleteCompany}
            handleChangeCompania={handleChangeCompania}
            handleCloseModal={handleCloseModal}
            handleCompany={handleCompany}
            handlePhoto={handlephoto}
          />
        );
      case 'Oficinas':
        return (
          <NewOffice
            info={oficina}
            content={data.content}
            handleAutocomplete={handleAutoCompleteOficina}
            handleChangeOficina={handleChangeOficina}
            handleCloseModal={handleCloseModal}
            handleOffice={handleOficina}
          />
        );
      case 'Departamentos':
        return (
          <NewDepartment
            info={department}
            content={data.content}
            handleAutocomplete={handleAutoCompleteDepartment}
            handleChangeDepartment={handleChangeDepartment}
            handleCloseModal={handleCloseModal}
            handleDepartment={handleDepartment}
          />
        );
      default:
        return null;
    }
  };

  //edit item
  const handleEditItem = (row) => {
    console.log(row);
    switch (type) {
      case 'Empresas':
        setCompania({
          ...row,
        });
        break;
      case 'Oficinas':
        setOficina({ ...row });
        break;
      case 'Departamentos':
        setDepartement({ ...row });
        break;
      default:
        break;
    }
    setEdit(true);
  };

  // get data

  const getTableData = () => {
    switch (type) {
      case 'Empresas':
        countryConsume();
        sizeCompanyConsume();
        sectorConsume();
        getCompaniesAPI(userInfo.user)
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
      case 'Empleados':
        countryConsume();
        sizeCompanyConsume();
        sectorConsume();
        getEmployeesAPI(userInfo.Company)
          .then((res) => {
            console.log(res.data);
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
      case 'Oficinas':
        companyConsume();
        getOfficesAPI()
          .then((res) => {
            console.log(res);
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
      case 'Departamentos':
        countryConsume();
        getDepartmentsAPI()
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
        countryConsume();
        getDepartmentsAPI()
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
    }
  };

  const handleClose = () => {
    setValues({ ...values, isOpen: false });
  };

  const handleFile = async (event) => {
    let bodyFormData = new FormData();
    bodyFormData.append('data', event.target.files[0]);

    await fetch(
      `https://peopleintelligenceapi.azurewebsites.net/api/Employee/EmployeesCsv/${userInfo.Company}`,
      {
        method: 'POST',
        body: bodyFormData,
      }
    )
      .then((response) => response.json())
      .then((res) => {
        setValues({
          ...values,
          message: res.message,
          isOpen: true,
          severity: 'success',
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (employecsv) {
      csvLink.current.link.click();
    }
  }, [employecsv]);

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === 'Management') < 0 &&
      userInfo?.role.findIndex((p) => p === 'Administrador') < 0
    ) {
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
        <CSVLink
          data={employecsv}
          filename={'Employees.csv'}
          style={{ display: 'none' }}
          ref={csvLink}
          target="_blank"
        />
        <Notification
          severity={values.severity}
          message={values.message}
          isOpen={values.isOpen}
          onClose={handleClose}
        />
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
                {type === 'Empleados' ? (
                  <div>
                    <Button
                      variant="contained"
                      style={{
                        whiteSpace: 'nowrap',
                        padding: '1rem 1rem',
                        color: 'white',
                      }}
                      color="primary"
                      onClick={handleDownload}
                    >
                      Descargar csv empleados
                    </Button>
                    <Button
                      variant="contained"
                      style={{
                        whiteSpace: 'nowrap',
                        padding: '1rem 1rem',
                        color: 'white',
                        marginLeft: '1rem',
                      }}
                      color="primary"
                      onClick={() => {
                        importcsv.current.click();
                      }}
                    >
                      Subir empleados
                    </Button>
                  </div>
                ) : null}
                <Button
                  variant="contained"
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '1rem 1rem',
                    color: 'white',
                    marginLeft: '1rem',
                  }}
                  color="primary"
                  onClick={handleOpenModal}
                >
                  {type === 'Empleados' ? 'nuevo ' : 'nueva '}
                  {type}
                </Button>
                <input
                  type="file"
                  onChange={handleFile}
                  accept=".csv"
                  name="file"
                  ref={importcsv}
                  hidden
                />
              </div>
            </div>
            <div className={styles.buttom}>
              <Table
                tableData={tableData}
                type={type}
                ids={data.ids}
                content={data.content}
                handleEditItem={handleEditItem}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
