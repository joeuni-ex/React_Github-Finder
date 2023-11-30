import PropTypes from "prop-types";
import { Link } from "react-router-dom";

//유저 객체를 avater_url과 login으로 분해함 user안에 있는 값임
function UserItem({ user: { avatar_url, login } }) {
  return (
    <div className="card shadow-md compact side bg-base-100">
      <div className="flex-row items-center space-x-4 card-body">
        <div>
          <div className="avatar">
            <div className="rounded-full shadow w-14 h-14">
              <img src={avatar_url} alt="Profile" />
            </div>
          </div>
        </div>
        <div>
          <h2 className="card-title">{login}</h2>
          <Link
            className="text-base-content text-opacity-40"
            to={`/user/${login}`}
          >
            프로파일 보기
          </Link>
        </div>
      </div>
    </div>
  );
}

//prop타입은 object
UserItem.propTypes = {
  user: PropTypes.object,
};

export default UserItem;
