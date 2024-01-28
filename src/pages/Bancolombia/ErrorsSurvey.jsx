import { Layout } from "./Layout";
import styles from "./Bancolombia.module.css";

export const ErrorsSurvey = ({ errorDescription }) => {
  return (
    <Layout>
      <div className={styles.Bancolombia__BoxWelcome}>
        <h2 style={{ textAlign: "center" }}>{errorDescription}</h2>
      </div>
    </Layout>
  );
};
