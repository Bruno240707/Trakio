# TODO: Fix Cookie Functionality for Authentication

## Overview
Add `credentials: "include"` to all fetch calls in the frontend and set up a Vite proxy to avoid Chrome's third-party cookie blocking between different ports on localhost.

## Steps
- [x] Edit frontend/vite.config.js to add proxy for /api to http://localhost:3001
- [x] Update fetch in frontend/src/Views/IniciarSesion/IniciarSesion.jsx: change URL to /api/login, add credentials: "include"
- [x] Update fetch in frontend/src/App.jsx: change URL to /api/getWorkers, add credentials: "include"
- [x] Update all fetches in frontend/src/Views/DashboardsGen/DashboardsGen.jsx: change URLs to /api/..., add credentials: "include" where missing
- [x] Update all fetches in frontend/src/Views/DashboardsInd/DashboardsInd.jsx: change URLs to /api/..., add credentials: "include" where missing
- [x] Update all fetches in frontend/src/Views/ConfiguracionView/ConfiguracionView.jsx: change URLs to /api/..., add credentials: "include" where missing
- [x] Update all fetches in frontend/src/Views/TiempoRealGen/TiempoRealGen.jsx: change URLs to /api/..., add credentials: "include" where missing
- [ ] Test the changes by running frontend and backend, logging in, and checking if cookies persist on refresh
