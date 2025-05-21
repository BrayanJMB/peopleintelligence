import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import { Box, IconButton, Popover, TextField, Typography } from '@mui/material';

export const ColorSurvey = ({
  primaryColor,
  setPrimaryColor,
  secondaryColor,
  setSecondaryColor,
  data
}) => {
  console.log(data)
  const [anchorEl, setAnchorEl] = useState(null);
  const [activePicker, setActivePicker] = useState(null); // 'primary' or 'secondary'

  const handleOpenPicker = (event, pickerType) => {
    setAnchorEl(event.currentTarget);
    setActivePicker(pickerType);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActivePicker(null);
  };

  const handleColorChange = (color) => {
    if (activePicker === 'primary') {
      setPrimaryColor(color.hex);
    } else if (activePicker === 'secondary') {
      setSecondaryColor(color.hex);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Box>
        <Typography
          variant="h6"
          style={{
            fontWeight: 'bold',
            marginBottom: '15px',
            marginTop: '15px',
          }}
        >
          Colores encuesta:
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Aquí puedes seleccionar los colores que tendrá la encuesta.
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Si no eliges ninguno, se aplicarán los colores por defecto.
        </Typography>
      </Box>
      <Box sx={{ p: 2, display: 'flex', gap: 4 }}>
        {/* Color Primario */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography>Color primario:</Typography>
          <TextField
            variant="outlined"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            inputProps={{ maxLength: 7 }}
          />
          <IconButton
            onClick={(e) => handleOpenPicker(e, 'primary')}
            sx={{ backgroundColor: primaryColor }}
          >
            <ColorLensIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Box>

        {/* Color Secundario */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Typography>Color secundario:</Typography>
          <TextField
            variant="outlined"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            inputProps={{ maxLength: 7 }}
          />
          <IconButton
            onClick={(e) => handleOpenPicker(e, 'secondary')}
            sx={{ backgroundColor: secondaryColor }}
          >
            <ColorLensIcon sx={{ color: '#fff' }} />
          </IconButton>
        </Box>

        {/* Paleta de color */}
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        >
          <SketchPicker
            color={activePicker === 'primary' ? primaryColor : secondaryColor}
            onChangeComplete={handleColorChange}
          />
        </Popover>
      </Box>
    </>
  );
};
