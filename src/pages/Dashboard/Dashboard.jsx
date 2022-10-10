import React from "react";
import styles from "./Dashboard.module.css";
import Sidebar from "../../components/Sidebar/Sidebar";
export default function Dashboard() {
  return (
    <div className={styles.dashboard}>
      <Sidebar />
    </div>
  );
}
