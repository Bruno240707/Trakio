// DoughnutChart.jsx
import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import './index.css';

const createCenterTextPlugin = (text, color = "#ffffff", font = "sans-serif") => ({
  id: "centerText",
  beforeDraw: (chart) => {
    const { ctx, chartArea } = chart;
    if (!chartArea) return;
    const { left, right, top, bottom } = chartArea;
    const x = (left + right) / 2;
    const y = (top + bottom) / 2;

    ctx.save();
    ctx.fillStyle = color;
    ctx.font = "bold 40px " + font;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
    ctx.restore();
  }
});

const DoughnutChartGeneral = ({ doughnutData = [] }) => {
  if (doughnutData.length === 0) return null;

  // calcular asistencia total (A Tiempo + Tardanza)
  const asistencias = doughnutData
    .filter(d => d.label !== "Inasistencia")
    .reduce((acum, d) => acum + d.value, 0);
  const total = doughnutData.reduce((acum, d) => acum + d.value, 0);
  const porcentaje = total > 0 ? Math.round((asistencias / total) * 100) : 0;

  // memoizar plugin para que cambie cuando cambie el porcentaje
  const centerPlugin = useMemo(
    () => createCenterTextPlugin(`${porcentaje}%`, "#ffffff", "Arial"),
    [porcentaje]
  );

  const data = {
    labels: doughnutData.map(d => d.label),
    datasets: [{
      data: doughnutData.map(d => d.value),
      backgroundColor: ["#18b2e7", "#3877f0", "#e63946"],
      borderColor: "#0d1b2a",
      borderWidth: 4
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      title: {
        display: true,
        text: "Asistencias",
        color: "white",
        font: { size: 20 },
        align: "start",
        padding: { bottom: 10 }
      },
      legend: {
        labels: { color: "white", font: { size: 14 } },
        position: "right"
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || "";
            const value = context.raw ?? 0;
            return `${label}: ${value}`;
          }
        }
      }
    }
  };

  return (
    <div className="doughnut-chart-container">
      {/* key fuerza remount cuando porcentaje cambia */}
      <Doughnut
        key={porcentaje}
        data={data}
        options={options}
        plugins={[centerPlugin]}
      />
    </div>
  );
};

export default DoughnutChartGeneral;
