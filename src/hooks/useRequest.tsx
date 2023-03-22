import { useEffect, useState } from 'react';

interface UseRequestOptions<T> {
  request: () => Promise<T>;
  deps: any[]
}

type OptionsType = {
  deps: any[]
}

function useRequest<T>(
  request: () => Promise<T>,
  options: OptionsType = {
    deps: []
  }
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const { deps } = options

  useEffect(() => {
    let mounted = true;
    let timer: NodeJS.Timeout | null = null;

    async function fetchData() {
      setLoading(true);
      setError(null);

      try {
        const result = await request();
        if (mounted) {
          setData(result);
          // onSuccess?.(result);
        }
      } catch (e: any) {
        if (mounted) {
          setError(e);
          // onError?.(e);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    // const handleRequest = () => {
    //   if (debounceDelay > 0) {
    //     if (timer) {
    //       clearTimeout(timer);
    //     }
    //     timer = setTimeout(fetchData, debounceDelay);
    //   } else if (throttleDelay > 0) {
    //     if (!timer) {
    //       timer = setTimeout(() => {
    //         timer = null;
    //         fetchData();
    //       }, throttleDelay);
    //     }
    //   } else {
    //     fetchData();
    //   }
    // };

    // handleRequest();
    fetchData()
    return () => {
      mounted = false;
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [...deps]);

  return { loading, data, error };
}

export default useRequest;
