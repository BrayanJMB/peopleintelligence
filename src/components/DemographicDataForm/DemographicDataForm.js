import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';

import client from '../../utils/axiosInstance';
import MyLoader from '../MyLoader/MyLoader'; 

import styles from './DemographicDataForm.module.css';


/**
 * Demographic data form component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const DemographicDataForm = ({
  surveyId,
  onChange,
  onChangeNewDemographics,
  templateDemographicData,
}) => {
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [demographicData, setDemographicData] = useState(null);
  const [demographicChecked, setDemographicChecked] = useState([]);
  const [newDemographicName, setNewDemographicName] = useState('');
  const [newDemographicOptions, setNewDemographicOptions] = useState(['', '', '']);
  const [newDemographics, setNewDemographics] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  /**
   * Returns true if the new demographic data is valid.
   */
  const isNewDemographicValid = () => {
    // validate name
    if (newDemographicName.length === 0) {
      return false;
    }

    // validate options
    if (newDemographicOptions.length === 0) {
      return false;
    }

    // validate options
    return !newDemographicOptions.some((option) => option.length === 0);
  };

  /**
   * Store new demographic data.
   *
   * @returns {Promise<void>}
   */
  const storeNewDemographicData = async () => {
    setIsLoading(true);

    if (surveyId !== null) {
      const companyId = currentCompany.id;

      await client.post(`SendDemoDinamic/${companyId}/${surveyId}`, {
        name: newDemographicName,
        options: newDemographicOptions,
      });
    }

    enqueueSnackbar('Demográfico creado correctamente.', {
      variant: 'success',
    });
    setNewDemographics((prev) => [...prev, {
      name: newDemographicName,
      options: newDemographicOptions,
    }]);
    setIsLoading(false);
    setOpenDialog(false);
  };

  /**
   * Handle new demographic name change.
   *
   * @param event
   */
  const handleNewDemographicNameChange = (event) => {
    setNewDemographicName(event.target.value);
  };

  /**
   * Handle new demographic options change.
   *
   * @param event
   * @param index
   */
  const handleNewDemographicOptionsChange = (event, index) => {
    const { value } = event.target;
    const newOptions = [...newDemographicOptions];
    newOptions[index] = value;

    setNewDemographicOptions(newOptions);
  };

  /**
   * Add new demographic option.
   */
  const addNewDemographicOption = () => {
    setNewDemographicOptions((prev) => [...prev, '']);
  };

  /**
   * Remove new demographic option.
   *
   * @param index
   */
  const removeNewDemographicOption = (index) => {
    const newOptions = [...newDemographicOptions];
    newOptions.splice(index, 1);

    setNewDemographicOptions(newOptions);
  };

  /**
   * Fetch demographic data from API.
   *
   * @returns {Promise<void>}
   */
  const fetchDemographicData = async () => {
    setIsLoading(true);

    const { data } = await client.get(`ShowDemographic/${currentCompany.id}`);

    setDemographicData(data);


    setIsLoading(false);
  };

  /**
   * Check if demographic data is checked.
   *
   * @param value
   * @returns {boolean}
   */
  const isDemographicChecked = (value) => {

    return demographicChecked.includes(value);
  };

  /**
   * Handle checkbox change.
   * This is triggered when a demographic item is checked or unchecked.
   * The demographic items was previously fetched from the API.
   *
   * @param event
   */
  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;
    let updatedDemographicChecked = [];

    if (checked) {
      setDemographicChecked((prev) => [...prev, value]);
      updatedDemographicChecked = [...demographicChecked, value];
    } else {
      updatedDemographicChecked = demographicChecked.filter((item) => item !== value);
    }
    
    setDemographicChecked(updatedDemographicChecked);
    // emit change event (callback prop) for new survey or template
    onChange(updatedDemographicChecked);
  };

  /**
   * Handle dialog open.
   */
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  /**
   * Handle save demographic data.
   */
  const handleClickSaveDemographicData = async () => {
    const companyId = currentCompany.id;

    await client.post(`sendDemographicSurvey/${companyId}/${surveyId}`, demographicChecked);
    await fetchDemographicData();

    enqueueSnackbar('Datos demográficos guardados correctamente.', {
      variant: 'success',
    });
  };

  // watch for currentCompany changes
  useEffect(() => {
    if (currentCompany === null) {
      return null;
    }

    fetchDemographicData();
  }, [currentCompany]); // eslint-disable-line react-hooks/exhaustive-deps

  // watch for newDemographics changes for merging with demographicData and emit change event
  useEffect(() => {
    // merge with new demographics, preventing duplicates
    setDemographicData((prevDemographicData) => {
      if (prevDemographicData === null) {
        return null;
      }

      const newDemographicData = newDemographics.map(({ name }) => ({
        value: name,
      }));

      const updatedDemographicData = [
        ...prevDemographicData,
        ...newDemographicData,
      ];

      // remove duplicates (by value)
      return updatedDemographicData.filter((item, index) => {
        const itemValue = item.value;
        const firstIndex = updatedDemographicData.findIndex((i) => i.value === itemValue);

        return firstIndex === index;
      });
    });

    onChangeNewDemographics(newDemographics);
  }, [newDemographics]); // eslint-disable-line react-hooks/exhaustive-deps

  // watch for prev demographic data
  useEffect(() => {
    if (!templateDemographicData.length) {
      return;
    }

    const updatedDemographicChecked = [
      ...demographicChecked, 
      ...templateDemographicData,
    ];

    setDemographicChecked(updatedDemographicChecked);
    onChange(updatedDemographicChecked);
  }, [templateDemographicData]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={styles.DemographicDataForm}
    >
      <Box sx={{
        flexGrow: 1,
      }}>
        {isLoading === true && demographicData === null && <MyLoader />}

        {demographicData !== null && (
          <Grid
            container
            spacing={2}
          >
            <Grid
              item
              xs={12}
            >
              <Box className={styles.DemographicDataForm__header}>
                <Typography
                  variant="subtitle1"
                  fontWeight="bold"
                >
                  Datos demográficos
                </Typography>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleOpenDialog}
                  className={styles.DemographicDataForm__header__button}
                  startIcon={<AddIcon />}
                >
                  Demográfico
                </Button>
              </Box>
            </Grid>

            {demographicData.map(({ value }) => (
              <Grid
                key={value}
                item
                xs={6}
                sm={4}
                md={3}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                    <Checkbox
                      checked={isDemographicChecked(value)}
                      onChange={handleCheckboxChange}
                      value={value}
                    />}
                    label={value}
                  />
                </FormGroup>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{
          marginTop: 2,
          display: 'flex',
        }}>
          {surveyId !== null && (
            <Button
              color="primary"
              onClick={handleClickSaveDemographicData}
              variant="contained"
              sx={{
                marginLeft: 'auto',
              }}
              startIcon={<SaveIcon />}
            >
              Demográficos
            </Button>
          )}
        </Box>

        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
        >
          <DialogTitle>
            Nuevo demográfico
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ingresa el nombre del nuevo demográfico y sus opciones.
            </DialogContentText>

            {/* demographic name */}
            <FormControl
              sx={{
                marginTop: 2,
                width: '100%',
              }}
            >
              <TextField
                autoFocus
                id="demographic-name"
                label="Nombre del demográfico"
                type="text"
                fullWidth
                variant="outlined"
                onChange={handleNewDemographicNameChange}
              />
            </FormControl>

            {/* demographic options */}
            {newDemographicOptions.map((option, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  marginTop: 2,
                }}
              >
                <FormControl
                  sx={{
                    width: '100%',
                  }}
                >
                  <TextField
                    id={`demographic-option-${index}`}
                    label={`Opción ${index + 1}`}
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={option}
                    onChange={(event) => handleNewDemographicOptionsChange(event, index)}
                  />
                </FormControl>
              </Box>
            ))}

            {/* add new option or remove */}
            <Box
              sx={{
                display: 'flex',
              }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={addNewDemographicOption}
                sx={{
                  marginTop: 2,
                }}
              >
                <AddIcon />
                Agregar opción
              </Button>
              {newDemographicOptions.length > 1 && (
                <Button
                  variant="outlined"
                  onClick={() => removeNewDemographicOption(newDemographicOptions.length - 1)}
                  sx={{
                    marginTop: 2,
                    marginLeft: 'auto',
                  }}
                >
                  <RemoveIcon />
                  Eliminar opción
                </Button>
              )}
            </Box>

          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button
              variant="contained"
              onClick={storeNewDemographicData}
              disabled={isLoading || isNewDemographicValid() === false}
            >
              Guardar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </div>
  );
};

DemographicDataForm.propTypes = {
  surveyId: PropTypes.number,
  onChange: PropTypes.func,
  onChangeNewDemographics: PropTypes.func,
  templateDemographicData: PropTypes.arrayOf(PropTypes.string),
};

DemographicDataForm.defaultProps = {
  surveyId: null,
  onChange: () => {},
  onChangeNewDemographics: () => {},
  templateDemographicData: [],
};  
 
export default DemographicDataForm;
