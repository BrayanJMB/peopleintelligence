import React, { useState } from "react";
import styles from "./Build.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import ConNavbar from "../../components/ConNavbar/ConNavbar";
const list = [
  "Basic Details",
  "Schedule",
  "Audience",
  "Discussion Guide",
  "Segments",
  " Quota Targeting",
];

const root = [
  "basic",
  "schedule",
  "audience",
  "discussion",
  "segments",
  "quota",
];

export default function Build() {
  const [stage, setStage] = useState("basic");

  const handleMove = (val) => {
    setStage(val);
  };

  const renderSwitch = (type) => {
    switch (type) {
      case "basic":
        return null;
      case "schedule":
        return null;
      case "audience":
        return null;
      case "discussion":
        return null;
      case "segments":
        return null;
      case "quota":
        return null;
      default:
        return null;
    }
  };

  return (
    <div className={styles.build}>
      <Box
        sx={{
          height: "100vh",
          width: "200px",
        }}
        style={{
          backgroundColor: "rgb(224, 219, 219)",
          borderRight: "2px solid grey",
          borderLeft: "2px solid grey",
        }}
        aria-label="mailbox folders"
      >
        <List>
          <ListItem
            disablePadding
            style={{
              marginTop: "1rem ",
              marginBottom: "1.5rem ",
              textAlign: "center",
            }}
          >
            <ListItemText>Title</ListItemText>
          </ListItem>

          {list.map((val, index) => {
            return (
              <ListItem onClick={() => handleMove(root[index])} key={index}>
                <ListItemButton
                  style={{
                    color: stage === root[index] ? "blue" : "grey",
                    fontWeight: "bold",
                  }}
                >
                  {val}
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
      <div className={styles.content}>
        <ConNavbar />
        {renderSwitch(stage)}
      </div>
    </div>
  );
}
