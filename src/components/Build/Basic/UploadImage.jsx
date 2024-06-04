import { useRef } from 'react';
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined';
import Button from '@mui/material/Button';

export default function UploadImage({informationConversation, handlePhoto, text, nameInput, handleReset, sizeImage}) {
  const fileInputRef = useRef();

  const hiddenFileInput = {
    display: 'none',
  };

  return (
    <>
      <span>Imagen {text}</span>
      {informationConversation ? (
        <Button
          variant="text"
          onClick={() => handleReset(nameInput)}
          color="blue"
          style={{ textTransform: 'none' }}
        >
          Reset
        </Button>
      ) : null}
      <div>
        {informationConversation ? (
          <img
            src={informationConversation}
            alt="profile"
            className={sizeImage}
          />
        ) : (
          <Button
            variant="outlined"
            component="label"
            fullWidth
            startIcon={
              <FileUploadOutlinedIcon
                sx={{
                  position: 'absolute',
                  left: 15,
                  top: 6,
                }}
              />
            }
            style={{ marginTop: '0.5rem' }}
            color="blue"
          >
            Subir Imagen
            <input
              ref={fileInputRef}
              style={hiddenFileInput}
              type="file"
              onChange={handlePhoto}
              accept="image/*"
              name={nameInput}
              hidden
            />
          </Button>
        )}
      </div>
    </>
  );
}
