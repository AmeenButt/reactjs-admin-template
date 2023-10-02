import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "assets/scss/argon-dashboard-react.scss";

import AdminLayout from "layouts/Admin.js";
import AuthLayout from "layouts/Auth.js";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AppState from "appState/state";
import basePath from "basePath";
import ErrorPage from "./views/errorPage/index";
const root = ReactDOM.createRoot(document.getElementById("root"));
window.addEventListener("unhandledrejection", (event) => {
  event.preventDefault(); 

});
function App() {
  return (
    <BrowserRouter>
      <AppState>
        <ToastContainer />
          {localStorage.getItem('jwt-token') ? (
            <Routes>
              <Route path={`/${basePath}/admin/*`} element={<AdminLayout />} />
              <Route path={`/${basePath}/error`} element={<ErrorPage />} />
              <Route path="*" element={<Navigate to={`/${basePath}/admin/*`} replace />} />
            </Routes>
          ) : (
            <Routes>
              <Route path={`/${basePath}/auth/*`} element={<AuthLayout />} />
              <Route path="*" element={<Navigate to={`/${basePath}/auth/*`} replace />} />
              <Route path={`/${basePath}/error`} element={<ErrorPage />} />
            </Routes>
          )}
      </AppState>
    </BrowserRouter>
  );
}

root.render(
  
  <App />
);
