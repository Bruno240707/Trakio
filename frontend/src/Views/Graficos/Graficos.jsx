import { Chart as ChartJS, defaults } from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import '../Graficos/Graficos.css'
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"   
import DoughnutChart from "../../Componentes/DoughnutChart/index";
import LineChart from "../../Componentes/LineChart/index";
import BarChart from "../../Componentes/BarChart/index"

const Graficos = () => {

  const [lineData, setLineData] = useState([])
  const [doughnutData, setDoughnutData] = useState([])
  const [barData, setBarData] = useState([])

  useEffect(() => {
    fetch("http://localhost:3001/api/doughnutData")
      .then((res) => res.json())
      .then((data) => setDoughnutData(data))
      .catch((err) => console.error("Error al cargar la API:", err));

    fetch("http://localhost:3001/api/lineData")
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => console.error("Error al cargar la API:", err));

    fetch("http://localhost:3001/api/barData")
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  }, []);


  return (
    <>
    <div style={{backgroundColor: "black", width: "50px", borderRadius: "50%"}}>
        <Link to={"/"} style={{fontSize: 20, color: "White"}}>←</Link>
    </div>
      <div className="grafico-container">
        <LineChart lineData={lineData}/>
      </div>

      <div className="grafico-container">
          <DoughnutChart doughnutData={doughnutData}/>
      </div>

      <div className="grafico-container">
        <BarChart barData={barData}/>
      </div>
    </>
  )
}

export default Graficos