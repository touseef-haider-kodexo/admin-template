import styled from "styled-components";

export const ErrorContainer = styled.div`
  .error-container {
    display: flex;
    height: 90vh;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  .error-button {
    width: 200px;
    margin-top: 35px;
  }
  .error-status {
    font-size: 200px;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.deepblue};
  }
  .error-button-filter {
    filter: brightness(1) invert(1);
  }
  .error-title {
    font-size: 40px;
    text-align: center;
    margin-top: -50px;
    font-weight: bold;
  }
  .error-subtitle {
    margin-top: 10px;
    font-size: small;
    text-align: center;
    font-weight: 200;
    color: ${({ theme }) => theme.colors.gray2};
  }
  @media (max-width: ${({ theme }) => theme.breakpoint.sm}) {
    .error-status {
      font-size: 100px;
      font-weight: 600;
    }
    .error-button {
      width: auto;
      padding: 0px 10px;
    }

    .error-container {
      justify-content: center;
      align-items: center;
    }
    .error-title {
      font-size: large;
      margin-top: 5px !important;
    }
  }
`;
