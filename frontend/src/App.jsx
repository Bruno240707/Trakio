import { Chart as ChartJS, defaults } from "chart.js/auto"
import { Bar, Doughnut, Line } from "react-chartjs-2"
import './App.css'

import { useState, useEffect } from "react"   

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.font.size = 20,

defaults.plugins.title.color = "black";

function App() {

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


      <div className="grafico-container">
          <Line
          data={{
            labels: lineData.map((data) => data.label),
            datasets: [
              {
              label: "Ads",
              data: lineData.map((data) => data.Ads),
              },
              {
                label: "Subscriptions",
                data: lineData.map((data) => data.Subscriptions),
              },
              {
                label: "Sponsorships",
                data: lineData.map((data) => data.Sponsorships),
              },
            ],
          }}

          options= {{
            plugins: {
              title: {
                text: "Line Data"
              }
            }
          }}
          />
      </div>

      <div className="grafico-container">
          <Doughnut
            data={{
             labels: doughnutData.map((data) => data.label),
             datasets: [{
              label: "Llegadas temprano/tarde",
              data: doughnutData.map((data) => data.value)
             }
             ]
            }}

          options= {{
            plugins: {
              title: {
                text: "Doughnut Data"
              }
            }
          }}
          />
      </div>
        
      <div className="grafico-container">
        <Bar  
        data={{
          labels: barData.map((data) => data.label),
          datasets: [
            {
            label: "Ads",
            data: barData.map((data) => data.Ads),
            },
            {
              label: "Subscriptions",
              data: barData.map((data) => data.Subscriptions),
            },
            {
              label: "Sponsorships",
              data: barData.map((data) => data.Sponsorships),
            },
          ],
        }}
        options= {{
          plugins: {
            title: {
              text: "Bar Data"
            }
          }
        }}
        />
      </div>

    </>
  )
}

export default App