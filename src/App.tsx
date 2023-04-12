import "./index.css";
import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useLocation } from "react-router";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./components/home/home";
import SignUp from "./components/signup/signup";
import Dashboard from "./components/dashboard/dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./components/not-found/not-found";

const RedirectToDashboardIfLoggedIn: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cookies] = useCookies(["refreshToken"]);

  useEffect(() => {
    document.title = "NN – Redirecting";
    if (location.pathname === "/") {
      if (cookies.refreshToken) {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/home", { replace: true });
      }
    }
  }, [navigate, cookies, location]);

  return null;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectToDashboardIfLoggedIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
