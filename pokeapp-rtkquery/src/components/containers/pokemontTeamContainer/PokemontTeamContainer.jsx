import React from "react";
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

  const [togglePokemon] = useAddPokemonToTeamMutation();

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
              onClickClose={() => togglePokemon(id)}
            />
          )
        )}
        {isLoading ||
          (isFetching && <div className="text-white text-sm">Loading...</div>)}
      </div>
    </div>
  );
};

export default PokemontTeamContainer;
