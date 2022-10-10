import React from "react";
import styles from "./Register.module.css";
import Logo from "../../assets/Logo.svg";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

export default function Register() {
  return (
    <div className={styles.content}>
      <div className={styles.image}>
        <Box
          component="img"
          sx={{
            backgroundColor: "white",
          }}
          alt="Your logo."
          src={Logo}
        />
      </div>
      <div className={styles.register}>
        <h2
          className={styles.succesfully}
          style={{ color: "#03aae4", marginBottom: "3.5rem" }}
        >
          ¡Tu registro ha sido exitoso!
        </h2>
        <p>
          Hemos enviado un correo a{" "}
          <span style={{ color: "#03aae4" }}> xxxxxx@xxxxxx.xxxx</span>
          con un link para que puedas crear tu contraseña y finalizar el
          registro en la plataforma. Por favor revisa tu bandeja de entrada o la
          carpeta spam
        </p>
      </div>
      <div className={styles.end}>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#03aae4" }}
          onClick={() => {
            window.location.replace(
              "https://pruebaapib2c.b2clogin.com/PruebaAPib2c.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_SignInSingUp&client_id=08cfdf65-11e3-45b6-a745-3c0bd35777ae&nonce=defaultNonce&redirect_uri=https%3A%2F%2Fjwt.ms%2F&scope=openid&response_type=id_token&prompt=login"
            );
          }}
        >
          Volver al inicio de sesión
        </Button>
      </div>
    </div>
  );
}
