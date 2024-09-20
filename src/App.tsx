import React from "react";
import { styled } from "styled-components";
import GlobalStyles from "./styles/global";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";
// import { ScrollRestoration } from "react-router-dom"; // Import ScrollRestoration

const AppStyled = styled.div``;

const App: React.FC = () => {
  console.log("App rendered");
  return (
    <AppStyled>
      <GlobalStyles />
      <Header />
      <Outlet />
    </AppStyled>
  );
};

export default App;
