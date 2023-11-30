import React, { useContext, useState } from "react";
import GithubContext from "../../context/github/GithubContext";

const UserSearch = () => {
  const [text, setText] = useState(""); //검색어
  const { users, searchUsers } = useContext(GithubContext);

  //검색어 저장
  const handleChange = (e) => {
    setText(e.target.value);
  };

  //submit 시
  const handleSubmit = (e) => {
    e.preventDefault();

    if (text === "") {
      alert("내용을 입력해주세요");
    } else {
      //유저찾기
      searchUsers(text);
      setText("");
    }
  };
  return (
    <div
      className="grid grid-cols-1 xl:grid-cols-2 
          lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8"
    >
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                onChange={handleChange}
                value={text}
                type="text"
                className="w-full pr-40 bg-gray-200 input input-lg text-black"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      <div>
        {users.length > 0 && (
          <button className="btn btn-ghost btn-lg">Clear</button>
        )}
      </div>
    </div>
  );
};

export default UserSearch;
