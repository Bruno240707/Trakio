import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import DoughnutChart from "../../Componentes/DoughnutChart/index"
import LineChart from "../../Componentes/LineChart/index"
import BarChart from "../../Componentes/BarChart/index"
import "./DashboardsInd.css"

const DashboardsInd = () => {
  const [lineData, setLineData] = useState([])
  const [doughnutData, setDoughnutData] = useState([])
  const [barData, setBarData] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/api/doughnutData")
      .then((res) => res.json())
      .then((data) => setDoughnutData(data))
      .catch((err) => console.error("Error al cargar la API:", err))

    fetch("http://localhost:3001/api/lineData")
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => console.error("Error al cargar la API:", err))

    // Cambiado para usar el nuevo endpoint con datos reales de entradas y salidas
    fetch("http://localhost:3001/api/eventsEntradasSalidasByWorkerAndDate")
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => console.error("Error al cargar la API:", err))
  }, [])

  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <input className="dropdown" type="text" placeholder="Empleados..." />

          <ul className="user-list">
            <li>
              <button className="delete">✕</button> Marcelo Godoy
            </li>
            <li>
              <button className="delete">✕</button> Fran Marap
            </li>
            <li>
              <button className="delete">✕</button> Lionel Andres
            </li>
            <li>
              <button className="delete">✕</button> Eitan Mas
            </li>
            <li>
              <button className="delete">✕</button> Nicolas Blaser
            </li>
            <li>
              <button className="delete">✕</button> Marcelo Godoy
            </li>
            <li>
              <button className="delete">✕</button> Fran Marap
            </li>
            <li>
              <button className="delete">✕</button> Lionel Andres
            </li>
            <li>
              <button className="delete">✕</button> Eitan Mas
            </li>
            <li>
              <button className="delete">✕</button> Nicolas Blaser
            </li>
            <li>
              <button className="delete">✕</button> Marcelo Godoy
            </li>
            <li>
              <button className="delete">✕</button> Fran Marap
            </li>
            <li>
              <button className="delete">✕</button> Lionel Andres
            </li>
            <li>
              <button className="delete">✕</button> Eitan Mas
            </li>
            <li>
              <button className="delete">✕</button> Nicolas Blaser
            </li>
            <li>
              <button className="delete">✕</button> Marcelo Godoy
            </li>
            <li>
              <button className="delete">✕</button> Fran Marap
            </li>
            <li>
              <button className="delete">✕</button> Lionel Andres
            </li>
            <li>
              <button className="delete">✕</button> Eitan Mas
            </li>
            <li>
              <button className="delete">✕</button> Nicolas Blaser
            </li>
          </ul>

          <div className="vista-general">
            <Link to={"/DashboardsGen"}>Vista General</Link>
          </div>
        </aside>

        <main className="main-content">
          <h1>Informacion de Empleado</h1>
          <div className="employee-card">
            <div className="employee-header">
              <button className="employee-name">Francisco Marapode</button>
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Empleado"
                className="employee-photo"
              />
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
