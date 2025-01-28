import React from "react";
import { MdAdd } from "react-icons/md";
import { HiMiniServer } from "react-icons/hi2";

const ServerList = () => {
  return (
    <>
      <div className="serverList">
        <div className="toggle">
          <label className="switch">
            <input type="checkbox" />
            <span className="slider"></span>
          </label>
        </div>
        <div className="serverDiv">
          <MdAdd className="addServerBtn" />
          <p>add server</p>
        </div>
        <div className="serverDiv">
          <HiMiniServer className="serverBtn" />
          <p>server 1</p>
        </div>
        <div className="serverDiv">
          <HiMiniServer className="serverBtn" />
          <p>server 2</p>
        </div>
        <div className="serverDiv">
          <HiMiniServer className="serverBtn" />
          <p>server 3</p>
        </div>
        <div className="serverDiv">
          <HiMiniServer className="serverBtn" />
          <p>server 4</p>
        </div>
      </div>
    </>
  );
};

export default ServerList;
