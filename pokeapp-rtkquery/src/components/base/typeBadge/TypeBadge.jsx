import React from "react";

const TypeBadge = ({ type, color }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={`badge badge-sm badge-outline`}
    >
      <span className={`font-black uppercase`}>{type}</span>
    </div>
  );
};

export default TypeBadge;
