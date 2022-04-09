import styled from "styled-components";

export const CheckboxInput = styled.div`
  display: flex;
  align-items: center;
  .input_label {
    margin-top: 0;
    margin-right: 10px;
    letter-spacing: 0.1px;
    margin-left: 5px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray2};
  }
`;

export const Select = styled.div`
  .input_label {
    margin-bottom: 5px;
    margin-top: 0;
    letter-spacing: 0.1px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray2};
  }
  .MuiInputBase-root {
    font-size: ${({ theme }) => theme.fontSizes.small};
    margin: 0;
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.bg2};
    background-color: rgba(0, 0, 0, 0);
    border-radius: 10px;
    height: 28px;
    color: ${({ theme }) => theme.colors.black2};
    width: 100%;
    max-width: 100%;
    padding: 15px 10px;
  }
  .blue-line {
    border: 1px solid ${({ theme }) => theme.colors.link};
  }
  .MuiInput-underline:before,
  .MuiInput-underline:after {
    content: none;
  }
  .MuiSelect-select:focus {
    background-color: transparent;
  }
  .error-border {
    border: 1px solid ${({ theme }) => theme.colors.yellowishOrange};
  }
`;

export const DateInput = styled.div`
  .input_label {
    margin-bottom: 5px;
    margin-top: 0;
    letter-spacing: 0.1px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray2};
  }

  .ant-picker {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    margin: 0;
    outline: none;
    border: 1px solid ${({ theme }) => theme.colors.darkGreyish};
    background-color: rgba(0, 0, 0, 0);
    border-radius: 10px;
    height: 28px;
    color: ${({ theme }) => theme.colors.black2};
    width: 100%;
    max-width: 100%;
    padding: 15px 10px;
  }
  .ant-picker:hover {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.bg2};
    border-color: ${({ theme }) => theme.colors.deepblue};
  }
  .ant-picker-input > input {
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
`;

export const Wrapper = styled.div`
  .input_label {
    margin-bottom: 5px;
    margin-top: 0;
    letter-spacing: 0.1px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray2};
  }
  .helper {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.gray2};
    margin-top: 5px;
  }

  .input,
  .input-error,
  .with-input,
  .with-input-error {
    font-size: ${({ theme }) => theme.fontSizes.medium};
    margin: 0;
    outline: none;
    border-width: 1px !important;
    border: 1px solid ${({ theme }) => theme.colors.darkGreyish};
    background-color: rgba(0, 0, 0, 0);
    border-radius: 10px;
    height: 28px;
    color: ${({ theme }) => theme.colors.black};
    width: 100%;
    max-width: 100%;
    padding: 15px 10px;
    background-color: ${({ theme }) => theme.colors.white};
  }
  .blue-line {
    border: 1px solid ${({ theme }) => theme.colors.link};
  }

  .input,
  .with-input,
  .input-error::placeholder {
    letter-spacing: 0.2px;
    color: ${({ theme }) => theme.colors.black};
  }

  .input:focus {
    outline: none;
  }

  .input:hover {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.bg2};
    border-color: ${({ theme }) => theme.colors.deepblue};
  }

  .input:focus {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.bg2};
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
    padding: 15px 10px;
    transition: 0.3s;
  }

  .with-input,
  .with-input-error,
  .MuiSvgIcon-root {
    width: 14px;
    height: 14px;
  }
  .fade-btn {
    border: none;
    background-color: rgba(0, 0, 0, 0);
    outline: none;
  }
  .with-input,
  .with-input-error,
  input {
    width: -webkit-fill-available;
  }
  .with-input,
  .with-input-error,
  input::placeholder {
    letter-spacing: 0.2px;
    color: ${({ theme }) => theme.colors.black2};
    font-family: Poppins-Regular;
  }
  .with-input input:focus,
  .with-input input:hover {
    outline: none;
  }

  .icon-see {
    height: 20px;
    width: 20px;
  }

  .with-input:focus-within {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.bg2};
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
    padding: 15px 10px;
    transition: 0.3s;
  }

  .pass-input {
    border: none;
    outline: none;
    max-width: 85%;
  }

  /* .with-input-error input::placeholder {
    letter-spacing: 0.2px;
    color: ${({ theme }) => theme.colors.black2};
    font-family: Poppins-Regular;
  } */

  /* .with-input-error input {
    width: -webkit-fill-available;
  } */

  /* .with-input-error .MuiSvgIcon-root {
    width: 14px;
    height: 14px;
  } */

  /* 
  .with-input-error {
    justify-content: space-between;
  } */

  /* .pass-input :hover {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.bg2};
    border-color: ${({ theme }) => theme.colors.deepblue};
  }

  .pass-input :focus {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.bg2};
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
    padding: 15px 10px;
    transition: 0.3s;
  } */
  .with-input,
  .with-input-error {
    justify-content: space-between;
  }

  .with-input-error,
  .input-error:hover:focus {
    border: 1px solid ${({ theme }) => theme.colors.yellowishOrange};
  }

  .error-border {
    border: 1px solid ${({ theme }) => theme.colors.yellowishOrange};
  }
`;
