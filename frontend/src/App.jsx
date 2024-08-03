import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Main from "./layouts/main";
import Homepage from "./pages/Homepage";
import Dashboard from "./pages/Dashboard";
import IDE from "./pages/IDE";
import PageNotFound from "./pages/PageNotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/ide",
        element: <IDE />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
