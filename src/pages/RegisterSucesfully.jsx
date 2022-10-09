import React, { Fragment } from "react";
import Button from '@mui/material/Button';
import styles from "./fourth.module.css";

const RegisterSuccesfully= () =>{
    return(
        <>
            <h3 className={styles.succesfully}>Tu registro ha sido exitoso!</h3>
            <p >Hemos enviado un correo a <span className={styles.succesfully}> xxxxxx@xxxxxx.xxxx</span>con un link para que puedas crear tu contraseña y finalizar el registro en la plataforma.
            Por favor revisa tu bandeja de entrada o la carpeta spam
            </p>
            <Button variant="outlined">Volver al inicio de sesión</Button>
        </>
    )
}

export default RegisterSuccesfully  