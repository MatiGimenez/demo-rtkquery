import React from "react";

const PokeRowCard = ({
  image = "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/025.png",
  name = "pikachu",
  color = "#eed536",
  className,
}) => {
  return (
    <div
      className={`border border-gray-400 card w-40 bg-base-100 ${className}`}
    >
      <div className="p-2 flex items-center justify-start">
        <img className="w-10 h-10" src={image} />
        <p style={{ color }} className="ml-2 text-md capitalize">
          {name}
        </p>
      </div>
    </div>
  );
};

export default PokeRowCard;
