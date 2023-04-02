import * as React from 'react';

interface UseRequestOptions<T> {
  request: () => Promise<T>;
  deps: any[]
}

type OptionsType<T> = {
  deps: any[]
  initialValue?: T
}

function useRequest<T>(
  request: (params?: any) => Promise<T>,
  options: OptionsType<T> = {
    deps: [],
    initialValue: undefined
  }
) {
  const { deps, initialValue } = options
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>(initialValue);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(async (params?: any) => {
    setLoading(true);
    setError(null);

    try {
      const result = await request(params);
      console.log({ result })
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

  return { loading, data, error, fetchData, setData };
}

export default useRequest;
