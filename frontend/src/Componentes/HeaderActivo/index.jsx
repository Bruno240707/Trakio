import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="left-section">
       <div className="barra-lateral"></div>
       <Link to={"/"}> <p className="logo-text">TRAKIO</p></Link>
      </div>
    </header>
  );
};

export default Header;
