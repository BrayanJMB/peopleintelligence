import { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Assessment,
  CheckCircle,
  Close,
  ErrorOutline,
  HourglassEmpty,
  Notifications,
  Refresh,
  Send,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Grid,
  Paper,
  Toolbar,
  Typography,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { fetchStaticsMailAPI } from './services/statitcsMail';
// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    success: {
      main: '#4caf50',
      light: '#e8f5e9',
    },
    warning: {
      main: '#ff9800',
      light: '#fff8e1',
    },
    error: {
      main: '#f44336',
      light: '#ffebee',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      },
    },
  },
});

function StaticsEmails({ openDialog, handleOpenDialog, handleCloseDialog }) {
  const { id } = useParams();
  const [dataMails, setDataMails] = useState({});
  const handleEmailsStatics = async (idSurvey) => {
    const { data } = await fetchStaticsMailAPI(idSurvey);
    console.log(data);
    setDataMails(data);
  };

  useEffect(() => {
    handleEmailsStatics(id);
  }, []);
  return (
    <ThemeProvider theme={theme}>
      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogContent>
          <Box>
            <AppBar position="static" color="primary" elevation={0}>
              <Toolbar>
                <Assessment sx={{ mr: 2 }} />
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  Seguimiento de Correos
                </Typography>
              </Toolbar>
            </AppBar>

            <Container maxWidth="md" sx={{ mt: 4 }}>
              <Card elevation={3}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" align="center" gutterBottom>
                    Estado de Correos
                  </Typography>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          bgcolor: theme.palette.success.light,
                          borderLeft: `6px solid ${theme.palette.success.main}`,
                          borderRadius: 2,
                        }}
                      >
                        <Box display="flex" alignItems="center">
                          <CheckCircle
                            color="success"
                            sx={{ mr: 2, fontSize: 28 }}
                          />
                          <Box>
                            <Typography variant="h6" component="div">
                              Correos Recibidos
                            </Typography>
                            <Typography variant="body1">
                              {dataMails && dataMails.received} correos
                              entregados correctamente
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>

                    <Grid item xs={12}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          bgcolor: theme.palette.warning.light,
                          borderLeft: `6px solid ${theme.palette.warning.main}`,
                          borderRadius: 2,
                        }}
                      >
                        <Box display="flex" alignItems="center">
                          <HourglassEmpty
                            color="warning"
                            sx={{ mr: 2, fontSize: 28 }}
                          />
                          <Box>
                            <Typography variant="h6" component="div">
                              Correos en Cola
                            </Typography>
                            <Typography variant="body1">
                              {dataMails && dataMails.queue} correos en proceso
                              de entrega
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>

                    <Grid item xs={12}>
                      <Paper
                        elevation={0}
                        sx={{
                          p: 3,
                          bgcolor: theme.palette.error.light,
                          borderLeft: `6px solid ${theme.palette.error.main}`,
                          borderRadius: 2,
                        }}
                      >
                        <Box display="flex" alignItems="center">
                          <ErrorOutline
                            color="error"
                            sx={{ mr: 2, fontSize: 28 }}
                          />
                          <Box>
                            <Typography variant="h6" component="div">
                              Correos Rebotados
                            </Typography>
                            <Typography variant="body1">
                              {dataMails && dataMails.temporaryBounces} correos
                              no se pudieron entregar
                            </Typography>
                          </Box>
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Container>
          </Box>
        </DialogContent>
        <DialogActions>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mt: 4,
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              color="primary"
              startIcon={<Refresh />}
              onClick={handleOpenDialog}
            >
              Intentar Reenviar Rebotados
            </Button>
            <Button
              variant="outlined"
              startIcon={<Close />}
              onClick={handleCloseDialog}
            >
              Cerrar
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </ThemeProvider>
  );
}

export default StaticsEmails;
