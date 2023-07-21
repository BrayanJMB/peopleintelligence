export const useCompany = () => {
  const createCompanyColumns = (condition) => {
    const companyColumns = [
      {
        id: "name",
        label: "Nombre compañía",
        numeric: false,
      },
      {
        id: "country",
        label: "País",
        numeric: false,
      },
      {
        id: "sede",
        label: "Sede",
        numeric: false,
      },
      {
        id: "sizeCompany",
        label: "Tamaño Empresa",
        numeric: false,
      },
      {
        id: "sector",
        label: "Sector",
        numeric: false,
      },
      {
        id: "options",
        label: "Opciones",
        numeric: false,
      },
    ];

    if (condition) {
      companyColumns.push({
        id: "active",
        label: "Activar",
        numeric: false,
      });
    }

    return companyColumns;
  };

  const companyColumns = createCompanyColumns(
    userInfo?.role.findIndex((p) => p === "Administrador") > 0
  );

  const handleEditCompany = (id) => {
    const companyData = companies.find((company) => company.id === id);
    const sizeCompany = sizeCompanies.find(
      (sizeCompany) => sizeCompany.id === companyData.IdTamanoCompania
    );
    const country = countries.find(
      (country) => country.id === companyData.IdPais
    );
    const sector = sectors.find((sector) => sector.id === companyData.SectorId);
    if (companyData === undefined) {
      return;
    }
    setEditLogo(companyData.Logotipo);
    setCurrentEdit({
      type: "company",
      id: companyData.id,
      title: "Editar Empresa",
      fields: [
        {
          label: "Nombre Compañía",
          name: "companyName",
          type: "text",
          isRequired: true,
          value: companyData.nombreCompania,
        },
        {
          label: "País",
          name: "country",
          type: "select",
          isRequired: true,
          value: (country && country.id) || null,
          options: countries.map((country) => ({
            value: country.id,
            label: country.value,
          })),
        },
        {
          label: "Dirección",
          name: "address",
          type: "text",
          value: companyData.direccion,
          isRequired: true,
        },
        {
          label: "Sede",
          name: "sede",
          type: "text",
          value: companyData.Sede,
          isRequired: true,
        },
        {
          label: "Tamaño Empresa",
          name: "sizeCompany",
          type: "select",
          isRequired: true,
          value: (sizeCompany && sizeCompany.id) || null,
          options: sizeCompanies.map((sizeCompany) => ({
            value: sizeCompany.id,
            label: sizeCompany.quantityOfEmployees,
          })),
        },
        {
          label: "Sector",
          name: "sector",
          type: "select",
          isRequired: true,
          value: (sector && sector.id) || null,
          options: sectors.map((sector) => ({
            value: sector.id,
            label: sector.Sector,
          })),
        },
      ],
    });
    setOpenEditDialog(true);
  };

  const handleCreateCompany = () => {
    setCurrentCreate({
      type: "company",
      title: "Crear Empresa",
      fields: [
        {
          label: "Nombre Compañía",
          name: "companyName",
          type: "text",
          isRequired: true,
        },
        {
          label: "País",
          name: "country",
          type: "select",
          isRequired: true,
          options: countries.map((country) => ({
            value: country.id,
            label: country.value,
          })),
        },
        {
          label: "Dirección",
          name: "address",
          type: "text",
          isRequired: true,
        },
        {
          label: "Sede",
          name: "sede",
          type: "text",
          isRequired: true,
        },
        {
          label: "Tamaño Empresa",
          name: "sizeCompany",
          type: "select",
          isRequired: true,
          options: sizeCompanies.map((sizeCompany) => ({
            value: sizeCompany.id,
            label: sizeCompany.quantityOfEmployees,
          })),
        },
        {
          label: "Sector",
          name: "sector",
          type: "select",
          isRequired: true,
          options: sectors.map((sector) => ({
            value: sector.id,
            label: sector.Sector,
          })),
        },
      ],
    });
    setOpenCreateDialog(true);
  };

  const mapCompanies = (companies) =>
    companies.map((company) => {
      const columns = [
        {
          column: "name",
          value: company.nombreCompania,
        },
        {
          column: "country",
          value: company.nombrePais,
        },
        {
          column: "Sede",
          value: company.Sede,
        },
        {
          column: "sizeCompany",
          value: company.nombreTamañoCompañia,
        },
        {
          column: "sector",
          value: company.nombreSector,
        },
        {
          column: "options",
          value: "",
          payload: {
            handleDelete: handleDeleteCompany,
            handleEdit: handleEditCompany,
            id: company.id,
          },
        },
      ];

      if (userInfo?.role.findIndex((p) => p === "Administrador") > 0) {
        columns.push({
          column: "active",
          value:
            company.id !== 1 ? (
              <Switch
                checked={
                  switchValues.hasOwnProperty(company.id)
                    ? switchValues[company.id]
                    : company.isActive
                }
                onChange={(event) => handleSwitchChange(company.id, event)}
                color="primary"
                name={`switchValue_${company.id}`}
                inputProps={{ "aria-label": "primary checkbox" }}
              />
            ) : null,
        });
      }

      return columns;
    });

  const handleSwitchChange = async (id, event) => {
    const newValue = event.target.checked;
    setSwitchValues({ ...switchValues, [id]: newValue });
    await updateStateCompanyAPI(id, newValue);
    dispatch(fetchActiveCompany({ idUser: userInfo.user }));
    if (!newValue) dispatch(setDrop(null));
  };

  const handleDeleteCompany = async (id) => {
    const company = companies.find((company) => company.id === id);
    if (company === undefined) {
      return;
    }

    try {
      await deleteCompanyAPI(id);
      dispatch(fetchCompanyMultiUser({ idUser: userInfo.user }));
      enqueueSnackbar("Compañía eliminada con exito", {
        variant: "success",
      });
    } catch (e) {
      enqueueSnackbar("Error eliminar crear la compañía", {
        variant: "error",
      });
    }
  };

  const fetchCompany = async () => {
    if (!currentCompany) {
      return;
    }

    const { data: sector } = await fetchSectorAPI();

    const sectorNames = sector.reduce((acc, sector) => {
      acc[sector.id] = sector.Sector;
      return acc;
    }, {});

    const { data: country } = await getAllCountryAPI();
    const countryNames = country.reduce((acc, country) => {
      acc[country.id] = country.value;
      return acc;
    }, {});

    const { data: sizeCompany } = await fetchSizeCompanyAPI();
    const sizeCompanyNames = sizeCompany.reduce((acc, sizeCompany) => {
      acc[sizeCompany.id] = sizeCompany.quantityOfEmployees;
      return acc;
    }, {});

    if (!currentMultiCompanies) return;
    const company = currentMultiCompanies.map((company) => ({
      ...company,
      nombreSector: sectorNames[company.SectorId],
      nombreTamañoCompañia: sizeCompanyNames[company.IdTamanoCompania],
      nombrePais: countryNames[company.IdPais],
    }));
    setCompany(company);
  };
};
