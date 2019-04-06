import { createStore } from 'redux';
import modules from './modules';

const configure = () => {
  // const store = createStore(modules); // 일반적인 방법
  
  const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  const store = createStore(modules, devTools);

  return store;
}

export default configure;