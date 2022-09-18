import React from "react";
import { POKEMON_CACHE_MUTATION } from "../../../constants";
import {
  useAddPokemonToTeamMutation,
  useGetTeamQuery,
} from "../../../store/slices/pokemonApi";
import PokeSquareCard from "../../base/pokeSquareCard/PokeSquareCard";

const PokemontTeamContainer = () => {
  /**
   * GET Pokemons Team
   */
  const {
    data: { data: pokemonTeam } = {},
    isLoading,
    isFetching,
  } = useGetTeamQuery();

  const [togglePokemon, { error, isError }] = useAddPokemonToTeamMutation({
    fixedCacheKey: POKEMON_CACHE_MUTATION,
  });

  return (
    <div>
      <h4 className="font-bold mb-5">Equipo</h4>
      <div className="grid grid-cols-3 gap-2 justify-items-center">
        {(pokemonTeam?.attributes?.pokemons?.data || []).map(
          ({ id, attributes }) => (
            <PokeSquareCard
              key={id}
              name={attributes.name}
              color={attributes.types?.data?.[0]?.attributes?.color}
              image={attributes.image}
              onClickClose={() => {
                togglePokemon(id)
                  .unwrap()
                  .then((payload) => console.log("fulfilled", payload))
                  .catch((error) => console.error("rejected", error));
              }}
            />
          )
        )}
      </div>

      <div className="text-white text-sm">
        <span>{isLoading && `Loading...`}</span>
        <span>{isFetching && `Actualizando...`}</span>
      </div>

      {isError && (
        <div className="flex-1 mt-2">
          <div className="alert alert-warning">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <span className="text-xs">{error?.data?.error?.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PokemontTeamContainer;
