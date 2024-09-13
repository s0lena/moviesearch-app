import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const BackToMainButton = styled.button`
  padding: 1vmin 2vmin;
  background-color: #ff6a00;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  margin-bottom: 5vmin;
  font-size: calc(5px + 2vmin);

  &:hover {
    background-color: #007bff;
  }
`;
const Message = styled.p`
  font-weight: bold;
  margin: calc(10px + 2vmin);
  font-size: calc(10px + 2vmin);
`;

export const Error404: React.FC = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <Message>Ooops, looks like this page doesn`t exist...</Message>
      <BackToMainButton onClick={handleClick}>
        ← Go back to Main
      </BackToMainButton>
    </>
  );
};
