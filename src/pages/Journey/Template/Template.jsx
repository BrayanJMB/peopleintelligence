import styles from "./Template.module.css";
import IconSidebar from "../../../Layout/IconSidebar/IconSidebar";
import Navbar from "../../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useNavigate } from "react-router-dom";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useEffect, useState } from "react";
import { getTemplatesAPI } from "../../../services/getTemplates.service";
import { isAdmin } from '../../../utils/helpers';
import useNavigateSearch from '../../../hooks/useNavigateSearch';
import MyPageHeader from '../../../components/MyPageHeader/MyPageHeader';

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});

/**
 * Survey index page.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const Template = () => {
  const navigate = useNavigate();
  const navigateSearch = useNavigateSearch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState([]);

  /**
   * Handle create survey.
   *
   * @param isTemplate
   */
  const handleCreateSurvey = (isTemplate = false) => {
    if (!isAdmin(userInfo)) {
      return;
    }

    const querySearch = {
      isTemplate,
    };

    navigateSearch('/journey/create-survey', querySearch);
  };

  // component did mount
  useEffect(() => {
    if (
      userInfo?.role.findIndex((p) => p === "Journey") < 0 &&
      userInfo?.role.findIndex((p) => p === "Administrador") < 0
    ) {
      alert("No tiene permiso para acceder a esta funcionalidad");
      navigate("/dashboard");
    }
    getTemplatesAPI().then((res) => {
      setData(res.data);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <IconSidebar />
        <div style={{ backgroundColor: "white" }}>
          <div className={styles.content}>
            <div className={styles.survey_template}>

              <div
                className={styles.heading}
              >
                <MyPageHeader
                  title="Plantilla de encuesta"
                />
              </div>

              <div className={styles.templates}>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "18px",
                    letterSpacing: "0.5px",
                  }}
                >
                  Empezar desde el principio
                </p>
                <div
                  style={{ display: "flex", flexDirection: "row", gap: "6em" }}
                >
                  {/* create template */}
                  <div
                    className={styles.template}
                    onClick={() => handleCreateSurvey(true)}>
                    <div className={styles.title}>
                      <AddCircleOutlineIcon /> <p>Crea tu plantilla</p>
                    </div>
                    <div className={styles.description}>
                      Cree su propia plantilla personalizada desde cero.
                    </div>
                    <div className={styles.create}>
                      <p>Crea plantilla</p>
                      <KeyboardArrowRightIcon />
                    </div>
                  </div>

                  {/* create survey */}
                  <div
                    className={styles.template}
                    onClick={() => handleCreateSurvey()}
                  >
                    <div className={styles.title}>
                      <AddCircleOutlineIcon /> <p>Crea tu propia encuesta</p>
                    </div>
                    <div className={styles.description}>
                      Cree su propia encuesta personalizada desde cero.
                    </div>
                    <div className={styles.create}>
                      <p>Crea ahora</p>
                      <KeyboardArrowRightIcon />
                    </div>
                  </div>
                </div>
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "18px",
                    letterSpacing: "0.5px",
                  }}
                >
                  O usa una plantilla
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: "1em",
                    flexWrap: "wrap",
                  }}
                >
                  {data.map((val, key) => {
                    return (
                      <div key={key} className={styles.template}>
                        <div className={styles.title}>
                           {val.nameSurvey}
                        </div>
                        <div className={styles.description}>
                          {val.descriptionSurvey}
                        </div>
                        <div className={styles.bottom}>
                          <p>Usa esta plantilla</p>
                          <KeyboardArrowRightIcon />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default Template;