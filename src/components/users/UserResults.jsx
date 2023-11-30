import { useContext, useEffect, useState } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
  //GithubContext에서 가져오기
  const { users, loading } = useContext(GithubContext);

  //테스트용 유저조회
  // useEffect(() => {
  //   fetchUsers();
  // }, []); //앱 시작시 실행됨

  if (!loading) {
    return (
      <div className="grid grid-cols-8 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  } else {
    return <Spinner />;
  }
}

export default UserResults;
