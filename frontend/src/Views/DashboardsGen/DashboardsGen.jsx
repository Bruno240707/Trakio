import { Chart as ChartJS } from "chart.js/auto"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react"   
import DoughnutChartGeneral from "../../Componentes/DoughnutChartGeneral/DoughnutChartGeneral";
import LineChart from "../../Componentes/LineChart/index";
import BarChartGeneral from "../../Componentes/BarChartGeneral/BarChartGeneral"
import './DashboardsGen.css'
import DescargarExcel from "../../Componentes/CopiarDataButton/CopiarDataButton";
import CopiarDataGeneralButton from "../../Componentes/CopiarDataButton/CopiarDataGeneralButton";

const meses = [
  { value: 1, label: "Enero" },
  { value: 2, label: "Febrero" },
  { value: 3, label: "Marzo" },
  { value: 4, label: "Abril" },
  { value: 5, label: "Mayo" },
  { value: 6, label: "Junio" },
  { value: 7, label: "Julio" },
  { value: 8, label: "Agosto" },
  { value: 9, label: "Septiembre" },
  { value: 10, label: "Octubre" },
  { value: 11, label: "Noviembre" },
  { value: 12, label: "Diciembre" },
];

const DashboardsGen = () => {
  const hoy = new Date();
  const [year, setYear] = useState(hoy.getFullYear());
  const [month, setMonth] = useState(hoy.getMonth() + 1);
  const [week, setWeek] = useState(0);

  const [lineData, setLineData] = useState([])
  const [doughnutData, setDoughnutData] = useState([])
  const [barData, setBarData] = useState([])

  const [sucursales, setSucursales] = useState([]);
  const [selectedSucursal, setSelectedSucursal] = useState("");

  const [dashboardStats, setDashboardStats] = useState({
    totalEmpleados: 0,
    llegadasATiempo: 0,
    llegadasTarde: 0
  });

  const [empleados, setEmpleados] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('year', year);
    params.append('month', month);
    if (week) params.append('week', week);
    if (selectedSucursal) params.append('id_sucursal', selectedSucursal);

    fetch(`/api/attendanceDoughnutAllWorkers?${params.toString()}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setDoughnutData(data))
      .catch((err) => console.error("Error al cargar la API de Doughnut:", err));

    fetch(`/api/lineData?${new URLSearchParams({ year, month, ...(selectedSucursal ? { id_sucursal: selectedSucursal } : {}) }).toString()}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setLineData(data))
      .catch((err) => console.error("Error al cargar la API:", err));
    const paramsBar = new URLSearchParams();
    paramsBar.append('year', year);
    paramsBar.append('month', month);
    paramsBar.append('week', week);
    if (selectedSucursal) paramsBar.append('id_sucursal', selectedSucursal);

    fetch(`/api/eventsEntradasSalidasAllWorkers?${paramsBar.toString()}`, { credentials: "include" })
      .then(res => res.json())
      .then(data => setBarData(data))
      .catch(err => console.error("Error al cargar la API:", err));

    const statsParams = selectedSucursal ? `?id_sucursal=${selectedSucursal}` : '';
    fetch(`/api/dashboardStats${statsParams}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        setDashboardStats({
          totalEmpleados: data.totalEmpleados,
          llegadasATiempo: data.llegadasATiempo,
          llegadasTarde: data.llegadasTarde
        });
      })
      .catch((err) => console.error("Error al cargar dashboardStats:", err));

    // Obtener empleados (filtrados por sucursal si aplica)
    const workersParams = selectedSucursal ? `?sucursal=${selectedSucursal}` : '';
    fetch(`/api/getWorkers${workersParams}`, { credentials: "include" })
      .then((res) => res.json())
      .then((data) => setEmpleados(data))
      .catch((err) => console.error("Error al cargar empleados:", err));
  }, [year, month, week, selectedSucursal]);

  // Cargar sucursales y leer selección previa desde localStorage
  useEffect(() => {
    fetch('/api/getSucursales', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setSucursales(data || []))
      .catch(err => console.error('Error al cargar sucursales', err));

    try {
      const saved = localStorage.getItem('selectedSucursal');
      if (saved) setSelectedSucursal(saved);
    } catch (err) {
      console.error('Error reading selectedSucursal from localStorage', err);
    }
  }, []);

  // Escuchar cambios en localStorage y actualizar filtro en tiempo real
  useEffect(() => {
    const onStorage = (e) => {
      if (e.key === 'selectedSucursal') {
        setSelectedSucursal(e.newValue || "");
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  return (
    <>
      <div className="vista-individual">
        <Link to={"/DashboardsInd"}>Vista Individual</Link>
      </div>

      <div className="stats-panel">
        <div className="stat-item">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="32px" height="32px">
              <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/>
            </svg>
          </div>
          <div className="number">{dashboardStats.totalEmpleados}</div>
          <div className="label">Empleados registrados</div>
        </div>
        <div className="stat-item">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="32px" height="32px">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2" fill="none"/>
              <path d="M12 6v6l4 2" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="number">{dashboardStats.llegadasATiempo}</div>
          <div className="label">Llegadas a tiempo</div>
        </div>
        <div className="stat-item">
          <div className="icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" width="32px" height="32px">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 15h-2v-2h2zm0-4h-2V7h2z"/>
            </svg>
          </div>
          <div className="number">{dashboardStats.llegadasTarde}</div>
          <div className="label">Llegadas tarde</div>
        </div>
      </div>

      <div className="filtro-sucursal-gen">
        <label htmlFor="sucursalGenSelect">Filtrar por sucursal: </label>
        <select id="sucursalGenSelect" value={selectedSucursal} onChange={e => setSelectedSucursal(e.target.value)}>
          <option value="">Todas las sucursales</option>
          {sucursales.map(s => (
            <option key={s.id} value={s.id}>{s.nombre}</option>
          ))}
        </select>
      </div>

      {/* Filtro de mes, año y semana */}
      <div className="filtro-mes-anio-semana">


        <label id="anio" htmlFor="anio2">Año:</label>
        <select id="anio2" value={year} onChange={e => setYear(Number(e.target.value))}>
          {Array.from({ length: 5 }, (_, i) => hoy.getFullYear() - i).map(y => (
            <option key={y} value={y}>{y}</option>
          ))}
        </select>

  <label id="mes" className="infoMes" htmlFor="mes2">Mes:</label>
        <select id="mes2" value={month} onChange={e => setMonth(Number(e.target.value))}>
          {meses.map(m => (
            <option key={m.value} value={m.value}>{m.label}</option>
          ))}
        </select>

  <label className="infoSemana" htmlFor="semana">Semana:</label>
        <select id="semana" value={week} onChange={e => setWeek(Number(e.target.value))}>
          <option value={0}>Todas las semanas</option>
          <option value={1}>Semana 1</option>
          <option value={2}>Semana 2</option>
          <option value={3}>Semana 3</option>
          <option value={4}>Semana 4</option>
        </select>
      </div>

      <div className="graficos-flex">
        <div className="grafico-container">
          <DescargarExcel
            data={lineData}
            employee={null}
            sucursal={null}
            dataType="General Line Data"
            year={year}
            month={month}
            week={week}
          />
          <LineChart lineData={lineData}/>
        </div>
        <div className="grafico-container">
          <DescargarExcel
            data={doughnutData}
            employee={null}
            sucursal={null}
            dataType="General Doughnut Data"
            year={year}
            month={month}
            week={week}
          />
          <DoughnutChartGeneral doughnutData={doughnutData}/>
        </div>
        <div className="grafico-container">
          <DescargarExcel
            data={barData}
            employee={null}
            sucursal={null}
            dataType="General Bar Data"
            year={year}
            month={month}
            week={week}
          />
          <BarChartGeneral barData={barData}/>
        </div>
      </div>
    </>
  )
}

export default DashboardsGen;
