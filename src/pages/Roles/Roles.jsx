import { useState, useEffect, useMemo } from "react";
import styles from "./Roles.module.css";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Navbar from "../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import * as uuid from "uuid";
import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { getRolesAPI } from "../../services/getRoles.service";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";
import axios from "../../utils/axiosInstance";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import NewRole from "../../components/NewRole/NewRole";

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
  const [role, setRole] = useState({
    companyId: "",
    roleId: "",
  });
  const [remove, setRemove] = useState(false);
  const [pageSize, setpageSize] = useState(5);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState({
    content: { company: [], roles: [] },
    ids: { company: [], roles: [] },
  });

  const companyConsume = async () => {
    try {
      await axios.get("companias/").then((res) => {
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

  const rolesConsume = async () => {
    try {
      await axios.get(`GetRolesAdd?userId=/`).then((res) => {
        let fetch = [];
        let id = [];
        res.data.forEach((val) => {
          if (!fetch.includes(val.nombreCompania)) {
            fetch.push(val.nombreCompania);
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
      field: "companyId",
      flex: 1,
      headerName: "Company Name",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        isNaN(params.row.companyId)
          ? params.row.companyId
          : search(
              params.row.companyId,
              data.ids.company,
              "nombreCompania",
              "id"
            ),
    },
    {
      field: "userName",
      flex: 1,
      headerName: "User Name",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "roles",
      flex: 1,
      headerName: "Roles",
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.row.roles.rolname;
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Add Roles",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <IconButton onClick={() => handleOpenModal("remove")}>
            <RemoveCircleOutlinedIcon />
          </IconButton>,
          <IconButton onClick={() => handleOpenModal("add")}>
            <AddCircleOutlinedIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const columns = useMemo(() => rolesColumn, []);

  const handleOpenModal = (text) => {
    if (text === "remove") {
      setRemove(true);
    }
    setOpen(true);
  };
  const handleCloseModal = () => {
    setOpen(false);
    setRemove(false);
  };

  const handleAddRole = () => {};

  const getTableData = () => {
    getRolesAPI(userInfo.Company)
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
        setRows(data);
      })
      .catch((e) => console.log(e));
  };

  const handleAutoCompleteCompany = (name, value) => {
    setRole({ ...role, [name]: value });
  };

  useEffect(() => {
    if (userInfo?.role.findIndex((p) => p === "Administrador") < 0) {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }
    companyConsume();
    rolesConsume();
    getTableData();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <Modal
        open={open || remove}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles.modal}>
          <div className={styles.modaltop}>
            <h2>{remove ? "Remove" : "Nueva"} Role</h2>
            <div>
              <IconButton onClick={handleCloseModal}>
                <ClearIcon sx={{ fontSize: "40px" }} />
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
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
          <div className={styles.crud}>
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
