import React from "react";
import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import styles from "./PowerBI.module.css";
import Navbar from "../../components/Navbar/Navbar";
import Box from "@mui/material/Box";
import Sidebar from "../../components/Sidebar/Sidebar";

export default function PowerBI() {
  return (
    <Box sx={{ display: "flex" }}>
      <Navbar />
      <Sidebar />
      <div style={{ backgroundColor: "white" }}>
        <div className={styles.content}>
          <PowerBIEmbed
            embedConfig={{
              type: "report", // Supported types: report, dashboard, tile, visual and qna
              id: "fe404000-c09b-4576-9d98-37c5cbc3db49",
              embedUrl:
                "https://app.powerbi.com/reportEmbed?reportId=fe404000-c09b-4576-9d98-37c5cbc3db49&groupId=9e74cc56-feaf-4719-887b-40b66e4828fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsInNraXBRdWVyeURhdGFTYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFQYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFFeHBvcnRUbyI6dHJ1ZX19",
              accessToken:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2Y0NDc5MWItNTU0YS00MmI0LWFjOTMtNTdjZTQ1ZWFhZDAxLyIsImlhdCI6MTY2NTcwNTc5MCwibmJmIjoxNjY1NzA1NzkwLCJleHAiOjE2NjU3MDk4MzIsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFOaEVPN2RYcExHdk4zVnNaSXIvbFYvNW41NlQwU3NVM2gyZEk2VkhNd3dJTnduZHFHR1cwU0FJTXczL3NLYzM0VnFJR3hDNFlzeld4UC9YdERhd0xpYnl5TDU4L0ZNOE51Qm9Zc1c3eDNhcz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJCYXJjbyBHb21leiIsImdpdmVuX25hbWUiOiJTYW50aWFnbyIsImlwYWRkciI6IjE4MS41OC41My4yNTMiLCJuYW1lIjoiU2FudGlhZ28gQmFyY28gR29tZXoiLCJvaWQiOiJkY2I4M2Y1Mi02YTJmLTRhYWMtYmRlZC1iODhkMDUwZTUzYjkiLCJwdWlkIjoiMTAwMzIwMDIxQ0I5ODI4OSIsInJoIjoiMC5BWDBBRzNsRXowcFZ0RUtzazFmT1JlcXRBUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ2NBRGsuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoidzJBWUJRcW4xVDc3Wnp4Rmo0NUZLQkEzRWRIVmhLM09zYUFkTzVFSEctRSIsInRpZCI6ImNmNDQ3OTFiLTU1NGEtNDJiNC1hYzkzLTU3Y2U0NWVhYWQwMSIsInVuaXF1ZV9uYW1lIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXBuIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXRpIjoiczN0dW4tYU4wa2VMQ0VIVmdiQUVBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.cdgJlu9qP1NdfSlUocz10J88N7JvyJKxMzEAHYxRrUFxlB9dQ2PtqrvdkCJfkU79Rja589lBiL2ya8PwnBkrpqPDKeIM8KQi_mABTN-9RrZmqiudu9uqigLc1UhOPSeK9o92CLYWT6RRn0ciez1q2sK5PGg1v-evvP9CRBLdUaG8yCyiUsgAo6mFACOuUa1-L_uAGU6sgqBlhI-LtfTwqJQAwE81Vm2Zk7-kMSTy9gssx7F2oAfQPrrpA5bQ0MIdNOpogYfp5EnBJngr8vg1e5dDxsR-l1SSkWQ1EiuGm-fy1Q-vB-UWqa4xLCr2NOoHz2rDRHIabNNhCe_93rG5Ug",
              tokenType: models.TokenType.Add,
              settings: {
                panes: {
                  filters: {
                    expanded: false,
                    visible: false,
                  },
                },
                background: models.BackgroundType.Transparent,
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
