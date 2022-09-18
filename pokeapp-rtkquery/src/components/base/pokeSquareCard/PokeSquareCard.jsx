import React from "react";
import { XMarkIcon } from "@heroicons/react/24/solid";

const PokeSquareCard = ({
  image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
  className = "",
  onClickClose = () => null,
}) => {
  return (
    <div
      className={`overflow-visible relative border border-gray-400 card w-15 h-15 bg-base-100 ${className}`}
    >
      <div className="p-1 flex items-center justify-start">
        <img className="w-full" src={image} />
        <button
          onClick={onClickClose}
          className="flex btn btn-circle btn-xs absolute top-[-10px] right-[-10px] items-center justify-center"
        >
          <XMarkIcon className="text-red-500 w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default PokeSquareCard;
