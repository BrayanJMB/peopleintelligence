import { Layout } from "./Layout";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import styles from "./Bancolombia.module.css";

export const ErrorsSurvey = ({ errorDescription }) => {
  return (
    <Layout>
      <div
        className={styles.Bancolombia__BoxWelcome}
        style={{
          height: "400px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "30px",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems:'center'}}>
          <h2 style={{ textAlign: "center" }}>{errorDescription}</h2>
          <ReportProblemIcon style={{ fontSize: "100px", color: "#F5D46C" }}/>
        </div>
      </div>
    </Layout>
  );
};
