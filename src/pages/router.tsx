import { Navigate, Route, Routes } from "react-router-dom";
import { RouterType } from "../types/router.types";
import pagesData from "./pagesData";

const Router = () => {
  const pageRoutes = pagesData.map(
    ({ path, title, element, protectedRoute }: RouterType) => {
      return <Route key={title} path={`/${path}`} element={element} />;
    }
  );

  return <Routes>{pageRoutes}</Routes>;
};

export default Router;
