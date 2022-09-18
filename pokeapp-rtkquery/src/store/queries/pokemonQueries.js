import { FAVOURITES_ARGS_QUERY, pokemonsArgsQuery } from "../../constants";
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
  query: ({ id, patch }) => ({
    url: `pokemons/${id}`,
    //url: https://run.mocky.io/v3/c670d170-0ccd-4435-be96-6cfcd52e27bf?mocky-delay=100ms
    data: { data: { ...patch } },
    method: "put",
  }),
  // invalidatesTags: (result, error, params) => [
  //   // { type: "Pokemon", id: params.id },
  //   // { type: "Pokemon", id: "FAVOURITES_LIST" },
  // ],
  async onQueryStarted(
    { id, patch, searchParams },
    { dispatch, queryFulfilled, getState }
  ) {
    const state = getState();
    const getPokemonsQueryArgs = pokemonsArgsQuery({
      page: searchParams?.page,
      pageSize: searchParams?.pageSize,
    });
    /**
     * Update Cache for all get Pokemons
     */
    const patchResult = dispatch(
      pokemonApi.util.updateQueryData(
        "getPokemons",
        getPokemonsQueryArgs,
        (draft) => {
          draft?.data?.forEach((pokemon) => {
            if (pokemon.id === id) {
              Object.assign(pokemon.attributes, patch);
            }
          });
        }
      )
    );

    /**
     * Update Favourites List With Optimistic
     */

    // Get All Displayed Pokemons
    const { data: currentPokemons } =
      pokemonApi.endpoints.getPokemons.select(getPokemonsQueryArgs)(state).data;

    // Patch current pokemons in screen
    const patchResultFavourite = dispatch(
      pokemonApi.util.updateQueryData(
        "getPokemons",
        FAVOURITES_ARGS_QUERY,
        (draft) => {
          const isPokemonExist = draft?.data?.find((p) => p.id === id);

          if (isPokemonExist) {
            const newDataDraft = draft?.data?.filter((p) => p.id !== id);
            draft.data = newDataDraft;
          } else {
            const pokeToAdd = currentPokemons.find((p) => p.id === id);
            draft.data = draft?.data?.concat(pokeToAdd);
          }
        }
      )
    );

    try {
      await queryFulfilled;
    } catch {
      patchResult.undo();
      patchResultFavourite.undo();
    }
  },
};

export const addPokemonToTeamMutation = {
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
