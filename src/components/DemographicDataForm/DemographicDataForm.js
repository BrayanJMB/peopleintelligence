import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControl from '@mui/material/FormControl';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useSnackbar } from 'notistack';
import styles from './DemographicDataForm.module.css';
import client from '../../../../utils/axiosInstance';
import MyLoader from '../../../../components/MyLoader/MyLoader';
import Typography from '@mui/material/Typography';


/**
 * Demographic data form component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const DemographicDataForm = ({ surveyId }) => {
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [demographicData, setDemographicData] = useState(null);
  const [demographicChecked, setDemographicChecked] = useState([]);
  const [newDemographicName, setNewDemographicName] = useState('');
  const [newDemographicOptions, setNewDemographicOptions] = useState(['', '', '']);
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

    const companyId = currentCompany.id;

    await client.post(`SendDemoDinamic/${companyId}/${surveyId}`, {
      name: newDemographicName,
      options: newDemographicOptions,
    });

    enqueueSnackbar('Demográfico creado correctamente.', {
      variant: 'success',
    });

    setIsLoading(false);
    setOpenDialog(false);
  }

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
  }

  /**
   * Add new demographic option.
   */
  const addNewDemographicOption = () => {
    setNewDemographicOptions((prev) => [...prev, '']);
  }

  /**
   * Remove new demographic option.
   *
   * @param index
   */
  const removeNewDemographicOption = (index) => {
    const newOptions = [...newDemographicOptions];
    newOptions.splice(index, 1);

    setNewDemographicOptions(newOptions);
  }

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
   *
   * @param event
   */
  const handleCheckboxChange = (event) => {
    const { checked, value } = event.target;

    if (checked) {
      setDemographicChecked((prev) => [...prev, value]);
    } else {
      setDemographicChecked((prev) => prev.filter((item) => item !== value));
    }
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

  return (
    <div
      className={styles.DemographicDataForm}
    >
      <Box sx={{
        flexGrow: 1,
        marginTop: 4,
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
              <Typography
                variant="subtitle1"
                gutterBottom
              >
                Datos demográficos
              </Typography>
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
                    control={<Checkbox
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
          <Button
            variant="outlined"
            color="primary"
            onClick={handleOpenDialog}
          >
            Crear nuevo demográfico
          </Button>
          <Button
            color="primary"
            onClick={handleClickSaveDemographicData}
            variant="contained"
            sx={{
              marginLeft: 'auto',
            }}
          >
            Guardar demográficos
          </Button>
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
};

DemographicDataForm.defaultProps = {
  surveyId: null,
};

export default DemographicDataForm;
