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
      width: 160,
      headerName: "NOMBRE EMPRESA",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "IdPais",
      width: 110,
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
      width: 110,
      headerName: "SEDE",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "direccion",
      width: 160,
      headerName: "DIRECCION",
      headerAlign: "center",
      align: "center",
    },
    {
      field: "IdTamanoCompania",
      width: 160,
      headerName: "TAMANO DE LA EMPRESA",
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
      width: 270,
      headerName: "SECTOR",
      headerAlign: "center",
      align: "center",
      renderCell: (params) =>
        isNaN(params.row.SectorId)
          ? params.row.SectorId
          : search(params.row.SectorId, props.ids.sector, "Sector"),
    },
  ];

  const [pageSize, setpageSize] = useState(5);
  const [rows, setRows] = useState([]);
  const renderSwitch = () => {
    switch (props.type) {
      case "Empresas":
        return company;
      default:
        return null;
    }
  };
  const columns = useMemo(() => renderSwitch(), [props.companias]);

  useEffect(() => {
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
  }, [props.companias]);

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
