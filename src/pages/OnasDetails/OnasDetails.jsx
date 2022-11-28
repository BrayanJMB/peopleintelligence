import { useState, useEffect, useMemo } from "react";
import styles from "./OnasDetails.module.css";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Navbar from "../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import * as uuid from "uuid";
import { grey } from "@mui/material/colors";
import { useNavigate, useLocation } from "react-router-dom";
import { getOnasDetailsAPI } from "../../services/getOnasDetails.service";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

export default function OnasDetails() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [rows, setRows] = useState([]);
  const [pageSize, setpageSize] = useState(5);

  const onasColumn = [
    {
      field: "persona",
      flex: 1,
      headerName: "Nombre Empleado",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "fechaLimite",
      flex: 1,
      headerName: "Fecha máxima de respuesta",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "respondio",
      flex: 1,
      headerName: "Respondió?",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Link Encuesta",
      width: 250,
      cellClassName: "actions",
      getActions: (params) => {
        console.log(params.row);
        return [
          <IconButton
            onClick={() => navigator.clipboard.writeText(params.row.linkAnswer)}
          >
            <ContentCopyIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const columns = useMemo(() => onasColumn, []);

  const getTableData = () => {
    getOnasDetailsAPI(state)
      .then((res) => {
        console.log(res.data.personResponse);
        let data = [];
        res.data.personResponse.forEach((val) => {
          let id = uuid.v4();
          if (!data.includes(val)) {
            let holder = val;
            holder._id = id;
            data.push(val);
          }
        });
        setRows(res.data.personResponse);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === "Onas") < 0 &&
      userInfo?.role.findIndex((p) => p === "Administrador") < 0
    ) {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }

    getTableData();
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
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
