import { useState, useEffect, useMemo, useRef } from "react";
import styles from "./OnasTable.module.css";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import Navbar from "../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import * as uuid from "uuid";
import { grey } from "@mui/material/colors";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { getOnasAPI } from "../../services/getOnas.service";
import DownloadIcon from "@mui/icons-material/Download";
import { downloadOnasAPI } from "../../services/downloadonas.service";
import { CSVLink } from "react-csv";
import Button from "@mui/material/Button";

function padTo2Digits(num) {
  return num.toString().padStart(2, "0");
}
function formatDate(date) {
  return (
    [
      date.getFullYear(),
      padTo2Digits(date.getMonth() + 1),
      padTo2Digits(date.getDate()),
    ].join("_") +
    "&" +
    [
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
      padTo2Digits(date.getSeconds()),
    ].join("_")
  );
}

export default function OnasTable() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [rows, setRows] = useState([]);
  const [transactionData, setTransactionData] = useState("");
  const [datetime, setDatetime] = useState(formatDate(new Date()));
  const [pageSize, setpageSize] = useState(5);
  const csvLink = useRef();

  const handleDownload = (company, id) => {
    downloadOnasAPI(company, id).then((res) => {
      setDatetime(formatDate(new Date()));
      setTransactionData(res.data);
    });
  };

  const handleRedirect = (company, id) => {
    navigate("/onas/" + company + "/" + id);
  };

  const onasColumn = [
    {
      field: "onasName",
      flex: 1,
      headerName: "Nombre Encuesta",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "creatinDate",
      flex: 1,
      headerName: "Fecha Creacion",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "limitDate",
      flex: 1,
      headerName: "Fecha limite",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 250,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <Button
            variant="contained"
            style={{
              whiteSpace: "nowrap",
              padding: "0.5em 1em",
              color: "white",
              textTransform: "none",
            }}
            color="primary"
            onClick={() => handleRedirect(params.row.companyId, params.row.id)}
          >
            Cargar Empleados
          </Button>,
          <IconButton
            onClick={() => handleDownload(params.row.companyId, params.row.id)}
          >
            <DownloadIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const columns = useMemo(() => onasColumn, []);

  const getTableData = () => {
    getOnasAPI(1)
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

  useEffect(() => {
    if (!(userInfo.role !== "Onas" && userInfo.role === "Administrador")) {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }
    if (transactionData) {
      csvLink.current.link.click();
    }
    getTableData();
  }, [transactionData]);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
          <div className={styles.crud}>
            <div className={styles.buttom}>
              <CSVLink
                data={transactionData}
                filename={"ResultadoOnas" + datetime + ".csv"}
                style={{ display: "none" }}
                ref={csvLink}
                target="_blank"
              />
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
