// FiltroMesAnio.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FiltroMesAnio.css";

const meses = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

export default function FiltroMesAnioGrafico() {
  const hoy = new Date();
  const [year, setYear] = useState(hoy.getFullYear());
  const [month, setMonth] = useState(hoy.getMonth() + 1);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/lineData?year=${year}&month=${month}`)
      .then((res) => setData(res.data))
      .catch((err) => setData([]));
  }, [year, month]);

  return (
    <div>
      <div className="filtro-mes-anio">
        <label htmlFor="mes">Mes:</label>
        <select id="mes" value={month} onChange={e => setMonth(Number(e.target.value))}>
          {meses.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        <label htmlFor="anio">Año:</label>
        <select id="anio" value={year} onChange={e => setYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => hoy.getFullYear() - i).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
      </div>
      {/* Aquí tu gráfico, ejemplo simple */}
      <table>
        <thead>
          <tr>
            <th>Semana</th>
            <th>Temprano</th>
            <th>Tarde</th>
            <th>Ausente</th>
          </tr>
        </thead>
        <tbody>
          {data.map((semana, idx) => (
            <tr key={idx}>
              <td>{semana.label}</td>
              <td>{semana.temprano}</td>
              <td>{semana.tarde}</td>
              <td>{semana.ausente}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}