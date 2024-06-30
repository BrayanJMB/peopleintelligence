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
        />
      )}
      renderTags={() => null}
      disableCloseOnSelect
    />
  );
};
