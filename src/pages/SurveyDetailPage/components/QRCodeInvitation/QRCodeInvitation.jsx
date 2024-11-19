import { useState, useRef } from "react";
import { Modal, Box, Typography, IconButton } from "@mui/material";
import QRCode from "qrcode.react";
import styles from "../../SurveyDetailPage.module.css";

export const QRCodeInvitation = ({openModal, setOpenModal, linkSurvey }) => {
  const qrRef = useRef(null);
  const handleClose = (modalName) => {
    setModals((prev) => ({ ...prev, [modalName]: false }));
  };
  const handleClickDownloadQR = () => {
    const qrCodeURL = document
      .getElementById("qrCodeCanvas")
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let aEl = document.createElement("a");
    aEl.href = qrCodeURL;
    aEl.download = "QR_Code.png";
    document.body.appendChild(aEl);
    aEl.click();
    document.body.removeChild(aEl);
  };

  return (
    <Modal
      open={openModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={styles.SurveyDetailPageQR}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Código QR
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          Escanea el código para acceder al enlace.
        </Typography>
        <div ref={qrRef}>
          <QRCode
            id="qrCodeCanvas"
            value={linkSurvey}
            size={256}
            level={"H"}
            bgColor={"#ffffff"}
            fgColor={"#000000"}
          />
        </div>
        <IconButton onClick={handleClickDownloadQR} sx={{ mt: 2 }}>
          <p>Descargar código QR</p>
        </IconButton>
      </Box>
    </Modal>
  );
};
