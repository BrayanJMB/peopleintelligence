import React from "react";
import styles from "./Multiple.module.css";
import Box from "@mui/material/Box";
import Logo from "../../assets/Logo.svg";
export default function Multiple() {
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
        <p>multiple companies</p>
      </div>
    </div>
  );
}
