import { createApi } from "@reduxjs/toolkit/query/react";
import baseAxiosQuery from "../../helpers/baseAxiosQuery";
import {
  favouritePokemonMutation,
  getPokemonByNameQuery,
  getPokemonsQuery,
} from "../queries/pokemonQueries";

// Define a service using a base URL and expected endpoints
const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: baseAxiosQuery,
  tagTypes: ['Pokemon'],
  endpoints: (builder) => ({
    getPokemonByName: builder.query(getPokemonByNameQuery),
    getPokemons: builder.query(getPokemonsQuery),
    favouritePokemon: builder.mutation(favouritePokemonMutation),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { endpoints, middleware, reducer, reducerPath } = pokemonApi;

export const {
  useGetPokemonByNameQuery,
  useGetPokemonsQuery,
  useFavouritePokemonMutation,
} = pokemonApi;

export default pokemonApi;
