import { useEffect, useMemo, useState } from "react";

interface State<T> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export function useFetch<T = unknown>(
  url: string,
  options?: RequestInit
): State<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);
  const endpoint = useMemo(
    () => `${process.env.REACT_APP_API_URL}${url}`,
    [url]
  );

  useEffect(() => {
    if (!url) return;

    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch(endpoint, {
          signal: abortController.signal,
          ...options,
        });

        if (!response.ok) {
          setLoading(false);

          throw new Error(
            `<p>${response.status} (${response.statusText})</p>
            <p>Endpoint URL: ${response.url}</p>
            <p>Could not fetch the data 🤷‍♀️</p>`
          );
        }

        const data = (await response.json()) as T;

        console.log("response", response);
        console.log("data", data);

        setData(data);
        setLoading(false);
        setError(null);
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          setError(error as Error);
          setLoading(false);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [endpoint, options]);

  return { data, error, loading };
}
