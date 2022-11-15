import { grey } from "@mui/material/colors";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { useMemo, useState, useEffect } from "react";

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
  ];

  const campus = [
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

  const [pageSize, setpageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const renderSwitch = () => {
    switch (props.type) {
      case "Empresas":
        return company;
      case "Oficinas":
        return campus;
      default:
        return null;
    }
  };

  const columns = useMemo(() => renderSwitch(), [props.type]);

  useEffect(() => {
    switch (props.type) {
      case "Empresas":
        if (
          props.ids.country.length !== 0 &&
          props.ids.sizeCompany.length !== 0 &&
          props.ids.sector.length !== 0
        ) {
          let data = [];
          props.companias.forEach((val) => {
            let holder = val;
            holder._id = val.id;
            data.push(holder);
          });
          setRows(data);
        }
        break;
      case "Oficinas":
        if (props.ids.sector.company !== 0) {
          let data = [];
          props.oficinas.forEach((val) => {
            let holder = val;
            holder._id = val.id;
            data.push(holder);
          });
          console.log(data);
          setRows(data);
        }
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
    />
  );
}
