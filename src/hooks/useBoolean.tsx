import * as React from 'react';

const useBoolean = (initialValue: boolean = false) => {
  const [state, setState] = React.useState<boolean>(initialValue)
  const setT = () => {
    setState(true)
  }
  const setF = () => {
    setState(false)
  }
  const toogle = () => {
    setState(!state)
  }

  return {
    state, setState, setT, setF, toogle
  }
}

export default useBoolean