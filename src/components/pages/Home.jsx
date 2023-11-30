import React from "react";
import UserResults from "../users/UserResults";
import UserSearch from "../users/UserSearch";

const Home = () => {
  return (
    <div>
      <UserSearch />
      <UserResults />
    </div>
  );
};

export default Home;
