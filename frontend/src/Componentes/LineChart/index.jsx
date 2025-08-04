import { Line } from "react-chartjs-2";
import './linechart.css';

const LineChart = ({ lineData }) => {
  return (
    <div className="line-chart-container">
      <Line
        data={{
          labels: lineData.map((data) => data.label),
          datasets: [
            {
              label: "Regularidad",
              data: lineData.map((data) => data.Regularidad),
              borderColor: "#ffffff",
              backgroundColor: "#ffffff",
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: false,
              tension: 0.3,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Regularidad de Empleo x Mes",
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
              display: false
            },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const temprano = lineData[index]?.temprano ?? 0;
                  const tarde = lineData[index]?.tarde ?? 0;
                  return `Temprano: ${temprano} día(s), Tarde: ${tarde} día(s)`;
                }
              }
            }
          },
          scales: {
            x: {
              ticks: {
                color: "white"
              },
              grid: {
                color: "rgba(255,255,255,0.1)"
              }
            },
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                color: "white",
                callback: (value) => `${value}%`
              },
              grid: {
                color: "rgba(255,255,255,0.1)"
              }
            }
          }
        }}
      />
    </div>
  );
};

export default LineChart;
