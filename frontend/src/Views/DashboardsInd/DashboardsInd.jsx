import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import DoughnutChart from "../../Componentes/DoughnutChart/index"
import LineChart from "../../Componentes/LineChart/index"
import BarChart from "../../Componentes/BarChart/index"
import Empleados from "../../Componentes/Empleados/Empleados"
import "./DashboardsInd.css"

const DashboardsInd = ({ empleados }) => {
  const [lineData, setLineData] = useState([])
  const [doughnutData, setDoughnutData] = useState([])
  const [barData, setBarData] = useState([])

  const { workerId } = useParams()

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
    fetch(`http://localhost:3001/api/eventsEntradasSalidasByWorkerAndDate/${workerId}`)
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  }, [workerId])

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
