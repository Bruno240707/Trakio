import "./Empleados.css";
import Empleado from "../Empleado/Empleado";

const Empleados = ({ empleados }) => {
  return (
    <>
      {empleados.map((empleado) => (
        <Empleado key={empleado.id} empleado={empleado} />
      ))}
    </>
  );
};

export default Empleados;
