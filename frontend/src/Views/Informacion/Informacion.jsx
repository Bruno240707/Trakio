import "./Informacion.css"

const Informacion = () => {
    return (
        <>
            <img src="../src/Imagenes/fondoInfo.png" alt="FondoInformacion" className="fondoInfo" />

            <div class="contenidoInfo">

                <h1 class="tituloInfo">Sobre Trakio</h1>
                <h2 class="sloganInfo">La seguridad y la gestión, en un solo sistema.</h2>
                <h3 class="qInfo">¿Que somos?</h3>
                <p class="textoInfoL">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente </p>
                <hr class="linea"></hr>
                <h3 class="qInfo">¿Quienes somos?</h3>

                <div class="card1">
                    <img src="../src/Imagenes/messi.jpg" alt="Bruno Massaccesi" className="fotoI" />
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
                    <img src="../src/Imagenes/messi.jpg" alt="Nicolas Blaser" className="fotoI" />
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

        </>
    )
}

export default Informacion
