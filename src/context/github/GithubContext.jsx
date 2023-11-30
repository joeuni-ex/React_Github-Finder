import { createContext, useState } from "react";

const GithubContext = createContext();

const GITHUB_URL = import.meta.env.VITE_GITHUB_URL;
const GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN;

export const GithubProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); //시작 시 깃허브에서 데이터를 가져옴(작업중 true)

  const fetchUsers = async () => {
    //onsole.log(`${import.meta.env.VITE_GITHUB_TOKEN}/users`);
    const response = await fetch(`${GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    setUsers(data);
    setLoading(false); // 데이터 로딩 완료(false)
  };

  return (
    <GithubContext.Provider
      value={{
        users,
        loading,
        fetchUsers,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
