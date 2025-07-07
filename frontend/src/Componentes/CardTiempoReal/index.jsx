import "./CardTiempoReal.css"

const CardTiempoReal = ({hora, nombre, tipo, foto}) =>{
    return (
        <>
        <div className="card-tiempo">
            <span className="hora">{hora}</span>
                <img src={foto} className="x"/>
            <div className="info">
                <p className="nombre">{nombre}</p>
                <p className={`tipo ${tipo.toLowerCase()}`}>{tipo}</p>
            </div>
        </div>
        </>
    )
}

export default CardTiempoReal