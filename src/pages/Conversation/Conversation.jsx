import React from "react";
import styles from "./Conversation.module.css";
import Box from "@mui/material/Box";
import ConSidebar from "../../Layout/ConSidebar/ConSidebar";
import Build from "../../components/Build/Build";
import Live from "../../components/Live/Live";
import { useParams } from "react-router-dom";

export default function Conversation() {
  const { type } = useParams();

  const renderSwitch = () => {
    switch (type) {
      case "Build":
        return <Build />;
      case "Live":
        return <Live />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      <ConSidebar type={type} />
      {renderSwitch(type)}
    </Box>
  );
}
