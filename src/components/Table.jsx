import { grey } from "@mui/material/colors";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useMemo, useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { removeItem } from "../features/adminSlice";
import { removeItemBi } from "../features/powerBiSlice";
import { useDispatch } from "react-redux";
import { deleteReportAPI } from "../services/deleteReport.service";
import { useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";

const search = (id, inputArray, field, proprety) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i][proprety] === id) {
      return inputArray[i][field];
    }
  }
};

export default function Table(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [pageSize, setpageSize] = useState(5);
  const [rows, setRows] = useState([]);

  const handleDeleteItem = (id) => {
    dispatch(removeItem({ id: id, type: props.type }));
  };
  const handleRedirect = (id) => {
    navigate("/powerbi/" + id);
  };
  const handleDeleteItemBi = (_id, id) => {
    dispatch(removeItemBi({ id: _id, type: props.type }));
    switch (props.type) {
      case "dashboard":
        break;
      case "report":
        deleteReportAPI(id);
        break;

      default:
        break;
    }
  };

  const company = [
    {
      field: "nombreCompania",
      flex: 1,
      headerName: "Nombre Empresa",
      headerAlign: "center",
      align: "center",
      editable: "true",
    },
    {
      field: "IdPais",
      flex: 1,
      headerName: "Pais",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        isNaN(params.row.IdPais)
          ? params.row.IdPais
          : search(params.row.IdPais, props.ids.country, "pais"),
    },
    {
      field: "Sede",
      flex: 1,
      headerName: "Sede",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "direccion",
      flex: 1,
      headerName: "direccion",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "IdTamanoCompania",
      flex: 2,
      headerName: "Tamaño Empresa",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        isNaN(params.row.IdTamanoCompania)
          ? params.row.IdTamanoCompania
          : search(
              params.row.IdTamanoCompania,
              props.ids.sizeCompany,
              "quantityOfEmployees"
            ),
    },
    {
      field: "SectorId",
      flex: 2.5,
      headerName: "Sector",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        isNaN(params.row.SectorId)
          ? params.row.SectorId
          : search(params.row.SectorId, props.ids.sector, "Sector"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton onClick={() => handleDeleteItem(params.row._id)}>
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const office = [
    {
      field: "sede",
      flex: 1,
      headerName: "Sede",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "IdCompania",
      flex: 1,
      headerName: "Compania",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        isNaN(params.row.IdCompania)
          ? params.row.IdCompania
          : search(params.row.IdCompania, props.ids.company, "nombreCompania"),
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton onClick={() => handleDeleteItem(params.row._id)}>
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const dashboard = [
    {
      field: "companyId",
      flex: 1,
      headerName: "Company Name",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return isNaN(params.row.companyId)
          ? params.row.companyId
          : search(
              params.row.companyId,
              props.ids.company,
              "nombreCompania",
              "id"
            );
      },
    },
    {
      field: "reportName",
      flex: 1,
      headerName: "title dashboard",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "isActive",
      flex: 1,
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <Switch
            checked={params.row.isActive}
            onChange={(event) => props.handleSwitch(event, params.row)}
            inputProps={{ "aria-label": "controlled" }}
          />
        );
      },
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton
            onClick={() => handleDeleteItemBi(params.row._id, params.row.id)}
          >
            <DeleteIcon />
          </IconButton>,
          <IconButton onClick={() => handleRedirect(params.row.id)}>
            <VisibilityIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const report = [
    {
      field: "name",
      flex: 1,
      headerName: "Report Name",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "descripcion",
      flex: 1,
      headerName: "Description",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton
            onClick={() => handleDeleteItemBi(params.row._id, params.row.id)}
          >
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const department = [
    {
      field: "codigoDepartamento",
      flex: 1,
      headerName: "Department Code",
      headerAlign: "center",
      align: "center",
      editable: "true",
    },
    {
      field: "IdPais",
      flex: 1,
      headerName: "Pais",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        isNaN(params.row.IdPais)
          ? params.row.IdPais
          : search(params.row.IdPais, props.ids.country, "pais", "id"),
    },

    {
      field: "departamento",
      flex: 1,
      headerName: "departamento",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: (params) => {
        return [
          <IconButton onClick={() => props.handleEditItem(params.row)}>
            <EditIcon />
          </IconButton>,
          <IconButton onClick={() => handleDeleteItem(params.row._id)}>
            <DeleteIcon />
          </IconButton>,
        ];
      },
    },
  ];

  const renderColumn = () => {
    switch (props.type) {
      case "Empresas":
        return company;
      case "Oficinas":
        return office;
      case "dashboard":
        return dashboard;
      case "report":
        return report;
      case "Departamentos":
        return department;
      default:
        return null;
    }
  };

  const columns = useMemo(() => renderColumn(), [props.type]);

  useEffect(() => {
    setRows(props.tableData);
  }, [props.tableData]);

  return (
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
          bgcolor: (theme) =>
            theme.palette.mode === "light" ? grey[200] : grey[900],
        },
      }}
    />
  );
}
