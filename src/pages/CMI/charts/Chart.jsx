import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
} from "recharts";

const data = [
  {
    name: "Mi líder me da el empoderamiento suficiente",
    Total: 5.0,
    CMI: 4.47,
  },
  {
    name: "Mi líder me comunica los objetivos",
    Total: 4.25,
    CMI: 4.37,
  },
  {
    name: "Mi líder fomenta espacios de confianza",
    Total: 5.0,
    CMI: 4.39,
  },
  {
    name: "Mi líder es ejemplo e impulsa la vivencia de SOMOS CMI",
    Total: 4.75,
    CMI: 4.55,
  },
];

export const Chart = () => {
  return (

    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{
          top: 20, right: 30, left: 40, bottom: 5, // Ajustar márgenes para más espacio en el eje Y
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis 
          type="number" 
          domain={[0, 5]}  
          tick={false}  
        />
        <YAxis 
          type="category" 
          dataKey="name" 
          width={300} // Aumentar el ancho del área de etiquetas del eje Y
          tick={{ fontSize: 18 }} // Ajustar el tamaño de la fuente para mejor visibilidad
        />
        <Tooltip />
        <Legend />
        <Bar dataKey="Total" fill="#00C49F" barSize={15}> {/* Reducir el tamaño de las barras */}
          <LabelList dataKey="Total" position="right" />
        </Bar>
        <Bar dataKey="CMI" fill="#FFBB28" barSize={15}> {/* Reducir el tamaño de las barras */}
          <LabelList dataKey="CMI" position="right" />
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};
