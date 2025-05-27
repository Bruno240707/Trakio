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

                <button class="vista-general">
                    Vista General <span class="arrow">➔</span>
                </button>
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