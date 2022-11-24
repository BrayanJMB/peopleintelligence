import Navbar from "../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import Sidebar from "../../Layout/Sidebar/Sidebar";
import styles from "./PowerBiDashboard.module.css";
import { useEffect, useState } from "react";
import { getCompanyDashboardsAPI } from "../../services/getCompanyDashboard.service";
import { useSelector, useDispatch } from "react-redux";
import { storeDash } from "../../features/powerBiSlice";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";

const userInfo = JSON.parse(localStorage.getItem("userInfo"));

export default function PowerBiDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const powerBi = useSelector((state) => state.powerBi);
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleReport = (id) => {
    navigate("/powerbi/" + id);
  };

  useEffect(() => {
    if (userInfo.role.findIndex((p) => p === "PowerBiDashboard") > -1) {
      getCompanyDashboardsAPI(userInfo.Company).then((res) => {
        let data = [];
        res.data.forEach((val) => {
          if (!data.includes(val)) {
            data.push(val);
          }
        });
        dispatch(storeDash(data));
      });
    } else {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }
  }, []);
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <div style={{ backgroundColor: "white" }}>
        <Stack spacing={2}>
          <div className={styles.content}>
            <div className={styles.dashboards}>
              {powerBi.companyDashboards.map((val, index) => {
                return (
                  <div className={styles.dashboard} key={index}>
                    <p style={{ textAlign: "center" }}>{val.reportName}</p>
                    <p
                      style={{
                        marginTop: "0.2em",
                        fontWeight: 300,
                        textAlign: "center",
                      }}
                    >
                      {val.descriptionReport}
                    </p>
                    <Button
                      variant="text"
                      style={{
                        whiteSpace: "nowrap",
                        padding: "0 0.8em",
                        color: "#00b0f0",
                        alignSelf: "flex-start",
                      }}
                      size="small"
                      onClick={() => handleReport(val.id)}
                    >
                      ver reporte
                    </Button>
                  </div>
                );
              })}
            </div>
            <div className={styles.pagination}>
              <Pagination count={10} page={page} onChange={handleChange} />
            </div>
          </div>
        </Stack>
      </div>
    </Box>
  );
}
