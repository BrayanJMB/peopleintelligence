import React from "react";
import styles from "./Basic.module.css";
import IconButton from "@mui/material/IconButton";
import NotesIcon from "@mui/icons-material/Notes";
import TextField from "@mui/material/TextField";

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
            <div>
              <TextField
                id="outlined-name"
                label="Title"
                value={props.info.title}
                name="title"
                onChange={props.handleChange}
                size="small"
              />
            </div>
            <div>
              <TextField
                id="outlined-name"
                label="Language"
                value={props.info.language}
                name="language"
                style={{ flexBasis: "40%" }}
                onChange={props.handleChange}
                size="small"
              />
            </div>
            <div>
              <TextField
                id="outlined-name"
                label="Moderator Name"
                value={props.info.name}
                name="name"
                onChange={props.handleChange}
                style={{ flexBasis: "40%" }}
                size="small"
              />
            </div>
          </div>
        </div>
        <div className={styles.right}>right</div>
      </div>
    </div>
  );
}
