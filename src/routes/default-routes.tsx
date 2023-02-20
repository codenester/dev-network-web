import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home";
import Setting from "../pages/setting";

export default createBrowserRouter([
  {
    path: '/',
    id: 'home',
    element: <Home />
  }, {
    path: '/setting',
    id: 'setting',
    element: <Setting />,
    children: []
  }
])