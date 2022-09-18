import React from "react";
import TypeBadge from "../typeBadge/TypeBadge";
import LikedButton from "../likedButton/LikedButton";
import {
  useAddPokemonToTeamMutation,
  useFavouritePokemonMutation,
} from "../../../../store/slices/pokemonApi";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "react-router-dom";

const MainPokeCard = ({
  id,
  name = "",
  image = "",
  favourite = false,
  types = [],
  handleFavourite = () => null,
}) => {
  const [searchParams] = useSearchParams();
  const [doFavouritePokemon] = useFavouritePokemonMutation();
  const [addPokemonToTeam] = useAddPokemonToTeamMutation();

  const handleChangeLiked = (e) => {
    doFavouritePokemon({
      id,
      patch: { favourite: e.target.checked },
      searchParams: {
        page: searchParams.get("page"),
        pageSize: searchParams.get("pageSize"),
      },
    });
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
            <LikedButton onChange={handleFavourite} liked={favourite} />
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
      <button
        onClick={() => addPokemonToTeam(id)}
        className="border border-gray-400 btn btn-circle flex absolute top-0 right-0 items-center justify-center"
      >
        <PlusIcon className="w-6 h-6" />
      </button>
    </div>
  );
};

export default MainPokeCard;
