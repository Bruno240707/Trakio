  import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <section className="hero-section">
          <div className="hero-text">
            <h1>Trakio</h1>
            <p>
              Conectamos cámaras inteligentes con inteligencia artificial para
              obtener datos en tiempo real sobre el comportamiento de las
              personas. Usamos estos datos para optimizar espacios como locales
              comerciales, oficinas y otros entornos que buscan orden, eficiencia
              y seguridad.
            </p>
            <div className="hero-input">
              <input type="email" placeholder="Ingresa tu correo electrónico" />
              <button>Contactanos</button>
            </div>
          </div>
          <div className="hero-image">
            <img src="../Imagenes/camara.png" alt="Device" />
          </div>
        </section>

        <section className="features-section">
          <div className="feature">
            <img src="/icons/chatbot.svg" alt="Chatbot" />
            <p>Chatbot</p>
          </div>
          <div className="feature">
            <img src="/icons/dashboard.svg" alt="Dashboards" />
            <p>Dashboards</p>
          </div>
          <div className="feature">
            <img src="/icons/heatmap.svg" alt="Heat Maps" />
            <p>Heat Maps</p>
          </div>
          <div className="feature">
            <img src="/icons/reports.svg" alt="Reports" />
            <p>Reports</p>
          </div>
        </section>

        {/* Control Section */}
        <section className="control-section">
          <h2>Control Inteligente</h2>
          <p>Visualiza y gestiona el flujo de personas en tiempo real</p>
          <div className="gif-placeholder">
            <span>GIFs DE CÓMO FUNCIONA</span>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
