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
import CustomerLayout from "../layouts/CustomerLayout";
import Rooms from "../pages/Rooms/Rooms";
import Search from "../pages/Search/Search";
import Details from "../pages/Details/Details";
import ProfileCus from "../pages/ProfileCus/ProfileCus";
import Pay from "../pages/Pay";
import AdminLayout from "../layouts/AdminLayout";
import Admin from "../pages/Admin/Admin";
import ListCus from "../pages/ListCus/ListCus";
import ListEmployee from "../pages/ListEmployee/ListEmployee";
import AddEmployee from "../pages/AddEmployee/AddEmployee";
import UpdateEmployee from "../pages/UpdateEmployee/UpdateEmployee";
import RevenueReport from "../pages/RevenueReport/RevenueReport";
import DensityReport from "../pages/DensityReport/DensityReport";

//public routes
const publicRoutes = [
    { path: config.routes.login, component: Login, layout: AuthLayout },
    { path: config.routes.register, component: Register, layout: AuthLayout },
];

// //customer routes
const customerRoutes = [
    { path: config.routes.home, component: Home, layout: CustomerLayout },
    { path: config.routes.rooms, component: Rooms, layout: CustomerLayout },
    { path: config.routes.search, component: Search, layout: CustomerLayout },
    { path: config.routes.detail, component: Details, layout: CustomerLayout },
    { path: config.routes.profile, component: ProfileCus, layout: CustomerLayout },
    { path: config.routes.pay, component: Pay, layout: CustomerLayout },
];

//staff routes
const managerRoutes = [
    { path: config.routes.manager, component: Manage, layout: ManagerLayout },
    { path: config.routes.addroom, component: AddRoom, layout: ManagerLayout },
    { path: config.routes.listroom, component: ListRoom, layout: ManagerLayout },
    { path: config.routes.editroom, component: UpdateRoom, layout: ManagerLayout },
    { path: config.routes.revenuereport, component: RevenueReport, layout: ManagerLayout },
    { path: config.routes.densityreport, component: DensityReport, layout: ManagerLayout },
];

//admin routes
const adminRoutes = [
    { path: config.routes.admin, component: Admin, layout: AdminLayout },
    { path: config.routes.listcus, component: ListCus, layout: AdminLayout },
    { path: config.routes.listemployee, component: ListEmployee, layout: AdminLayout },
    { path: config.routes.addemployee, component: AddEmployee, layout: AdminLayout },
    { path: config.routes.editemployee, component: UpdateEmployee, layout: AdminLayout },
];

export { publicRoutes, customerRoutes, managerRoutes, adminRoutes };
