import { useEffect } from "react";
import { useFetch } from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "./page-loader";

export const GuestOnly = ({ children }) => {
  const { data, isLoading } = useFetch("/auth/me");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && data?.data?.user) {
      navigate("/");
    }
  }, [data, isLoading, navigate]);

  if (isLoading) {
    return <PageLoader />;
  }

  return children;
};
