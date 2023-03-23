import * as React from 'react';

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
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const { deps } = options
  const fetchData = React.useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await request();
      setData(result);
    } catch (e: any) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [request])

  React.useEffect(() => {
    fetchData()
  }, [...deps])

  return { loading, data, error, fetchData };
}

export default useRequest;
