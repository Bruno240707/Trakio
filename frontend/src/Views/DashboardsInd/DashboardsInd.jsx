import { Link, useParams } from "react-router-dom"
import { useState, useEffect, use } from "react"
import DoughnutChart from "../../Componentes/DoughnutChart/index"
import LineChart from "../../Componentes/LineChart/index"
import BarChart from "../../Componentes/BarChart/index"
import Empleados from "../../Componentes/Empleados/Empleados"
import "./DashboardsInd.css"

const DashboardsInd = ({ empleados }) => {
  const [lineData, setLineData] = useState([])
  const [doughnutData, setDoughnutData] = useState([])
  const [barData, setBarData] = useState([])
  
  const [year, setYear] = useState("")
  const [month, setMonth] = useState("")
  const [day, setDay] = useState("")

  const { workerId } = useParams()

  const enviarFecha = (year, month, day) => {
    cargarEntradasFiltradas()
  }

  useEffect(() => {
    fetch("http://localhost:3001/api/doughnutData")
      .then((res) => res.json())
      .then((data) => setDoughnutData(data))
      .catch((err) => console.error("Error al cargar la API:", err))

    fetch("http://localhost:3001/api/lineData")
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => console.error("Error al cargar la API:", err))
  }, [])

  useEffect(() => {
    fetch(`http://localhost:3001/api/eventsEntradasSalidasByWorkerAndDate/${workerId}?year=${year}&month=${month}&day=${day}`)
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  }, [workerId])

  const cargarEntradasFiltradas = () => {
    fetch(`http://localhost:3001/api/eventsEntradasSalidasByWorkerAndDate/${workerId}?year=${year}&month=${month}&day=${day}`)
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  };

  const workerActual = empleados.find((e) => e.id == workerId)

  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <input className="dropdown" type="text" placeholder="Empleados..." />

          <ul className="user-list">
            <Empleados empleados={empleados}/>
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
                <p className="employee-name">{workerActual.nombre}</p>
              ) : (
                <p>Cargando...</p>
              )}

              <div className="fecha-inputs">
                <p>Filtrar por fecha (año / mes / día):</p>
                <input
                  type="number"
                  placeholder="Año (YYYY)"
                  min="2000"
                  max="2100"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Mes (MM)"
                  min="1"
                  max="12"
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Día (DD)"
                  min="1"
                  max="31"
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                />
                <button onClick={() => enviarFecha(year, month, day)}>Enviar</button>
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
                <BarChart barData={barData} />
              </div>
              <div className="card">
                <DoughnutChart doughnutData={doughnutData} />
              </div>
              <div className="card">
                <LineChart lineData={lineData} />
              </div>

            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default DashboardsInd
