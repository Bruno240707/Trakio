import { Bar } from "react-chartjs-2";
import './BarChartGeneral.css';

const BarChartGeneral = ({ barData = [] }) => {
  // Asegurarse de que siempre sea un array
  const labels = barData.map((data) => data.label || ""); // antes usabas data.hora
  const entradas = barData.map((data) => data.Entradas || 0);
  const salidas = barData.map((data) => data.Salidas || 0);

  return (
    <div className="chart-container">
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Entradas",
              data: entradas,
              backgroundColor: "#18b2e7",
              borderRadius: 5,
              barPercentage: 0.5,
            },
            {
              label: "Salidas",
              data: salidas,
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
