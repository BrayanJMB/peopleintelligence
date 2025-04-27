export const validationForMultipleQuestion = (
  information,
  errorMessage,
  helperText,
  setErrorMessage,
  setHelperText
) => {
    if (information.maximunValueOptions.trim() === '') {
        setErrorMessage({
          ...errorMessage,
          maximunValueOptions: true,
        });
        setHelperText({
          ...helperText,
          maximunValueOptions: 'Este valor no puede ir vacío',
        });
        return;
      }
      
      if (isNaN(information.maximunValueOptions)) {
        setErrorMessage((prev) => ({
          ...prev,
          maximunValueOptions: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          maximunValueOptions: 'Debe ingresar un número.',
        }));
        return;
      }
      
      if (!Number.isInteger(Number(information.maximunValueOptions))) {
        setErrorMessage((prev) => ({
          ...prev,
          maximunValueOptions: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          maximunValueOptions: 'Solo se permiten números enteros.',
        }));
        return;
      }
      
      if (Number(information.maximunValueOptions) <= 0) {
        setErrorMessage((prev) => ({
          ...prev,
          maximunValueOptions: true,
        }));
        setHelperText((prev) => ({
          ...prev,
          maximunValueOptions: 'Debe ser un número mayor a 0.',
        }));
        return;
      }
      
      if (Number(information.maximunValueOptions) >= information.customOptions.length) {
        setErrorMessage({
          ...errorMessage,
          maximunValueOptions: true,
        });
        setHelperText({
          ...helperText,
          maximunValueOptions: 'No puede colocar un valor mayor ni igual al número de opciones que tiene la pregunta.',
        });
        return;
      }
};
