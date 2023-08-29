import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import ThemeRoutes from "./routes/Router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        {ThemeRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Routes>
        <ToastContainer />
    </BrowserRouter>
  );

};

export default App;
