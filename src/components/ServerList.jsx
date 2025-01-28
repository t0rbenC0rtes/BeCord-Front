import React from "react";
import { MdAdd } from "react-icons/md";
import { HiMiniServer } from "react-icons/hi2";

const ServerList = () => {
  return (
    <div className="serverList">
      <MdAdd className="addServerBtn" />
      <HiMiniServer className="serverBtn" />
      <HiMiniServer className="serverBtn" />
      <HiMiniServer className="serverBtn" />
      <HiMiniServer className="serverBtn" />
    </div>
  );
};

export default ServerList;
