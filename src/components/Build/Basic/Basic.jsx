import styles from "./Basic.module.css";
import IconButton from "@mui/material/IconButton";
import NotesIcon from "@mui/icons-material/Notes";
import TextField from "@mui/material/TextField";
import InterestsOutlinedIcon from "@mui/icons-material/InterestsOutlined";
import Button from "@mui/material/Button";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import TagFacesIcon from "@mui/icons-material/TagFaces";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";

export default function Basic(props) {
  return (
    <div className={styles.basic}>
      <span
        style={{
          marginLeft: "2rem",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Basic Details
      </span>
      <div className={styles.info}>
        <div className={styles.left}>
          <div className={styles.general}>
            <NotesIcon color="blue" style={{ marginRight: "1rem" }} />
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
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Language</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={props.info.language}
                  label="Language"
                  onChange={props.handleChange}
                  name="language"
                >
                  <MenuItem value={""}>None</MenuItem>
                  <MenuItem value={"english"}>English</MenuItem>
                  <MenuItem value={"spanish"}>Spanish</MenuItem>
                </Select>
              </FormControl>
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
            <InterestsOutlinedIcon
              color="blue"
              style={{ marginRight: "1rem" }}
            />

            <p>Personalize (Optional)</p>
          </div>
          <div className={styles.images}>
            <div className={styles.avatar}>
              <span>Moderator Avatar (optional)</span>
              {props.info.avatar ? (
                <Button
                  variant="text"
                  onClick={() => props.handleReset("avatar")}
                  color="blue"
                >
                  reset
                </Button>
              ) : null}
              <div>
                {props.info.avatar ? (
                  <img
                    src={props.info.avatar}
                    alt="profile"
                    className={styles.avatarleft}
                  />
                ) : (
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
                    color="blue"
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
                )}
              </div>
            </div>
            <div className={styles.cover}>
              <span>Cover Image (optional)</span>
              {props.info.cover ? (
                <Button
                  variant="text"
                  onClick={() => props.handleReset("cover")}
                  color="blue"
                >
                  reset
                </Button>
              ) : null}
              <div>
                {props.info.cover ? (
                  <img
                    src={props.info.cover}
                    alt="profile"
                    className={styles.avatarleft}
                  />
                ) : (
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
                    color="blue"
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
                )}
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
                  name="introduction"
                  value={props.info.introduction}
                  onChange={props.handleChange}
                />
              </div>
              <div>
                {props.info.open ? (
                  <Alert sx={{ mb: 2 }}>Details saved successfully</Alert>
                ) : null}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={props.handleSave}
                  style={{ color: "white" }}
                  color="blue"
                >
                  Save
                </Button>
              </div>
              <div style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                <Button
                  fullWidth
                  variant="text"
                  onClick={() => props.handleMove("schedule")}
                  color="blue"
                >
                  Next: Schedule
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.right}>
          <div className={styles.phone}>
            <p
              style={{
                fontSize: "0.8rem",
                fontWeight: "500",
                color: "rgb(0, 0, 150)",
              }}
            >
              PARTICIPANTS PREVIEW
            </p>
            <div className={styles.preview}>
              <div className={styles.inside}>
                <div
                  style={{
                    backgroundColor: "grey",
                    width: "24%",
                    height: "4px",
                    borderRadius: "1rem",
                    marginTop: "0.5rem",
                  }}
                ></div>
                <div
                  style={{
                    backgroundColor: "grey",
                    width: "90%",
                    height: "2px",
                    borderRadius: "1rem",
                    marginTop: "1rem",
                    marginBottom: "1rem",
                  }}
                ></div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    width: "100%",
                  }}
                >
                  <div style={{ marginBottom: "0.2rem", marginLeft: "0.5rem" }}>
                    <img
                      src="https://media.glassdoor.com/sqll/2135917/remesh-squarelogo-1547826220454.png"
                      alt="profile"
                      className={styles.photo}
                    />
                  </div>
                  <div>
                    <span
                      style={{
                        color: "grey",
                        fontSize: "0.7rem",
                        marginLeft: "0.8rem",
                      }}
                    >
                      remesh Conversation
                    </span>
                  </div>
                  <div className={styles.covers}>
                    <img
                      src={
                        props.info.cover
                          ? props.info.cover
                          : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlNXd9tJhoyJMieolHXk9y6MmWuT7Y2bBv7ftTIS0U7Q&s"
                      }
                      alt="profile"
                      className={styles.coverright}
                    />
                  </div>
                  <h2 style={{ marginLeft: "0.8rem" }}>{props.info.title}</h2>
                  <div className={styles.bottom}>
                    <div className={styles.avatarright}>
                      <div>
                        {props.info.avatar ? (
                          <img
                            src={props.info.avatar}
                            alt="profile"
                            className={styles.little}
                          />
                        ) : (
                          <IconButton>
                            <TagFacesIcon color="warning" />
                          </IconButton>
                        )}
                      </div>
                      <div>
                        {props.info.name ? props.info.name : "Moderator"}
                      </div>
                    </div>
                    <div className={styles.avatarright}>
                      <div>
                        <IconButton>
                          <AccessTimeIcon />
                        </IconButton>
                      </div>
                      <div>Not scheduled yet</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
