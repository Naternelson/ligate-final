import { createBrowserRouter, RouteObject } from "react-router-dom";
import { RootPage } from "../pages/root";
import { RootWrapper } from "../pages/root/wrapper";

const rootObject: RouteObject = {
  element: <RootWrapper />,
  path: "/",
  children: [
    {
      index: true,
      element: <RootPage />,
    },
  ],
};

export const router = createBrowserRouter([rootObject])

