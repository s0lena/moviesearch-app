import React from "react";
import styled from "styled-components";

export interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 60vw;
  margin: 0 auto;
`;
const StyledFormLabel = styled.label`
  color: black;
  font-size: calc(10px + 2vmin);
  margin: calc(10px + 2vmin);
`;

const StyledInput = styled.input`
  position: sticky;
  height: calc(15px + 2vmin);
  font-size: calc(10px + 1vmin);
  &:not(:focus) {
    box-shadow: 0 0 2px 2px #ff6a00;
  }
`;

export const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <InputContainer>
      <StyledFormLabel>What would you like to find?</StyledFormLabel>
      <StyledInput
        value={value}
        onChange={onChange}
        type="text"
        placeholder="Type your search here"
      />
    </InputContainer>
  );
};
