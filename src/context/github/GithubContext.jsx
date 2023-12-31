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
    user: {},
    repos: [],
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

  //한 명 유저 찾기
  const getUser = async (login) => {
    setLoading(); //로딩상태 true

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });

    //만약 찾지 못했을 경우(404) -> notfound 페이지로 이동
    //결과가 있을 경우 dispatch로 user를 업데이트한다
    if (response.status === 404) {
      window.loading = "/notfound";
    } else {
      const data = await response.json();
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //유저의 레포 가져오기
  const getUserRepos = async (login) => {
    setLoading(); //로딩상태 true

    //최근 생성일자를 기준으로 10개 가져오기
    const params = new URLSearchParams({
      sort: "created",
      per_page: 10,
    });
    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        headers: {
          Authorization: `token ${GITHUB_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    dispatch({
      type: "GET_REPOS",
      payload: data,
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
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
