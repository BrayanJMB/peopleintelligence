import React, { Fragment } from "react";
import Button from '@mui/material/Button';
import styles from "./fourth.module.css";
import axios from "axios";
import { useState, useEffect } from "react";
import {
    Autocomplete,
    TextField
  } from "@mui/material";


const config = {
    headers: { "Content-type": "application/json" },
  };


const RegisterSuccesfully= () =>{
    const [country, setCountry] = useState([]);
    const [inputValueCountry, setInputValueCountry] = useState("");
    
    const [sizeCompany, setSizeCompany] = useState([]);
    const [inputValuesizeCompany, setInputValuesizeCompany] = useState("");

    const [sector, setSector] = useState([]);
    const [inputValueSector, setInputValueSector] = useState("");

    const [documentType, setDocumentType] = useState([]);
    const [inputValueDocumentType, setInputValueDocumentType] = useState("");

    const countryConsume = async () => {
        try {
          await axios
            .create({
              baseURL:
              "https://dynamicliveconversationapi.azurewebsites.net/api/paises/",
            })
            .get("",config)
            .then((res) => {
                let filter = [];
                res.data.map((val, key) => {
                    if (!filter.includes(val.nameSizeOfCompany)) {
                    filter.push(val.nameSizeOfCompany);
                    }
                });
                setCountry(filter);
            });
        } catch (error) {
          console.log(error);
          console.log("eror")
        }
      };

    const sizeCompanyConsume = async () => {
            try {
              await axios
                .create({
                  baseURL:
                  "https://dynamicliveconversationapi.azurewebsites.net/api/TamanoCompania/",
                })
                .get("",config)
                .then((res) => {
                    let filter = [];
                    res.data.map((val, key) => {
                        if (!filter.includes(val.nameSizeOfCompany)) {
                        filter.push(val.nameSizeOfCompany);
                        }
                    });
                    setSizeCompany(filter);
                });
            } catch (error) {
              console.log(error);
              console.log("eror")
            }
          };
    const sectorConsume = async () => {
        try {
            await axios
            .create({
                baseURL:
                "https://dynamicliveconversationapi.azurewebsites.net/api/Sector/",
            })
            .get("",config)
            .then((res) => {
                let filter = [];
                res.data.map((val, key) => {
                    if (!filter.includes(val.nameSizeOfCompany)) {
                    filter.push(val.nameSizeOfCompany);
                    }
                });
                setSector(filter);
            });
        } catch (error) {
            console.log(error);
            console.log("eror")
        }
        };

        const documentTypeConsume = async () => {
            try {
              await axios
                .create({
                  baseURL:
                  "https://dynamicliveconversationapi.azurewebsites.net/api/tipo-documentos/",
                })
                .get("",config)
                .then((res) => {
                    let filter = [];
                    res.data.map((val, key) => {
                        if (!filter.includes(val.nameSizeOfCompany)) {
                        filter.push(val.nameSizeOfCompany);
                        }
                    });
                    setDocumentType(filter);
                });
            } catch (error) {
              console.log(error);
              console.log("eror")
            }
          };

          useEffect(() => {
            if (country.length === 0) {
                countryConsume();
            }
            });
    return(
        <>
        <h2>Country</h2>
        <Autocomplete
            id="combo-box-demo"
            options={country}
            clearOnEscape
            value={inputValueCountry}
            onChange={(event, value) => {
                setInputValueCountry(value);
                console.log(value)
            }}

            noOptionsText={"No se ha encontrado ningún pais"}
            renderInput={(params) => (
                <TextField {...params} label="Pais" />
            )}
            />        
            <h3 className={styles.succesfully}>Tu registro ha sido exitoso!</h3>
            <p >Hemos enviado un correo a <span className={styles.succesfully}> xxxxxx@xxxxxx.xxxx</span>con un link para que puedas crear tu contraseña y finalizar el registro en la plataforma.
            Por favor revisa tu bandeja de entrada o la carpeta spam
            </p>
            <Button variant="outlined" >Volver al inicio de sesión</Button>
        </>
    )
}

export default RegisterSuccesfully  