import { Link, useParams, useNavigate, Navigate } from "react-router-dom"
import { useState, useEffect, use } from "react"
import DoughnutChart from "../../Componentes/DoughnutChart/index"
import LineChart from "../../Componentes/LineChart/index"
import BarChart from "../../Componentes/BarChart/index"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Empleados from "../../Componentes/Empleados/Empleados"
import "./DashboardsInd.css"

const DashboardsInd = ({ empleados }) => {

  const navigate = useNavigate();

  const [lineData, setLineData] = useState([])
  const [doughnutData, setDoughnutData] = useState([])
  const [barData, setBarData] = useState([])
  
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")

  const [empleadosFiltrados, setEmpleados] = useState([])
  const [filtro, setFiltro] = useState("")

  const { workerId } = useParams()

  const enviarFecha = () => {
    let y = year;
    let m = month;
    let d = day;
  
    if (y && !m && d) {
      d = "";
    }

    if (!y) {
      m = "";
      d = "";
    }
    
    fetch(`http://localhost:3001/api/eventsEntradasSalidasByWorkerAndDate/${workerId}?year=${y}&month=${m}&day=${d}`)
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => console.error("Error al cargar la API:", err));

    fetch(`http://localhost:3001/api/lineData/${workerId}?year=${year}&month=${month}`)
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => console.error("Error al cargar lineData:", err));
  };

  useEffect(() => {
    fetch("http://localhost:3001/api/doughnutData")
      .then((res) => res.json())
      .then((data) => setDoughnutData(data))
      .catch((err) => console.error("Error al cargar la API:", err))
  }, [])

useEffect(() => {
    fetch(`http://localhost:3001/api/getWorkers?filtro=${filtro}`)
      .then((res) => res.json())
      .then((data) => setEmpleados(data))
      .catch((err) => console.error("Error al cargar la API:", err));
}, [filtro])

  useEffect(() => {
    fetch(`http://localhost:3001/api/eventsEntradasSalidasByWorkerAndDate/${workerId}?year=${year}&month=${month}&day=${day}`)
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  }, [workerId])

  useEffect(() => {
    fetch(`http://localhost:3001/api/lineData/${workerId}?year=${year}&month=${month}`)
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  }, [workerId])

  const workerActual = empleados.find((e) => e.id == workerId)

  const workerExists = empleados.some(emp => emp.id == workerId);

  if (!workerExists) {
    navigate("/error404")
  }

  const onChangeDay = (date) => {
    if (!month) {
      setDay("")
    }
    else {
      setDay(date ? date.getDate().toString().padStart(2, "0") : "")
    }
  }

  const onChangeMonth = (date) => {
    if (!year) {
      setMonth("")
    }
    else {
      setMonth(date ? (date.getMonth() + 1).toString().padStart(2, "0") : "")    
    }
  }

  return (
    <>
      <div className="container">
        <aside className="sidebar">


        <div className="input-search-container">
          <input
            type="text"
            className="input-search"
            placeholder="Empleados..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          {filtro && (
            <button
              className="input-search-clear"
              onClick={() => setFiltro("")}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}
        </div>

          <ul className="user-list">
            <Empleados empleados={empleadosFiltrados}/>
          </ul>

          <div className="vista-general">
            <Link to={"/DashboardsGen"}>Vista General</Link>
          </div>
        </aside>

        <main className="main-content">
          <h1>Informacion de Empleado</h1>
          <div className="employee-card">
            <div className="employee-header">

              {workerActual ? (
                <p className="employee-name">{workerActual.nombre} {workerActual.apellido}</p>
              ) : (
                <p>Cargando...</p>
              )}

<div
  style={{
    display: "flex",
    gap: "10px",
    backgroundColor: "#e0e0e0",
    padding: "10px 15px",
    borderRadius: "8px",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <DatePicker
    selected={year ? new Date(year, 0) : null}
    onChange={(date) => setYear(date ? date.getFullYear().toString() : "")}
    showYearPicker
    dateFormat="yyyy"
    placeholderText="Año"
    yearItemNumber={10}
    isClearable
    wrapperClassName="date-input"
    popperPlacement="bottom"
    customInput={
      <input
        style={{
          padding: "6px 10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "70px",
        }}
      />
    }
  />

  <DatePicker
    selected={
      year && month
        ? new Date(parseInt(year), parseInt(month) - 1)
        : null
    }    
    onChange={(date) => onChangeMonth(date)}
    showMonthYearPicker
    dateFormat="MM"
    placeholderText="Mes"
    isClearable
    wrapperClassName="date-input"
    popperPlacement="bottom"
    customInput={
      <input
        style={{
          padding: "6px 10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "70px",
        }}
      />
    }
  />

  <DatePicker
    selected={
      day && year && month
        ? new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
        : null
    }
    onChange={(date) => onChangeDay(date)}
    dateFormat="dd"
    placeholderText="Día"
    isClearable
    wrapperClassName="date-input"
    popperPlacement="bottom"
    customInput={
      <input
        style={{
          padding: "6px 10px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          width: "70px",
        }}
      />
    }
  />


                <button className="enviarInd" onClick={enviarFecha}>Enviar</button>
              </div>

              {workerActual ? (
                <img
                  src={workerActual.foto_url} 
                  alt="Empleado"
                  className="employee-photo"
                />  
                ) : (
                <p>Cargando...</p>
              )}

            </div>

            <div className="grid">
              <div className="card">
                <LineChart lineData={lineData} />
              </div>
              <div className="card">
                <DoughnutChart doughnutData={doughnutData} />
              </div>
              <div className="card">
                <BarChart barData={barData} />
              </div>
              <div className="card">
              </div>
              <div className="card">
              </div>
              <div className="card">
              </div>
              <div className="card">
              </div>
              <div className="card">
              </div>
              <div className="card">
              </div>
              <div className="card">
              </div>
              <div className="card">
              </div>
              <div className="card">
              </div>
              <div className="card">
              </div>
              <div className="card">
              </div>
              <div className="card">
              </div>
            </div>


          </div>
        </main>
      </div>
    </>
  )
}

export default DashboardsInd
