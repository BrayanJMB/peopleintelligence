import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import UploadFileIcon from '@mui/icons-material/UploadFile'; // Icono opcional
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import { useSnackbar } from 'notistack';

import styles from '../Intimidad/Intimidad.module.css';

export const View360 = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
    ];

    if (!validTypes.includes(file.type)) {
      enqueueSnackbar('El archivo no es un Excel válido.', {
        variant: 'error',
      });
      return;
    }

    if (file.size === 0) {
      enqueueSnackbar('El archivo está vacío.', { variant: 'warning' });
      return;
    }

    props.setExcelFile360(file);
    enqueueSnackbar('Archivo cargado correctamente', { variant: 'success' });

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(
        'https://peopleintelligence-api-test.azurewebsites.net/api/validateExcel',
        {
          method: 'POST',
          body: formData,
        }
      );

      const contentType = response.headers.get('content-type');

      // ✅ Si viene un archivo Excel (con errores)
      if (
        response.ok &&
        contentType?.includes('application/vnd.openxmlformats')
      ) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;

        const disposition = response.headers.get('Content-Disposition');
        const match = disposition?.match(/filename="?(.+\.xlsx)"?/i);
        const fileName = match?.[1] || 'ErroresValidacion.xlsx';

        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        link.remove();
        props.setExcelFile360(null);
        enqueueSnackbar(
          'Archivo contiene errores. Se ha descargado el reporte.',
          {
            variant: 'warning',
          }
        );
      }
      // ✅ Si todo está bien y la respuesta es JSON
      else if (contentType?.includes('application/json')) {
        const result = await response.json();
        enqueueSnackbar(result.message ?? 'Validación completada.', {
          variant: 'success',
        });
        props.setView360(result.filas);
      } else {
        enqueueSnackbar('Respuesta inesperada del servidor.', {
          variant: 'error',
        });
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Error al validar el archivo en el servidor.', {
        variant: 'error',
      });
    }
  };

  return (
    <div className={styles.intimidad}>
      <div className={styles.top}>
        <h3 className={styles.title}>¿Quieres que esta encuesta sea 360?</h3>
        <p className={styles.subtitle}>
          Las encuestas 360 permiten a los usuarios ser abiertos y honestos sin
          temor a represalias o vergüenza.
        </p>
      </div>

      <div className={styles.bottom}>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
            value={props.isView360}
            onChange={props.handleIsView360}
          >
            <FormControlLabel
              value={true}
              control={<Radio />}
              label="Sí. Hacer esta encuesta 360"
            />
            <FormControlLabel
              value={false}
              control={<Radio />}
              label="No. Mantener la encuesta normal"
            />
          </RadioGroup>
        </FormControl>
      </div>

      {props.isView360 && (
        <Box mt={3}>
          <input
            id="upload-excel"
            type="file"
            accept=".xlsx,.xls"
            style={{ display: 'none' }}
            onChange={handleFileUpload}
          />

          <Box display="flex" alignItems="center" gap={1}>
            <label htmlFor="upload-excel">
              <Button
                variant="contained"
                color="primary"
                component="span"
                startIcon={<UploadFileIcon />}
                disabled={!!props.excelFile360}
              >
                Subir archivo
              </Button>
            </label>

            {props.excelFile360 && (
              <Button
                variant="text"
                color="error"
                size="small"
                onClick={() => props.setExcelFile360(null)}
                sx={{ minWidth: '32px', padding: '4px' }}
              >
                <DeleteIcon fontSize="small" />
              </Button>
            )}
          </Box>

          {props.excelFile360 && (
            <Box mt={1} sx={{ fontSize: 14, color: 'gray' }}>
              Archivo seleccionado: <strong>{props.excelFile360.name}</strong>
            </Box>
          )}
        </Box>
      )}
    </div>
  );
};
