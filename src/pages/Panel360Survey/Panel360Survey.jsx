import React, { useEffect, useState } from 'react';
import { useNavigate,useParams } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ScheduleIcon from '@mui/icons-material/Schedule';
import {
  alpha,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  MenuItem,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material';

import client from '../../utils/axiosInstance';

// Estilos personalizados
const SurveyContainer = styled(Box)(({ theme, bgcolor }) => ({
  minHeight: '100vh',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(3),
  backgroundColor: bgcolor || '#f5f5f4',
  position: 'relative',
}));

const BackgroundHeader = styled(Box)(({ theme, bgcolor }) => ({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: 160,
  backgroundColor: bgcolor || theme.palette.primary.main,
  zIndex: 0,
}));

const StyledCard = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 900,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  zIndex: 1,
  overflow: 'visible',
}));

const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: theme.shape.borderRadius,
  border: `1px solid ${theme.palette.divider}`,
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.04),
  },
  transition: 'background-color 0.2s ease',
}));

const StyledTableHeadCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 600,
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
}));

const StatusCell = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(0.75),
}));

export const Panel360Survey = () => {
  const { surveyId, companyId, token } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [evaluados, setEvaluados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSurvey, setCurrentSurvey] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    getListEvaluates();
  }, []);

  const getListEvaluates = async () => {
    try {
      const { data } = await client.get(`ShowListEvaluation/${token}`);
      setEvaluados(data);
      console.log(data);
    } catch (error) {
      console.error('Error al obtener evaluados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangePage = (event, newPage) => setPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredEvaluados = evaluados.filter((e) => {
    const matchName = e.evaluadoNombre
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && e.isCompleted) ||
      (statusFilter === 'pending' && !e.isCompleted);

    return matchName && matchStatus;
  });

  const LoadingSkeleton = () => (
    <Box sx={{ mt: 2 }}>
      {[1, 2, 3, 4].map((item) => (
        <Skeleton
          key={item}
          variant="rectangular"
          height={53}
          sx={{ mb: 1, borderRadius: 1 }}
        />
      ))}
    </Box>
  );

  return (
    <SurveyContainer bgcolor={currentSurvey?.response.settings?.secondaryColor}>
      <BackgroundHeader
        bgcolor={currentSurvey?.response.settings?.primaryColor}
      />

      <StyledCard>
        <CardContent sx={{ p: 3 }}>
          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Panel de control - Encuesta 360°
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {/* Filtros */}
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  label="Buscar por nombre"
                  variant="outlined"
                  size="small"
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setPage(0);
                  }}
                />
                <TextField
                  select
                  label="Estado"
                  value={statusFilter}
                  size="small"
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setPage(0);
                  }}
                >
                  <MenuItem value="all">Todos</MenuItem>
                  <MenuItem value="completed">Completado</MenuItem>
                  <MenuItem value="pending">Pendiente</MenuItem>
                </TextField>
              </Box>

              {filteredEvaluados.length === 0 ? (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ py: 4, textAlign: 'center' }}
                >
                  No se encontraron resultados con los filtros actuales.
                </Typography>
              ) : (
                <>
                  <StyledTableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <StyledTableHeadCell width="5%">
                            #
                          </StyledTableHeadCell>
                          <StyledTableHeadCell width="30%">
                            Nombre
                          </StyledTableHeadCell>
                          <StyledTableHeadCell width="30%">
                            Email / ID
                          </StyledTableHeadCell>
                          <StyledTableHeadCell width="15%">
                            Relación
                          </StyledTableHeadCell>
                          <StyledTableHeadCell width="20%" align="center">
                            Estado
                          </StyledTableHeadCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {filteredEvaluados
                          .slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage
                          )
                          .map((item, index) => (
                            <StyledTableRow key={item.id}>
                              <TableCell>
                                {page * rowsPerPage + index + 1}
                              </TableCell>
                              <TableCell sx={{ fontWeight: 500 }}>
                                {item.evaluadoNombre}
                              </TableCell>
                              <TableCell sx={{ color: 'text.secondary' }}>
                                {item.evaluadoEmail}
                              </TableCell>
                              <TableCell>
                                <Chip
                                  label={item.evaluadoCargo}
                                  variant="outlined"
                                  size="small"
                                  sx={{ fontWeight: 400 }}
                                />
                              </TableCell>
                              <TableCell align="center">
                                <StatusCell>
                                  {item.isCompleted ? (
                                    <>
                                      <CheckCircleIcon
                                        fontSize="small"
                                        sx={{ color: 'success.main' }}
                                      />
                                      <Typography
                                        variant="body2"
                                        sx={{
                                          fontWeight: 600,
                                          color: 'success.main',
                                        }}
                                      >
                                        Completado
                                      </Typography>
                                    </>
                                  ) : (
                                    <Box
                                      sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                      }}
                                    >
                                      <Box
                                        sx={{
                                          display: 'flex',
                                          alignItems: 'center',
                                          gap: 1,
                                        }}
                                      >
                                        <ScheduleIcon
                                          fontSize="small"
                                          sx={{ color: 'warning.main' }}
                                        />
                                        <Typography
                                          variant="body2"
                                          sx={{
                                            fontWeight: 600,
                                            color: 'warning.main',
                                          }}
                                        >
                                          Pendiente
                                        </Typography>
                                      </Box>
                                      <Button
                                        size="small"
                                        variant="outlined"
                                        sx={{ mt: 0.5 }}
                                        onClick={() =>
                                          navigate(
                                            `/answer-survey/${surveyId}/${companyId}/${item.id}`
                                          )
                                        } // 🔁 Personaliza esta URL
                                      >
                                        Ir a encuesta
                                      </Button>
                                    </Box>
                                  )}
                                </StatusCell>
                              </TableCell>
                            </StyledTableRow>
                          ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      component="div"
                      count={filteredEvaluados.length}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPage={rowsPerPage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      rowsPerPageOptions={[5, 10, 25]}
                    />
                  </StyledTableContainer>
                </>
              )}
            </>
          )}
        </CardContent>
      </StyledCard>
    </SurveyContainer>
  );
};
