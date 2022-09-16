import React from "react";
import { getTypeBadgeColor } from "../../../../helpers/typeBadgeColor";

const TypeBadge = ({ type, color }) => {
  return (
    <div
      style={{ backgroundColor: color }}
      className={`badge badge-sm badge-outline`}
    >
      <span className={`font-bold`}>{type}</span>
    </div>
  );
};

export default TypeBadge;
