import { useCallback, useEffect, useState } from "react";
import { axios } from "../lib/axios";

export const useFetch = (endpoint) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetch = useCallback(async () => {
    try {
      setIsLoading(true);

      const res = await axios.get(endpoint);
      setData(res.data);
    } catch (error) {
      setError(error.message);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [endpoint]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { data, refetch: fetch, isLoading, error };
};
