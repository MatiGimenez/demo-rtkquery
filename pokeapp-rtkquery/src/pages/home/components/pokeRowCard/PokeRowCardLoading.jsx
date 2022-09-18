import React from "react";

const PokeRowCardLoading = () => {
  return (
    <div className="border border-gray-400 card w-40 bg-base-100 w-full mx-auto">
      <div className="p-2">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-10 w-10"></div>
          <div className="flex-1 flex items-center justify-center">
            <div className="h-2 w-full bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeRowCardLoading;
