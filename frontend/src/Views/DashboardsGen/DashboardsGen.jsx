import { Chart as ChartJS, defaults } from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import './DashboardsGen.css'
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"   
import DoughnutChart from "../../Componentes/DoughnutChart/index";
import LineChart from "../../Componentes/LineChart/index";
import BarChartGeneral from "../../Componentes/BarChartGeneral/BarChartGeneral"


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

const DashboardsGen = () => {
  const hoy = new Date();
  const [year, setYear] = useState(hoy.getFullYear());
  const [month, setMonth] = useState(hoy.getMonth() + 1);
  const [week, setWeek] = useState(1);

  const [lineData, setLineData] = useState([])
  const [doughnutData, setDoughnutData] = useState([])
  const [barData, setBarData] = useState([])

  const [dashboardStats, setDashboardStats] = useState({
    totalEmpleados: 0,
    llegadasATiempo: 0,
    llegadasTarde: 0
  });

  useEffect(() => {
    fetch("http://localhost:3001/api/doughnutData")
      .then((res) => res.json())
      .then((data) => setDoughnutData(data))
      .catch((err) => console.error("Error al cargar la API:", err));

    fetch(`http://localhost:3001/api/lineData?year=${year}&month=${month}`)
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => console.error("Error al cargar la API:", err));

    fetch("http://localhost:3001/api/eventsEntradasSalidasAllWorkers")
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => console.error("Error al cargar la API:", err));

    fetch("http://localhost:3001/api/dashboardStats")
      .then((res) => res.json())
      .then((data) => {
        setDashboardStats({
          totalEmpleados: data.totalEmpleados,
          llegadasATiempo: data.llegadasATiempo,
          llegadasTarde: data.llegadasTarde
        });
      })
      .catch((err) => console.error("Error al cargar dashboardStats:", err));
  }, [year, month]);

  return (
    <>
    
      <div className="vista-individual">
        <Link to={"/DashboardsInd"}>Vista Individual</Link>
      </div>

      <div className="stats-panel">
        <div className="stat-item">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="32px" height="32px">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </div>
          <div className="number">{dashboardStats.totalEmpleados}</div>
          <div className="label">Empleados registrados</div>
        </div>
        <div className="stat-item">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="32px" height="32px">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="number">{dashboardStats.llegadasATiempo}</div>
          <div className="label">Llegadas a tiempo</div>
        </div>
        <div className="stat-item">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="32px" height="32px">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z"/>
            </svg>
          </div>
          <div className="number">{dashboardStats.llegadasTarde}</div>
          <div className="label">Llegadas tarde</div>
        </div>
      </div>


      {/* Filtro de mes, año y semana para el gráfico de entradas/salidas por hora */}
      <div className="filtro-mes-anio-semana">
        <label htmlFor="mes2">Mes:</label>
        <select id="mes2" value={month} onChange={e => setMonth(Number(e.target.value))}>
          {meses.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>
        <label htmlFor="anio2">Año:</label>
        <select id="anio2" value={year} onChange={e => setYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => hoy.getFullYear() - i).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>
        <label htmlFor="semana">Semana:</label>
        <select id="semana" value={week} onChange={e => setWeek(Number(e.target.value))}>
          <option value={1}>Semanas</option>
          <option value={2}>Semana 1</option>
          <option value={3}>Semana 2</option>
          <option value={4}>Semana 3</option>
          <option value={4}>Semana 4</option>
        </select>
      </div>

      <div className="graficos-flex">
        <div className="grafico-container">
          <LineChart lineData={lineData}/>
        </div>
        <div className="grafico-container">
          <DoughnutChart doughnutData={doughnutData}/>
        </div>
        <div className="grafico-container">
          <BarChartGeneral barData={barData}/>
        </div>
      </div>
    </>
  )
}

export default DashboardsGen