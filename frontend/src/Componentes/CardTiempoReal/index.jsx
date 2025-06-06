import "./CardTiempoReal.css"

const CardTiempoReal = ({hora, nombre, tipo}) =>{
    return (
        <>
        <div className="card-tiempo">
            <span className="hora">{hora}</span>
            <div className="circulo">
                <span className="x">✕</span>
            </div>
            <div className="info">
                <p className="nombre">{nombre}</p>
                <p className={`tipo ${tipo.toLowerCase()}`}>{tipo}</p>
            </div>
        </div>
        </>
    )
}

export default CardTiempoReal