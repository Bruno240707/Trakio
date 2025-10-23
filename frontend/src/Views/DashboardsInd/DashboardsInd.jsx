import { Link, useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import DoughnutChart from "../../Componentes/DoughnutChart/index";
import LineChart from "../../Componentes/LineChart/index";
import BarChart from "../../Componentes/BarChart/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Empleados from "../../Componentes/Empleados/Empleados";
import DescargarExcel from "../../Componentes/CopiarDataButton/CopiarDataButton";
import "./DashboardsInd.css";

const DashboardsInd = ({ empleados }) => {
  const navigate = useNavigate();
  const { workerId } = useParams();

  const [lineData, setLineData] = useState([]);
  const [doughnutData, setDoughnutData] = useState([]);
  const [barData, setBarData] = useState([]);

  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");

  const [empleadosFiltrados, setEmpleados] = useState([]);
  const [filtro, setFiltro] = useState("");
  const [sucursales, setSucursales] = useState("")
  const [sucursalSeleccionada, setSucursalSeleccionada] = useState("")

  useEffect(() => {
    fetch(`/api/getWorkers?filtro=${filtro}&sucursal=${sucursalSeleccionada}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setEmpleados(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  }, [filtro, sucursalSeleccionada]);


  useEffect(() => {
    const fetchSucursales = async () => {
      try {
        const res = await fetch("/api/getSucursales", { credentials: "include" });
        if (!res.ok) throw new Error("Error en la respuesta de la API");
        const data = await res.json();
        setSucursales(data);
      } catch (err) {
        console.error("Error al cargar las sucursales:", err);
      }
    };

    fetchSucursales();
  }, []);


  const workerActual = empleados.find((e) => e.id == workerId);

  // Validar que exista antes de acceder a propiedades
  const sucursalActual = workerActual 
    ? sucursales.find((s) => s.id == workerActual.id_sucursal)
    : null;

  useEffect(() => {
    if (!workerId) return;

    fetch(`/api/eventsEntradasSalidasByWorkerAndDate/${workerId}?year=${year}&month=${month}&day=${day}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  }, [workerId, year, month, day]);

  useEffect(() => {
    if (!workerId) return;

    fetch(`/api/lineData/${workerId}?year=${year}&month=${month}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => console.error("Error al cargar lineData:", err));
  }, [workerId, year, month, day]);

  useEffect(() => {
    if (!workerId) return;

    fetch(`/api/attendanceDoughnut/${workerId}?year=${year}&month=${month}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDoughnutData(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  }, [workerId, year, month, day]);

  const enviarFecha = () => {
    if (!workerId) return;

    let y = year;
    let m = month;
    let d = day;

    if (y && !m && d) d = "";
    if (!y) m = ""; d = "";

    fetch(`/api/eventsEntradasSalidasByWorkerAndDate/${workerId}?year=${y}&month=${m}&day=${d}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setBarData(data))
      .catch((err) => console.error("Error al cargar la API:", err));

    fetch(`/api/lineData/${workerId}?year=${y}&month=${m}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => console.error("Error al cargar lineData:", err));

    fetch(`/api/attendanceDoughnut/${workerId}?year=${y}&month=${m}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDoughnutData(data))
      .catch((err) => console.error("Error al cargar la API:", err));
  };

  const onChangeDay = (date) => {
    if (!month) setDay("");
    else setDay(date ? date.getDate().toString().padStart(2, "0") : "");
  };

  const onChangeMonth = (date) => {
    if (!year) setMonth("");
    else setMonth(date ? (date.getMonth() + 1).toString().padStart(2, "0") : "");
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="input-search-container">
          <input
            type="text"
            className="input-search"
            placeholder="Empleados..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
          {filtro && (
            <button
              className="input-search-clear"
              onClick={() => setFiltro("")}
              aria-label="Limpiar búsqueda"
            >
              ×
            </button>
          )}

          <select
              className="select-sucursal"
              value={sucursalSeleccionada}
              onChange={(e) => setSucursalSeleccionada(e.target.value)}
            >
              <option value="">Todas las sucursales</option>
              {Array.isArray(sucursales) &&
                sucursales.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.nombre}
                  </option>
                ))}
            </select>

        </div>

        <ul className="user-list">
          <Empleados empleados={empleadosFiltrados} />
        </ul>

        <div className="vista-general">
          <Link to={"/DashboardsGen"}>Vista General</Link>
        </div>
      </aside>

      {workerId ? (
        <main className="main-content">
          <h1>Informacion de Empleado</h1>
          <div className="employee-card">
            <div className="employee-header">
              {(workerActual && sucursalActual) ? (
                <>
                  <p className="employee-name">
                    {workerActual.nombre} {workerActual.apellido}
                  </p>

                  <p className="employee-sucursal">
                    {sucursalActual.nombre}
                  </p>
                </>
              ) : (
                <p>Cargando...</p>
              )}

              <div style={{ display: "flex", gap: "10px", backgroundColor: "#e0e0e0", padding: "10px 15px", borderRadius: "8px", alignItems: "center", justifyContent: "center" }}>
              <DatePicker
                selected={year ? new Date(year, 0) : null}
                onChange={(date) => setYear(date ? date.getFullYear().toString() : "")}
                showYearPicker
                dateFormat="yyyy"
                placeholderText="Año"
                yearItemNumber={10}
                isClearable
                wrapperClassName="date-input"
                popperPlacement="bottom"
                customInput={
                  <input
                    style={{
                      padding: "6px 10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "70px",
                    }}
                  />
                }
              />

              <DatePicker
                selected={
                  year && month
                    ? new Date(parseInt(year), parseInt(month) - 1)
                    : null
                }    
                onChange={(date) => onChangeMonth(date)}
                showMonthYearPicker
                dateFormat="MM"
                placeholderText="Mes"
                isClearable
                wrapperClassName="date-input"
                popperPlacement="bottom"
                customInput={
                  <input
                    style={{
                      padding: "6px 10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "70px",
                    }}
                  />
                }
              />

              <DatePicker
                selected={
                  day && year && month
                    ? new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
                    : null
                }
                onChange={(date) => onChangeDay(date)}
                dateFormat="dd"
                placeholderText="Día"
                isClearable
                wrapperClassName="date-input"
                popperPlacement="bottom"
                customInput={
                  <input
                    style={{
                      padding: "6px 10px",
                      borderRadius: "5px",
                      border: "1px solid #ccc",
                      width: "70px",
                    }}
                  />
                }
              />
              </div>

              {workerActual ? (
                <img src={workerActual.foto_url} alt="Empleado" className="employee-photo" />
              ) : (
                <p>Cargando...</p>
              )}
            </div>

          <div className="grid">
              <div className="card">
                <DescargarExcel 
                  data={lineData} 
                  employee={workerActual} 
                  sucursal={sucursalActual} 
                  dataType="Line Data" 
                  year={year} 
                  month={month} 
                  day={day} 
                />
                <LineChart lineData={lineData} />
              </div>
              <div className="card">
                <DescargarExcel 
                  data={doughnutData} 
                  employee={workerActual} 
                  sucursal={sucursalActual} 
                  dataType="Doughnut Data" 
                  year={year} 
                  month={month} 
                  day={day} 
                />
                <DoughnutChart doughnutData={doughnutData} />
              </div>
              <div className="card">
                <DescargarExcel 
                  data={barData} 
                  employee={workerActual} 
                  sucursal={sucursalActual} 
                  dataType="Bar Data" 
                  year={year} 
                  month={month} 
                  day={day} 
                />
                <BarChart barData={barData} />
              </div>
              {Array.from({ length: 12 }).map((_, i) => <div key={i} className="card"></div>)}
            </div>
          </div>
        </main>
      ) : (
        <main className="main-content empty-dashboard">
          <div className="empty-container">
            <div className="empty-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="#4a90e2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="7" r="4" />
                <path d="M5.5 21a6.5 6.5 0 0 1 13 0" />
              </svg>
            </div>
            <h2>Seleccione un empleado</h2>
            <p>Para ver su información y gráficos, haga clic en un empleado de la lista a la izquierda.</p>
            {empleados.length === 0 && <p>No hay empleados disponibles.</p>}
          </div>
        </main>
      )}
    </div>
  );
};

export default DashboardsInd;
