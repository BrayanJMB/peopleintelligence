import React, { useState } from "react";
import { Grid } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Autocomplete from "@mui/material/Autocomplete";

import styles from "./MyCreateDialog2.module.css";

// form field types
const FIELD_TYPES = {
  TEXT: "text",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

/**
 * My create dialog component.
 *
 * @param title
 * @param fields
 * @param open
 * @param onClose
 * @param onSubmit
 * @returns {JSX.Element}
 * @constructor
 */
const MyCreateDialog = ({ title, fields, open, onClose, onSubmit, type }) => {
  const [values, setValues] = useState({});
  console.log(fields);
  const [currentTab, setCurrentTab] = useState(0);

  /**
   * Handle input change.
   *
   * @param event
   */
  const handleInputChange = (event) => {
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  /**
   * Handle form submit.
   *
   * @param event
   */
  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(values);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>{title}</DialogTitle>
        <form onSubmit={handleFormSubmit}>
          <DialogContent>
            <Box
              sx={{
                marginTop: 1,
              }}
            >
              {type === "employee" && (
                <>
                  <Box
                    sx={{
                      borderBottom: 1,
                      borderColor: "divider",
                    }}
                  >
                    <Box sx={{ display: "flex", justifyContent: "between" }}>
                      <Tabs
                        sx={{ width: "90%", justifyContent: "center" }}
                        value={currentTab}
                        onChange={(event, newValue) =>
                          handleTabChange(event, newValue)
                        }
                      >
                        <Tab label="Tipo Contrato" id="settings-tab-0" />
                        <Tab label="Tipos de documentos" id="settings-tab-1" />
                        <Tab label="Nivel de ingles" id="settings-tab-2" />
                      </Tabs>
                    </Box>
                  </Box>
                  <Grid container>
                    {fields.map((sectionObj, index) =>
                      Object.keys(sectionObj).map((section, tabIndex) => {
                        return tabIndex === currentTab
                          ? sectionObj[section].map((field) => {
                              if (field.type === "text") {
                                return (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    key={`${field.name}-${index}`}
                                  >
                                    <TextField
                                      fullWidth
                                      id={field.name}
                                      label={field.label}
                                      name={field.name}
                                      onChange={handleInputChange}
                                      type="text"
                                      value={values[field.name] || ""}
                                      variant="outlined"
                                      required={field.isRequired}
                                      sx={{
                                        marginBottom: 2,
                                      }}
                                    />
                                  </Grid>
                                );
                              } else if (field.type === "select") {
                                return (
                                  <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    key={`${field.name}-${index}`}
                                  >
                                    <Autocomplete
                                      fullWidth
                                      id={field.name}
                                      options={field.options}
                                      getOptionLabel={(option) => option.label}
                                      value={
                                        field.options.find(
                                          (option) =>
                                            option.value === values[field.name]
                                        ) || null
                                      }
                                      onChange={(event, newValue) => {
                                        handleInputChange({
                                          target: {
                                            name: field.name,
                                            value: newValue
                                              ? newValue.value
                                              : "",
                                          },
                                        });
                                      }}
                                      renderInput={(params) => (
                                        <TextField
                                          {...params}
                                          label={field.label}
                                          required={field.isRequired}
                                        />
                                      )}
                                    />
                                  </Grid>
                                );
                              } else {
                                return null;
                              }
                            })
                          : null;
                      })
                    )}
                  </Grid>
                </>
              )}
              <Grid container spacing={2}>
                {/* form fields */}
                {fields.map((field) => {
                  if (field.type === "text") {
                    return (
                      <Grid item xs={12} sm={6} key={field.name}>
                        <TextField
                          fullWidth
                          id={field.name}
                          label={field.label}
                          name={field.name}
                          onChange={handleInputChange}
                          type="text"
                          value={values[field.name] || ""}
                          variant="outlined"
                          required={field.isRequired}
                          sx={{
                            marginBottom: 2,
                          }}
                        />
                      </Grid>
                    );
                  } else if (field.type === "select") {
                    return (
                      <Grid item xs={12} sm={6} key={field.name}>
                        <FormControl fullWidth>
                          <InputLabel id={`${field.name}-label`}>
                            {field.label}
                          </InputLabel>
                          <Select
                            labelId={`${field.name}-label`}
                            id={field.name}
                            name={field.name}
                            onChange={handleInputChange}
                            value={values[field.name] || ""}
                            required={field.isRequired}
                          >
                            {field.options.map((option) => (
                              <MenuItem key={option.value} value={option.value}>
                                {option.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    );
                  }
                })}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} type="button">
              Cancelar
            </Button>
            <Button variant="contained" type="submit">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
};

MyCreateDialog.propTypes = {
  title: PropTypes.string.isRequired,
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      isRequired: PropTypes.bool.isRequired,
    })
  ).isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

MyCreateDialog.defaultProps = {};

export default MyCreateDialog;
