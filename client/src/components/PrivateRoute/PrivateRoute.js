import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import config from "../../config";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loaderUser } from "../../redux/apiRequests";

function PrivateRoute({ allowedRoles }) {
    const dispatch = useDispatch();
    useEffect(() => {
        loaderUser(dispatch);
    }, [dispatch]);
    const roles = useSelector((state) => state.auth.roles);
    console.log(roles);

    return roles.find((role) => allowedRoles?.includes(role)) ? <Outlet /> : <Navigate to={config.routes.login} />;
}

export default PrivateRoute;
