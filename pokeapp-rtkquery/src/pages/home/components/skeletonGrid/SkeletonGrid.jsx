import React from "react";

const MainCardSkeleton = () => {
  const BG_COLOR = "bg-gray-500";
  return (
    <div className="animate-pulse border-2 p-4 max-w-[220px] max-h-72 card">
      <div className={`w-full h-44 ${BG_COLOR} rounded-xl`}></div>
      <div className="flex flex-col w-full mt-4 items-end">
        <div className={`w-full ${BG_COLOR} h-6 rounded-md mb-3`}></div>
        <div className={`w-24 ${BG_COLOR} h-6 rounded-md`}></div>
      </div>
    </div>
  );
};

const SkeletonGrid = ({ length = 6 }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,_1fr))] gap-4">
      {Array.from({ length }, (v, i) => i).map((e) => (
        <MainCardSkeleton key={e} />
      ))}
    </div>
  );
};

export default SkeletonGrid;
