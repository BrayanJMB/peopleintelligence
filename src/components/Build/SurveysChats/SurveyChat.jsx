import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { useSnackbar } from 'notistack';

import DataAdministration from '../../../pages/InfoAdmin/components/DataAdministration';
import { deleteSurveyChatAPI } from '../../../services/ChatLive/deleteSurveyChat.service';
import { fecthSurveyChatAPI } from '../../../services/ChatLive/fetchSurveyChat.service';
import { handleDelete } from '../../../utils/helpers';
import MyLoader from '../../MyLoader/MyLoader';

import styles from './SurveyChat.module.css';
export const SurveyChat = ({ handleMove }) => {
  const navigate = useNavigate();
  // Usar estos datos ficticios en tu estado:
  const currentCompany = useSelector((state) => state.companies.currentCompany);
  const [surveyChat, setSurveyChat] = useState([]);
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  console.log(surveyChat);
  const surveyChatColumns = [
    {
      id: 'name',
      label: 'Nombre encuesta',
      numeric: false,
    },
    {
      id: 'name',
      label: 'moderador',
      numeric: false,
    },
    {
      id: 'options',
      label: 'Opciones',
      numeric: false,
    },
  ];

  const mapSurveyChat = (surveyChat) =>
    surveyChat.map((surveyChat) => [
      {
        column: 'name',
        value: surveyChat.title,
      },
      {
        column: 'moderator',
        value: surveyChat.title,
      },
      {
        column: 'options',
        value: '',
        payload: {
          handleView: handleView,
          handleDelete: handleDeleteSurveyChat,
          handleEdit: handleEditSurveyChat,
          handleCopyLink: () => handleCopyLinkSurvey(surveyChat),
          id: surveyChat.id,
        },
      },
    ]);

    const handleCopyLinkSurvey = (surveyChat) => {
      const surveyLink = `https://chatapppeopleintelligence.azurewebsites.net/respondente/${surveyChat.id}`; // Reemplaza esto con el enlace real de la encuesta
      navigator.clipboard.writeText(surveyLink).then(() => {
        enqueueSnackbar('Link copiado al portapapeles', { variant: 'success' });
      }).catch(err => {
        enqueueSnackbar('Error al copiar el enlace', { variant: 'error' });
        console.error('Error al copiar el enlace: ', err);
      });
    };
  const handleEditSurveyChat = (id) => {
    navigate(`/conversation/Build/update-survey-chat/${id}`);
  };

  const handleView = async (id) => {
    handleMove(`/conversation/moderator/${id}`, 'moderator');
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
      nameAdministration: 'Encuestas',
      tableInformation: {
        title: 'Encuestas',
        buttonCreateName: null,
        eventButton: '',
        columns: surveyChatColumns,
        rows: mapSurveyChat(surveyChat),
      },
      tabsInformation: [],
    },
  ];
  return (
    <div className={styles.content}>
      <div className={styles.crud}>
        <Box sx={{ display: 'flex' }}>
          <div style={{ backgroundColor: 'white' }}>
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
