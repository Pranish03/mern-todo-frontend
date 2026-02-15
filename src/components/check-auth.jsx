import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";

export const CheckAuth = ({ children }) => {
  const { data, isLoading } = useFetch("/auth/me");

  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !data?.data?.user) {
      navigate("/login");
    }
  }, [data, isLoading, navigate]);

  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return children;
};
