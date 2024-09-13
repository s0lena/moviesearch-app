import { styled } from "styled-components";
import GlobalStyles from "./styles/global";
import { Header } from "./components/Header";
import { Routes, Route } from "react-router-dom";
import { Error404 } from "./pages/Error404";
import { SearchView } from "./pages/SearchView";
import { MovieDetailView } from "./pages/MovieDetailView";

const AppStyled = styled.div``;

export const App: React.FC = () => {
  return (
    <AppStyled>
      <GlobalStyles />
      <Header />
      <Routes>
        <Route path="/" element={<SearchView />} />
        <Route path="/movie/:id" element={<MovieDetailView />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </AppStyled>
  );
};

export default App;
