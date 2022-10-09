import React from "react";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div className={styles.screen}>
      <div className={styles.box}>
        <div className={styles.inner_box}>
          <h1>Bienvenue Dans Votre Compte Personnel</h1>
        </div>
      </div>
    </div>
  );
}
