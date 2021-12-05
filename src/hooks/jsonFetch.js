import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const useJsonFetch = (url = "", params = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  if (params.data instanceof FormData) {
    params.data = Object.fromEntries(params.body);
  }

  if (params.data && typeof params.body === "object") {
    params.data = JSON.stringify(params.body);
  }

  const fetchUrl = useCallback(async () => {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest",
      },
      ...params,
    };
    const response = await axios(url, options);
    const data = await response.json();

    setData(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchUrl();
  }, [url, params]);

  return [data, loading];
};

export { useJsonFetch };
