import { Doughnut } from "react-chartjs-2";
import './doughnutchart.css';

const DoughnutChart = ({ doughnutData }) => {
  return (
    <div className="doughnut-chart-container">
      <Doughnut
        data={{
          labels: doughnutData.map((data) => data.label),
          datasets: [
            {
              label: "Llegadas temprano/tarde",
              data: doughnutData.map((data) => data.value),
              backgroundColor: ["#18b2e7", "#3877f0"],
              borderColor: "#0d1b2a",
              borderWidth: 4,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          cutout: "60%",
          plugins: {
            title: {
              display: true,
              text: "Asistencias",
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
                boxWidth: 30,
                font: {
                  size: 30
                },
              },
              position: "right",
            },
            tooltip: {
              callbacks: {
                label: (context) => `${context.label}: ${context.parsed}%`
              }
            }
          }
        }}
      />
    </div>
  );
};

export default DoughnutChart;
