import React, { Fragment } from "react";
import Button from '@mui/material/Button';
import styles from "./fourth.module.css";
import Box from '@mui/material/Box';
import axios from "axios";
import { useState, useEffect } from "react";
import {
    Autocomplete,
    TextField
  } from "@mui/material";


const config = {
    headers: { "Content-type": "application/json" },
  };

const fields = {companyName:"",  address:""}
const RegisterSuccesfully= () =>{
    const [country, setCountry] = useState([]);
    const [inputValueCountry, setInputValueCountry] = useState("");
    
    const [sizeCompany, setSizeCompany] = useState([]);
    const [inputValueSizeCompany, setInputValueSizeCompany] = useState("");

    const [sector, setSector] = useState([]);
    const [inputValueSector, setInputValueSector] = useState("");

    const [documentType, setDocumentType] = useState([]);
    const [inputValueDocumentType, setInputValueDocumentType] = useState("");

    const [exampleInput, setExampleInput] = useState(fields);
    const [helperText, setHelperText] = useState({});
    const [errorMessage, setErrorMessage] = useState({});

    const inputValue = (event) =>{
        const {name, value} = event.target
        setExampleInput({ ...exampleInput, [name]: value})
    }
    const example = ()=>{
      debugger;
      const helperText = {}
      const error = {}
      if (exampleInput.companyName === ""){
        helperText.companyName = "El campo no puede ir vacio"
        error.companyName = true
      }else{
        helperText.companyName = ""
        error.companyName = false
      }
      if(exampleInput.address === ""){
        helperText.address = "El campo no puede ir vacio"
        error.address = true
      }else{
        helperText.address  = ""
        error.address = false
      }
      setErrorMessage(error)
      setHelperText(helperText)
    }
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
                    if (!filter.includes(val.pais)) {
                    filter.push(val.pais);
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
                    if (!filter.includes(val.Sector)) {
                    filter.push(val.Sector);
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
                        if (!filter.includes(val.tipoDocumento)) {
                        filter.push(val.tipoDocumento);
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
          else if(sizeCompany.length ===0){
            sizeCompanyConsume();
          }
          else if(sector.length ===0){
            sectorConsume();
          }
          else if(documentType.length ===0){
            documentTypeConsume();
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
            isOptionEqualToValue={(option, value) => option.value === value.value}
            noOptionsText={"No se ha encontrado ningún pais"}
            renderInput={(params) => (
                <TextField {...params} label="Pais" />
            )}
            />
        <h2>SizeCompany</h2>
        <Autocomplete
            id="combo-box-demo"
            options={sizeCompany}
            clearOnEscape
            value={inputValueSizeCompany}
            onChange={(event, value) => {
                setInputValueSizeCompany(value);
                console.log(value)
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            noOptionsText={"No se ha encontrado ninguna empresa"}
            renderInput={(params) => (
                <TextField {...params} label="Other" />
            )}
            />
        <h2>Sector</h2>
        <Autocomplete
            id="combo-box-demo"
            options={sector}
            clearOnEscape
            value={inputValueSector}
            onChange={(event, value) => {
                setInputValueSector(value);
                console.log(value)
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            noOptionsText={"No se ha encontrado ninguna empresa"}
            renderInput={(params) => (
                <TextField {...params} label="Other" />
            )}
            /> 
        <h2>Document type</h2>
        <Autocomplete
            id="combo-box-demo"
            options={documentType}
            clearOnEscape
            value={inputValueDocumentType}
            onChange={(event, value) => {
                setInputValueDocumentType(value);
                console.log(value)
            }}
            isOptionEqualToValue={(option, value) => option.value === value.value}
            noOptionsText={"No se ha encontrado ninguna empresa"}
            renderInput={(params) => (
                <TextField {...params} label="Other" />
            )}
            />        
            <h3 className={styles.succesfully}>Tu registro ha sido exitoso!</h3>
            <p >Hemos enviado un correo a <span className={styles.succesfully}> xxxxxx@xxxxxx.xxxx</span>con un link para que puedas crear tu contraseña y finalizar el registro en la plataforma.
            Por favor revisa tu bandeja de entrada o la carpeta spam
            </p>
            <Button variant="outlined" >Volver al inicio de sesión</Button>
            <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-error"
          label="Example"
          defaultValue={exampleInput.companyName}
          error={errorMessage.companyName}
          helperText={helperText.companyName}
          onChange={inputValue}
          onBlur={example}
          name="companyName"
        />
      </div>

      <div>
        <TextField
          id="outlined-error"
          label="Example2"
          defaultValue={exampleInput.address}
          error={errorMessage.address}
          helperText={helperText.address}
          onChange={inputValue}
          onBlur={example}
          name="address"
        />
      </div>
      <Button variant="outlined" onClick={example}>Next</Button>
    </Box>
        </>
        
    )
}

export default RegisterSuccesfully  