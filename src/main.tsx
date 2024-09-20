import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import { Error404 } from "./pages/Error404";
import { SearchView } from "./pages/SearchView";
import { MovieDetailView } from "./pages/MovieDetailView";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component with children routes
    children: [
      {
        index: true,
        element: <SearchView />, // Default child route
      },
      {
        path: "movie/:id",
        element: <MovieDetailView />, // Nested route for movie details
      },
      {
        path: "*",
        element: <Error404 />, // Catch-all route for 404 errors
      },
    ],
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
