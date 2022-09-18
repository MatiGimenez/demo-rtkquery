import React from "react";
import PokemonsGridContainer from "../../components/containers/pokemonsGridContainer/PokemonsGridContainer";
import PokemontTeamContainer from "../../components/containers/pokemontTeamContainer/PokemontTeamContainer";
import PokemonsFavContainer from "../../components/containers/pokemonsFavContainer/PokemonsFavContainer";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex-[5]">
        <PokemonsGridContainer />
      </div>
      <div className="flex-1">
        <div className="p-5">
          <PokemontTeamContainer />
        </div>
        <div className="p-5">
          <PokemonsFavContainer />
        </div>
      </div>
    </div>
  );
};

export default Home;
