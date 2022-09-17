import React from "react";
import TypeBadge from "../typeBadge/TypeBadge";
import LikedButton from "../likedButton/LikedButton";
import { useFavouritePokemonMutation } from "../../../../store/slices/pokemonApi";

const MainPokeCard = ({
  id,
  name = "",
  image = "",
  favourite = false,
  types = [],
}) => {
  const [doFavouritePokemon] = useFavouritePokemonMutation();

  const handleChangeLiked = (e) => {
    doFavouritePokemon({ id, data: { favourite: e.target.checked } });
  };

  return (
    <div className="card bg-slate-900 shadow-xl p-4 max-w-[220px] max-h-72">
      <figure className="rounded-2xl overflow-hidden border-2">
        <img className="bg-zinc-800" src={image} alt={name || "Pokemon"} />
      </figure>
      <div className="card-body p-2">
        <div className="card-title justify-between">
          <h2 className="capitalize">{name}</h2>
          <div className="w-8 h-8 text-rose-500">
            <LikedButton onChange={handleChangeLiked} liked={favourite} />
          </div>
        </div>
        <div className="card-actions justify-end">
          {types.map(({ id, attributes }) => (
            <TypeBadge
              key={id}
              color={attributes.color}
              type={attributes.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPokeCard;
