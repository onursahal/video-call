import { Authorization, Rooms } from "./index";
import { RouterType } from "../types/router.types";

const pagesData: RouterType[] = [
  {
    path: "/auth",
    element: <Authorization />,
    title: "Authorization",
    protectedRoute: false,
  },
  {
    path: "/rooms",
    element: <Rooms />,
    title: "Rooms",
    protectedRoute: true,
  },
];

export default pagesData;
