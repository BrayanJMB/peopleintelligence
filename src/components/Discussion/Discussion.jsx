import { useState } from "react";
import styles from "./Discussion.module.css";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";
import IconButton from "@mui/material/IconButton";
import ClassIcon from "@mui/icons-material/Class";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";

function stringToColor(string) {
  let hash = 0;
  let i;

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = "#";

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */

  return color;
}

function stringAvatar(name) {
  return {
    style: { backgroundColor: stringToColor(name) },
    children: `${name.split(" ")[0][0]}${name.split(" ")[1][0]}`,
  };
}

export default function Discussion() {
  const [open, setOpen] = useState(false);
  const [opentemplate, setOpentemplate] = useState(false);
  const handleOpenModal = () => setOpen(true);
  const handleCloseModal = () => setOpen(false);
  const handleOpenModaltemplate = () => setOpentemplate(true);
  const handleCloseModaltemplate = () => setOpentemplate(false);
  const handleTemplateModal = () => {
    console.log("test");
    handleCloseModal();
    handleOpenModaltemplate();
  };

  const [toogle, setToggle] = useState("edit");

  const handletoggle = (event, newAlignment) => {
    setToggle(newAlignment);
  };

  return (
    <div className={styles.discussion}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.left}>
            <div>
              <span
                style={{
                  marginLeft: "2rem",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                }}
              >
                Discussion Guide
              </span>
            </div>
            <div>
              <AvatarGroup max={6} className={styles.group}>
                <Avatar {...stringAvatar("Kent Kevin")} />
                <Avatar {...stringAvatar("Davis Samuel")} />
                <Avatar {...stringAvatar("Samuel Kent")} />
                <Avatar {...stringAvatar("Ben Dodds")} />
                <Avatar {...stringAvatar("Richard Dadid")} />
                <Avatar {...stringAvatar("Kevin Davis")} />
                <Avatar {...stringAvatar("Dadid Ben")} />
              </AvatarGroup>
            </div>
          </div>
          <div className={styles.right}>
            <div style={{ marginRight: "1rem" }}>
              <p style={{ color: "grey" }}>Unsaved Changes</p>
            </div>
            <div>
              <ToggleButtonGroup
                color="blue"
                value={toogle}
                exclusive
                onChange={handletoggle}
                aria-label="Platform"
                size="small"
                style={{ width: "100%", padding: "0 0.5rem" }}
              >
                <ToggleButton value="edit" style={{ width: "100%" }}>
                  Edit
                </ToggleButton>
                <ToggleButton value="review" style={{ width: "50%" }}>
                  Review
                </ToggleButton>
              </ToggleButtonGroup>
            </div>
          </div>
        </div>
        <div className={styles.grey}>
          <div className={styles.layout}>
            <div className={styles.leftbox}>
              <img
                src="https://www.jrmyprtr.com/wp-content/uploads/2014/06/messaging.png"
                alt="profile"
                className={styles.photo}
              />
            </div>
            <div className={styles.rightbox}>
              <p style={{ width: "60%" }}>
                Prepare messages and questions you will ask participants during
                this Conversation.
              </p>
              <p style={{ width: "60%" }}>
                Not sur where to start? Try a free template crafted by your
                Remesh Research Team
              </p>
            </div>
          </div>
        </div>
        <div className={styles.impexp}>
          <Button variant="text" size="small" onClick={handleOpenModal}>
            Import
          </Button>
          <Button variant="text" size="small">
            Export
          </Button>
          <Modal
            open={open}
            onClose={handleCloseModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.modal}>
              <div className={styles.modaltop}>
                <p style={{ fontWeight: "bold", marginTop: "0.8rem" }}>
                  Select how you would to import:
                </p>
                <div>
                  <IconButton onClick={handleCloseModal}>
                    <ClearIcon sx={{ fontSize: "40px" }} />
                  </IconButton>
                </div>
              </div>
              <div className={styles.modalbuttom}>
                <div className={styles.blocks} onClick={handleTemplateModal}>
                  <ClassIcon sx={{ fontSize: "40px" }} />
                  <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Template
                  </p>
                  <p
                    style={{
                      color: "grey",
                      fontSize: "0.8rem",
                    }}
                  >
                    Use an available template
                  </p>
                </div>
                <div className={styles.blocks}>
                  <ForumOutlinedIcon sx={{ fontSize: "40px" }} />
                  <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Existing Conversation
                  </p>
                  <p
                    style={{
                      color: "grey",
                      fontSize: "0.8rem",
                    }}
                  >
                    Grab the discussion guide from another conversation
                  </p>
                </div>
                <div className={styles.blocks}>
                  <DescriptionOutlinedIcon sx={{ fontSize: "40px" }} />
                  <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                    Excel file
                  </p>
                  <p
                    style={{
                      color: "grey",
                      fontSize: "0.8rem",
                    }}
                  >
                    Import an axcel file from your computer
                  </p>
                </div>
              </div>
            </Box>
          </Modal>
          <Modal
            open={opentemplate}
            onClose={handleCloseModaltemplate}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.templatemodal}>
              <div className={styles.modaltop}>
                <p style={{ fontWeight: "bold", marginTop: "0.8rem" }}>
                  Choose Template
                </p>
                <div>
                  <IconButton onClick={handleCloseModaltemplate}>
                    <ClearIcon sx={{ fontSize: "40px" }} />
                  </IconButton>
                </div>
              </div>
              <div className={styles.templatemodalbuttom}>
                <div className={styles.templateblocks}>
                  <div className={styles.templatelayout}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSHmKbYqNH4C6moYAK585TIJwLGSPNUl79A&usqp=CAU"
                      alt="profile"
                      className={styles.templatephoto}
                    />
                    <div className={styles.templatecontent}>
                      <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                        Concept Test (Single)
                      </p>
                      <p style={{ color: "grey", fontSize: "0.8rem" }}>
                        Evaluate consumer reactions to a single product concept
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.templateblocks}>
                  <div className={styles.templatelayout}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSHmKbYqNH4C6moYAK585TIJwLGSPNUl79A&usqp=CAU"
                      alt="profile"
                      className={styles.templatephoto}
                    />
                    <div className={styles.templatecontent}>
                      <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                        Concept Test (Single)
                      </p>
                      <p style={{ color: "grey", fontSize: "0.8rem" }}>
                        Evaluate consumer reactions to a single product concept
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.templateblocks}>
                  <div className={styles.templatelayout}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSHmKbYqNH4C6moYAK585TIJwLGSPNUl79A&usqp=CAU"
                      alt="profile"
                      className={styles.templatephoto}
                    />
                    <div className={styles.templatecontent}>
                      <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                        Concept Test (Single)
                      </p>
                      <p style={{ color: "grey", fontSize: "0.8rem" }}>
                        Evaluate consumer reactions to a single product concept
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.templateblocks}>
                  <div className={styles.templatelayout}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSHmKbYqNH4C6moYAK585TIJwLGSPNUl79A&usqp=CAU"
                      alt="profile"
                      className={styles.templatephoto}
                    />
                    <div className={styles.templatecontent}>
                      <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                        Concept Test (Single)
                      </p>
                      <p style={{ color: "grey", fontSize: "0.8rem" }}>
                        Evaluate consumer reactions to a single product concept
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.templateblocks}>
                  <div className={styles.templatelayout}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSHmKbYqNH4C6moYAK585TIJwLGSPNUl79A&usqp=CAU"
                      alt="profile"
                      className={styles.templatephoto}
                    />
                    <div className={styles.templatecontent}>
                      <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                        Concept Test (Single)
                      </p>
                      <p style={{ color: "grey", fontSize: "0.8rem" }}>
                        Evaluate consumer reactions to a single product concept
                      </p>
                    </div>
                  </div>
                </div>
                <div className={styles.templateblocks}>
                  <div className={styles.templatelayout}>
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSHmKbYqNH4C6moYAK585TIJwLGSPNUl79A&usqp=CAU"
                      alt="profile"
                      className={styles.templatephoto}
                    />
                    <div className={styles.templatecontent}>
                      <p style={{ fontWeight: "bold", fontSize: "0.9rem" }}>
                        Concept Test (Single)
                      </p>
                      <p style={{ color: "grey", fontSize: "0.8rem" }}>
                        Evaluate consumer reactions to a single product concept
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </div>
    </div>
  );
}
