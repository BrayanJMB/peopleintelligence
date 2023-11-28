import { useState, useEffect } from 'react';
import { HubConnectionBuilder } from '@microsoft/signalr';

export const useSignalRConnection = () => {
  const [demographics, setDemographics] = useState([]);
  const [description, setDemographicDescription] = useState('');

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl('https://localhost:7005/discusion')
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        console.log("Conexión de SignalR iniciada.");
        connection.on("ReceiveDemograpics", (newDemographics, newDescription) => {
          console.log("entro acá")
          setDemographics(newDemographics);
          setDemographicDescription(newDescription);
        });
      })
      .catch(error => console.error('Error al conectar con SignalR:', error));

    return () => {
      connection.stop();
    };
  }, []);

  return { demographics, description };
};