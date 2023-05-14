import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Home from "../pages/Home/Home";
import Manage from "../pages/Manage/Manage";
import config from "../config";
import AuthLayout from "../layouts/AuthLayout";
import ManagerLayout from "../layouts/ManagerLayout";
import AddRoom from "../pages/AddRoom/AddRoom";
import ListRoom from "../pages/ListRoom/ListRoom";
import UpdateRoom from "../pages/UpdateRoom/UpdateRoom";

//public routes
const publicRoutes = [
    { path: config.routes.login, component: Login, layout: AuthLayout },
    { path: config.routes.register, component: Register, layout: AuthLayout },
];

// //customer routes
const customerRoutes = [{ path: config.routes.home, component: Home, layout: ManagerLayout }];

//staff routes
const managerRoutes = [
    { path: config.routes.manager, component: Manage, layout: ManagerLayout },
    { path: config.routes.addroom, component: AddRoom, layout: ManagerLayout },
    { path: config.routes.listroom, component: ListRoom, layout: ManagerLayout },
    { path: config.routes.editroom, component: UpdateRoom, layout: ManagerLayout },
];

export { publicRoutes, customerRoutes, managerRoutes };
