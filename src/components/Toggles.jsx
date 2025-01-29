import React from "react";
import { GrGroup } from "react-icons/gr";
import { RiGroupLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Toggles = () => {
  return (
    <div className="toggle">
      <div className="serverToggle">
        <GrGroup />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
        <RiGroupLine />
      </div>
      <div className="userToggle">
        <FaEye />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
        <FaEyeSlash />
      </div>
    </div>
  );
};

export default Toggles;
