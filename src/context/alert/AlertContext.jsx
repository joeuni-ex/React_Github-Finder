import { createContext, useReducer } from "react";
import AlertReducer from "./AlertReducer";

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const initialState = null;

  //문자열 경고창 내용
  const [state, dispatch] = useReducer(AlertReducer, initialState);

  //경고창 메세지를 설정하고 3초뒤 제거함
  //msg => 메세지 type=> AlertReducer에 지정한 타입
  const setAlert = (msg, type) => {
    dispatch({
      type: "SET_ALERT",
      payload: { msg: msg, type: type }, // {msg,type}으로 생략가능함
    });

    setTimeout(() => dispatch({ type: "REMOVE_ALERT" }), 3000);
  };

  return (
    <AlertContext.Provider
      value={{
        alert: state,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
