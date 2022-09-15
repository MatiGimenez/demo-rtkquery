import React from "react";
import { getTypeBadgeColor } from "../../../../helpers/typeBadgeColor";

const TypeBadge = ({ type }) => {
  const {bg} = getTypeBadgeColor(type)
  return (
    <div className={`badge badge-lg badge-outline ${bg}`}>
      <span className={`font-bold`}>{type}</span>
    </div>
  );
};

export default TypeBadge;
