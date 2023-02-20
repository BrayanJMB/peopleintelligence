import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { blue, amber, teal } from '@mui/material/colors';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import EmailIcon from '@mui/icons-material/Email';
import ReplyIcon from '@mui/icons-material/Reply';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import LinkIcon from '@mui/icons-material/Link';
import DownloadIcon from '@mui/icons-material/Download';
import Navbar from '../../Layout/Navbar/Navbar';
import IconSidebar from '../../Layout/IconSidebar/IconSidebar';
import styles from './SurveyDetailPage.module.css';
import MyCard from '../../components/MyCard/MyCard';

const theme = createTheme({
  palette: {
    blue: {
      main: "#03aae4",
    },
  },
});

// survey options
const options = [
  {
    option: 'Editar',
    icon: <EditIcon />,
  },
  {
    option: 'Duplicar',
    icon: <ContentCopyIcon />,
  },
  {
    option: 'Borrar',
    icon: <DeleteIcon />,
  },
];
// flags, tags and counters.
const chips = [
  {
    id: 1,
    text: 'Encuesta anónima',
    backgroundColor: blue[200],
    color: blue[900],
    icon: <AdminPanelSettingsIcon style={{ color: blue[900] }} />,
  },
  {
    id: 2,
    text: 'Usuarios invitados',
    backgroundColor: amber[100],
    color: amber[800],
    icon: <EmailIcon style={{ color: amber[800] }} />,
  },
  {
    id: 3,
    text: 'Respuestas',
    backgroundColor: teal['A100'],
    color: teal[900],
    icon: <ReplyIcon style={{ color: teal[900] }} />,
  },
];

/**
 * Survey Detail Page Component.
 *
 * @returns {JSX.Element}
 * @constructor
 */
const SurveyDetailPage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  /**
   * Handle click menu for open survey options.
   *
   * @param event
   */
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handle close menu for close survey options.
   */
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex" }}>
        <Navbar />
        <IconSidebar />

        <div style={{ backgroundColor: "white" }}>
          <div className={styles.SurveyDetailPage}>
            <div className={styles.SurveyDetailPage__content}>
              <Box sx={{ flexGrow: 1 }}>
                {/* header */}
                <Grid item xs={12}>
                  <MyCard>
                    <div className={styles.SurveyDetailPage__header}>
                      <div className={styles.SurveyDetailPage__header__icon}>
                        <IconButton aria-label="Atrás">
                          <ArrowBackIcon />
                        </IconButton>
                      </div>
                      <div className={styles.SurveyDetailPage__header__title}>
                        <Typography variant="h4">
                          h4. Heading
                        </Typography>
                        <Typography variant="subtitle1">
                          subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos
                          blanditiis tenetur
                        </Typography>
                      </div>
                    </div>
                  </MyCard>
                </Grid>
                {/* survey options */}
                <Grid item xs={12}>
                  <MyCard>
                    {/* options */}
                    <div className={styles.SurveyDetailPage__options}>
                      <Typography variant="body1" gutterBottom>
                        Thisa test Survey
                      </Typography>
                      <div className={styles.SurveyDetailPage__options__button}>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? 'long-menu' : undefined}
                          aria-expanded={open ? 'true' : undefined}
                          aria-haspopup="true"
                          onClick={handleClickMenu}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            'aria-labelledby': 'long-button',
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleCloseMenu}
                          PaperProps={{
                            style: {
                              maxHeight: 48 * 4.5,
                              width: '20ch',
                            },
                          }}
                        >
                          {options.map(({ option, icon }) => (
                            <MenuItem key={option} onClick={handleCloseMenu}>
                              {icon}
                              {option}
                            </MenuItem>
                          ))}
                        </Menu>
                      </div>
                    </div>
                    {/* tags and/or counters */}
                    <Stack spacing={1} alignItems="left">
                      <Stack direction="row" spacing={1}>
                        {chips.map(({ id, text, backgroundColor, color, icon }) => (
                          <Chip
                            key={id}
                            style={{
                              backgroundColor: backgroundColor,
                              color: color,
                            }}
                            icon={icon}
                            label={text}
                          />
                        ))}
                      </Stack>
                    </Stack>
                    {/* change status and send invitations */}
                    <div className={styles.SurveyDetailPage__sendInvitation}>
                      <FormGroup>
                        <FormControlLabel
                          control={<Switch defaultChecked />}
                          label="Recopilación de respuestas"
                        />
                      </FormGroup>
                      <div className={styles.SurveyDetailPage__sendInvitation__buttons}>
                        <Stack spacing={2} direction="row">
                          <Button
                            startIcon={<ScheduleSendIcon />}
                            variant="text"
                          >
                            Enviar recordatorio
                          </Button>
                          <Button
                            startIcon={<SendIcon />}
                            variant="outlined"
                          >
                            Envíar invitación
                          </Button>
                        </Stack>
                      </div>
                    </div>
                  </MyCard>
                </Grid>
                {/* resume */}
                <Grid item xs={12}>
                  <MyCard>
                    <div className={styles.SurveyDetailPage__resume}>
                      <Typography variant="body1" gutterBottom>
                        Resumen de respuesta
                      </Typography>
                      <div className={styles.SurveyDetailPage__resume__share}>
                        <IconButton>
                          <LinkIcon />
                        </IconButton>
                        <IconButton>
                          <DownloadIcon />
                        </IconButton>
                      </div>
                    </div>
                  </MyCard>
                </Grid>

                {/* questions */}
                <Grid item xs={12}>
                  <MyCard>
                    <div className={styles.SurveyDetailPage__question}>
                      <Typography
                        className={styles.SurveyDetailPage__question__number}
                        variant="body1"
                        style={{ fontWeight: 'bold' }}
                        gutterBottom
                      >
                        R1.
                      </Typography>
                      <Box sx={{ width: 1 }}>
                        <Typography
                          variant="body1"
                          style={{ fontWeight: 'bold' }}
                          gutterBottom
                        >
                          Pregunta de prueba
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          subtitle1. Lorem ipsum dolor sit amet.
                        </Typography>
                        {/* answers */}
                        <div className={styles.SurveyDetailPage__answers}>
                          <Grid container spacing={2}>
                            <Grid item sm={6}>
                              <Typography variant="body2" gutterBottom>
                                <span className={styles.SurveyDetailPage__answers__answer}>A</span>
                                Primera respuesta.
                              </Typography>
                            </Grid>
                            <Grid item sm={6}>
                              <Typography variant="body2" gutterBottom>
                                <span className={styles.SurveyDetailPage__answers__answer}>B</span>
                                Segunda respuesta
                              </Typography>
                            </Grid>
                          </Grid>
                        </div>
                      </Box>
                    </div>
                  </MyCard>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </Box>
    </ThemeProvider>
  );
};

SurveyDetailPage.propTypes = {};

SurveyDetailPage.defaultProps = {};

export default SurveyDetailPage;
