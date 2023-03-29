import React from 'react-native';
import { App as APP } from './src/App';
import { GlobalContext } from './src/global-context/GlobalContext';
import { useGlobalContext } from './src/global-context/use-global-context';

export default () => {
  const globalContext = useGlobalContext();

  return (
    <GlobalContext.Provider value={globalContext}>
      <APP />
    </GlobalContext.Provider>
  );
};
