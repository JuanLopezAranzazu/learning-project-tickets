// import { useLocation, Navigate, Outlet } from "react-router-dom";
// // hooks
// import useAuth from "../hooks/useAuth";

// // Componente para verificar si el usuario tiene los roles requeridos
// const RequireAuth = ({ allowedRoles }) => {
//   const { auth } = useAuth();
//   const location = useLocation();

//   console.log(auth, auth?.userRoles);

//   return auth?.userRoles?.find((role) => allowedRoles?.includes(role)) ? (
//     <Outlet />
//   ) : auth?.user ? (
//     <Navigate to="/unauthorized" state={{ from: location }} replace />
//   ) : (
//     <Navigate to="/login" state={{ from: location }} replace />
//   );
// };

// export default RequireAuth;

import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

// Componente para verificar si el usuario tiene los roles requeridos
const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const user = useSelector((state) => state.user);

  console.log(user, user?.role?.name);

  return allowedRoles?.includes(user?.role?.name) ? (
    <Outlet />
  ) : user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
