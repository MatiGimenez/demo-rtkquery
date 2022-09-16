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
  providesTags: (result) => {
    return result?.data
      ? [
          ...result?.data?.map(({ id }) => ({ type: "Pokemon", id })),
          { type: "Pokemon", id: "LIST" },
        ]
      : [{ type: "Pokemon", id: "LIST" }];
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
    { type: "Pokemon", id: params?.id },
  ],
  async onQueryStarted(
    { id, ...patch },
    { dispatch, queryFulfilled, getState }
  ) {
    console.log(getState());
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
