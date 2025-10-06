import { useState, useRef } from "react";
import { Line } from "react-chartjs-2";
import './linechart.css';

const LineChart = ({ lineData, workerId, year, month }) => {
  const [popupData, setPopupData] = useState(null);
  const chartRef = useRef(null);

  const handleClick = async (event) => {
    const chart = chartRef.current;
    if (!chart) return;

    const points = chart.getElementsAtEventForMode(
      event.nativeEvent,
      "nearest",
      { intersect: true },
      true
    );

    if (points.length > 0) {
      const { datasetIndex, index } = points[0];
      const datasetLabel = chart.data.datasets[datasetIndex].label;
      const value = chart.data.datasets[datasetIndex].data[index];
      const label = chart.data.labels[index];

      // posición del cursor para mostrar el popup
      const rect = event.target.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      // Fetch detailed data for the week
      const week = index + 1;
      let avgEntry = "N/A";
      let avgExit = "N/A";
      if (workerId && year && month) {
        try {
          const res = await fetch(`http://localhost:3001/api/eventsByWorkerAndWeek/${workerId}/${year}/${month}/${week}`);
          const data = await res.json();
          if (data.entries.length > 0) {
            const totalEntrySec = data.entries.reduce((sum, time) => {
              const [h, m, s] = time.split(':').map(Number);
              return sum + h * 3600 + m * 60 + s;
            }, 0);
            const avgSec = totalEntrySec / data.entries.length;
            const h = Math.floor(avgSec / 3600);
            const m = Math.floor((avgSec % 3600) / 60);
            avgEntry = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
          }
          if (data.exits.length > 0) {
            const totalExitSec = data.exits.reduce((sum, time) => {
              const [h, m, s] = time.split(':').map(Number);
              return sum + h * 3600 + m * 60 + s;
            }, 0);
            const avgSec = totalExitSec / data.exits.length;
            const h = Math.floor(avgSec / 3600);
            const m = Math.floor((avgSec % 3600) / 60);
            avgExit = `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
          }
        } catch (err) {
          console.error("Error fetching detailed data:", err);
        }
      }

      setPopupData({ datasetLabel, value, label, x, y, avgEntry, avgExit });
    }
  };

  const closePopup = () => setPopupData(null);

  return (
    <div className="line-chart-container" style={{ position: "relative" }}>
      <Line
        ref={chartRef}
        data={{
          labels: lineData.map(d => d.label),
          datasets: [
            {
              label: "Temprano",
              data: lineData.map(d => d.temprano),
              borderColor: "#18b2e7",
              backgroundColor: "#18b2e7",
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: false,
              tension: 0.3,
            },
            {
              label: "Tarde",
              data: lineData.map(d => d.tarde),
              borderColor: "#ff9900",
              backgroundColor: "#ff9900",
              pointRadius: 5,
              pointHoverRadius: 7,
              fill: false,
              tension: 0.3,
            },
            {
              label: "Ausente",
              data: lineData.map(d => d.ausente),
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
          },
          scales: {
            x: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" } },
            y: { beginAtZero: true, ticks: { color: "white", stepSize: 1 }, grid: { color: "rgba(255,255,255,0.1)" } },
          },
        }}
        onClick={handleClick}
      />

      {popupData && (
        <div
          className="popup-content"
          style={{
            position: "absolute",
            left: popupData.x + 10,
            top: popupData.y - 40,
          }}
        >
          <h3>{popupData.datasetLabel}</h3>
          <p>Semana: {popupData.label}</p>
          <p>Días: {popupData.value}</p>
          <p>Hora de Entrada Promedio: {popupData.avgEntry}</p>
          <p>Última Hora de Salida Promedio: {popupData.avgExit}</p>
          <button onClick={closePopup}>Cerrar</button>
        </div>
      )}
    </div>
  );
};

export default LineChart;
