const ADMIN_ROLE = 'Administrador';
const JOURNEY_ROLE = 'Journey';

/**
 * Returns true if the user is an admin.
 *
 * @param user
 * @returns {*|boolean}
 */
export const isAdmin = (user) => {
  if (!user || !user.role) {
    return false;
  }

  return user.role.some((role) => role === ADMIN_ROLE);
};

/**
 * Returns true if the user is a journey.
 *
 * @param user
 * @returns {*|boolean}
 */
export const isJourney = (user) => {
  if (!user || !user.role) {
    return false;
  }

  return user.role.some((role) => role === JOURNEY_ROLE);
};

/**
 * Chunk an array.
 *
 * @param arr
 * @param chunkSize
 * @returns {*}
 */
export const chunkArray = (arr, chunkSize) => {
  return arr.reduce((result, item, index) => {
    const chunkIndex = Math.floor(index / chunkSize);

    if (!result[chunkIndex]) {
      result[chunkIndex] = [];
    }
    result[chunkIndex].push(item);

    return result;
  }, []);
};

export const createForm = async (
  createConfigs,
  currentCreate,
  currentCompany,
  formValues,
  enqueueSnackbar
) => {
  for (const config of createConfigs) {
    if (currentCreate.type === config.type) {
      try {
        const formData = {};
        for (const value of Object.values(config.formValues)) {
          formData[value] = formValues[value];
        }
        const {data} = await config.storeAPI({
          idCompany: currentCompany.id,
          ...formData,
        });
        if (config.setNewState) {
          config.setNewState((prevState)=>{
            return [...prevState, data];
          });
        }
        enqueueSnackbar(config.successMsg, {
          variant: 'success',
        });
      } catch (e) {
        enqueueSnackbar(config.errorMsg, {
          variant: 'error',
        });
      }
    }
  }
};

export const handleDelete = async (
  id,
  currentCompany,
  stateData,
  setState,
  deleteAPI,
  enqueueSnackbar,
  message
) => {
  const data = stateData.find((data) => data.id === id);

  if (data === undefined) {
    return;
  }

  try {
    await deleteAPI(id, currentCompany.id);
    enqueueSnackbar(`${message} eliminado con éxito`, {
      variant: 'success',
      autoHideDuration: 3000,
    });
    setState((data) => data.filter((data) => data.id !== id));
  } catch (e) {
    enqueueSnackbar(`Hubo un error al eliminar ${message}`, {
      variant: 'error',
      autoHideDuration: 3000,
    });
  }
};

/**
 * Validations
 */

export const validateForm = (fields, values, type) => {
  const validationErrors = {};
  if (type === 'employee') {
    fields.forEach((sectionObj) =>
      Object.keys(sectionObj).forEach((section) =>
        sectionObj[section].forEach((field) => {
          const { name, isRequired } = field;
          const value = values[name] || '';
          const { error, helperText } = validateField(name, value);
          if (
            isRequired &&
            (!value || (typeof value === 'string' && value.trim() === ''))
          ) {
            validationErrors[`${name}Error`] = true;
            validationErrors[`${name}HelperText`] = 'Este campo es obligatorio';
          } else if (error) {
            validationErrors[`${name}Error`] = error;
            validationErrors[`${name}HelperText`] = helperText;
          }
        })
      )
    );
  } else {
    fields.forEach((field) => {
      const { name, isRequired } = field;
      const value = values[name] || '';
      const { error, helperText } = validateField(name, value);
      if (
        isRequired &&
        (!value || (typeof value === 'string' && value.trim() === ''))
      ) {
        validationErrors[`${name}Error`] = true;
        validationErrors[`${name}HelperText`] = 'Este campo es obligatorio';
      } else if (error) {
        validationErrors[`${name}Error`] = error;
        validationErrors[`${name}HelperText`] = helperText;
      }
    });
  }

  return validationErrors;
};

const validateDocumentNumber = (documentNumber) => {
  const regex = /^[0-9]{6,17}?$/;
  return regex.test(documentNumber);
};

const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const validateAge = (age) => {
  return age <= 99;
};

const validatePhoneNumber = (phoneNumber) => {
  const regex =
    /^(\(\+?\d{2,3}\)[\|\s|\-|\.]?(([\d][\|\s|\-|\.]?){6})(([\d][\s|\-|\.]?){2})?|(\+?[\d][\s|\-|\.]?){8}(([\d][\s|\-|\.]?){2}(([\d][\s|\-|\.]?){2})?)?)$/;
  return regex.test(phoneNumber);
};

export const validateField = (name, value) => {
  const validationResult = { error: false, helperText: '' };
  if (value === '') {
    return validationResult;
  }

  if (name === 'email') {
    validationResult.error = !validateEmail(value);
    validationResult.helperText = validationResult.error
      ? 'Ingrese un correo válido'
      : '';
  } else if (name === 'documentNumber') {
    validationResult.error = !validateDocumentNumber(value);
    validationResult.helperText = validationResult.error
      ? isNaN(value)
        ? 'El tipo documento debe ser un número'
        : 'Por favor ingrese un número documento válido'
      : '';
  } else if (name.includes('age')) {
    validationResult.error = !validateAge(value);
    validationResult.helperText = validationResult.error
      ? isNaN(value)
        ? 'La edad debe ser un número'
        : 'La edad debe ser un número entre 0 y 99'
      : '';
  } else if (name === 'phoneNumber') {
    validationResult.error = !validatePhoneNumber(value);
    validationResult.helperText = validationResult.error
      ? isNaN(value)
        ? 'El celular debe ser un número'
        : 'Por favor ingrese un número de celular válido'
      : '';
  }
  return validationResult;
};
