import React, { useEffect,useMemo, useState } from 'react';
import Grid from '@mui/material/Grid';

import { ChipSelectionOption } from './ChipSelectionOption';
import { SelectOptions } from './SelectOptions';

export const RelationalQuestion = ({
  options,
  selectOptions,
  handleRelationalChange,
  indexQuestion,
  unansweredQuestions,
  primaryColor,
  secondaryColor,
}) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [questionOptionMap, setQuestionOptionMap] = useState({});

  const handleOptionSelect = (event, value, optionName) => {
    if (
      value &&
      !selectedOptions.some(
        (opt) => opt.selectOptionName === value.selectOptionName
      )
    ) {
      setSelectedOptions((prev) => [...prev, { ...value, optionName }]);
      setQuestionOptionMap((prev) => ({
        ...prev,
        [optionName]: value.selectOptionName,
      }));
    }
  };

  const handleOptionDelete = (optionName) => {
    setSelectedOptions((prev) =>
      prev.filter((option) => option.optionName !== optionName)
    );
    setQuestionOptionMap((prev) => {
      const updatedMap = { ...prev };
      updatedMap[optionName] = '';
      return updatedMap;
    });
  };

  

  const availableSelectOptions = useMemo(() => {
    return selectOptions.filter(
      (option) =>
        !selectedOptions.some(
          (selected) => selected.selectOptionName === option.selectOptionName
        )
    );
  }, [selectOptions, selectedOptions]);

  useEffect(() => {
    handleRelationalChange(questionOptionMap, indexQuestion);
  }, [questionOptionMap]);

  return (
    <Grid
      container
      spacing={3}
      sx={{
        marginTop: '0.5em',
      }}
    >
      {options.map((option, index) => {
        const selectedOption = selectedOptions.find(
          (selected) => selected.optionName === option.optionName
        );

        return (
          <Grid container item spacing={2} alignItems="center" key={index}>
            <Grid item sm={8} xs={12}>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                <li key={option.numberOption}>{option.optionName}</li>
              </ul>
            </Grid>
            <Grid item sm={4} xs={12}>
              {selectedOption ? (
                <ChipSelectionOption
                  selectedOption={selectedOption}
                  handleOptionDelete={handleOptionDelete}
                  primaryColor={primaryColor}
                  secondaryColor={secondaryColor}
                />
              ) : (
                <SelectOptions
                  availableSelectOptions={availableSelectOptions}
                  unansweredQuestions={unansweredQuestions}
                  handleOptionSelect={handleOptionSelect}
                  optionName={option.optionName} // Pasar el nombre de la opción actual
                  indexQuestion={indexQuestion}
                  primaryColor={primaryColor}
                />
              )}
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
};
