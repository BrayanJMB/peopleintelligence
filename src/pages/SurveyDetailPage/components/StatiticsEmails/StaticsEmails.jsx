import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from '@emotion/react';
import {
  CalendarToday,
  Close as CloseIcon,
  Download,
  Search,
} from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { createTheme } from '@mui/material';

import { InvitationSection } from './components/InvitationSection';
import {
  fetchStaticsMailReminderAPI,
  fetchStaticsMailSenderAPI,
  getDownloadMaisAPI,
} from './services/statitcsMail';
export default function StaticsEmails({
  openDialog,
  handleOpenDialog,
  handleCloseDialog,
}) {
  const { id } = useParams();
  const [showUserDetails, setShowUserDetails] = useState(false);
  const [showUserDetailsReminders, setShowUserDetailsReminders] =
    useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const [selectedDate, setSelectedDate] = useState('10/04/2025');
  const [selectedSender, setSelectedSender] = useState(null);
  const [selectedReminderDate, setSelectedReminderDate] = useState('');
  const [selectedReminderIndex, setSelectedReminderIndex] = useState(0);
  const [filterEstado, setFilterEstado] = useState('Todos');
  const [senders, setSenders] = useState({});
  const [reminders, setReminders] = useState({});

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

  const handleDateChange = (event) => {
    const selected = event.target.value;
    setSelectedDate(selected);

    const sender = senders.envios.find((s) => s.fechaEnvio === selected);
    setSelectedSender(sender);
  };

  const handleReminderDateChange = (event) => {
    setSelectedReminderDate(event.target.value);
    setSelectedReminderIndex(0); // reset index al cambiar fecha
  };

  const handleReminderIndexChange = (event) => {
    setSelectedReminderIndex(Number(event.target.value));
  };

  const fecthMailRemainder = async () => {
    const data = await fetchStaticsMailReminderAPI(id);
    setReminders({ recordatorios: data.result });
  };

  const fecthMailSender = async () => {
    const data = await fetchStaticsMailSenderAPI(id);
    setSenders({ envios: data.result });
  };

  const getDownloadMails = async (idSurvey, date, sendType) => {
    const data = await getDownloadMaisAPI(idSurvey, date, sendType);
  };

  useEffect(() => {
    fecthMailSender();
    fecthMailRemainder(); // Solo llamas aquí a la API
  }, [openDialog]);

  useEffect(() => {
    if (
      reminders &&
      reminders.recordatorios &&
      reminders.recordatorios.length > 0
    ) {
      const first = reminders.recordatorios[0];
      setSelectedReminderDate(first.fechaEnvio);
      setSelectedReminderIndex(0);
    }
  }, [reminders]); 
  
  
  useEffect(() => {
    if (senders?.envios?.length > 0) {
      const first = senders.envios[0];
      setSelectedDate(first.fechaEnvio);
      setSelectedSender(first);
    }
  }, [senders]);

  useEffect(() => {
    if (!showUserDetails && !showUserDetailsReminders) {
      setFilterEstado('Todos');
      setSearchTerm('');
    }
  }, [showUserDetails, showUserDetailsReminders]);
  return (
    <ThemeProvider theme={theme}>
      {/* Diálogo de confirmación */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
        <DialogContent>
          <Box sx={{ maxWidth: 1000, mx: 'auto', p: 4 }}>
            <Tabs
              value={tabValue}
              onChange={(e, newVal) => setTabValue(newVal)}
            >
              <Tab label="Invitaciones" />
              <Tab label="Recordatorios" />
            </Tabs>
            {tabValue === 0 && (
              <>
                <InvitationSection
                  idSurvey={id}
                  selectedDate={selectedDate}
                  handleDateChange={handleDateChange}
                  selectedSender={selectedSender}
                  onOpenDialog={setShowUserDetails}
                  data={senders}
                  getDownloadMails={getDownloadMails}
                  sendType={1}
                />
              </>
            )}

            {tabValue === 1 && (
              <>
                <InvitationSection
                  idSurvey={id}
                  selectedDate={selectedReminderDate}
                  onOpenDialog={setShowUserDetailsReminders}
                  data={reminders}
                  isReminder={true}
                  selectedReminderIndex={selectedReminderIndex}
                  handleReminderDateChange={handleReminderDateChange}
                  handleReminderIndexChange={handleReminderIndexChange}
                  selectedReminderDate={selectedReminderDate}
                  getDownloadMails={getDownloadMails}
                  sendType={2}
                />
              </>
            )}
            <Dialog
              open={showUserDetails}
              onClose={() => setShowUserDetails(false)}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>
                Detalle de Usuarios
                <IconButton
                  aria-label="close"
                  onClick={() => setShowUserDetails(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'column' },
                  }}
                >
                  <Box>
                    <Search
                      sx={{
                        position: 'absolute',
                        top: 10,
                        fontSize: 20,
                        color: 'grey.500',
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Buscar por correo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </Box>
                  <TextField
                    select
                    fullWidth
                    label="Filtrar por estado"
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                  >
                    <MenuItem value="Todos">Todos</MenuItem>
                    <MenuItem value="Enviado">Enviado</MenuItem>
                    <MenuItem value="Abierto">Abierto</MenuItem>
                    <MenuItem value="Fallido">Fallido</MenuItem>
                  </TextField>
                </Box>

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Usuario</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Estado</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedSender?.listaCorreos
                        .filter(
                          (user) =>
                            user.correo
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) &&
                            (filterEstado === 'Todos' ||
                              user.estado === filterEstado)
                        )
                        .map((user) => (
                          <TableRow key={user.correo}>
                            <TableCell>{user.correo}</TableCell>
                            <TableCell>
                              <Chip
                                label={user.estado}
                                sx={{
                                  bgcolor:
                                    user.estado === 'Enviado'
                                      ? '#ebf8ff'
                                      : user.estado === 'Abierto'
                                      ? '#e6ffed'
                                      : '#ffe6e6',
                                  color:
                                    user.estado === 'Enviado'
                                      ? 'primary.main'
                                      : user.estado === 'Abierto'
                                      ? 'success.main'
                                      : 'error.main',
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContent>
            </Dialog>

            <Dialog
              open={showUserDetailsReminders}
              onClose={() => setShowUserDetailsReminders(false)}
              maxWidth="md"
              fullWidth
            >
              <DialogTitle>
                Detalle de Usuarios
                <IconButton
                  aria-label="close"
                  onClick={() => setShowUserDetails(false)}
                  sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                  <CloseIcon />
                </IconButton>
              </DialogTitle>
              <DialogContent dividers>
                <Box
                  sx={{
                    mb: 2,
                    display: 'flex',
                    gap: 2,
                    flexDirection: { xs: 'column', sm: 'column' },
                  }}
                >
                  <Box sx={{ position: 'relative', flex: 1 }}>
                    <Search
                      sx={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        fontSize: 20,
                        color: 'grey.500',
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="outlined"
                      placeholder="Buscar por correo..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      sx={{ pl: 4 }}
                      InputProps={{ sx: { pl: 5 } }}
                    />
                  </Box>

                  <TextField
                    select
                    fullWidth
                    label="Filtrar por estado"
                    value={filterEstado}
                    onChange={(e) => setFilterEstado(e.target.value)}
                  >
                    <MenuItem value="Todos">Todos</MenuItem>
                    <MenuItem value="Enviado">Enviado</MenuItem>
                    <MenuItem value="Abierto">Abierto</MenuItem>
                    <MenuItem value="Fallido">Fallido</MenuItem>
                  </TextField>
                </Box>

                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <strong>Usuario</strong>
                        </TableCell>
                        <TableCell>
                          <strong>Estado</strong>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {(tabValue === 0
                        ? selectedSender?.listaCorreos
                        : reminders.recordatorios?.find(
                            (r) => r.fechaEnvio === selectedReminderDate
                          )?.enviosPorFecha[selectedReminderIndex]?.listaCorreos
                      )
                        ?.filter(
                          (user) =>
                            user.correo
                              .toLowerCase()
                              .includes(searchTerm.toLowerCase()) &&
                            (filterEstado === 'Todos' ||
                              user.estado === filterEstado)
                        )
                        .map((user, index) => (
                          <TableRow key={index}>
                            <TableCell>{user.correo}</TableCell>
                            <TableCell>
                              <Chip
                                label={user.estado}
                                sx={{
                                  bgcolor:
                                    user.estado === 'Enviado'
                                      ? '#ebf8ff'
                                      : user.estado === 'Abierto'
                                      ? '#e6ffed'
                                      : '#ffe6e6',
                                  color:
                                    user.estado === 'Enviado'
                                      ? 'primary.main'
                                      : user.estado === 'Abierto'
                                      ? 'success.main'
                                      : 'error.main',
                                }}
                              />
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </DialogContent>
            </Dialog>
          </Box>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  );
}
