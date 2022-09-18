import React from "react";

const PokeRowCardLoading = () => {
  return (
    <div className="border border-gray-400 card w-full bg-base-100 w-full mx-auto">
      <div className="p-2">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-700 h-12 w-12"></div>
          <div className="flex-1 flex items-center justify-center p-3">
            <div className="h-4 w-full bg-slate-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokeRowCardLoading;
