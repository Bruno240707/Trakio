import { Link } from "react-router-dom"
import "./DashboardsInd.css"

const DashboardsInd = () => {

    return (
        <>
            <div class="container">
                <aside class="sidebar">
                <input class="dropdown" type="text" placeholder="Usuarios..."/>

                <ul class="user-list">
                    <li><button class="delete">✕</button> Marcelo Godoy</li>
                    <li><button class="delete">✕</button> Fran Marap</li>
                    <li><button class="delete">✕</button> Lionel Andres</li>
                    <li><button class="delete">✕</button> Eitan Mas</li>
                    <li><button class="delete">✕</button> Nicolas Blaser</li>
                    <li><button class="delete">✕</button> Marcelo Godoy</li>
                    <li><button class="delete">✕</button> Fran Marap</li>
                    <li><button class="delete">✕</button> Lionel Andres</li>
                    <li><button class="delete">✕</button> Eitan Mas</li>
                    <li><button class="delete">✕</button> Nicolas Blaser</li>
                    <li><button class="delete">✕</button> Marcelo Godoy</li>
                    <li><button class="delete">✕</button> Fran Marap</li>
                    <li><button class="delete">✕</button> Lionel Andres</li>
                    <li><button class="delete">✕</button> Eitan Mas</li>
                    <li><button class="delete">✕</button> Nicolas Blaser</li>
                    <li><button class="delete">✕</button> Marcelo Godoy</li>
                    <li><button class="delete">✕</button> Fran Marap</li>
                    <li><button class="delete">✕</button> Lionel Andres</li>
                    <li><button class="delete">✕</button> Eitan Mas</li>
                    <li><button class="delete">✕</button> Nicolas Blaser</li>
                </ul>

                <div class="vista-general">
                    <Link to={"/DashboardsGen"}>Vista General</Link>
                </div>
                </aside>

                <main class="main-content">
                <h1>Informacion de Empleado</h1>
                <div class="employee-card">
                    <div class="employee-header">
                    <button class="employee-name">Francisco Marapode</button>
                    <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="Empleado" class="employee-photo" />
                    </div>

                    <div class="grid">
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                        <div class="card"></div>
                    </div>
                </div>
                </main>
            </div>
        </>
    )
}

export default DashboardsInd


/*import { Link } from "react-router-dom";
import { useState } from "react";
import "./DashboardsInd.css";

const DashboardsInd = () => {
  const [users, setUsers] = useState([
    "Marcelo Godoy",
    "Fran Marap",
    "Lionel Andres",
    "Eitan Mas",
    "Nicolas Blaser",
    "Marcelo Godoy",
    "Fran Marap",
    "Lionel Andres",
    "Eitan Mas",
    "Nicolas Blaser",
    "Marcelo Godoy",
    "Fran Marap",
    "Lionel Andres",
    "Eitan Mas",
    "Nicolas Blaser",
    "Marcelo Godoy",
    "Fran Marap",
    "Lionel Andres",
    "Eitan Mas",
    "Nicolas Blaser",
  ]);

  const handleDelete = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
  };

  return (
    <>
      <div className="container">
        <aside className="sidebar">
          <input className="dropdown" type="text" placeholder="Usuarios..." />

          <ul className="user-list">
            {users.map((user, index) => (
              <li key={index}>
                <button className="delete" onClick={() => handleDelete(index)}>✕</button> {user}
              </li>
            ))}
          </ul>

          <div className="vista-general">
            <Link to={"/DashboardsGen"}>Vista General</Link>
          </div>
        </aside>

        <main className="main-content">
          <h1>Información de Empleado</h1>
          <div className="employee-card">
            <div className="employee-header">
              <button className="employee-name">Francisco Marapode</button>
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Empleado"
                className="employee-photo"
              />
            </div>

            <div className="grid">
              {Array.from({ length: 12 }).map((_, i) => (
                <div className="card" key={i}></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default DashboardsInd;
*/