import styles from "./Questions.module.css";
import Box from "@mui/material/Box";

const data = [
  {
    type: "simple",
    title: "Question 1",
    description: "description of question",
    answer: "",
  },
  {
    type: "escala",
    title: "Question 1",
    description: "description of question",
    options: ["1", "2", "3", "4", "5"],
    answer: "",
  },
  {
    type: "multiple",
    title: "Question 1",
    description: "description of question",
    options: ["a", "b", "c", "d", "e"],
    answer: [],
  },
  {
    type: "stars",
    title: "Question 1",
    description: "description of question",
    answer: "",
  },
  {
    type: "stars",
    title: "Question 1",
    description: "description of question",
    answer: "",
  },
];

export default function Questions() {
  return (
    <Box sx={{ display: "flex" }}>
      <div style={{ backgroundColor: "white", flex: 1, height: "100vh" }}>
        <header className={styles.header}>
          <h1>la primera encuesta</h1>
          <h4>esta es la primera encuesta</h4>
        </header>
        <div className={styles.wrapper}>
          {data.map((val, index) => {
            return (
              <div className={styles.question}>
                <div className={styles.info}>
                  <p>{val.title}</p>
                  <p>{val.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.stepper}></div>
      </div>
    </Box>
  );
}
