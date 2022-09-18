export const FAVOURITES_ARGS_QUERY = {
  sort: "updatedAt:asc",
  "filters[favourite]": true,
};

export const pokemonsArgsQuery = ({ page = 1, pageSize = 6 }) => ({
  "pagination[page]": page,
  "pagination[pageSize]": pageSize,
  sort: "name",
});
