import { useEffect, useMemo,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ClearIcon from '@mui/icons-material/Clear';
import RemoveCircleOutlinedIcon from '@mui/icons-material/RemoveCircleOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { grey } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import Modal from '@mui/material/Modal';
import { DataGrid, gridClasses } from '@mui/x-data-grid';
import * as uuid from 'uuid';

import NewMulti from '../../components/NewMulti/NewMulti';
import NewRole from '../../components/NewRole/NewRole';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import Navbar from '../../Layout/Navbar/Navbar';
import { deleteRolesAPI } from '../../services/deleteRoles.service';
import { getCompaniesAPI } from '../../services/getCompanies.service';
import { getRolesAPI } from '../../services/getRoles.service';
import { postMultiRoleAPI } from '../../services/postMultiRole.service';
import { postRoleAPI } from '../../services/postRole.service';
import axios from '../../utils/axiosInstance';

import styles from './Roles.module.css';

const search = (id, inputArray, field, proprety) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][proprety] === id) {
      return inputArray[i][field];
    }
  }
};

export default function Roles() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [multi, setMulti] = useState(false);
  const [noCompany, setNoCompany] = useState(false);
  const [role, setRole] = useState({
    companyId: '',
    roleId: '',
  });
  const [multirole, setMultirole] = useState({
    companyId: '',
    roleId: '',
    userId: '',
  });
  const [pageSize, setpageSize] = useState(5);
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  const [data, setData] = useState({
    content: {
      company: [],
      roles: [],
      companyroles: [],
      roleroles: [],
      usuariorole: [],
    },
    ids: {
      company: [],
      roles: [],
      companyroles: [],
      roleroles: [],
      usuariorole: [],
    },
  });
  const [userId, setuserId] = useState('');

  getCompaniesAPI(userInfo?.user).then((res) => {
    if (res.data.length === 0) {
      setNoCompany(true);
    }
  });

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
  const companyRolesConsume = async () => {
    try {
      await axios.get('roles/GetUserMultyCompani/').then((res) => {
        let fetchcompany = [];
        let fetchrole = [];
        let fetchusuario = [];
        res.data.companies.forEach((val) => {
          if (!fetchcompany.includes(val.businessName)) {
            fetchcompany.push(val.businessName);
          }
        });
        res.data.roles.forEach((val) => {
          if (!fetchrole.includes(val.name)) {
            fetchrole.push(val.name);
          }
        });
        res.data.usuario.forEach((val) => {
          if (!fetchusuario.includes(val.userName)) {
            fetchusuario.push(val.userName);
          }
        });

        let holder = data;

        holder.content.companyroles = fetchcompany;
        holder.content.roleroles = fetchrole;
        holder.content.usuariorole = fetchusuario;
        holder.ids.companyroles = res.data.companies;
        holder.ids.roleroles = res.data.roles;
        holder.ids.usuariorole = res.data.usuario;
        setData(holder);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rolesConsume = async (id) => {
    try {
      await axios.get(`Roles/GetRolesAdd?userId=${id}`).then((res) => {
        let fetch = [];
        let id = [];
        res.data.forEach((val) => {
          if (!fetch.includes(val.name)) {
            fetch.push(val.name);
            id.push(val);
          }
        });
        let holder = data;
        holder.content.roles = fetch;
        holder.ids.roles = id;
        setData(holder);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const rolesColumn = [
    {
      field: 'companyName',
      flex: 1,
      headerName: 'Nombre compañia',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'userName',
      flex: 1,
      headerName: 'Usuario',
      headerAlign: 'center',
      align: 'center',
    },
    {
      field: 'roles',
      flex: 1,
      headerName: 'Roles',
      headerAlign: 'center',
      align: 'center',
      valueGetter: (params) => {
        return params.row.roles.rolname;
      },
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Acciones',
      flex: 1,
      cellClassName: 'actions',
      getActions: (params) => {
        return [
          <IconButton
            onClick={() =>
              handledelete(params.row.roles.rolId, params.row.userId)
            }
          >
            <RemoveCircleOutlinedIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const columns = useMemo(() => rolesColumn, []);

  const handleOpenModal = () => {
    setOpen(true);
  };
  const handleOpenMultiModal = () => {
    setMulti(true);
  };
  const handledelete = (value, userid) => {
    deleteRolesAPI(userid, value).then((res) => {
      alert('Rol eliminado Satisfactoriamente');
      getTableData();
    });
  };
  const handleCloseModal = () => {
    setOpen(false);
  };
  const handleCloseMultiModal = () => {
    setMulti(false);
  };

  const handleAddRole = () => {
    let roleId = search(role.roleId, data.ids.roles, 'id', 'name');
    postRoleAPI({ userId: userId, roleId: roleId }).then((res) => {
      getTableData();
      setOpen(false);
    });
  };
  const handleAddMultiRole = () => {
    let companyId = search(
      multirole.companyId,
      data.ids.companyroles,
      'id',
      'businessName'
    );

    let roleId = search(multirole.roleId, data.ids.roleroles, 'id', 'name');
    let userId = search(
      multirole.userId,
      data.ids.usuariorole,
      'id',
      'userName'
    );
    postMultiRoleAPI({
      idUser: userId,
      idrol: roleId,
      idCompany: companyId,
    }).then((res) => {
      setMulti(false);
    });
  };

  const getTableData = () => {
    getRolesAPI(userInfo.Company)
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
        setRows(data);
      })
      .catch((e) => console.log(e));
  };

  const handleAutoCompleteCompany = async (name, value) => {
    if (name === 'companyId' && value !== '') {
      if (userId !== '') {
        rolesConsume(userId);
      }
      let user = '';
      await axios.get('companias/CompaniasAdmin/').then((res) => {
        let index = res.data.findIndex((p) => p.company === value);
        if (index > -1) {
          user = res.data[index].user;
        }
      });
      rolesConsume(user);
      setuserId(user);
    }
    setRole({ ...role, [name]: value });
  };
  const handleAutoCompleteMulti = async (name, value) => {
    setMultirole({ ...multirole, [name]: value });
  };

  useEffect(() => {
    if (userInfo?.role.findIndex((p) => p === 'Administrador') < 0) {
      alert('No tiene permiso para acceder a esta funcionalidad');
      navigate('/dashboard');
    }
    if (userId !== '') {
      rolesConsume(userId);
    }
    companyConsume();
    companyRolesConsume();
    getTableData();
  }, [userId]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar />
      <IconSidebar />
      <Modal
        open={open}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <div className={styles.modaltop}>
            <h2>Nueva Role</h2>
            <div>
              <IconButton onClick={handleCloseModal}>
                <ClearIcon sx={{ fontSize: '40px' }} />
              </IconButton>
            </div>
          </div>
          <div className={styles.modalbuttom}>
            {
              <NewRole
                info={role}
                ids={data.ids}
                content={data.content}
                handleAutocomplete={handleAutoCompleteCompany}
                handleCloseModal={handleCloseModal}
                handleAddRole={handleAddRole}
              />
            }
          </div>
        </Box>
      </Modal>
      <Modal
        open={multi}
        onClose={handleCloseMultiModal}
        aria-labelledby="modal-modal-title2"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <div className={styles.modaltop}>
            <h2>Nueva Role Multicompania</h2>
            <div>
              <IconButton onClick={handleCloseMultiModal}>
                <ClearIcon sx={{ fontSize: '40px' }} />
              </IconButton>
            </div>
          </div>
          <div className={styles.modalbuttom}>
            {
              <NewMulti
                info={multirole}
                ids={data.ids}
                content={data.content}
                handleAutocomplete={handleAutoCompleteMulti}
                handleCloseModal={handleCloseMultiModal}
                handleAddRole={handleAddMultiRole}
              />
            }
          </div>
        </Box>
      </Modal>
      <div style={{ backgroundColor: 'white' }}>
        <div className={styles.content}>
          <div className={styles.crud}>
            <div className={styles.top}>
              <div className={styles.type}>
                <h1>Roles</h1>
              </div>
              <div className={styles.new}>
                <Button
                  variant="contained"
                  style={{
                    whiteSpace: 'nowrap',
                    padding: '1rem 1rem',
                    color: 'white',
                    marginRight: '2em',
                  }}
                  color="primary"
                  onClick={handleOpenMultiModal}
                >
                  Añadir roles multicompañia
                </Button>
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
                  Añadir roles
                </Button>
              </div>
            </div>
            <div className={styles.buttom}>
              <DataGrid
                rows={rows}
                columns={columns}
                getRowId={(row) => row._id}
                rowsPerPageOptions={[5, 10, 20]}
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setpageSize(newPageSize)}
                getRowSpacing={(params) => ({
                  top: params.isFirstVisible ? 0 : 5,
                  bottom: params.isLastVisible ? 0 : 5,
                })}
                sx={{
                  [`& .${gridClasses.row}`]: {
                    bgcolor: grey[200],
                  },
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
