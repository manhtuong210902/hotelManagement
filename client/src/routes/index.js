import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Manage from "../pages/Manage/Manage";
import config from "../config";
import AuthLayout from "../layouts/AuthLayout";
import ManagerLayout from "../layouts/ManagerLayout";

//public routes
const publicRoutes = [
    { path: config.routes.login, component: Login, layout: AuthLayout },
    { path: config.routes.register, component: Register, layout: AuthLayout },
];

// //customer routes
const customerRoutes = [{ path: config.routes.home, component: Home, layout: ManagerLayout }];

//staff routes
const managerRoutes = [{ path: config.routes.manager, component: Manage, layout: ManagerLayout }];

export { publicRoutes, customerRoutes, managerRoutes };
