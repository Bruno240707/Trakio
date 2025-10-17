import React, { useState } from "react"
import "./Informacion.css"

const Informacion = () => {
    const [expanded, setExpanded] = useState(false)

    return (
        <>
            <img src="../src/Imagenes/fondoInfo.png" alt="FondoInformacion" className="fondoInfo" />

            <div class="contenidoInfo">

                <img src="../src/Imagenes/logo.png" alt="logo" class="logoinfo" />
                <h1 class="tituloInfo">Sobre Trakio</h1>
                <h2 class="sloganInfo">La seguridad y la gestión, en un solo sistema.</h2>
                <h3 class="qInfo">¿Que somos?</h3>

                <p class="textoInfoL">
                Trakio es una solución tecnológica integral creada para optimizar la gestión de accesos, asistencia y seguridad dentro de organizaciones modernas. Surge como respuesta a una problemática muy común en empresas, constructoras, industrias y oficinas: la dificultad para controlar de manera eficiente la entrada y salida del personal, especialmente cuando se trabaja en múltiples sedes o con equipos distribuidos en campo. Los métodos tradicionales de control de horarios y asistencia suelen ser manuales, propensos a errores y poco transparentes, lo que genera pérdidas de tiempo, falta de precisión y altos costos administrativos. Frente a este escenario, Trakio se presenta como una herramienta innovadora que permite digitalizar y automatizar estos procesos, brindando una visión clara, precisa y en tiempo real del movimiento del personal.
                </p>

                <p class="textoInfoL">
                El sistema de Trakio combina una aplicación intuitiva con un software de gestión avanzado, capaz de registrar entradas y salidas de manera automática y segura. Se integra con cámaras inteligentes y puntos de control móviles que permiten obtener información instantánea sobre quién accede a cada espacio y en qué momento. Además, ofrece dashboards dinámicos e informes personalizados que facilitan la toma de decisiones dentro de la empresa. Esta combinación de tecnología y accesibilidad convierte a Trakio en una plataforma eficiente y adaptable a distintos entornos, desde oficinas corporativas hasta obras en construcción o plantas industriales. Su objetivo es lograr que cada organización tenga sus espacios bajo control, garantizando seguridad, transparencia y un seguimiento continuo de la asistencia.               
                </p>

                <div className="btnWrapper">
                    <button
                        type="button"
                        className="btnVerMas"
                        onClick={() => setExpanded(prev => !prev)}
                    >
                        {expanded ? "Ver menos ▲" : "Ver más ▼"}
                    </button>
                </div>

                {expanded && (
                    <>

                        <p class="textoInfoL">
                            Trakio está pensado para servir a diferentes tipos de usuarios con necesidades específicas. Por un lado, los gerentes de Recursos Humanos encuentran en la plataforma una herramienta práctica para monitorear asistencia, productividad y puntualidad del personal, con reportes simples y exportables que facilitan la gestión administrativa. Por otro lado, los jefes de obra o supervisores de campo pueden utilizarla para controlar en tiempo real la presencia de los trabajadores en cada sitio, evitando inconsistencias y mejorando la organización del trabajo. En ambos casos, la aplicación resuelve problemas cotidianos vinculados al control manual, ofreciendo una alternativa moderna, segura y eficiente que ahorra tiempo y recursos.                
                        </p>

                        <p class="textoInfoL">
                            Entre sus principales funcionalidades, Trakio permite registrar los movimientos de entrada y salida del personal con gran precisión, detectar llegadas tardías o salidas anticipadas, y visualizar toda la información desde un panel centralizado. Su interfaz muestra métricas clave como asistencia diaria, tiempos de permanencia y estadísticas generales que ayudan a mejorar la planificación y la toma de decisiones. Además, el sistema puede integrarse fácilmente con cámaras o dispositivos de reconocimiento, lo que refuerza la seguridad de los espacios y reduce la posibilidad de fraudes o errores humanos. Esta facilidad de integración es una de sus mayores ventajas, ya que se adapta a las necesidades y la infraestructura tecnológica de cada empresa sin requerir grandes cambios.
                        </p>

                        <p class="textoInfoL">
                            El modelo de negocio de Trakio se basa en un esquema de suscripción mensual o licencias, lo que permite a las empresas acceder a la herramienta de manera escalable y sostenible. Su propuesta de valor se centra en ofrecer monitoreo en tiempo real, transparencia en los datos y reportes automatizados, con el fin de simplificar la gestión y reducir los costos operativos. Los recursos clave que hacen posible el funcionamiento de Trakio incluyen el uso de inteligencia artificial, cámaras inteligentes y un software propio diseñado específicamente para la recolección y análisis de datos de asistencia.
                        </p>

                        <p class="textoInfoL">
                            La creación de Trakio responde a un fin claro: mejorar el control de los espacios y del personal de manera moderna, digital y precisa. Su desarrollo busca transformar la forma en que las organizaciones administran su recurso humano, pasando de métodos manuales y desactualizados a soluciones inteligentes y automatizadas. Con esta herramienta, los equipos de trabajo pueden operar con mayor seguridad y eficiencia, mientras que los responsables de recursos humanos y operaciones obtienen información confiable para la toma de decisiones.
                        </p>

                        <p class="textoInfoL">
                            A nivel estratégico, Trakio se planteó objetivos concretos que guían su desarrollo. Entre ellos se destacan la integración completa con cámaras inteligentes en un plazo de seis meses, el lanzamiento de dashboards interactivos durante el primer año, la implementación de pruebas piloto en al menos tres empresas, el logro de un 90% de precisión en los registros y la capacitación de todos los usuarios luego del lanzamiento oficial. Estos objetivos reflejan el compromiso del equipo con la calidad, la innovación y la satisfacción de los clientes.
                        </p>

                        <p class="textoInfoL">
                            En definitiva, Trakio no es solo un sistema de control de accesos, sino una herramienta que aporta valor real a las organizaciones al ofrecer mayor control, transparencia y eficiencia. Fue creada con el propósito de responder a las necesidades actuales del mercado, donde la digitalización y la gestión inteligente de la información son fundamentales para el crecimiento y la seguridad empresarial. Con Trakio, las empresas pueden asegurarse de que sus espacios y su personal estén siempre bajo control, combinando tecnología, innovación y confiabilidad en una misma solución.    
                        </p>
                    </>
                )}

                <hr class="linea"></hr>
                <h3 class="qInfo">¿Quienes somos?</h3>

                <div class="cards-grid">
                    <div class="card1">
                        <img src="../src/Imagenes/bruno.png" alt="Bruno Massaccesi" className="fotoI" />
                        <h1 class="rol">Ceo</h1>
                        <h2 class="nameCard">Bruno Massaccesi</h2>
                        <button class="btnInfo" type="submit">Contacto</button>
                    </div>

                    <div class="card2">
                        <img src="../src/Imagenes/messi.jpg" alt="Bruno Marasi" className="fotoI" />
                        <h1 class="rol">Ceo</h1>
                        <h2 class="nameCard">Bruno Marasi</h2>
                        <button class="btnInfo" type="submit">Contacto</button>
                    </div>

                    <div class="card3">
                        <img src="../src/Imagenes/nicolas.png" alt="Nicolas Blaser" className="fotoI" />
                        <h1 class="rol">Ceo</h1>
                        <h2 class="nameCard">Nicolas Blaser</h2>
                        <button class="btnInfo" type="submit">Contacto</button>
                    </div>

                    <div class="card4">
                        <img src="../src/Imagenes/messi.jpg" alt="Salvador Soncini" className="fotoI" />
                        <h1 class="rol">Ceo</h1>
                        <h2 class="nameCard">Salvador Soncini</h2>
                        <button class="btnInfo" type="submit">Contacto</button>
                    </div>
                </div>


            </div>

        </>
    )
}

export default Informacion
