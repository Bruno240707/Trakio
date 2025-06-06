import "./Informacion.css"

const Informacion = () => {
    return (
        <>
            <img src="../src/Imagenes/fondoInfo.png" alt="FondoInformacion" className="fondoInfo" />

            <div class="contenidoInfo">

                <h1 class="tituloInfo">Sobre Trako</h1>
                <h2 class="sloganInfo">La seguridad y la gestión, en un solo sistema.</h2>
                <h3 class="qInfo">¿Que somos?</h3>
                <p class="textoInfoL">Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente </p>
                <hr class="linea"></hr>
                <h3 class="qInfo">¿Quienes somos?</h3>

                <div class="card1">
                    <img src="../src/Imagenes/...." alt="Bruno Massaccesi" className="fotoIP1" />
                    <h1 class="rolI1">Ceo</h1>
                    <h2 class="nameCard1">Bruno Massaccesi</h2>
                    <button class="btnInfo" type="submit">Contacto</button>
                </div>

                <div class="card2">
                    <img src="../src/Imagenes/...." alt="Bruno Marasi" className="fotoIP2" />
                    <h1 class="rolI2">Ceo</h1>
                    <h2 class="nameCard2">Bruno Marasi</h2>
                    <button class="btnInfo" type="submit">Contacto</button>
                </div>

                <div class="card3">
                    <img src="../src/Imagenes/...." alt="Nicolas Blaser" className="fotoIP3" />
                    <h1 class="rolI3">Ceo</h1>
                    <h2 class="nameCard3">Nicolas Blaser</h2>
                    <button class="btnInfo" type="submit">Contacto</button>
                </div>

                <div class="card4">
                    <img src="../src/Imagenes/...." alt="Salvador Soncini" className="fotoIP4" />
                    <h1 class="rolI4">Ceo</h1>
                    <h2 class="nameCard4">Salvador Soncini</h2>
                    <button class="btnInfo" type="submit">Contacto</button>
                </div>


            </div>

        </>
    )
}

export default Informacion
