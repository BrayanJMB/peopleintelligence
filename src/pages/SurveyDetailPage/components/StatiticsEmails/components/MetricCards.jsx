import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography
} from "@mui/material";
import {
  Send as SendIcon,
  MarkEmailRead as OpenedIcon,
  HourglassBottom as QueueIcon,
  ReportProblem as BounceIcon
} from "@mui/icons-material";

export default function MetricCards({ title = "", data = {} }) {
  return (
    <>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { md: "repeat(4, 1fr)" },
          gap: 2,
        }}
      >
        <Card sx={{ bgcolor: "#ebf8ff" }}>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
              <SendIcon color="primary" />
              <Typography fontWeight={600} color="primary.dark" textAlign="center">
                {title} enviadas
              </Typography>
            </Box>
            <Typography align="center" variant="h4" color="primary.main" mt={1}>
              {data.received ?? 0}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "#e6ffed" }}>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
              <OpenedIcon color="success" />
              <Typography fontWeight={600} color="success.dark" textAlign="center">
                {title} abiertas
              </Typography>
            </Box>
            <Typography align="center" variant="h4" color="success.main" mt={1}>
              {data.opened ?? 0}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "#fff8e1" }}>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
              <QueueIcon color="warning" />
              <Typography fontWeight={600} color="warning.dark" textAlign="center">
                {title} en cola
              </Typography>
            </Box>
            <Typography align="center" variant="h4" color="warning.main" mt={1}>
              {data.queue ?? 0}
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ bgcolor: "#ffebee" }}>
          <CardContent>
            <Box display="flex" justifyContent="center" alignItems="center" gap={1}>
              <BounceIcon color="error" />
              <Typography fontWeight={600} color="error.dark" textAlign="center">
                {title} rebotadas
              </Typography>
            </Box>
            <Typography align="center" variant="h4" color="error.main" mt={1}>
              {data.temporaryBounces ?? 0}
            </Typography>
          </CardContent>
        </Card>
      </Box>

      <Box
        sx={{ mt: 4, bgcolor: "white", p: 2, borderRadius: 2, boxShadow: 1 }}
      >
        <Typography color="primary">
          Total de correos enviados (incluyendo reintentos):{" "}
          <strong>{data.totalSend ?? 0}</strong>
        </Typography>
      </Box>
    </>
  );
}
