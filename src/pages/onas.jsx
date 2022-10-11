import React, { useState, useRef } from "react";
import axios from "axios";
import Button from '@mui/material/Button';  
import { CSVLink } from 'react-csv'


const OnasView = () => {
    const fecha = new Date().toLocaleString()
    const [transactionData, setTransactionData] = useState([])
    const csvLink = useRef()
    const countryConsume = async () => {
        try {
          await axios
            .create({
              baseURL:
              "https://dynamicliveconversationapi.azurewebsites.net/api/OnasSurvey/OnasDownloadBase",
            })
            .get()
            .then((res) => {
                setTransactionData(res.data)
                csvLink.current.link.click()
            });
        } catch (error) {
        }
      };
    return(
        <>
        <h2>Dar de altos audiencia para ONAS y envío de correo de invitación</h2>
        <Button variant="outlined" onClick={countryConsume}>Next</Button>
        <CSVLink
         data={transactionData}
         filename={`Resultado Onas${fecha}.csv`}
         className='hidden'
         ref={csvLink}
         target='_blank'
        />
        </>
    )
}

export default OnasView