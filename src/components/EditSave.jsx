import { Box, CircularProgress, Fab } from "@mui/material";
import { useState } from "react";
import { Check, Save } from "@mui/icons-material";

export default function EditSave({ params, rowId, setRowId }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSave = () => {};

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      {success ? (
        <Fab
          color="primary"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "green",
          }}
        >
          <Check />
        </Fab>
      ) : (
        <Fab
          color="success"
          sx={{
            width: 40,
            height: 40,
            bgcolor: "blue",
          }}
          disabled={params.id !== rowId || loading}
          onClick={handleSave}
        >
          <Save />
        </Fab>
      )}
      {loading && (
        <CircularProgress
          size={52}
          sx={{
            color: "green",
            position: "absolute",
            top: -6,
            left: -6,
            zIndex: 1,
          }}
        />
      )}
    </Box>
  );
}
