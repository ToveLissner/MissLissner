import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomePage from "./components/Pages/HomePage";
import PurchasedPage from "./components/Pages/PurchasedPage";

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
        path: "/spelkvitton",
        element: <PurchasedPage />,
        index: true,
      },
    ],
  },
]);
