import React, { useState } from "react";
import styles from "./Discussion.module.css";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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
  const [alignment, setAlignment] = useState("edit");

  const handletoggle = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <div className={styles.discussion}>
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.left}>
            <div>
              <h3 style={{ marginLeft: "2rem" }}>Discussion Guide</h3>
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
              <p>Unsaved Changes</p>
            </div>
            <div>
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handletoggle}
                aria-label="Platform"
                size="small"
              >
                <ToggleButton value="edit">Edit</ToggleButton>
                <ToggleButton value="review">Review</ToggleButton>
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
              <div style={{ height: "50%", width: "60%" }}>
                <p>
                  Prepare messages and questions you will ask participants
                  during this Conversation.
                </p>
              </div>
              <div style={{ height: "50%", width: "60%" }}>
                <p>
                  Not sur where to start? Try a free template crafted by your
                  Remesh Research Team
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
