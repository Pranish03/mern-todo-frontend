import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { AuthContext } from "../context/auth-context";
import { PageLoader } from "./page-loader";

export const CheckAuth = ({ children }) => {
  const { data, isLoading, error } = useFetch("/auth/me");

  const navigate = useNavigate();

  useEffect(() => {
    if (error === 401) {
      navigate("/login");
    }
  }, [error, navigate]);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <AuthContext.Provider value={data?.data?.user}>
      {children}
    </AuthContext.Provider>
  );
};
