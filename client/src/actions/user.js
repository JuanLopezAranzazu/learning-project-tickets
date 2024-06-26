import axios from "../api/axios";
import swal from "sweetalert";

export const loginUser = (user) => {
  return {
    type: "LOGIN_USER",
    payload: user,
  };
};

export const logoutUser = () => {
  return {
    type: "LOGOUT_USER",
  };
};

export const startLoginUser = (formData, redirect) => {
  return (dispatch) => {
    axios
      .post("/auth/login", formData)
      .then((response) => {
        if (response.data.hasOwnProperty("errors")) {
          // mostrar errores
          console.log(response?.data.errors);
          swal(response.data.errors);
        } else {
          console.log(response?.data);
          // mostrar mensaje de éxito
          swal("Inicio de sesión exitoso");
          // guardar token en localStorage
          localStorage.setItem("authToken", response.data.token);
          dispatch(loginUser(response.data.user));
          redirect(); // redirigir a la página de inicio
        }
      })
      .catch((err) => {
        swal(err.message);
      });
  };
};

export const startLogoutUser = (redirect) => {
  return (dispatch) => {
    axios
      .delete("/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response?.data);
        // mostrar mensaje de éxito
        swal("Cierre de sesión exitoso");
        // eliminar token de localStorage
        localStorage.removeItem("authToken");
        dispatch(logoutUser());
        redirect(); // redirigir a la página de inicio
      })
      .catch((err) => {
        swal(err.message);
      });
  };
}
