import { PowerBIEmbed } from "powerbi-client-react";
import { models } from "powerbi-client";
import styles from "./PowerBI.module.css";

export default function PowerBI() {
  return (
    <div className="App">
      <PowerBIEmbed
        embedConfig={{
          type: "report", // Supported types: report, dashboard, tile, visual and qna
          id: "fe404000-c09b-4576-9d98-37c5cbc3db49",
          embedUrl:"https://app.powerbi.com/reportEmbed?reportId=fe404000-c09b-4576-9d98-37c5cbc3db49&groupId=9e74cc56-feaf-4719-887b-40b66e4828fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsInNraXBRdWVyeURhdGFTYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFQYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFFeHBvcnRUbyI6dHJ1ZX19",
          accessToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2Y0NDc5MWItNTU0YS00MmI0LWFjOTMtNTdjZTQ1ZWFhZDAxLyIsImlhdCI6MTY2NTYyNjk5MSwibmJmIjoxNjY1NjI2OTkxLCJleHAiOjE2NjU2MzIwMzUsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFUOTl1VDJ4Y01LOVp3SlhOY1Izc3J1U29BczZFOHIyTjVMYkJjcE4xcGcra09nYnBuV2NOL2JiZjIrVUlnbys5RFYxSnZIYjNSR3VncmtyN0R5VXNBcTlHbkpTcTA3d2VrMG1LZGkxM0gzdz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJCYXJjbyBHb21leiIsImdpdmVuX25hbWUiOiJTYW50aWFnbyIsImlwYWRkciI6IjE4MS41OC41My4yNTMiLCJuYW1lIjoiU2FudGlhZ28gQmFyY28gR29tZXoiLCJvaWQiOiJkY2I4M2Y1Mi02YTJmLTRhYWMtYmRlZC1iODhkMDUwZTUzYjkiLCJwdWlkIjoiMTAwMzIwMDIxQ0I5ODI4OSIsInJoIjoiMC5BWDBBRzNsRXowcFZ0RUtzazFmT1JlcXRBUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ2NBRGsuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoidzJBWUJRcW4xVDc3Wnp4Rmo0NUZLQkEzRWRIVmhLM09zYUFkTzVFSEctRSIsInRpZCI6ImNmNDQ3OTFiLTU1NGEtNDJiNC1hYzkzLTU3Y2U0NWVhYWQwMSIsInVuaXF1ZV9uYW1lIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXBuIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXRpIjoiVVA0WUZDX3Yza2FEX2I0ajRydG9BQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.F2QQUHR7U3lcO4LAcG9Rn241CJaZFjOT50vzgot1N6nveNK44CYAiK8MovZ_LOH0gKIM-MREZRv-3By0B71LKtUvizwX6YIU5enBPsxTxfkq8jNHO_-1v5aBDau9ulGXanSHgDn1vms9wsIC3SwM1o8WjrZNGKZhwIo00VMiXL63Y5Ev2JeurQhGOxw4Xz0XKMAF0UEA0jQvD0qXnUSwhi9dKggmhIImYKxhGNHOV-yvNTkVydzhD5pH82D1tPx13p9uEodOU4Ah70jIe0cZwaxV27sO3LIQdXo32wnr6sN3jhe9R03M0DE8wNGDVwwtCn65Ajtz-GiCiR6HIJnDtA",
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
  );
};

