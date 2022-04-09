/* eslint-disable indent */
import styled, { css } from "styled-components";

export const Button = styled.button`
  position: ${({ stickAtTop }) => stickAtTop && "fixed"};
  z-index: 2;
  top: ${({ stickAtTop }) => stickAtTop && "100"}px;
  background-color: ${({ theme, hasBlueBackground }) =>
    hasBlueBackground ? theme.colors.deepblue : theme.colors.white};
  color: ${({ theme, hasBlueBackground }) =>
    hasBlueBackground ? theme.colors.white : theme.colors.gray};
  border-radius: 10px;
  display: ${({ disabled }) => (disabled ? "none" : "inline-block")};
  border: 1px solid
    ${({ theme, hasBlueBackground }) =>
      hasBlueBackground ? theme.colors.deepblue : theme.colors.gray};
  padding: 5px;
  text-align: center;
  font-family: Poppins-Light;
  height: 35px;
  &:hover {
    color: ${({ theme, hasBlueBackground }) =>
      hasBlueBackground ? theme.colors.deepblue : theme.colors.white};
    background-color: ${({ theme, hasBlueBackground }) =>
      hasBlueBackground ? theme.colors.white : theme.colors.deepblue};
    transition: 0.3s;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    width: auto;
    white-space: nowrap;
    /* position: sticky; */
  }
  ${({ extend }) => extend && css``}

  ${({ size }) => {
    switch (size) {
      case "xsmall":
        return `
        width: 110px !important;
        `;
      case "small":
        return `
        width: 142px;
      
        `;
      case "auto":
        return `
        width: auto;
      padding: 5px 15px;
        `;
      case "large":
        return `
        margin-top: 20px;
          width: 100% !important;
          `;

      default:
        return css`
          height: 32px;
        `;
    }
  }}
`;
