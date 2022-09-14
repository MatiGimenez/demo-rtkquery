export const getPokemonByNameQuery = {
  query: (name) => ({url: `pokemon/${name}`}),
  transformResponse: (response) => response
};
