import React from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const SelectOptions = ({
  availableSelectOptions,
  unansweredQuestions,
  handleOptionSelect,
  optionName,
  indexQuestion,
}) => {
  const handleFocus = (event) => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const isMobile = /android|iphone|ipad|ipod/i.test(userAgent);

    if (isMobile) {
      // Evitar que se muestre el teclado en dispositivos móviles
      event.target.blur();
    }
  };
  return (
    <Autocomplete
      options={availableSelectOptions}
      getOptionLabel={(option) => option.selectOptionName}
      onChange={(event, value) => handleOptionSelect(event, value, optionName)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Opciones"
          variant="outlined"
          error={unansweredQuestions.includes(indexQuestion)}
          onFocus={handleFocus}
        />
      )}
      renderTags={() => null}
      disableCloseOnSelect
    />
  );
};
