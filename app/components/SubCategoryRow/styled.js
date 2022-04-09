import styled from "styled-components";

export const Category = styled.div`
  .upper,
  .lower {
    margin-top: 20px;
    border-radius: 15px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 20px;
  }
  .w-50 {
    width: 50%;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      width: 100%;
    }
  }
  .lower {
    margin-top: 20px;
  }
  .upper-header {
    margin-bottom: 10px;
    padding-right: 15px;
  }
  .upper-header .left .bold {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
  .upper-header .left .gray {
    color: ${({ theme }) => theme.colors.gray2};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
  }
  .upper-header .right button {
    height: 35px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray2};
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.gray3};
    padding: 5px 20px 0 10px;
    text-align: left;
  }
  .upper-header .right button span {
    font-family: Poppins-Light;
    margin-left: 7px;
  }
  .MuiTab-root {
    opacity: 1;
    padding: 0 15px;
    min-height: auto;
    text-align: center;
    width: auto;
    height: 36px;
    min-width: 88px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      padding: 0;
      height: 28px;
      min-width: 60px;
    }
  }
  .MuiTabs-root {
    min-height: 36px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      min-height: 28px;
    }
  }
  .mlr {
    margin: 0 12px;
  }
  .ml {
    margin-left: 20px;
  }
  .mr {
    margin-right: 13px;
  }
  .mt-15 {
    margin-top: 15px;
  }
  .width-100 {
    width: 100%;
  }
  .dent-btns {
    margin-top: 30px;
    justify-content: flex-end;
  }
  .dent-btns button.mr {
    width: 110px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.gray2};
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.gray3};
    padding: 5px;
    text-align: center;
    font-family: Poppins-Light;
    height: 35px;
  }
  .dent-btns button.mr:hover {
    color: ${({ theme }) => theme.colors.deepblue};
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
    transition: 0.3s;
  }
  .gridish-left {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(284px, 1fr));
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      grid-template-columns: 1fr;
    }
  }
  .gridish {
    display: grid;
    align-items: center;
    grid-gap: 5%;
    grid-template-columns: 1fr 25%;
    @media screen and (max-width: 1024px) {
      grid-template-columns: 1fr;
    }
  }
  .flex-end {
    justify-content: flex-end;
  }
  .MuiBox-root {
    padding: 15px 0 15px 15px;
  }
  .MuiTabs-indicator {
    background-color: transparent;
  }
  .MuiTab-wrapper {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.small};
    width: auto;
    text-transform: capitalize;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
  .MuiTabs-fixed {
    height: 36px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      height: 28px;
    }
  }
  .tab-head {
    width: max-content;
    border-radius: 17px;
    padding: 1px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      /* width: auto; */
    }
  }
  .MuiTab-textColorInherit.Mui-selected {
    background-color: ${({ theme }) => theme.colors.deepblue};
    border-radius: 11px;
  }
  .MuiTab-textColorInherit.Mui-selected .MuiTab-wrapper {
    color: ${({ theme }) => theme.colors.white};
  }
  .MuiTab-textColorInherit.Mui-selected .br {
    border: 0;
  }
  .gray-bg {
    margin: 20px 0 10px 0;
    border-radius: 15px;
    padding: 15px;
    background-color: ${({ theme }) => theme.colors.gray6};
  }

  .gray-bg .text {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
  .gray-bg .gray {
    color: ${({ theme }) => theme.colors.gray2};
  }
  .mid .bold {
    margin-right: 10px;
  }
  .gray-bg .bold {
    color: ${({ theme }) => theme.colors.black2};
  }
  .gray-bg .right button {
    font-size: ${({ theme }) => theme.fontSizes.small};
    height: 35px;
    background-color: ${({ theme }) => theme.colors.gray6};
    color: ${({ theme }) => theme.colors.gray2};
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.bg2};
    padding: 5px 20px 0 10px;
    text-align: left;
  }
  .s-width {
    width: 97%;
    margin-left: auto;
  }
`;
