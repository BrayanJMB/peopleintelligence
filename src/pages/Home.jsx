import React, { useState } from "react";
import styles from "./Home.module.css";
import Box from "@mui/material/Box";
import Logo from "../assets/Logo.svg";
import Building from "../assets/Picture1.svg";
import Button from "@mui/material/Button";
import One from "../components/One/One";
import Multiple from "../components/Multiple/Multiple";

export default function Home() {
  let [begin, setBegin] = useState(true);
  let [one, setOne] = useState(false);
  let [multiple, setMultiple] = useState(false);

  const handleoneCompany = () => {
    setOne(true);
    setBegin(false);
  };
  const handlemultipleCompany = () => {
    setMultiple(true);
    setBegin(false);
  };
  return (
    <div className={styles.screen}>
      {begin ? (
        <div className={styles.inner_box}>
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
            <div className={styles.option}>
              <p>Selecciona la opción que mejor se adapte a tus necesidades</p>
            </div>
            <div className={styles.cuenta}>
              <div className={styles.box}>
                <Box component="img" alt="Your logo." src={Building} />
                <h4 style={{ margin: 0, textAlign: "center" }}>
                  CUENTA ÚNICA EMPRESA
                </h4>
                <p className={styles.description}>
                  Selecciona esta opción si vas a administrar y gestionar una
                  cuenta empresarial.
                </p>
                <Button variant="contained" onClick={handleoneCompany}>
                  Seleccionar
                </Button>
              </div>
              <div className={styles.box}>
                <Box component="img" alt="Your logo." src={Building} />
                <h4 style={{ margin: 0, textAlign: "center" }}>
                  CUENTA MULTI EMPRESAS
                </h4>
                <p className={styles.description}>
                  Selecciona esta opción eres un grupo empresarial o un
                  consultor que administra y gestiona varias empresas
                </p>
                <Button variant="contained" onClick={handlemultipleCompany}>
                  Seleccionar
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.inner_box}>
          {one ? <One /> : <></>}
          {multiple ? <Multiple /> : <></>}
        </div>
      )}
    </div>
  );
}
