import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
// redux
import { useDispatch } from "react-redux";
// actions
import { startLoginUser } from "./../actions/user";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(startLoginUser({ email, password }, () => navigate(from)));
  };

  return (
    <section>
      <h1>Inicio de sesion</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Correo</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar sesion</button>
      </form>
      <Link to="/register">Registrarse</Link>
    </section>
  );
};

export default Login;
