import { useState, useEffect } from "react";
import { Box } from "@mui/material";
import DataAdministration from "../../../pages/InfoAdmin/components/DataAdministration";
import { useSelector } from "react-redux";
import styles from "./SurveyChat.module.css";
import { useNavigate } from "react-router-dom";
import { fecthSurveyChatAPI } from "../../../services/ChatLive/fetchSurveyChat.service";
import { deleteSurveyChatAPI } from "../../../services/ChatLive/deleteSurveyChat.service";
import MyLoader from "../../MyLoader/MyLoader";
import { useSnackbar } from 'notistack';
import { handleDelete } from "../../../utils/helpers";
export const SurveyChat = ({ handleMove }) => {
  const navigate = useNavigate();
  // Usar estos datos ficticios en tu estado:
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [surveyChat, setSurveyChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const surveyChatColumns = [
    {
      id: "name",
      label: "Nombre encuesta",
      numeric: false,
    },
    {
      id: "name",
      label: "moderador",
      numeric: false,
    },
    {
      id: "options",
      label: "Opciones",
      numeric: false,
    },
  ];

  const mapSurveyChat = (surveyChat) =>
    surveyChat.map((surveyChat) => [
      {
        column: "name",
        value: surveyChat.title,
      },
      {
        column: "moderator",
        value: surveyChat.title,
      },
      {
        column: "options",
        value: "",
        payload: {
          handleView: handleView,
          handleDelete: handleDeleteSurveyChat,
          handleEdit: handleEditSurveyChat,
          id: surveyChat.id,
        },
      },
    ]);

  const handleEditSurveyChat = (id) => {
    navigate(`/conversation/Build/update-survey-chat/${id}`);
  };

  const handleView = async (id) => {
    handleMove(`/conversation/moderator/${id}`, "moderator");
  };

  const handleDeleteSurveyChat = async (id) => {
    handleDelete(
      id,
      currentCompany,
      surveyChat,
      setSurveyChat,
      deleteSurveyChatAPI,
      enqueueSnackbar,
      'Chat Live'
    );
  };

  const fetchSurveyChat = async () => {
    if (!currentCompany) {
      return;
    }
    setLoading(true);
    const { data } = await fecthSurveyChatAPI(currentCompany.id);
    setSurveyChat(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSurveyChat();
  }, [currentCompany]);

  const some = [
    {
      nameAdministration: "Encuestas",
      tableInformation: {
        title: "Encuestas",
        buttonCreateName: null,
        eventButton: "",
        columns: surveyChatColumns,
        rows: mapSurveyChat(surveyChat),
      },
      tabsInformation: [],
    },
  ];
  return (
    <div className={styles.content}>
      <div className={styles.crud}>
        <Box sx={{ display: "flex" }}>
          <div style={{ backgroundColor: "white" }}>
            <div className={styles.DataTable}>
              {loading && <MyLoader />}
              <div className={styles.DataTable2}>
                <DataAdministration
                  dataAdministration={some}
                  type="Encuestas"
                  loading={loading}
                />
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};
