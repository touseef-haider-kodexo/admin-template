import styled from "styled-components";

export const Toggler = styled.div`
  p {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-left: 5px;
  }

  .toggler-label {
    @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
      display: none;
    }
  }
  .toggler .react-switch-checkbox {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  .toggler .react-switch-label {
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    width: 40px;
    height: 24px;
    border-radius: 15px;
    position: relative;
    transition: background-color 0.2s;
  }
  .blue-bg {
    background-color: ${({ theme }) => theme.colors.deepblue};
  }

  .gray-bg {
    background-color: ${({ theme }) => theme.colors.gray4};
  }
  .toggler .react-switch-label .react-switch-button {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    transition: 0.2s;
    background: ${({ theme }) => theme.colors.white};
  }

  .toggler
    .react-switch-checkbox:checked
    + .react-switch-label
    .react-switch-button {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  .toggler .react-switch-label:active .react-switch-button {
    width: 60px;
  }
`;
