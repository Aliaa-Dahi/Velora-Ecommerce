import Cookies from "js-cookie";
import { Navigate, Outlet } from "react-router-dom";


const ProtectedRoutes = () => {
  if (Cookies.get("token")) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoutes;
