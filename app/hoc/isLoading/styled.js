import styled from "styled-components";
export const Container = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100vh;
  display: flex;
  background: ${({ isLoading }) =>
    isLoading ? "rgba(255, 255, 255, 0.7)" : ""};
  z-index: ${({ isLoading }) => (isLoading ? 5555 : 0)};
  justify-content: center;
  align-items: center;
`;
