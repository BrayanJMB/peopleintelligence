import Chip from '@mui/material/Chip';

export const ChipSelectionOption = ({
  selectedOption,
  handleOptionDelete,
  indexQuestion,
  primaryColor,
  secondaryColor,
}) => {
  return (
    <Chip
      key={selectedOption.selectOptionName}
      label={selectedOption.selectOptionName}
      onDelete={() => handleOptionDelete(selectedOption.optionName)}
      sx={{
        height: 'auto',
        backgroundColor: secondaryColor || '#f0f0f0', // color de fondo por defecto
        '& .MuiChip-label': {
          display: 'block',
          whiteSpace: 'normal',
          color: primaryColor || '#000000', // color del texto por defecto negro
        },
        '& .MuiChip-deleteIcon': {
          color: primaryColor || '#000000', // color del ícono por defecto negro
        },
      }}
    />
  );
};
