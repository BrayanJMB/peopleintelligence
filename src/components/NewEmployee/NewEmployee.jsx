import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import Button from '@mui/material/Button';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import TextField from '@mui/material/TextField';

import styles from './NewEmployee.module.css';

const validphone = new RegExp('^[0-9]{12,15}$');

export default function NewEmployee(props) {
  const [helperText, setHelperText] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const [value, setValue] = useState(0);

  const handleChangeTabs = (event, newValue) => {
    setValue(newValue);
  };

  const handlePrevTab = () => {
    setValue((prevValue) => prevValue - 1);
  };
  
  const handleNextTab = () => {
    setValue((prevValue) => prevValue + 1);
  };

  const handleBlur = (event) => {
    let helperText = {};
    let error = {};
    if (event.target.value === '') {
      helperText[event.target.name] = 'El campo no puede ir vacio';
      error[event.target.name] = true;
    } else {
      helperText[event.target.name] = '';
      error[event.target.name] = false;
    }
    setErrorMessage(error);
    setHelperText(helperText);
  };

  return (
    
    <div className={styles.form}>
      <div style={{ width: '100%'}}>
          <div style={{ border: 'none' }}>
            <Tabs
              value={value}
              onChange={handleChangeTabs}
              aria-label="basic tabs example"
              centered
            >
              <Tab
                label="DATOS PERSONALES"
                style={{
                  color: '#03aae4',
                }}

              />
              <Tab
                label="DATOS EMPLEADOS"
                style={{color: '#03aae4' }}
              />

              <Tab
                label="OTROS CAMPOS"
                style={{color: '#03aae4' }}
              />
            </Tabs>
          </div>
        </div> 
      {value === 0 && (
        <>     
      <div className={styles.input}>

        <TextField
          id="outlined-name"
          label="Número Documento"
          value={props.info.person.numeroDocumento}
          name="person.numeroDocumento"
          onChange={props.handleChangeEmployee}
          style={{ flexBasis: '40%' }}
          error={errorMessage.codigoDepartamento}
          helperText={helperText.codigoDepartamento}
          size="small"
          onBlur={handleBlur}
        />

        <Autocomplete
          id="combo-box-demo"
          style={{ flexBasis: '40%' }}
          options={props.content.documentType}
          clearOnEscape
          value={props.info.person.IdTipoDocumento}
          onChange={(e, value) => {
            props.handleAutocomplete('person.IdTipoDocumento', value);
          }}
          getOptionLabel={(option) => option}
          noOptionsText={'No se ha encontrado ningún tipo de documento'}
          renderInput={(params) => (
            <TextField
              {...params}
              error={errorMessage.IdPais}
              helperText={helperText.IdPais}
              label="Tipo Documento"
            />
          )}
          size="small"
        />

      </div>
      
      <div className={styles.input}>
        <TextField
          id="outlined-name"
          label="Apellidos"
          value={props.info.person.apellIdos}
          name="person.apellIdos"
          onChange={props.handleChangeEmployee}
          style={{ flexBasis: '40%' }}
          error={errorMessage.codigoDepartamento}
          helperText={helperText.codigoDepartamento}
          size="small"
          onBlur={handleBlur}
        />
        <TextField
          id="outlined-name"
          label="Nombres"
          value={props.info.person.nombres}
          name="person.nombres"
          onChange={props.handleChangeEmployee}
          style={{ flexBasis: '40%' }}
          error={errorMessage.codigoDepartamento}
          helperText={helperText.codigoDepartamento}
          size="small"
          onBlur={handleBlur}
        />

      </div>
      <div className={styles.input}>

      <TextField
          id="outlined-name"
          label="Edad"
          value={props.info.person.edad}
          name="person.edad"
          onChange={props.handleChangeEmployee}
          style={{ flexBasis: '40%' }}
          error={errorMessage.codigoDepartamento}
          helperText={helperText.codigoDepartamento}
          size="small"
          onBlur={handleBlur}
        />
        <TextField
          id="outlined-name"
          label="Número Telefonico"
          value={props.info.person.numeroTelefonico}
          name="person.numeroTelefonico"
          onChange={props.handleChangeEmployee}
          style={{ flexBasis: '40%' }}
          error={errorMessage.codigoDepartamento}
          helperText={helperText.codigoDepartamento}
          size="small"
          onBlur={handleBlur}
        />
      </div>

      <div className={styles.input}>
      <TextField
          id="outlined-name"
          label="Dirección"
          value={props.info.person.direccion}
          name="person.direccion"
          onChange={props.handleChangeEmployee}
          style={{ flexBasis: '40%' }}
          error={errorMessage.codigoDepartamento}
          helperText={helperText.codigoDepartamento}
          size="small"
          onBlur={handleBlur}
        />

      <TextField
          id="outlined-name"
          label="Correo Eléctronico"
          value={props.info.person.correoElectronico}
          name="person.correoElectronico"
          onChange={props.handleChangeEmployee}
          style={{ flexBasis: '40%' }}
          error={errorMessage.codigoDepartamento}
          helperText={helperText.codigoDepartamento}
          size="small"
          onBlur={handleBlur}
        />    
      </div>

      <div className={styles.input}>

      <TextField
          id="outlined-name"
          label="Fecha Nacimiento"
          value={props.info.person.fechaNacimiento}
          name="person.fechaNacimiento"
          onChange={props.handleChangeEmployee}
          style={{ flexBasis: '40%' }}
          error={errorMessage.fechaNacimiento}
          helperText={helperText.fechaNacimiento}
          size="small"
          onBlur={handleBlur}
        />  
      <Autocomplete
        id="combo-box-demo"
        style={{ flexBasis: '40%' }}
        options={props.content.gender}
        clearOnEscape
        value={props.info.person.IdGenero}
        onChange={(e, value) => {
          props.handleAutocomplete('person.IdGenero', value);
        }}
        getOptionLabel={(option) => option}
        noOptionsText={'No se ha encontrado ningún género'}
        renderInput={(params) => (
          <TextField
            {...params}
            error={errorMessage.IdGenero}
            helperText={helperText.IdGenero}
            label="Género"
          />
        )}
        size="small"
      />
      </div>
      </>
    )}
    {value === 1 && (
        <>     
      <div className={styles.input}>

        <TextField
          id="outlined-name"
          label="Fecha Admisión"
          value={props.info.codigoDepartamento}
          name="employee.FechaAdmision"
          onChange={props.handleChangeEmployee}
          style={{ flexBasis: '40%' }}
          error={errorMessage.codigoDepartamento}
          helperText={helperText.codigoDepartamento}
          size="small"
          onBlur={handleBlur}
        />

        <TextField
          id="outlined-name"
          label="Supervisor"
          value={props.info.codigoDepartamento}
          name="employee.supervisor"
          onChange={props.handleChangeEmployee}
          style={{ flexBasis: '40%' }}
          error={errorMessage.codigoDepartamento}
          helperText={helperText.codigoDepartamento}
          size="small"
          onBlur={handleBlur}
        />

      </div>
      
      <div className={styles.input}>
      <Autocomplete
        id="combo-box-demo"
        style={{ flexBasis: '40%' }}
        options={props.content.company}
        clearOnEscape
        value={props.info.employee.IdCompania}
        onChange={(e, value) => {
          props.handleAutocomplete('employee.IdCompania', value);
        }}
        getOptionLabel={(option) => option}
        noOptionsText={'No se ha encontrado ninguna compañia'}
        renderInput={(params) => (
          <TextField
            {...params}
            error={errorMessage.IdCompany}
            helperText={helperText.IdCompany}
            label="Compañía"
          />
        )}
        size="small"
      />
        <TextField
          id="outlined-name"
          label="Rol Compañía"
          value={props.info.codigoDepartamento}
          name="employee.rollCompania"
          onChange={props.handleChangeEmployee}
          style={{ flexBasis: '40%' }}
          error={errorMessage.codigoDepartamento}
          helperText={helperText.codigoDepartamento}
          size="small"
          onBlur={handleBlur}
        />

      </div>
      <div className={styles.input}>

      <Autocomplete
        id="combo-box-demo"
        style={{ flexBasis: '40%' }}
        options={props.content.AreaFuncional}
        clearOnEscape
        value={props.info.segments.IdAreaFuncional}
        onChange={(e, value) => {
          props.handleAutocomplete('employee.areaId', value);
        }}
        getOptionLabel={(option) => option}
        noOptionsText={'No se ha encontrado ningún área'}
        renderInput={(params) => (
          <TextField
            {...params}
            error={errorMessage.IdCompany}
            helperText={helperText.IdCompany}
            label="Área"
          />
        )}
        size="small"
      />

      </div>

      </>
    )}


        <div className={styles.impexp}>
        {value > 0 && (
          <Button onClick={handlePrevTab}>Anterior</Button>
        )}
        {value < 2 && (
          <Button onClick={handleNextTab}>Siguiente</Button>
        )}
        {value === 2 || value === 1 ? (
          <Button onClick={props.handleEmployee}>Guardar</Button>
        ) : null}
      </div>
    </div>

  );
}
