import styled from "styled-components";

export const Scroll = styled.div`
  position: absolute;
  bottom: 20px;
  display: ${({ display }) => (display ? "block" : "none")};
  right: 20px;
`;
