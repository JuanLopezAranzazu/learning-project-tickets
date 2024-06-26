// import React from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App";
// // routes
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// // context
// import { AuthProvider } from "./context/AuthProvider";

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <React.StrictMode>
//     <AuthProvider>
//       <Router>
//         <Routes>
//           <Route path="/*" element={<App />} />
//         </Routes>
//       </Router>
//     </AuthProvider>
//   </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// routes
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// redux
import configureStore from "./store/configureStore";
import { Provider } from "react-redux";

const store = configureStore();
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);
