import { Routes, Route } from "react-router-dom";
// components
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Home from "./components/Home";
import Missing from "./components/Missing";
import Login from "./components/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* rutas publicas */}
        <Route path="login" element={<Login />} />
        {/* rutas privadas */}
        <Route element={<RequireAuth allowedRoles={["admin"]} />}>
          <Route path="" element={<Home />} />
        </Route>
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
