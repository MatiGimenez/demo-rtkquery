import React from "react";
import { FAVOURITES_ARGS_QUERY } from "../../constants";
import {
  useGetPokemonsQuery,
  useGetTeamQuery,
} from "../../store/slices/pokemonApi";
import MainPokeCard from "./components/mainPokeCard/MainPokeCard";
import PokeRowCard from "./components/pokeRowCard/PokeRowCard";
import PokeRowCardLoading from "./components/pokeRowCard/PokeRowCardLoading";
import PokeSquareCard from "./components/pokeSquareCard/PokeSquareCard";

const Home = () => {
  const { data: { data: pokemons } = {}, isLoading } = useGetPokemonsQuery();
  const {
    data: { data: favPokemons = [] } = {},
    isLoading: isLoadingFavourites,
    isFetching: isFetchingFavourites,
  } = useGetPokemonsQuery(FAVOURITES_ARGS_QUERY);
  const { data: { data: pokemonTeam } = {}, isLoading: isLoadingTeam } =
    useGetTeamQuery();

  if (isLoading) {
    return (
      <div className="w-60 h-24 border-2 rounded-md mx-auto mt-20">
        <div className="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
          <div className="w-12 bg-gray-300 h-12 rounded-full "></div>
          <div className="flex flex-col space-y-3">
            <div className="w-36 bg-gray-300 h-6 rounded-md"></div>
            <div className="w-24 bg-gray-300 h-6 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,_1fr))] gap-4 flex-1">
        {pokemons &&
          pokemons?.map(({ id, attributes }) => {
            const { types, ...rest } = attributes;
            return (
              <MainPokeCard key={id} id={id} types={types?.data} {...rest} />
            );
          })}
      </div>
      <div className="w-40">
        <div className="fixed">
          <div className="p-5">
            <h4 className="font-bold mb-5">Equipo</h4>
            <div className="grid grid-cols-3 gap-2 justify-items-center">
              {(pokemonTeam?.attributes?.pokemons?.data || []).map(
                ({ id, attributes }) => (
                  <PokeSquareCard
                    key={id}
                    name={attributes.name}
                    color={attributes.types?.data?.[0]?.attributes?.color}
                    image={attributes.image}
                  />
                )
              )}
            </div>
          </div>
          <div className="p-5">
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
              {(isFetchingFavourites || isLoadingFavourites) && (
                <PokeRowCardLoading />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
