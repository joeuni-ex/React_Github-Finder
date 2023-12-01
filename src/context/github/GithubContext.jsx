import { createContext, useReducer } from "react";
import githubReducer from "./GithubReducer.js";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  // const [users, setUsers] = useState([]);
  //const [loading, setLoading] = useState(true); //시작 시 깃허브에서 데이터를 가져옴(작업중 true)

  const initialState = {
    users: [],
    loading: false, //초기값
  };
  //리듀서 사용
  const [state, dispatch] = useReducer(githubReducer, initialState);

  //특정 단어로 유저 찾기
  const searchUsers = async (text) => {
    setLoading(); //로딩상태 true

    //url 주소의 끝에 쿼리스트링을 만든다.(q=text)
    const params = new URLSearchParams({
      q: text,
    });

    //onsole.log(`${import.meta.env.VITE_GITHUB_TOKEN}/users`);
    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const { items } = await response.json();

    // setUsers(data);
    // setLoading(false); // 데이터 로딩 완료(false)

    dispatch({
      type: "GET_USERS",
      payload: items,
      loading: false,
    });
  };
  //로딩상태를 true로 업데이트하기 위한 dispatch
  const setLoading = () =>
    dispatch({
      type: "SET_LOADING",
    });

  //검색 클리어
  const clearUsers = () =>
    dispatch({
      type: "CLEAR_USERS",
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        searchUsers,
        clearUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
