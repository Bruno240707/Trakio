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

    fetch("http://localhost:3001/api/barData")
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => console.error("Error al cargar la API:", err))
  }, [])

  return (
    <>
      <div class="container">
        <aside class="sidebar">
          <input class="dropdown" type="text" placeholder="Empleados..." />

          <ul class="user-list">
            <li>
              <button class="delete">✕</button> Marcelo Godoy
            </li>
            <li>
              <button class="delete">✕</button> Fran Marap
            </li>
            <li>
              <button class="delete">✕</button> Lionel Andres
            </li>
            <li>
              <button class="delete">✕</button> Eitan Mas
            </li>
            <li>
              <button class="delete">✕</button> Nicolas Blaser
            </li>
            <li>
              <button class="delete">✕</button> Marcelo Godoy
            </li>
            <li>
              <button class="delete">✕</button> Fran Marap
            </li>
            <li>
              <button class="delete">✕</button> Lionel Andres
            </li>
            <li>
              <button class="delete">✕</button> Eitan Mas
            </li>
            <li>
              <button class="delete">✕</button> Nicolas Blaser
            </li>
            <li>
              <button class="delete">✕</button> Marcelo Godoy
            </li>
            <li>
              <button class="delete">✕</button> Fran Marap
            </li>
            <li>
              <button class="delete">✕</button> Lionel Andres
            </li>
            <li>
              <button class="delete">✕</button> Eitan Mas
            </li>
            <li>
              <button class="delete">✕</button> Nicolas Blaser
            </li>
            <li>
              <button class="delete">✕</button> Marcelo Godoy
            </li>
            <li>
              <button class="delete">✕</button> Fran Marap
            </li>
            <li>
              <button class="delete">✕</button> Lionel Andres
            </li>
            <li>
              <button class="delete">✕</button> Eitan Mas
            </li>
            <li>
              <button class="delete">✕</button> Nicolas Blaser
            </li>
          </ul>

          <div class="vista-general">
            <Link to={"/DashboardsGen"}>Vista General</Link>
          </div>
        </aside>

        <main class="main-content">
          <h1>Informacion de Empleado</h1>
          <div class="employee-card">
            <div class="employee-header">
              <button class="employee-name">Francisco Marapode</button>
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Empleado"
                class="employee-photo"
              />
            </div>

            <div class="grid">
              <div class="card">
                <LineChart lineData={lineData} />
              </div>
              <div class="card">
                <DoughnutChart doughnutData={doughnutData} />
              </div>
              <div class="card">
                <BarChart barData={barData} />
              </div>
              <div class="card"></div>
              <div class="card"></div>
              <div class="card"></div>
              <div class="card"></div>
              <div class="card"></div>
              <div class="card"></div>
              <div class="card"></div>
              <div class="card"></div>
              <div class="card"></div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default DashboardsInd
