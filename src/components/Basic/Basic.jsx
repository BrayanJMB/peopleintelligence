import React from "react";
import styles from "./Basic.module.css";
import IconButton from "@mui/material/IconButton";
import NotesIcon from "@mui/icons-material/Notes";
import TextField from "@mui/material/TextField";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import TextareaAutosize from "@mui/material/TextareaAutosize";

export default function Basic(props) {
  return (
    <div className={styles.basic}>
      <h3 style={{ marginLeft: "2rem" }}>Basic Details</h3>
      <div className={styles.info}>
        <div className={styles.left}>
          <div className={styles.general}>
            <IconButton style={{ marginRight: "1rem" }}>
              <NotesIcon color="primary" />
            </IconButton>
            <p>General Information (Required)</p>
          </div>
          <div className={styles.required}>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Title"
                value={props.info.title}
                name="title"
                onChange={props.handleChange}
                size="small"
                style={{ width: "100%" }}
              />
            </div>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Language"
                value={props.info.language}
                name="language"
                onChange={props.handleChange}
                size="small"
                style={{ width: "100%" }}
              />
            </div>
            <div className={styles.input}>
              <TextField
                id="outlined-name"
                label="Moderator Name"
                value={props.info.name}
                name="name"
                onChange={props.handleChange}
                size="small"
                style={{ width: "100%" }}
              />
            </div>
          </div>
          <div className={styles.optional}>
            <IconButton style={{ marginRight: "1rem" }}>
              <InterestsOutlinedIcon color="primary" />
            </IconButton>
            <p>Personalize (Optional)</p>
          </div>
          <div className={styles.images}>
            <div className={styles.avatar}>
              <span>Moderator Avatar (optional)</span>
              <div>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={
                    <FileUploadOutlinedIcon
                      sx={{
                        position: "absolute",
                        left: 15,
                        top: 6,
                      }}
                    />
                  }
                  style={{ marginTop: "0.5rem" }}
                >
                  Upload Image
                  <input
                    type="file"
                    onChange={props.handlePhoto}
                    accept="image/*"
                    name="avatar"
                    hidden
                  />
                </Button>
              </div>
            </div>
            <div className={styles.cover}>
              <span>Cover Image (optional)</span>
              <div>
                <Button
                  variant="outlined"
                  component="label"
                  fullWidth
                  startIcon={
                    <FileUploadOutlinedIcon
                      sx={{
                        position: "absolute",
                        left: 15,
                        top: 6,
                      }}
                    />
                  }
                  style={{ marginTop: "0.5rem" }}
                >
                  Upload Image
                  <input
                    type="file"
                    onChange={props.handlePhoto}
                    accept="image/*"
                    name="cover"
                    hidden
                  />
                </Button>
              </div>
            </div>
            <div className={styles.intro}>
              <span>Introduction</span>
              <div style={{ marginTop: "0.2rem" }}>
                <span
                  style={{
                    color: "grey",
                    fontSize: "0.8rem",
                    fontWeight: "500",
                  }}
                >
                  Participant see this message before the onboarding polls
                </span>
                <TextareaAutosize
                  aria-label="empty textarea"
                  placeholder="Type your welcome message..."
                  style={{
                    width: "100%",
                    height: "100px",
                    marginTop: "0.5rem",
                  }}
                />
              </div>
              <div style={{ marginTop: "1rem" }}>
                <Button fullWidth variant="contained">
                  Save
                </Button>
              </div>
              <div style={{ marginTop: "1rem" }}>
                <Button fullWidth variant="text">
                  Next: Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>right</div>
      </div>
    </div>
  );
}
