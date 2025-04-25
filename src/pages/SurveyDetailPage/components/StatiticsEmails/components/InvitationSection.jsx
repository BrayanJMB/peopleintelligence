import {
  Box,
  FormControl,
  InputLabel,
  Select,
  Typography,
  Button,
  MenuItem,
  Card,
  CardContent,
} from "@mui/material";
import { Download } from "@mui/icons-material";
import MetricCards from "./MetricCards";

export function InvitationSection({
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
}) {
  const reminderData = data.recordatorios?.find(
    (r) => r.fechaEnvio === selectedReminderDate
  )?.enviosPorFecha[selectedReminderIndex];  
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
      {isReminder && (
        <FormControl sx={{ width: 200 }}>
          <InputLabel id="reminder-index-label">N° Envío</InputLabel>
          <Select
            labelId="reminder-index-label"
            value={selectedReminderIndex}
            label="N° Envío"
            onChange={handleReminderIndexChange}
          >
            {data.recordatorios
              ?.find((r) => r.fechaEnvio === selectedReminderDate)
              ?.enviosPorFecha.map((_, idx) => (
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
          display: "flex",
          justifyContent: "space-between",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <Button variant="contained" startIcon={<Download />}>
          Exportar Reporte
        </Button>
        <Button variant="text" onClick={() => onOpenDialog(true)}>
          Ver detalle de usuarios
        </Button>
      </Box>
    </Box>
  );
}
