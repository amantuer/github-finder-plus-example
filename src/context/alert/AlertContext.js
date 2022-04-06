import {createContext,useReducer} from 'react';
import alertReducer from './AlertReducer';

const AlertContext = createContext();

export const AlertProvider = ({children}) => {
  const initialState = null;

  const [state, dispatch] = useReducer(alertReducer,initialState);//利用这个函数返回结果得到初始数据状态 和函数（之后要对数据处理）

  // Set an alert
  const setAlert = (msg,type) => {
    dispatch({
     type: 'SET_ALERT',
     payload: {msg,type}
    });

    setTimeout(() => dispatch({type: 'REMOVE_ALERT'}),3000);
  }

  return (<AlertContext.Provider value={{alert: state, setAlert}}>{children}</ AlertContext.Provider>);
}

export default AlertContext;