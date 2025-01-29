import React from "react";
import { GrGroup } from "react-icons/gr";
import { RiGroupLine } from "react-icons/ri";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Toggles = ({ showLists, toggleLists }) => {
  return (
    <div className="toggle">
      {/* Placeholder for future functionality */}
      <div className="serverToggle">
        <GrGroup />
        <label className="switch">
          <input type="checkbox" />
          <span className="slider"></span>
        </label>
        <RiGroupLine />
      </div>

      {/* Controls UserList and ServerList visibility */}
      <div className="userToggle">
        <FaEyeSlash />
        <label className="switch">
          <input 
            type="checkbox" 
            checked={showLists} 
            onChange={toggleLists} 
          />
          <span className="slider"></span>
        </label>
        <FaEye />
      </div>
    </div>
  );
};

export default Toggles;
