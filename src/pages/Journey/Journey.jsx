import Alert from '@mui/material/Alert';
import IconSidebar from "../../Layout/IconSidebar/IconSidebar";
import Navbar from "../../Layout/Navbar/Navbar";
import styles from "./Journey.module.css";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import starIcon from "../../assets/icons/star_icon.png";
import MyCarousel from '../../components/MyCarousel/MyCarousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getJourneyMapAPI, getJourneysCompanyAPI } from "../../services/getJourneyMap.service";
import enps from "../../assets/enps.svg";
import empleados from "../../assets/empleados.svg";
import last from "../../assets/last.svg";
import pulso from "../../assets/pulso.svg";
import encuesta from "../../assets/icons/encuesta.png";
import {isAdmin} from "../../utils/helpers";
import {useSelector} from "react-redux";
import {selectCompanyById} from "../../features/companies/companiesSlice";

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});

const DEFAULT_SURVEY_IMAGES = [
  enps,
  pulso,
  empleados,
  last,
];

export default function Journey() {
  const DEFAULT_ICON= 'https://peopleintelligenceapi.azurewebsites.net/StaticFiles/Images/JourneyImages/onboarding.svg';
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [currentMapId, setCurrentMapId] = useState(null);
  const [slides, setSlides] = useState([]);
  const [journeys, setJourneys] = useState([]);

  const handleExplorar = () => {
    navigate("/journey/survey-template");
  };

  const handleSettings = () => {
    navigate("/journeysettings");
  };

  /**
   * Get survey image or pick a random one from default images.
   *
   * @param image
   * @returns {*}
   */
  const getSurveyImage = (image) => {
    if (image) {
      return image;
    }

    const randomIndex = Math.floor(Math.random() * DEFAULT_SURVEY_IMAGES.length);

    return DEFAULT_SURVEY_IMAGES[randomIndex];
  }

  /**
   * Fetch journeys by map and company.
   *
   * @returns {Promise<void>}
   */
  const fetchJourneys = async () => {
    if (!currentCompany || !currentMapId) {
      return;
    }

    // fetch journeys by map and company
    const { data } = await getJourneysCompanyAPI(currentCompany.id, currentMapId);

    // update current slide
    setSlides((slides) => slides.map((slide) => ({
      ...slide,
      isCurrent: slide.id === currentMapId,
    })));
    setJourneys(data);
  }

  /**
   * Handle click select map id.
   *
   * @param map
   */
  const handleSelectedMapId = ({ id }) => {
    setCurrentMapId(id);
  }

  /**
   * Component did mount.
   */
  useEffect(() => {
    /**
     * Fetch journey map data and validate user role.
     *
     * @returns {Promise<void>}
     */
    const fetchJourneyMaps = async () => {
      const MESSAGE = 'No tiene permiso para acceder a esta funcionalidad.';

      if (!userInfo) {
        return navigate('/dashboard', {state: {message: MESSAGE}});
      }

      const { role } = userInfo;
      const validRoles = ['Journey', 'Administrador'];

      if (!role.some((roleItem => validRoles.includes(roleItem)))) {
        alert('No tiene permiso para acceder a esta funcionalidad.');
        navigate('/dashboard');

        return;
      }

      // fetch slider data
      const { data } = await getJourneyMapAPI();

      // the first item is current active slide
      setSlides(data.map((slide, index) => ({
        ...slide,
        isCurrent: index === 0,
      })));

      // if there are no maps then cant fetch journeys
      if (!data.length) {
        return;
      }

      const companyId = userInfo.Company;
      const mapId = data[0].id;

      // fetch journeys by map and company

      setCurrentMapId(mapId);

      await fetchJourneys();
    };

    fetchJourneyMaps();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchJourneys();
  }, [currentCompany, currentMapId]);

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <IconSidebar />
        <div style={{ backgroundColor: "white" }}>
          <div className={styles.content}>
            <div className={styles.journey}>

              <MyCarousel
                slides={slides.map((slide) => ({
                  id: slide.id,
                  title: slide.mapJourney,
                  icon: slide.iconUrl ?? DEFAULT_ICON,
                  isCurrent: slide.isCurrent,
                  number: Number(slide.numberMap),
                }))}
                onSelected={(slide) => handleSelectedMapId(slide)}
              />

              <div className={styles.heading}>
                <div style={{ paddingRight: "16px" }}>
                  <img src={currentCompany?.Logotipo ?? starIcon} alt="" className={styles.icon} />
                </div>
                <div style={{ paddingRight: "1em" }} className={styles.text}>
                  <h1
                    style={{
                      fontSize: "24px",
                      letterSpacing: 0,
                      fontWeight: "500",
                      margin: 0,
                    }}
                  >
                    Experiencia del empleado.
                  </h1>
                </div>

                {isAdmin(userInfo) && (
                  <Button
                    variant="contained"
                    className={styles.explorar}
                    style={{
                      color: "white",
                      marginRight: "1.5em",
                    }}
                    color="blue"
                    onClick={handleSettings}
                  >
                    Administra Encuestas
                  </Button>
                )}

                <Button
                  variant="contained"
                  className={styles.explorar}
                  style={{
                    color: "white",
                  }}
                  color="blue"
                  onClick={handleExplorar}
                >
                  Explorar plantillas
                </Button>
              </div>

              <div className={styles.templates}>
                {journeys.filter((journey) => journey.ispersonal).map((journey) => {
                  return (
                    <div key={journey.id} className={styles.card}>
                      <img
                        src={getSurveyImage(journey.imageSurvey)}
                        alt=""
                        width="146"
                        height="81"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                      <p
                        style={{
                          fontSize: "18px",
                          letterSpacing: "0.5px",
                          fontWeight: "500",
                        }}
                      >
                        {journey.nameSurvey}
                      </p>
                      <p
                        style={{
                          fontSize: "14px",
                          letterSpacing: "0.25px",
                          fontWeight: "300",
                        }}
                      >
                        {journey.descriptionSurvey}
                      </p>
                      <Button
                        variant="outlined"
                        style={{
                          color: "#03aae4",
                          width: "30%",
                          alignSelf: "flex-end",
                        }}
                        color="blue"
                        onClick={() => navigate(`/journey/survey/${journey.id}/detail`)}
                      >
                        Empezar
                      </Button>
                    </div>
                  );
                })}
                {journeys.filter((journey) => !journey.ispersonal).map((journey) => {
                  return (
                    <div key={journey.id} className={styles.encuestacard} onClick={() => navigate(`/journey/survey/${journey.id}/detail`)}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#EAF8FF",
                            width: "35px",
                            height: "35px",
                            padding: "12px",
                            borderRadius: "8px",
                            margin: "0.5em",
                          }}
                        >
                          <img
                            src={encuesta}
                            alt=""
                            style={{
                              width: "100%",
                              height: "auto",
                              maxWidth: "100%",
                              verticalAlign: "middle",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "1em",
                            paddingLeft: "12px",
                            width: "80%",
                          }}
                        >
                          <p
                            style={{
                              fontSize: "18px",
                              letterSpacing: "0.5px",
                              fontWeight: "500",
                            }}
                          >
                            {journey.nameSurvey}
                          </p>
                          <div
                            style={{
                              overflow: "hidden",
                              wordBreak: "break-word",
                            }}
                          >
                            <p
                              style={{
                                fontSize: "14px",
                                letterSpacing: "0.25px",
                                fontWeight: "300",
                                overflow: "hidden",
                                wordBreak: "break-word",
                              }}
                            >
                              {journey.descriptionSurvey}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {journeys.length === 0 && (
                  <Alert severity="info">No se encontraron encuestas.</Alert>
                )}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
}
