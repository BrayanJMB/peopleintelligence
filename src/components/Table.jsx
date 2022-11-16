import { grey } from "@mui/material/colors";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useMemo, useState, useEffect } from "react";
import EditSave from "./EditSave";

const search = (id, inputArray, field) => {
  for (let i = 0; i < inputArray.length; i++) {
    if (inputArray[i].id === id) {
      return inputArray[i][field];
    }
  }
};

export default function Table(props) {
  const company = [
    {
      field: "nombreCompania",
      flex: 1,
      headerName: "Nombre Empresa",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "IdPais",
      flex: 1,
      headerName: "Pais",
      headerAlign: "center",
      align: "center",

      editable: true,
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
      field: "action",
      headerName: "Actions",
      type: "actions",
      renderCell: (params) => <EditSave {...{ params, rowId, setRowId }} />,
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
  ];

  const dashboard = [
    {
      field: "dashboard",
      flex: 1,
      headerName: "dashboard",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "name",
      flex: 1,
      headerName: "name",
      headerAlign: "center",
      align: "center",
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
      field: "description",
      flex: 1,
      headerName: "Description",
      headerAlign: "center",
      align: "center",
    },
  ];

  const [pageSize, setpageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const [rowId, setRowId] = useState(null);

  const renderSwitch = () => {
    switch (props.type) {
      case "Empresas":
        return company;
      case "Oficinas":
        return office;
      case "dashboard":
        return dashboard;
      case "report":
        return report;
      default:
        return null;
    }
  };

  const columns = useMemo(() => renderSwitch(), [props.type, rowId]);

  useEffect(() => {
    let data = [];
    switch (props.type) {
      case "Empresas":
        if (
          props.ids.country.length !== 0 &&
          props.ids.sizeCompany.length !== 0 &&
          props.ids.sector.length !== 0
        ) {
          props.companias.forEach((val) => {
            let holder = val;
            holder._id = val.id;
            holder.IdPais = isNaN(val.IdPais)
              ? val.IdPais
              : search(val.IdPais, props.ids.country, "pais");
            data.push(holder);
          });
          setRows(data);
        }
        break;
      case "Oficinas":
        if (props.ids.company.length !== 0) {
          props.oficinas.forEach((val) => {
            let holder = val;
            holder._id = val.id;
            data.push(holder);
          });
          setRows(data);
        }
        break;
      case "dashboard":
        props.dashboards.forEach((val) => {
          let holder = val;
          holder._id = val.id;
          data.push(holder);
        });
        setRows(data);
        break;
      case "report":
        props.reports.forEach((val) => {
          let holder = val;
          holder._id = val.id;
          data.push(holder);
        });
        setRows(data);
        break;
      default:
        break;
    }
  }, [props]);

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
      onCellEditCommit={(params) => setRowId(params.id)}
    />
  );
}
