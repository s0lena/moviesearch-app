import styled, { keyframes } from "styled-components";
import logo from "../assets/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";

const rotate = keyframes`
from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const RotatingLogo = styled.img`
  margin-top: calc(2 * (10px + 2vmin));
  height: 20vmin;
  cursor: pointer;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${rotate} infinite 20s linear;
  }
`;

export const Header: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const location = useLocation();
  const isMainpage = location.pathname === "/";

  const handleLogoClick = () => {
    if (!isMainpage) {
      navigate("/");
    }
  };

  return (
    <header>
      <RotatingLogo src={logo} alt="logo" onClick={handleLogoClick} />
    </header>
  );
};
