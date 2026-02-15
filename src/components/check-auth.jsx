import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export const CheckAuth = ({ children }) => {
  const { isLoading, error } = useFetch("/auth/me");

  const navigate = useNavigate();

  useEffect(() => {
    if (error === 401) {
      navigate("/login");
    }
  }, [error, navigate]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return children;
};
