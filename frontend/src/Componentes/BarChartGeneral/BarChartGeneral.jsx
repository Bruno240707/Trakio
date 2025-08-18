import { Bar } from "react-chartjs-2";
import './BarChartGeneral.css';

const BarChartGeneral = ({ barData }) => {
  return (
    <div className="chart-container">
      <Bar
        data={{
          labels: barData.map((data) => data.hora),
          datasets: [
            {
              label: "Entradas",
              data: barData.map((data) => data.Entradas),
              backgroundColor: "#18b2e7",
              borderRadius: 5,
              barPercentage: 0.5,
            },
            {
              label: "Salidas",
              data: barData.map((data) => data.Salidas),
              backgroundColor: "#3877f0",
              borderRadius: 5,
              barPercentage: 0.5,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Entradas y Salidas por Hora",
              color: "white",
              font: {
                size: 20,
              },
              align: "start",
              padding: {
                bottom: 20
              }
            },
            legend: {
              labels: {
                color: "white",
              },
            },
          },
          scales: {
            x: {
              ticks: {
                color: "white",
              },
              grid: {
                color: "rgba(255,255,255,0.1)",
              },
            },
            y: {
              ticks: {
                color: "white",
              },
              grid: {
                color: "rgba(255,255,255,0.1)",
              },
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChartGeneral;
