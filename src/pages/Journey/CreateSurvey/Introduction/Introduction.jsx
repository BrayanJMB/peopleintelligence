import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Autocomplete from "@mui/material/Autocomplete";
import styles from "./Introduction.module.css";
import { useEffect, useState } from "react";
import axios from "../../../../utils/axiosInstance";

export default function Introduction(props) {
  const [data, setData] = useState({
    content: { maps: [] },
    ids: { maps: [] },
  });
  const mapsConsume = async () => {
    try {
      await axios.get("GetJorneyMap/").then((res) => {
        let fetch = [];
        let id = [];
        res.data.forEach((val) => {
          if (!fetch.includes(val.mapJourney)) {
            fetch.push(val.mapJourney);
            id.push(val);
          }
        });
        let holder = data;
        holder.content.maps = fetch;
        holder.ids.maps = id;
        setData(holder);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    mapsConsume();
  }, []);
  return (
    <div className={styles.form}>
      <Autocomplete
        id="combo-box-demo"
        options={data.content.maps}
        clearOnEscape
        value={props.data.mapa}
        onChange={(e, value) => props.handleSelect(value)}
        getOptionLabel={(option) => option}
        noOptionsText={"No Options"}
        renderInput={(params) => <TextField {...params} label="Mapa Name" />}
      />
      <p style={{ marginTop: "0.4em" }}>Introduction a la encuesta</p>
      <div className={styles.input}>
        <TextField
          id="outlined-name"
          label="Nombre de la encuesta"
          placeholder="Nombre de la encuesta aqui..."
          value={props.data.title}
          name="title"
          onChange={props.handleChange}
          error={props.errorMessage.title}
          helperText={props.helperText.title}
          fullWidth
          size="small"
        />
      </div>
      <div className={styles.input}>
        <TextField
          id="outlined-name"
          label="Propósito de esta encuesta"
          placeholder="Proposito de la encuesta aqui..."
          InputProps={{
            inputComponent: TextareaAutosize,
            inputProps: {
              style: {
                height: "90px",
              },
            },
          }}
          value={props.data.description}
          error={props.errorMessage.description}
          helperText={props.helperText.description}
          style={{
            width: "100%",
            marginTop: "0.5rem",
          }}
          name="description"
          onChange={props.handleChange}
        />
      </div>
    </div>
  );
}
