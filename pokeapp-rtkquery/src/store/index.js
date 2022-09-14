import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import {
  reducerPath as pokemonReducerPath,
  reducer as pokemonReducer,
  middleware as pokemonMiddleware,
} from "./slices/pokemonApi";

export const store = configureStore({
  reducer: {
    [pokemonReducerPath]: pokemonReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    pokemonMiddleware,
  ],
});

setupListeners(store.dispatch);
