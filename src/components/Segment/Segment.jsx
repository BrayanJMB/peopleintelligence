import { useState } from "react";
import styles from "./Segment.module.css";
import Button from "@mui/material/Button";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function Segment(props) {
  const [empty, setEmpty] = useState(true);
  const [segment, setSegment] = useState({ name: "", gender: "", range: "" });

  const handleempty = () => {
    setEmpty(false);
  };
  const handlecancel = () => {
    setEmpty(true);
  };

  const handlechange = (event) => {
    setSegment({ ...segment, [event.target.name]: event.target.value });
  };
  return (
    <div className={styles.segment}>
      <span
        style={{
          marginLeft: "2rem",
          fontWeight: "bold",
          fontSize: "1.2rem",
        }}
      >
        Segments
      </span>
      <div className={styles.info}>
        <div className={styles.left}>
          {props.info.segments.length === 0
            ? null
            : props.info.segments.map((val, key) => {
                return (
                  <div key={key}>
                    <p style={{ marginBottom: "1rem" }}>
                      {val.gender} {val.range}
                    </p>
                    <Divider />
                  </div>
                );
              })}
          <Button
            variant="text"
            startIcon={<AddCircleIcon />}
            onClick={handleempty}
            style={{ width: "50%", marginTop: "1rem" }}
          >
            Create Segment
          </Button>
        </div>
        <div className={styles.right}>
          {empty ? (
            <div className={styles.empty}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKSHmKbYqNH4C6moYAK585TIJwLGSPNUl79A&usqp=CAU"
                alt="profile"
                className={styles.photo}
              />
              <p>
                A segment is a group of people you create based on poll
                questions from your Discussion Guide. Segments enable you to
                quickly view data for specefic groups of people or to compare
                multiple groups side by side.
              </p>
              <p>
                One poll question added will use OR logic between responses
                within the poll question
              </p>
              <p>
                Multiple poll questions added will use OR logic between
                responses within the poll question and will use AND logic
                between poll questions
              </p>
            </div>
          ) : (
            <div className={styles.notempty}>
              <div className={styles.top}>
                <TextField
                  id="outlined-name"
                  label="Segment Name"
                  value={segment.name}
                  name="name"
                  onChange={handlechange}
                  size="small"
                  style={{ width: "100%" }}
                />
                <span style={{ marginTop: "1rem" }}>
                  Added: {segment.gender} {","} {segment.range}
                </span>
                <div className={styles.impexp}>
                  <Button variant="text" size="small" onClick={handlecancel}>
                    Cancel
                  </Button>
                  <Button variant="contained" size="small">
                    Done
                  </Button>
                </div>
              </div>
              <Divider />
              <div className={styles.bottom}>
                <div>
                  <p>What's your Gender?</p>
                  <FormControl style={{ margin: "0 0.8rem" }}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Male"
                        onChange={handlechange}
                        name="gender"
                      />
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Female"
                        onChange={handlechange}
                        name="gender"
                      />
                      <FormControlLabel
                        value="nothing"
                        control={<Radio />}
                        label="Prefer not to say"
                        onChange={handlechange}
                        name="gender"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div style={{ marginTop: "1rem" }}>
                  <p>What's your age range?</p>
                  <FormControl style={{ margin: "0 0.8rem" }}>
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="under21"
                        control={<Radio />}
                        label="Under 21"
                        onChange={handlechange}
                        name="range"
                      />
                      <FormControlLabel
                        value="21-30"
                        control={<Radio />}
                        label="21-30"
                        onChange={handlechange}
                        name="range"
                      />
                      <FormControlLabel
                        value="31-40"
                        control={<Radio />}
                        label="31-40"
                        onChange={handlechange}
                        name="range"
                      />
                      <FormControlLabel
                        value="40-50"
                        control={<Radio />}
                        label="40-50"
                        onChange={handlechange}
                        name="range"
                      />
                      <FormControlLabel
                        value="51-61"
                        control={<Radio />}
                        label="51-61"
                        onChange={handlechange}
                        name="range"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
