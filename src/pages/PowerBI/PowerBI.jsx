import './PowerBI.module.css';
import { PowerBIEmbed } from 'powerbi-client-react';
import {models} from 'powerbi-client';

const powerBI = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src="" className="App-logo" alt="logo" />
        <PowerBIEmbed
          embedConfig = {{
            type: 'report',   // Supported types: report, dashboard, tile, visual and qna
            id: 'fe404000-c09b-4576-9d98-37c5cbc3db49',
            embedUrl: 'https://app.powerbi.com/reportEmbed?reportId=fe404000-c09b-4576-9d98-37c5cbc3db49&groupId=9e74cc56-feaf-4719-887b-40b66e4828fb&w=2&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly9XQUJJLVBBQVMtMS1TQ1VTLXJlZGlyZWN0LmFuYWx5c2lzLndpbmRvd3MubmV0IiwiZW1iZWRGZWF0dXJlcyI6eyJtb2Rlcm5FbWJlZCI6dHJ1ZSwidXNhZ2VNZXRyaWNzVk5leHQiOnRydWUsInNraXBRdWVyeURhdGFTYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFQYWFTRW1iZWQiOnRydWUsInNraXBRdWVyeURhdGFFeHBvcnRUbyI6dHJ1ZX19',
            accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsIng1dCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSIsImtpZCI6IjJaUXBKM1VwYmpBWVhZR2FYRUpsOGxWMFRPSSJ9.eyJhdWQiOiJodHRwczovL2FuYWx5c2lzLndpbmRvd3MubmV0L3Bvd2VyYmkvYXBpIiwiaXNzIjoiaHR0cHM6Ly9zdHMud2luZG93cy5uZXQvY2Y0NDc5MWItNTU0YS00MmI0LWFjOTMtNTdjZTQ1ZWFhZDAxLyIsImlhdCI6MTY2NTUyMjkwMywibmJmIjoxNjY1NTIyOTAzLCJleHAiOjE2NjU1MjY5MzgsImFjY3QiOjAsImFjciI6IjEiLCJhaW8iOiJBVlFBcS84VEFBQUFGVzBCejdFYVhBTXhSYjF0cVVwVCtDckh1UzBvZmloR2pscmVmbEZkN1JKaXgxbzNrM095ZmZFV1hDcGt0Zy9FSC9VM1NYVGx6UzZ0RnJQOWtxSFRZYXFrUlRtT3pRaExic3kydXZQVFFkdz0iLCJhbXIiOlsicHdkIiwibWZhIl0sImFwcGlkIjoiODcxYzAxMGYtNWU2MS00ZmIxLTgzYWMtOTg2MTBhN2U5MTEwIiwiYXBwaWRhY3IiOiIyIiwiZmFtaWx5X25hbWUiOiJCYXJjbyBHb21leiIsImdpdmVuX25hbWUiOiJTYW50aWFnbyIsImlwYWRkciI6IjE4MS41OC41My4yNTMiLCJuYW1lIjoiU2FudGlhZ28gQmFyY28gR29tZXoiLCJvaWQiOiJkY2I4M2Y1Mi02YTJmLTRhYWMtYmRlZC1iODhkMDUwZTUzYjkiLCJwdWlkIjoiMTAwMzIwMDIxQ0I5ODI4OSIsInJoIjoiMC5BWDBBRzNsRXowcFZ0RUtzazFmT1JlcXRBUWtBQUFBQUFBQUF3QUFBQUFBQUFBQ2NBRGsuIiwic2NwIjoidXNlcl9pbXBlcnNvbmF0aW9uIiwic3ViIjoidzJBWUJRcW4xVDc3Wnp4Rmo0NUZLQkEzRWRIVmhLM09zYUFkTzVFSEctRSIsInRpZCI6ImNmNDQ3OTFiLTU1NGEtNDJiNC1hYzkzLTU3Y2U0NWVhYWQwMSIsInVuaXF1ZV9uYW1lIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXBuIjoiU2FudGlhZ29CYXJjb0dvbWV6QERTNFQub25taWNyb3NvZnQuY29tIiwidXRpIjoiSm9UZm8zLUN4VS1yampwdGZoSUVBQSIsInZlciI6IjEuMCIsIndpZHMiOlsiNjJlOTAzOTQtNjlmNS00MjM3LTkxOTAtMDEyMTc3MTQ1ZTEwIiwiYjc5ZmJmNGQtM2VmOS00Njg5LTgxNDMtNzZiMTk0ZTg1NTA5Il19.VYI19IXi4KuqJW94cX_kk0wludh55YIApkumIZWDnO8sxpeuIBy9Vf1JYWue90i5rbyuArtaH0kVxEiKCTCrW1qvQwZsQN-eJziiJgX-_DWwHJqc7xeMLSKSw_yQNdOZ2_i0Vk9z78MRR1tB8UhPCZHQM-F4rdrvAWPgTO5h8tzulVQu5P34pka9GlXZ82hbWakQnK6IdFODz-tbZojwDEmkqlzjy36HPU0regMkqVvU98PMzzB_iDv4bNMn-K2pc-H3ys3yL6RTo42aqlQhUNpJnk2cFfFcZ849iZYS7MuJBI9d9KgvUE8UYWeV49S-r7He44U8iSKkwsYPMmi1pg',
            tokenType: models.TokenType.Aad,
            settings: {
              panes: {
                filters: {
                  expanded: false,
                  visible: false
                }
              },
              background: models.BackgroundType.Transparent,
            }
          }}

          eventHandlers = { 
            new Map([
              ['loaded', function () {console.log('Report loaded');}],
              ['rendered', function () {console.log('Report rendered');}],
              ['error', function (event) {console.log(event.detail);}]
            ])
          }
          cssClassName = { "Embed-container" }
          getEmbeddedComponent = { (embeddedReport) => {
            window.report = embeddedReport;
          }}
        />
      </header>
    </div>
  );
}

export default powerBI;
