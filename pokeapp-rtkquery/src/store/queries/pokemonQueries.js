import { FAVOURITES_ARGS_QUERY } from "../../constants";
import pokemonApi from "../slices/pokemonApi";

export const getPokemonByNameQuery = {
  query: (name) => ({ url: `pokemons/${name}` }),
  transformResponse: (response) => response,
};

export const getPokemonsQuery = {
  query: (params) => ({
    url: `pokemons`,
    params: { populate: "*", ...params },
  }),
  transformResponse: (response) => ({ data: response.data, ...response.meta }),
  providesTags: (result, error, params) => {
    let listName = "LIST";

    if (JSON.stringify(params) === JSON.stringify(FAVOURITES_ARGS_QUERY)) {
      listName = "FAVOURITES_LIST";
    }

    return result?.data
      ? [
          ...result?.data?.map(({ id }) => ({ type: "Pokemon", id })),
          { type: "Pokemon", id: listName },
        ]
      : [{ type: "Pokemon", id: listName }];
  },
};

export const favouritePokemonMutation = {
  query: ({ id, ...patch }) => ({
    url: `pokemons/${id}`,
    //url: https://run.mocky.io/v3/c670d170-0ccd-4435-be96-6cfcd52e27bf?mocky-delay=100ms
    data: patch,
    method: "put",
  }),
  invalidatesTags: (result, error, params) => [
    // { type: "Pokemon", id: params.id },
    { type: "Pokemon", id: "FAVOURITES_LIST" },
  ],
  async onQueryStarted(
    { id, ...patch },
    { dispatch, queryFulfilled, getState }
  ) {
    console.log(getState());

    /**
     * Update Cache for all get Pokemons
     */
    const patchResult = dispatch(
      pokemonApi.util.updateQueryData("getPokemons", undefined, (draft) => {
        draft?.data?.forEach((pokemon) => {
          if (pokemon.id === id) {
            Object.assign(pokemon.attributes, patch.data);
          }
        });
      })
    );
    try {
      await queryFulfilled;
    } catch {
      patchResult.undo();
    }
  },
};

export const addPokemonToTeam = {
  query: (id) => ({
    url: "team/togglePokemon",
    data: {
      data: { pokemonId: id },
    },
    method: "put",
  }),
  transformResponse: (response) => ({ data: response.data }),
  invalidatesTags: (result, error, params) => [
    { type: "Pokemon", id: "TEAM_LIST" },
  ],
  async onQueryStarted(params, { dispatch, queryFulfilled, getState }) {
    console.log(
      "🚀 ~ file: pokemonQueries.js ~ line 78 ~ onQueryStarted ~ getState",
      getState()
    );
    try {
      await queryFulfilled;
    } catch {}
  },
};

export const getTeam = {
  query: (params) => ({
    url: "team",
    method: "get",
    params: {
      "populate[pokemons][populate][types]": "*",
      ...params,
    },
  }),
  transformResponse: (response) => ({ data: response.data }),
  providesTags: (result, error, params) => {
    let listName = "TEAM_LIST";
    const pokemons = result?.data?.attributes?.pokemons?.data;

    return pokemons
      ? [
          ...pokemons?.map(({ id }) => ({ type: "Pokemon", id })),
          { type: "Pokemon", id: listName },
        ]
      : [{ type: "Pokemon", id: listName }];
  },
};
