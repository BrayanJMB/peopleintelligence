import Chip from '@mui/material/Chip';

export const ChipSelectionOption = ({selectedOption, handleOptionDelete, indexQuestion}) => {
  return (
    <Chip
      key={selectedOption.selectOptionName}
      label={selectedOption.selectOptionName}
      onDelete={() => handleOptionDelete(selectedOption.optionName)}
      sx={{
        height: 'auto',
        '& .MuiChip-label': {
          display: 'block',
          whiteSpace: 'normal',
        },
      }}
    />
  );
};
