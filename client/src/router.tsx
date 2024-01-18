import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/Pages/HomePage";
import ImagesPage from "./components/Pages/ImagesPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
        index: true,
      },

      {
        path: "/images",
        element: <ImagesPage />,
        index: true,
      },
    ],
  },
]);
