import * as React from 'react';
import { useLocation } from 'react-router-dom';

const useSearch = () => {
  const [search, setSearch] = React.useState<any>()
  const location = useLocation()

  const searchFinder = React.useCallback((key: string) => {
    if (!search) return undefined
    if (search.hasOwnProperty(key)) return search[key]
    return undefined
  }, [search])

  React.useEffect(() => {
    if (location.search.length === 0) {
      setSearch({})
      return
    }
    const obj = {}
    location.search.slice(1).split('&').forEach((item) => {
      const [key, value] = item.split('=')
      Object.defineProperty(obj, key, {
        value: value
      })
    })
    setSearch(obj)
  }, [location])

  return { search, searchFinder }
}

export default useSearch