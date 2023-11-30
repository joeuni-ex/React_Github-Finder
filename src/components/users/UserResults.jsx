import { useEffect, useState } from "react";
import Spinner from "../layout/Spinner";

function UserResults() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); //시작 시 깃허브에서 데이터를 가져옴(작업중 true)

  useEffect(() => {
    fetchUsers();
  }, []); //앱 시작시 실행됨

  const fetchUsers = async () => {
    //onsole.log(`${import.meta.env.VITE_GITHUB_TOKEN}/users`);
    const response = await fetch(`${import.meta.env.VITE_GITHUB_URL}/users`, {
      headers: {
        Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
      },
    });
    const data = await response.json();

    setUsers(data);
    setLoading(false); // 데이터 로딩 완료(false)
  };
  if (!loading) {
    return (
      <div className="grid grid-cols-8 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <h3 key={user.id}>{user.login}</h3>
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
