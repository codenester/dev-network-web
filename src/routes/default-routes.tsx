import { createBrowserRouter } from "react-router-dom";
import Setting from "../pages/setting";
import Dashboard from "../pages/dashboard";

export default createBrowserRouter([
  {
    path: '/',
    id: 'home',
    element: <Dashboard />
  }, {
    path: '/setting',
    id: 'setting',
    element: <Setting />,
    children: []
  }
])