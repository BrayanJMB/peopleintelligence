import axios from "axios";
import styles from "./PowerBI.module.css";
import { PowerBIEmbed, report } from "powerbi-client-react";
import { models } from "powerbi-client";
import { useEffect, useState } from "react";
import Navbar from "../../Layout/Navbar/Navbar";
import Box from "@mui/material/Box";
import Sidebar from "../../Layout/Sidebar/Sidebar";

// Lifetime is 3600 sec/ 1 hour

export default function PowerBi() {
  const [response, setResponse] = useState("");
  let token = response?.powerBiEmbedToken?.token;
  let embedUrl = response?.powerBiReport?.embedUrl;
  let id = response?.powerBiReport?.id;
  let accessToken = async () => {
    console.log("run function");
    try {
      const response = await axios
        .create({
          baseURL: `https://peopleintelligenceapi.azurewebsites.net/api/PowerBy`,
        })
        .get("/1");
      setResponse(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (response) {
      let timer1 = setInterval(() => accessToken(), 1000 * 60 * 60);
      return () => {
        clearInterval(timer1);
      };
    } else {
      accessToken();
    }
  }, [response]);

  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
          <PowerBIEmbed
            embedConfig={{
              type: "report", // Supported types: report, dashboard, tile, visual and qna
              id: id,
              embedUrl: embedUrl,
              accessToken: token,
              tokenType: models.TokenType.Embed,
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                },
              },
            }}
            eventHandlers={
              new Map([
                [
                  "loaded",
                  function () {
                    console.log("Report loaded");
                  },
                ],
                [
                  "rendered",
                  function () {
                    console.log("Report rendered");
                  },
                ],
                [
                  "error",
                  function (event) {
                    console.log(event.detail);
                  },
                ],
              ])
            }
            cssClassName={styles.Embed_container}
            getEmbeddedComponent={(embeddedReport) => {
              window.report = embeddedReport;
            }}
          />
        </div>
      </div>
    </Box>
  );
}
