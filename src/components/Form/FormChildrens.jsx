import { Fragment, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import styles from '../../pages/Journey/CreateSurvey/CreateSurvey.module.css'
import { Autocomplete } from "@mui/material";
import Form from "./Form";
export default function FormChildren(props) {
  return (
    <Fragment>
      <Dialog maxWidth="lg" open={open} onClose={props.handleCloseModal}>
        <DialogTitle>Agregar pregunta Condicional</DialogTitle>
        <DialogContent>
          <Box className={styles.modal}>
            <div className={styles.modalbuttom}>
              <div className={styles.form}>
                <div className={styles.input}>
                  <Autocomplete
                    id="combo-box-demo"
                    style={{ flexBasis: "40%" }}
                    options={props.questionTypes}
                    value={props.type}
                    onChange={(e, value) => {
                      props.handleAutocomplete(value);
                    }}
                    getOptionLabel={(option) => option.typeQuestionName}
                    noOptionsText={"No se encontraron tipos de pregunta"}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        error={props.errorMessage.IdTipoDocumento}
                        helperText={props.helperText.IdTipoDocumento}
                        label="Seleccionar tipo de pregunta"
                      />
                    )}
                    size="small"
                    isOptionEqualToValue={(option, value) =>
                      option.id === value.id
                    }
                  />
                </div>
                <Form
                  type={props.type}
                  information={props.information}
                  handleInformation={props.handleInformation}
                  errorMessage={props.errorMessage}
                  helperText={props.helperText}
                  handleinformationoptions={props.handleinformationoptions}
                  handleChangeOptions={props.andleChangeOptions}
                  handleaddoption={props.handleaddoption}
                  handleRemoveOption={props.handleRemoveOption}
                  handleaddstars={props.handleaddstars}
                  handledeletestars={props.handledeletestars}
                  starmsg={props.starmsg}
                  handleCategoryIdChange={props.handleCategoryIdChange}
                  categories={props.categories}
                  categoryError={props.categoryError}
                  questions={props.questions.length + 1}
                  customOptionError={props.customOptionError}
                  isConditionalQuestion={true}
                />
              </div>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleCloseModal} variant="outlined">
            Cancelar
          </Button>
          <Button onClick={props.handleAgregar} variant="contained">
            Agregar
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
