import { useCallback, useEffect, useRef,useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch,useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import * as uuid from 'uuid';

import Building from '../../assets/Building.svg';
import MyCard from '../../components/MyCard/MyCard';
import MyTable from '../../components/MyTable/MyTable';
import NewRoleUserAdministrator from '../../components/NewRolUserAdministrator/NewRoleUserAdministrator';
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

import stylesJ from '../../pages/JourneySettingsPage/JourneySettingsPage.module.css';
import styles from '../InfoAdmin/InfoAdmin.module.css';

const search = (value, inputArray, field, proprety) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][proprety] === value) {
      return inputArray[i][field];
    }
  }
};

export default function UserAdministrator() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const admin = useSelector((state) => state.admin);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const { type } = useParams();
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentCreate, setCurrentCreate] = useState(null);
  const [RolUserAdministrators, setRolUserAdministrators] = useState([]);

   //rol Usuario
 const RolUsserAdministratorColumns = [

  {
    id: 'emailUserAdministrator',
    label: 'Correo Usuario',
    numeric: true,
  },
  {
    id: 'name',
    label: 'Rol Usuario',
    numeric: false,
  },
  {
    id: 'ActionUsuario',
    label: 'Aciones',
    numeric: false,
  },

];


  const csvLink = useRef();
  const importcsv = useRef();

  const [values, setValues] = useState({
    isOpen: false,
    message: '',
    severity: '',
  });

  const [employecsv, setEmployecsv] = useState('');

  // handle modal
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => {
    setOpen(false);
    setEdit(false);
  };
  const handleClose = () => {
    setValues({ ...values, isOpen: false });
  };

  
  const handleCreateRolUserAdministrator = () => {
    setCurrentCreate({
      type: 'UserAdministrator',
      title: 'Crear Rol Usuario',
      fields: [
        {
          label: 'Usuario',
          name: 'administradorUsuario',
          type: 'text',
          isRequired: true,
        },
      ],
    });
    handleOpenModal();
  };

  const handleAddUserAdministrator = ({ user, role }) => {
    axios.post('/api/user-administrator', { user, role })
    .then(response => {
      setValues({
        ...values,
        message:
          'El usuario y el rol se guardaron correctamente',
        isOpen: true,
        severity: 'success',
      });
    })
    .catch(error => {
      console.error('Ocurrió un error al guardar el usuario y el rol', error);
    });
    setOpen(false);
  };
  
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
              Nuevo rol de Usuario
            </h2>
            <div>
              <IconButton onClick={handleCloseModal}>
                <ClearIcon sx={{ fontSize: '40px' }} />
              </IconButton>
            </div>
          </div>
          <div className={styles.modalbuttom}>
          {
              <NewRoleUserAdministrator
                handleCloseModal={handleCloseModal}
                handleAddUserAdministrator={handleAddUserAdministrator}
              />
            }
          </div>
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
                <h1>Administrador de Usuario</h1>
              </div>
            </div>
            <div className={styles.buttom}>
              <div className={stylesJ.JourneySettingsPage}>
                <div className={stylesJ.JourneySettingsPage__content}>  
                  <MyCard sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Stack
                        spacing={2}
                        direction='row-reverse'
                        sx={{
                          mb: 2,
                        }}
                      >
                        <Button
                          variant='outlined'
                          startIcon={<AddIcon />}
                          onClick={handleCreateRolUserAdministrator}
                        >
                          Crear Rol Usuario
                        </Button>
                      </Stack>
                      <MyTable
                        title={'Rol Usuarios'}
                        columns={RolUsserAdministratorColumns}
                        rows={RolUserAdministrators}
                      />
                  </MyCard>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
