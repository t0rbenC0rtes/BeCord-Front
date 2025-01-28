import { FaUserCircle } from "react-icons/fa";

const UserList = () => {
  return (
    <div className="userList">
      <div className="userDiv">
        <p>user 1</p>
        <FaUserCircle className="userIcon" />
      </div>
      <div className="userDiv">
        <p>user 2</p>
        <FaUserCircle className="userIcon" />
      </div>
      <div className="userDiv">
        <p>user 3</p>
        <FaUserCircle className="userIcon" />
      </div>
      <div className="userDiv">
        <p>user 4</p>
        <FaUserCircle className="userIcon" />
      </div>
      <div className="userDiv">
        <p>user 5</p>
        <FaUserCircle className="userIcon" />
      </div>
    </div>
  );
};

export default UserList;
