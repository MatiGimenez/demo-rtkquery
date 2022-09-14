import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/home/Home";

const routes = [
  {
    path: "/",
    element: <Home />,
  },
];

export const router = createBrowserRouter(routes);
