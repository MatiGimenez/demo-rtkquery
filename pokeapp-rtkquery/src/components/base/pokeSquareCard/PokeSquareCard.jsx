import React from "react";

const PokeSquareCard = ({
  image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
  className,
}) => {
  return (
    <div
      className={`border border-gray-400 card w-15 h-15 bg-base-100 ${className}`}
    >
      <div className="p-1 flex items-center justify-start">
        <img className="w-full" src={image} />
      </div>
    </div>
  );
};

export default PokeSquareCard;
