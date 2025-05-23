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
            <img src="../src/Imagenes/camara.png"/>
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

        <section className="control-section">
          <h2 >Control Inteligente</h2>
          <p>Visualiza y gestiona el flujo de personas en tiempo real</p>
          <div className="gif-placeholder">
            <span>GIFs DE CÓMO FUNCIONA</span>
          </div>
        </section>

        <section className="opinion-section">
          <h2> Ya se corre la voz </h2>
          <div className="opiniones-container">
            <div className="opinion-card">
              <p className="opinion-text">Es fácil ver los datos en tiempo real, lo que hace todo más eficiente.</p>
              <p className="opinion-author">JOSE N</p>
            </div>
            <div className="opinion-card">
              <p className="opinion-text">Los reportes automáticos sobre la puntualidad y asistencia de los empleados nos ahorran tiempo y nos ayudan a tomar decisiones más informadas.</p>
              <p className="opinion-author">FRAN M</p>
            </div>
            <div className="opinion-card">
              <p className="opinion-text">La integración fue simple y la interfaz es muy intuitiva.</p>
              <p className="opinion-author">NICO K</p>
          </div>
</div>

        </section>

      </div>
    </>
  );
};

export default Home;
