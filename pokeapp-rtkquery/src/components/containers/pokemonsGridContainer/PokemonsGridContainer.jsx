import React from "react";
import { useSearchParams } from "react-router-dom";
import { pokemonsArgsQuery } from "../../../constants";
import {
  useAddPokemonToTeamMutation,
  useFavouritePokemonMutation,
  useGetPokemonsQuery,
  useGetTeamQuery,
} from "../../../store/slices/pokemonApi";
import MainPokeCard from "../../base/mainPokeCard/MainPokeCard";
import Pagination from "../../base/pagination/Pagination";
import SkeletonGrid from "../../base/skeletonGrid/SkeletonGrid";

const PokemonsGridContainer = () => {
  const INITIAL_PAGE = 1;
  const INITIAL_PAGESIZE = 6;

  const [searchParams, setSearchParams] = useSearchParams({
    page: INITIAL_PAGE,
    pageSize: INITIAL_PAGESIZE,
  });

  const PAGE_SIZE = searchParams.get("pageSize");
  const POKEMONS_QUERY_ARGS = pokemonsArgsQuery({
    page: searchParams.get("page"),
    pageSize: PAGE_SIZE,
  });

  /**
   * GET Pokemons by Page and PageSize
   */
  const {
    data: { data: pokemons, pagination } = {},
    isLoading,
    isFetching,
  } = useGetPokemonsQuery(POKEMONS_QUERY_ARGS, {
    skip: !searchParams.get("page"),
  });

  const [doFavouritePokemon] = useFavouritePokemonMutation();
  const [addPokemonToTeam] = useAddPokemonToTeamMutation();

  /**
   * Handlers
   */

  const handlePageChange = (pageToChange) => {
    if (pageToChange < 1) {
      setSearchParams({
        page: INITIAL_PAGE,
        pageSize: PAGE_SIZE,
      });
      return;
    }

    setSearchParams({
      page: pageToChange,
      pageSize: PAGE_SIZE,
    });
  };

  const handleChangeLiked = (e, id) => {
    doFavouritePokemon({
      id,
      patch: { favourite: e.target.checked },
      searchParams: {
        page: searchParams.get("page"),
        pageSize: searchParams.get("pageSize"),
      },
    });
  };

  const handleAddPokemonToTeam = (id) => {
    addPokemonToTeam(id);
  };

  if (isLoading || isFetching) {
    return <SkeletonGrid length={PAGE_SIZE} />;
  }

  return (
    <div className="flex-1">
      {
        <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,_1fr))] gap-4">
          {pokemons &&
            pokemons?.map(({ id, attributes }) => {
              const { types, ...rest } = attributes;
              return (
                <MainPokeCard
                  key={id}
                  id={id}
                  types={types?.data}
                  onClickFav={(e) => handleChangeLiked(e, id)}
                  onAddPokemon={() => handleAddPokemonToTeam(id)}
                  {...rest}
                />
              );
            })}
        </div>
      }
      <div className="flex justify-center mt-8">
        <Pagination
          {...pagination}
          onNextPage={handlePageChange}
          onPrevPage={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PokemonsGridContainer;
