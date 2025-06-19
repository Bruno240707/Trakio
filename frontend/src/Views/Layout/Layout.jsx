
import "./Layout.css"
import { Link, Outlet } from "react-router-dom";
import HeaderActivo from "../../Componentes/HeaderActivo"
import HeaderInactivo from "../../Componentes/HeaderInactivo"
import Footer from "../../Componentes/footer"


const Layout = ({cuentaActiva, setCuentaActiva}) => {
    return (
        <>
            {cuentaActiva ?  <HeaderActivo cuentaActiva={cuentaActiva} setCuentaActiva={setCuentaActiva}/> : <HeaderInactivo/>}
            <div style={{ paddingTop: "80px", minHeight: "100vh" }}>
            <Outlet></Outlet>

            <Footer></Footer>
            </div>
        </>
    )
}

export default Layout