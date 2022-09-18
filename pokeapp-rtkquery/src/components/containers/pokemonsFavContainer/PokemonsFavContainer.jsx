import React from "react";
import { FAVOURITES_ARGS_QUERY } from "../../../constants";
import { useGetPokemonsQuery } from "../../../store/slices/pokemonApi";
import PokeRowCardLoading from "../../base/pokeRowCard/PokeRowCardLoading";
import PokeRowCard from "../../base/pokeRowCard/PokeRowCard";

const PokemonsFavContainer = () => {
  /**
   * GET Favourite Pokemons
   */
  const {
    data: { data: favPokemons = [] } = {},
    isLoading,
    isFetching,
  } = useGetPokemonsQuery(FAVOURITES_ARGS_QUERY);

  return (
    <>
      <h4 className="font-bold mb-5">Favoritos - {favPokemons.length}</h4>
      <div className="overflow-auto h-full">
        {favPokemons.map(({ id, attributes }) => (
          <PokeRowCard
            key={id}
            name={attributes?.name}
            color={attributes.types?.data?.[0]?.attributes?.color}
            image={attributes.image}
            className="mb-2"
          />
        ))}
        {(isFetching || isLoading) && <PokeRowCardLoading />}
      </div>
    </>
  );
};

export default PokemonsFavContainer;
