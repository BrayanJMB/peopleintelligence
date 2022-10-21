import React, { useState, useCallback } from "react";
import styles from "./Build.module.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Box from "@mui/material/Box";
import Basic from "../../components/Basic/Basic";
import Button from "@mui/material/Button";

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
  const [info, setInfo] = useState({
    title: "",
    language: "",
    name: "",
    avatar: "",
    cover: "",
  });

  const handleMove = (val) => {
    setStage(val);
  };

  const renderSwitch = (type) => {
    switch (type) {
      case "basic":
        return <Basic info={info} handleChange={handlechange} />;
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

  const handlechange = useCallback(
    (event) => {
      setInfo({ ...info, [event.target.name]: event.target.value });
    },
    [info]
  );

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
        <div
          style={{
            width: "100%",
            display: "flex",
            marginTop: "1rem",
          }}
        >
          <div
            style={{
              color: "black",
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-start",
              marginLeft: "1rem",
            }}
          >
            <p>title after cick save button</p>
          </div>
          <div
            style={{
              flexGrow: 1,
              display: "flex",
              justifyContent: "flex-end",
              marginRight: "2rem",
            }}
          >
            <Button variant="text" style={{ marginRight: "1.5rem" }} disabled>
              Share
            </Button>
            <Button variant="contained" disabled>
              Publish
            </Button>
          </div>
        </div>
        {renderSwitch(stage)}
      </div>
    </div>
  );
}
