import { useState } from 'react';
import { Typography } from '@mui/material';
import Switch from '@mui/material/Switch';

export const NumerationSurvey = ({
  hasNumerationNumber,
  setHasNumerationNumber,
}) => {

  const handleChange = (event) => {
    setHasNumerationNumber(event.target.checked);
  };
  return (
    <>
      <Typography
        variant="h6"
        style={{ fontWeight: 'bold', marginBottom: '15px' }}
      >
        Númeración preguntas:
      </Typography>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ marginRight: '8px' }}>
          ¿Desea que las preguntas tengan numeración?
        </p>
        <Switch
          checked={hasNumerationNumber}
          onChange={handleChange}
          inputProps={{ 'aria-label': 'controlled' }}
        />
      </div>
    </>
  );
};
