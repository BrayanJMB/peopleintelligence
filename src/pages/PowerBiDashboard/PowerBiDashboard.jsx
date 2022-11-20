import Navbar from "../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import styles from "./PowerBiDashboard.module.css";
import { useEffect } from "react";
import { getCompanyDashboardsAPI } from "../../services/getCompanyDashboard.service";
import { useSelector, useDispatch } from "react-redux";
import { storeDash } from "../../features/powerBiSlice";

const userParsed = JSON.parse(localStorage.getItem("userInfo"));

export default function PowerBiDashboard() {
  const dispatch = useDispatch();
  const powerBi = useSelector((state) => state.powerBi);
  useEffect(() => {
    getCompanyDashboardsAPI(1).then((res) => {
      let data = [];
      res.data.forEach((val) => {
        if (!data.includes(val)) {
          data.push(val);
        }
      });
      dispatch(storeDash(data));
    });
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
          <div className={styles.dashboards}>
            {powerBi.companyDashboards.map((val, index) => {
              return (
                <div className={styles.dashboard} key={index}>
                  <p>{val.reportName}</p>
                  <p>{val.descriptionReport}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Box>
  );
}
