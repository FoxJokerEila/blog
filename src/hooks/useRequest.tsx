import * as React from 'react';

interface UseRequestOptions<T> {
  request: () => Promise<T>;
  deps: any[]
}

type OptionsType<T> = {
  deps: any[]
  initialValue?: T
  delay?: number
}

function useRequest<T>(
  request: (params?: any) => Promise<T>,
  options: OptionsType<T> = {
    deps: [],
    initialValue: undefined,
    delay: 0
  }
) {
  const { deps, initialValue, delay } = options
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<T | undefined>(initialValue);
  const [error, setError] = React.useState<Error | null>(null);

  const fetchData = React.useCallback(async (params?: any) => {
    setLoading(true);
    setError(null);

    try {
      const result = await request(params);
      setData(result);
    } catch (e: any) {
      setError(e);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, delay)

    }
  }, [delay, request])

  React.useEffect(() => {
    fetchData()
  }, [...deps])

  return { loading, data, error, fetchData, setData };
}

export default useRequest;
