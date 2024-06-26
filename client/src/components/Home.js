import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
// actions
import { startLogoutUser } from "./../actions/user";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(startLogoutUser(() => navigate("/login")));
  };

  return (
    <section>
      <h1>Home</h1>
      <button onClick={handleClick}>Cerrar sesion</button>
    </section>
  );
};

export default Home;
