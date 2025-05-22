import { Doughnut } from "react-chartjs-2";
import './doughnutchart.css';

  const DoughnutChart = ({ doughnutData }) => {

  const createCenterTextPlugin = (text, color = "#ffffff", font = "sans-serif") => ({
    id: "centerText",
    beforeDraw: (chart) => {
      const { ctx, chartArea } = chart;
      const { left, right, top, bottom } = chartArea;

      const x = (left + right) / 2;
      const y = (top + bottom) / 2;

      ctx.save();
      ctx.fillStyle = color;
      ctx.font = "bold 20px " + font;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(text, x, y);
      ctx.restore();
    }
  });
  
  if (doughnutData.length === 0) return null

  const centro = doughnutData.find((data) => data.label == "A Tiempo")
  const total = doughnutData.reduce((acum, data) => acum + data.value, 0)
  const porcentaje = centro ? Math.round((centro.value / total) * 100) : 0

  const plugin = createCenterTextPlugin(`${porcentaje}%`, "#ffffff", "Arial")

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
                size: "30%",
              },
              align: "start",
              padding: {
                bottom: 10
              }
            },
            legend: {
              labels: {
                color: "white",
                font: {
                  size: '40%'
                },
              },
              position: "right",
            },
          }
        }}

        plugins={[plugin]}

      />
    </div>
  );
};

export default DoughnutChart;
