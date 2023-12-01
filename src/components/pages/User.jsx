import React, { useContext, useEffect } from "react";
import GithubContext from "../../context/github/GithubContext";
import { useParams } from "react-router-dom";

const User = () => {
  const { user, getUser } = useContext(GithubContext);
  //path파라미터로 유저 아이디가 넘어옴
  const params = useParams();
  console.log(params);

  //최초 1회 실행
  useEffect(() => {
    getUser(params.login);
  }, []);

  return (
    <h3>
      {user.login}, {user.id}
    </h3>
  );
};

export default User;
