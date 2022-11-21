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
import { getOnasAPI } from "../../services/getOnas.service";
import Button from "@mui/material/Button";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import RemoveCircleOutlinedIcon from "@mui/icons-material/RemoveCircleOutlined";

export default function OnasTable() {
  const navigate = useNavigate();
  const [rows, setRows] = useState([]);
  const [pageSize, setpageSize] = useState(5);

  const rolesColumn = [
    {
      field: "onasName",
      flex: 1,
      headerName: "Company Name",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "creatinDate",
      flex: 1,
      headerName: "User Name",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "limitDate",
      flex: 1,
      headerName: "Status",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "numberVersion",
      flex: 1,
      headerName: "Roles",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Add Roles",
      flex: 1,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <IconButton>
            <RemoveCircleOutlinedIcon />
          </IconButton>,
          <IconButton>
            <AddCircleOutlinedIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const columns = useMemo(() => rolesColumn, []);

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
