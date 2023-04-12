import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useLocation } from "react-router";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const [cookies] = useCookies(["refreshToken"]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !cookies.refreshToken &&
      location.pathname !== "/signup" &&
      location.pathname !== "/home"
    ) {
      navigate("/home", { replace: true });
    }
  }, [cookies, navigate, location]);

  return <>{cookies.refreshToken && children}</>;
};

export default ProtectedRoute;
