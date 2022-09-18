import React, { useState } from "react";
import { FAVOURITES_ARGS_QUERY } from "../../constants";
import {
  useGetPokemonsQuery,
  useGetTeamQuery,
} from "../../store/slices/pokemonApi";
import MainPokeCard from "./components/mainPokeCard/MainPokeCard";
import Pagination from "./components/pagination/Pagination";
import PokeRowCard from "./components/pokeRowCard/PokeRowCard";
import PokeRowCardLoading from "./components/pokeRowCard/PokeRowCardLoading";
import PokeSquareCard from "./components/pokeSquareCard/PokeSquareCard";
import SkeletonGrid from "./components/skeletonGrid/SkeletonGrid";

const Home = () => {
  const [page, setPage] = useState(1);
  const {
    data: { data: pokemons, pagination } = {},
    isLoading,
    isFetching,
  } = useGetPokemonsQuery({
    "pagination[page]": page,
    "pagination[pageSize]": 6,
    sort: "name",
  });
  const {
    data: { data: favPokemons = [] } = {},
    isLoading: isLoadingFavourites,
    isFetching: isFetchingFavourites,
  } = useGetPokemonsQuery(FAVOURITES_ARGS_QUERY);
  const { data: { data: pokemonTeam } = {}, isLoading: isLoadingTeam } =
    useGetTeamQuery();

  const handlePageChange = (page) => {
    if (page < 1) {
      setPage(1);
      return;
    }

    setPage(page);
  };

  return (
    <div className="flex">
      <div className="flex-[5]">
        {(!isLoading && !isFetching) && <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,_1fr))] gap-4">
          {pokemons &&
            pokemons?.map(({ id, attributes }) => {
              const { types, ...rest } = attributes;
              return (
                <MainPokeCard key={id} id={id} types={types?.data} {...rest} />
              );
            })}
        </div>}
        {(isLoading || isFetching) && <SkeletonGrid />}
        <div className="flex justify-center mt-8">
          <Pagination
            {...pagination}
            onNextPage={handlePageChange}
            onPrevPage={handlePageChange}
          />
        </div>
      </div>
      <div className="flex-1">
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
