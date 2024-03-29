import "./App.scss";
import "./custom.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { managerRoutes, customerRoutes, publicRoutes, adminRoutes } from "./routes";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
const ROLES = {
    User: "User",
    Manager: "Manager",
    Admin: "Admin",
};

function App() {
    const initialOptions = {
        "client-id": "AWO48qyUitVQoS7Y_3Uiw4tnqzm5rpyDBcoO-AVJFDjXbIFZuWXZ-hZgPNpD9XuwU_KaTNXg-6rmrWnS",
        currency: "USD",
        intent: "capture",
    };

    return (
        <PayPalScriptProvider options={initialOptions}>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            const Layout = route.layout;
                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}

                        <Route element={<PrivateRoute allowedRoles={[ROLES.Admin]} />}>
                            {adminRoutes.map((route, index) => {
                                const Page = route.component;
                                const Layout = route.layout;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>

                        <Route element={<PrivateRoute allowedRoles={[ROLES.Manager, ROLES.Admin]} />}>
                            {managerRoutes.map((route, index) => {
                                const Page = route.component;
                                const Layout = route.layout;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>

                        <Route element={<PrivateRoute allowedRoles={[ROLES.User]} />}>
                            {customerRoutes.map((route, index) => {
                                const Page = route.component;
                                const Layout = route.layout;
                                return (
                                    <Route
                                        key={index}
                                        path={route.path}
                                        element={
                                            <Layout>
                                                <Page />
                                            </Layout>
                                        }
                                    />
                                );
                            })}
                        </Route>
                    </Routes>
                </div>
            </Router>
        </PayPalScriptProvider>
    );
}

export default App;
