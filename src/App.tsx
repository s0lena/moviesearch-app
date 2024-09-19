import React from "react";
import { styled } from "styled-components";
import GlobalStyles from "./styles/global";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom"; // Import Outlet for rendering child routes
import { ScrollRestoration } from "react-router-dom"; // Import ScrollRestoration

const AppStyled = styled.div``;

const App: React.FC = () => {
  console.log("App rendered");
  return (
    <AppStyled>
      <GlobalStyles />
      <Header />
      <ScrollRestoration /> {/* Add ScrollRestoration here */}
      <Outlet /> {/* Render child routes here */}
    </AppStyled>
  );
};

export default App;

// import { styled } from "styled-components";
// import GlobalStyles from "./styles/global";
// import { Header } from "./components/Header";
// import { Routes, Route } from "react-router-dom";
// import { Error404 } from "./pages/Error404";
// import { SearchView } from "./pages/SearchView";
// import { MovieDetailView } from "./pages/MovieDetailView";
// import { ScrollRestoration } from "react-router-dom";

// const AppStyled = styled.div``;

// export const App: React.FC = () => {
//   console.log("App rendered");
//   return (
//     <AppStyled>
//       <ScrollRestoration />
//       <GlobalStyles />
//       <Header />
//       <Routes>
//         <Route path="/" element={<SearchView />} />
//         <Route path="/movie/:id" element={<MovieDetailView />} />
//         <Route path="*" element={<Error404 />} />
//       </Routes>
//     </AppStyled>
//   );
// };

// export default App;
