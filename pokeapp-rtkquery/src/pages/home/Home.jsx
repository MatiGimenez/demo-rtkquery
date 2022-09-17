import React, { useState } from "react";
import { useGetPokemonsQuery } from "../../store/slices/pokemonApi";
import SkeletonGrid from "./components/skeletonGrid/SkeletonGrid";
import MainPokeCard from "./components/mainPokeCard/MainPokeCard";
import Pagination from "./components/pagination/Pagination";

const Home = () => {
  const [page, setPage] = useState(1);
  const {
    data: { data: pokemons, pagination } = {},
    isLoading,
    isFetching,
  } = useGetPokemonsQuery({
    "pagination[page]": page,
    "pagination[pageSize]": 6,
    "sort": "name"
  });

  const handlePageChange = (page) => {
    if (page < 1) {
      setPage(1);
      return;
    }

    setPage(page);
  };

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(190px,_1fr))] gap-4">
        {(isLoading || isFetching) && <SkeletonGrid />}
        {!isLoading &&
          !isFetching &&
          pokemons?.map(({ id, attributes }) => {
            const { types, ...rest } = attributes;
            return (
              <MainPokeCard key={id} id={id} types={types?.data} {...rest} />
            );
          })}
        {/* <div className="grid"></div> */}
      </div>
      <div className="flex items-center justify-center mt-10">
        <Pagination
          {...pagination}
          onNextPage={handlePageChange}
          onPrevPage={handlePageChange}
        />
      </div>
    </>
  );
};

export default Home;
