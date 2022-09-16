import React from "react";
import { useGetPokemonsQuery } from "../../store/slices/pokemonApi";
import MainPokeCard from "./components/mainPokeCard/MainPokeCard";

const Home = () => {
  const { data: { data: pokemons } = {}, isLoading } = useGetPokemonsQuery();
  console.log("DATA", pokemons);

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
    <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,_1fr))] gap-4">
      {pokemons &&
        pokemons?.map(({ id, attributes }) => {
          const { types, ...rest } = attributes;
          return (
            <MainPokeCard key={id} id={id} types={types?.data} {...rest} />
          );
        })}
      <div className="grid"></div>
    </div>
  );
};

export default Home;
