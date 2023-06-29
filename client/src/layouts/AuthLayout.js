import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import config from "../config";

function AuthLayout({ children }) {
    const user = useSelector((state) => state.auth.user);

    if (user) {
        if (user.isManager) {
            return <Navigate to={config.routes.manager} />;
        } else if (user.isAdmin) {
            console.log("admin");
            return <Navigate to={config.routes.admin} />;
        }

        console.log("not admin");
        return <Navigate to={config.routes.home} />;
    }

    return <div className="auth-container">{children}</div>;
}

export default AuthLayout;
