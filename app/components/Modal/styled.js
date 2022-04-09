import styled from "styled-components";

export const TechnicianReviewModal = styled.div`
  .company-name {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: 15px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.medium};
    }
  }
  .m-t-10 {
    margin-top: 10px;
  }
  .img-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.blue2};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const ImageSlider = styled.div`
  padding: 0 40px;
  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    padding: 0;
  }
  .chevron {
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      position: absolute;
      left: -20px;
      width: 50px;
      z-index: 9999;
    }
  }
  .chevron2 {
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      position: absolute;
      right: 43px;
      width: 20px;
    }
  }
  .slide-container {
    justify-content: center;
    display: flex;
    align-items: center;
  }

  .slide-container-box {
    height: 350px !important;
    justify-content: center !important;
    flex-direction: row !important;
    display: flex !important;
  }

  .slide {
    align-self: center;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    background-position: center;
  }
`;

export const DentSlider = styled.div`
  overflow-x: hidden;
  overflow-y: hidden;
  padding: 0 25px;
  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    padding: 0;
  }
  .chevron {
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      position: absolute;
      /* display: none; */
      left: 20px;
      width: 30px;
      /* z-index: 9999; */
    }
  }
  .chevron2 {
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      position: absolute;
      right: 30px;
      /* display: none; */
      width: 30px;
    }
  }
`;

export const ImageModal = styled.div`
  .modal-title {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.xl};
    margin-bottom: 15px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.medium};
    }
  }
  .desc-text {
    color: ${({ theme }) => theme.colors.black2};
  }
  .chatbox {
    border-radius: 14px;
    padding: 10px;
    margin-top: 12px;
    /* margin-right: 20px; */
    position: relative;
    background-color: ${({ theme }) => theme.colors.gray6};
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    border-bottom-right-radius: 0;
  }
  .chatbox:after,
  .chatbox:before {
    content: "";
    display: block;
    position: absolute;
    left: 100%;
    width: 0;
    height: 0;
  }

  .chatbox:after {
    bottom: 1px;
    border-right: 10px solid transparent;
    border-bottom: 9px solid ${({ theme }) => theme.colors.gray6};
  }

  .chatbox:before {
    bottom: 0;
    border-right: 11px solid transparent;
    border-bottom: 12px solid ${({ theme }) => theme.colors.gray5};
  }
  .chatbox > p {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
  }
  .texts {
    padding: 0 25px;
    margin-top: 50px;
  }
  .flex-text {
    align-items: flex-end;
    flex-wrap: wrap-reverse;
  }
  .image-slider {
    height: 320px;
  }
  .lhs .text,
  .when {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
  }
  .when {
    color: ${({ theme }) => theme.colors.gray4};
  }

  .btn-container {
    text-align: center;
    margin-top: 20px;
    justify-content: space-evenly;
    display: flex;
  }
  .image-modal-content {
    margin-right: 80px;
    margin-left: 80px;
    align-items: center;
    justify-content: center;
  }
`;

export const Modal = styled.div`
  .button {
    width: 100%;
  }
  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    z-index: 2223;
    background: rgba(0, 0, 0, 0.3);
  }
  .display-block {
    display: block;
  }
  .MuiTab-root {
    opacity: 1;
    padding: 0 15px;
    min-height: auto;
    text-align: center;
    /* width: auto; */
    height: 36px;
  }
  .MuiTabs-root {
    min-height: 36px;
  }
  .MuiBox-root {
    padding: 0;
  }

  .MuiTab-wrapper {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.base};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }

  .MuiTabs-fixed {
    height: 36px;
  }

  .tab-head {
    width: max-content;
    border-radius: 15px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      width: auto;
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
  .display-none {
    display: none;
  }
  .abs-btn {
    position: absolute;
    top: 12px;
    right: 10px;
  }

  .grid-fields {
    display: grid;
    grid-gap: 10%;
    grid-row-gap: 15px;
    grid-template-columns: 45% 45%;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      grid-template-columns: 1fr;
    }
  }

  .modal-main {
    position: fixed;
    background: ${({ theme }) => theme.colors.white};
    height: auto;
    width: auto;
    top: 50%;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 15px;
    border-radius: 13px;
    left: 50%;
    transform: translate(-50%, -50%);
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      width: 80%;
      max-width: inherit;
    }
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      width: 90%;
    }
  }

  .image-modal {
    height: 610px;
    width: 720px;
    /* overflow: hidden; */
    /* } */
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      height: auto;
      width: auto;
    }
  }

  .image-modal-upload {
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      height: 400px;
      width: 600px;
    }
    /* @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      height: auto;
      width: auto;
    } */
  }

  .modal-btn {
    width: fit-content;
    margin: auto 10px auto auto;
    margin-top: 10px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      width: fit-content;
      margin: auto 10px auto auto;
    }
  }
  .modal-btn-parent {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
  }
  .modal-light-btn {
    height: 35px;
    font-size: 12px;
    background-color: #fff;
    color: ${({ theme }) => theme.colors.black};
    border-radius: 10px;
    border: 1px solid #acacad;
    padding: 10px 20px 10px 20px;
    text-align: right;
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

  .modal-main .image-modal::-webkit-scrollbar {
    width: 4px;
  }
  .modal-main .image-modal::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }
  .modal-main .image-modal::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.deepblue};
    outline: 1px solid slategrey;
  }
  .width-fit {
    /* max-width: 50%; */
    min-width: ${({ changeWidth }) => changeWidth && 600}px;
    height: auto;
    max-height: 80vh;
    width: 382px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      /* width: auto; */
    }
  }
  .item1 .field {
    margin-bottom: 15px;
  }
  .sgrid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
  }

  .item1 .images-modal {
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
    margin: 15px 0 20px 0;
    display: grid;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      grid-template-columns: 1fr;
      grid-gap: 10px;
    }
  }
`;
