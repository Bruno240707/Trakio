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
              label: "Temprano",
              data: lineData.map((data) => data.temprano),
              borderColor: "#18b2e7",
              backgroundColor: "#18b2e7",
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: false,
              tension: 0.3,
            },
            {
              label: "Tarde",
              data: lineData.map((data) => data.tarde),
              borderColor: "#ff9900",
              backgroundColor: "#ff9900",
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: false,
              tension: 0.3,
            },
            {
              label: "Ausente",
              data: lineData.map((data) => data.ausente),
              borderColor: "#ff0000",
              backgroundColor: "#ff0000",
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
              font: { size: 20 },
              align: "start",
              padding: { bottom: 20 },
            },
            legend: { display: true },
            tooltip: {
              callbacks: {
                label: function (context) {
                  const index = context.dataIndex;
                  const datasetLabel = context.dataset.label;
                  const value = context.dataset.data[index];
                  return `${datasetLabel}: ${value} día(s)`;
                },
              },
            },
          },
          scales: {
            x: {
              ticks: { color: "white" },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
            y: {
              beginAtZero: true,
              ticks: { color: "white", stepSize: 1 },
              grid: { color: "rgba(255,255,255,0.1)" },
            },
          },
        }}
      />
    </div>
  );
};

export default LineChart;
