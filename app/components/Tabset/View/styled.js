/* eslint-disable */
import styled from "styled-components";

export const TabPanel1View = styled.div`
  position: relative;
  .update {
    margin-top: 20px;
  }

  .ant-tooltip-inner {
    min-width: 30px;
    min-height: 32px;
    padding: 6px 8px;
    color: #fff;
    text-align: left;
    text-decoration: none;
    word-wrap: break-word;
    background-color: white;
    border-radius: 2px;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
      0 9px 28px 8px rgb(0 0 0 / 5%);
  }

  .member-tooltip:hover .up-arrow {
    visibility: visible;
  }
  .link-msg {
    display: none;
  }
  .up-arrow {
    position: absolute;
    background-color: white;
    top: 70px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      top: ${(props) => {
        return props?.stickAtTop ? "145px" : "70px";
      }};
      padding: 6px;
    }
    @media screen and (max-width: 315px) {
      display: none;
    }
    right: 0px;
    width: inherit;
    visibility: hidden;
    transition: visibility 0.5s;
    border: 1px solid ${(props) => props.theme.colors.yellowishOrange};
    text-decoration: none;
    padding: 10px 15px;
    margin-top: 25px;
    border-radius: 80px;
  }
  .up-arrow p {
    width: 100%;
    font-size: 16px;
  }

  .up-arrow:before {
    content: "";
    display: block;
    position: absolute;
    right: 20px;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: ${(props) => props.theme.colors.yellowishOrange};
  }

  .up-arrow:after {
    content: "";
    display: block;
    position: absolute;
    right: 21px;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-bottom-color: white;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    .up-arrow-1 {
      display: inline-block !important;
    }
  }

  .up-arrow-1 {
    position: absolute;
    right: 0px;
    display: none;
    top: 25px;
    visibility: hidden;
    transition: visibility 0.5s;
    border: 1px solid ${(props) => props.theme.colors.yellowishOrange};
    text-decoration: none;
    padding: 5px 10px;
    margin-top: 25px;
    border-radius: 80px;
  }

  .up-arrow-1:before {
    content: "";
    display: block;
    position: absolute;
    right: 20px;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: ${(props) => props.theme.colors.yellowishOrange};
  }

  .up-arrow-1:after {
    content: "";
    display: block;
    position: absolute;
    right: 21px;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-bottom-color: white;
  }

  .sub-head {
    font-size: ${({ theme }) => theme.fontSizes.large};
    font-weight: bold;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
    margin-bottom: 10px;
  }
  .scale {
    flex: 0.9;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      flex: 1;
      width: 100%;
    }
  }
  .column {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray6};
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .row {
    border: 3px solid ${({ theme }) => theme.colors.gray6};
    border-radius: 20px;
    padding: 10px;
  }
  .input_label_title {
    margin-bottom: 5px;
    margin-top: 0;
    letter-spacing: 0.1px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray2};
  }
  .input_label {
    margin-bottom: 5px;
    margin-top: 0;
    letter-spacing: 0.1px;
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray2};
    font-weight: bold;
  }
  .entity {
    display: flex;
    flex: 1;
  }
  .card {
    margin-bottom: 20px;
    border-radius: 10px;
  }
  .fd_row {
    flex-direction: row;
    width: 100%;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      width: 100%;
    }
  }
  .text-btn {
    font-size: ${({ theme }) => theme.fontSizes.medium} !important;
    margin-left: 5px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
  .button-claimView-parent {
    align-self: flex-start;
    & .ant-tooltip-inner {
      min-width: 30px;
      min-height: 32px;
      padding: 6px 8px;
      color: #fff;
      text-align: left;
      text-decoration: none;
      word-wrap: break-word;
      background-color: white;
      border-radius: 2px;
      box-shadow: 0 3px 6px -4px rgb(0 0 0 / 12%), 0 6px 16px 0 rgb(0 0 0 / 8%),
        0 9px 28px 8px rgb(0 0 0 / 5%);
    }
    & .first-btn {
      position: ${(props) => {
        return props?.stickAtTop ? "fixed" : "static";
      }};

      top: 100px;
      right: 130px;
    }
    & .input-height {
      position: ${(props) => {
        return props?.stickAtTop ? "fixed" : "static";
      }};
      cursor: pointer;
      width: ${(props) => {
        return props?.stickAtTop ? "140px" : "auto";
      }};
      top: 135px;
      right: 130px;
    }

    flex-direction: column;
    display: flex;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      flex-direction: row;
      display: none;
    }
  }
  .button-claimView-parent-sm {
    display: none !important;
    margin-bottom: 20px;

    float: left;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      display: block !important;
      width: 100%;
      button {
        position: ${(props) => {
          return props?.stickAtTop ? "fixed" : "static";
        }};
        top: 100px;
      }
    }
  }
  .button-claimView-parent-sm-side {
    display: none !important;
    margin-bottom: 20px;
    float: right;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      display: block !important;
      width: 100%;
      button {
        position: ${(props) => {
          return props?.stickAtTop ? "fixed" : "absolute";
        }};
        top: ${(props) => {
          return props?.stickAtTop ? "100px" : "0px";
        }};
        right: ${(props) => {
          return props?.stickAtTop ? "65px" : "0px";
        }};
      }
    }
  }
  .editable-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 15px;

    border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
  }
  .editable-grid .text {
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
  .editable-grid .ash {
    color: ${({ theme }) => theme.colors.gray4};
  }
  .editable-grid .black {
    color: ${({ theme }) => theme.colors.black2};
  }
  .updateInfo {
    color: white;
  }
  .input-height {
    border: 1px solid ${({ theme }) => theme.colors.gray3};
    background-color: white;
    height: 35px !important;
    padding: 0px 20px;
    cursor: pointer;
    border-radius: 10px;
    margin-top: 10px;
    font-size: ${({ theme }) => theme.fontSizes.medium};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      position: ${(props) => {
        return props?.stickAtTop ? "fixed" : "static";
      }};

      top: 100px;
      right: ${(props) => {
        return props?.stickAtTop ? "20px" : "100px";
      }};
      float: right;
      margin-top: 0px;
    }
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      margin-left: 5px;
      float: right;
      margin-top: 0px;
    }
  }
`;
