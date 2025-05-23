import { Download } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';

import MetricCards from './MetricCards';

export function InvitationSection({
  idSurvey,
  selectedDate,
  handleDateChange,
  selectedSender,
  onOpenDialog,
  data,
  isReminder,
  selectedReminderIndex,
  handleReminderDateChange,
  handleReminderIndexChange,
  selectedReminderDate,
  getDownloadMails,
  sendType,
}) {
  if (!data) {
    return (
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" color="textSecondary">
          No hay datos disponibles.
        </Typography>
      </Box>
    );
  }

  const reminderData = data.recordatorios?.find(
    (r) => r.fechaEnvio === selectedReminderDate
  )?.enviosPorFecha?.[selectedReminderIndex]; // agrego ?. también aquí

  return (
    <Box sx={{ mt: 4 }}>
      <FormControl sx={{ width: 200, mb: 4 }}>
        <InputLabel id="date-select-label">Fecha de envío</InputLabel>
        <Select
          labelId="date-select-label"
          value={selectedDate}
          label="Fecha de envío"
          onChange={isReminder ? handleReminderDateChange : handleDateChange}
        >
          {(isReminder ? data.recordatorios : data.envios)?.map((item) => (
            <MenuItem key={item.fechaEnvio} value={item.fechaEnvio}>
              {item.fechaEnvio}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {isReminder && data.recordatorios && (
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="reminder-index-label">N° Envío</InputLabel>
          <Select
            labelId="reminder-index-label"
            value={selectedReminderIndex}
            label="N° Envío"
            onChange={handleReminderIndexChange}
          >
            {data.recordatorios
              .find((r) => r.fechaEnvio === selectedReminderDate)
              ?.enviosPorFecha?.map((_, idx) => (
                <MenuItem key={idx} value={idx}>
                  Envío {idx + 1}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      )}

      <MetricCards
        title="Invitaciones"
        data={isReminder ? reminderData : selectedSender}
      />

      <Box
        sx={{
          mt: 4,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: 2,
        }}
      >
        <Button
          variant="contained"
          startIcon={<Download />}
          onClick={() =>
            getDownloadMails(
              idSurvey,
              isReminder ? selectedReminderDate : selectedDate,
              sendType
            )
          }
        >
          Exportar Reporte
        </Button>
        <Button variant="text" onClick={() => onOpenDialog(true)}>
          Ver detalle de usuarios
        </Button>
      </Box>
    </Box>
  );
}
