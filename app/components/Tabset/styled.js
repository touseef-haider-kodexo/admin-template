/*eslint-disable*/
import styled, { css } from "styled-components";

export const TabPanel1 = styled.div`
  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    width: 100%;
  }
  .next-btn {
    display: flex;
    flex-direction: row-reverse;
  }
  .gridy {
    display: grid;
    grid-gap: 35px;
    grid-row-gap: 15px;
    grid-template-columns: 1fr 1fr;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      .next-btn {
        position: absolute;
        right: 5px;
        top: 100px;
      }
      grid-template-columns: 1fr;
      margin-top: 30px;
    }

    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      .next-btn {
        position: absolute;
        right: 5px;
        top: 100px;
      }
      grid-template-columns: 1fr;
      margin-top: 30px;
    }
  }
  .MuiSvgIcon-root {
    fill: ${({ theme }) => theme.colors.gray4} !important;
    width: 14px;
  }
`;

export const InfoWindow = styled.div`
  display: flex;
  width: 250px;
  height: auto;
  flex-wrap: wrap;

  .profile-info-container {
    display: flex;
    align-items: center;
    flex-basis: 100%;
    flex-direction: column;
  }

  .rating-container {
    justify-content: center;
    align-items: center;
    display: flex;
    flex-direction: row;
  }
`;

export const Tag = styled.p`
  padding: 3px 10px;
  border-radius: 5px;
  margin: 5px;
  color: ${({ theme }) => theme.colors.black2};
  font-weight: 500;
  background-color: ${({ theme }) => theme.colors.gray7};
`;

export const ColumnOne = styled.div`
  flex-grow: 0;
`;

export const ColumnTwo = styled.div`
  flex-grow: 2;
  flex-basis: ${({ columnBasis }) => `${columnBasis}em`};
  flex-grow: 1;
  align-items: center;
  .in-active-tag {
    background-color: red;
    color: black;
    font-weight: bold;
    border-radius: 5px;
    margin-left: 10px;
  }
`;

export const ColumnThree = styled.div`
  flex-grow: 1;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    flex-grow: 1;
    padding-top: 15px;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    flex-grow: 1;
    padding-top: 15px;
  }
`;

export const TechnicianCard = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  flex-shrink: 0;
  justify-content: space-between;
  padding: 15px;
  margin-top: 10px;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  border-radius: 10px;
  .technician-details {
    color: ${({ theme }) => theme.colors.black2};
    margin-bottom: 15px;
    display: flex;
    justify-content: space-between;
    width: 100%;
  }
  .technician-top-flex .left {
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      display: block;
    }
  }
  .avatar-text {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .technician-top-flex {
    display: flex;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      display: block;
    }
  }

  .chat {
    margin-left: auto;
    width: 84%;
  }
  .chatbox {
    border-radius: 14px;
    padding: 10px;
    margin-top: 12px;
    margin-right: 20px;
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
  .business-logo-section {
    width: 10%;
    margin-right: 10px;
  }
  .far-right {
    flex-direction: column;
    padding: 10px;
    max-max-width: 200px;
    margin-left: 8px;

    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      margin-top: 20px;
      align-items: center;
      align-self: center;
      margin-top: 10px;
    }
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      margin-top: 20px;
      align-items: center;
      align-self: center;
      margin-top: 10px;
    }
  }

  .ratings {
    margin-top: 10px;
    margin-left: 8px;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.gray4};
  }

  .tags {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
  }
  .tags {
    width: 120px !important;
    margin: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    color: ${({ theme }) => theme.colors.white};
  }

  .mrl-10 {
    margin: 0 10px;
  }

  .name {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
  .mlr-13 {
    margin: 0 13px;
  }
  .addr {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
  .redirect {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.gray4};
  }
  .rating {
    margin-left: 8px;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.gray4};
  }
  .redirect span {
    margin-left: 5px;
    white-space: nowrap;
  }
  .direct img {
    height: 16px;
  }
  .direct {
    display: flex;
    /* flex-wrap: wrap; */
    justify-content: space-evenly;
    flex-basis: 5em;
    align-items: center;
    flex-direction: row;
  }

  .business-logo-container {
    margin-right: 15px;
    width: 80px;
    height: 80px;
    border: solid 1px ${({ theme }) => theme.colors.gray5};
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
    }
  }

  .business-logo-container-dark {
    margin-right: 15px;
    width: 80px;
    height: 80px;
    border: solid 1px ${({ theme }) => theme.colors.gray5};

    background: ${({ theme }) => theme.colors.blue2};
    cursor: pointer;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;

    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      margin-bottom: 10px;
      display: flex;
      justify-content: center;
    }
  }
  .business-logo {
    max-width: 100%;
    object-fit: fill;
  }

  .business-logo-dark {
    max-width: 100%;
    background: ${({ theme }) => theme.colors.blue2};
    object-fit: fill;
  }

  .profile-container {
    margin-top: 10px;
    flex-direction: row;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .profile-logo-container {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px ${({ theme }) => theme.colors.gray5};
    border-radius: 20px;
    margin-right: 6px;
  }
  .profile-logo-container-dark {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px ${({ theme }) => theme.colors.gray5};
    background-color: ${({ theme }) => theme.colors.blue2};
    border-radius: 20px;
    margin-right: 6px;
  }
  .profile-logo {
    max-width: 100%;
  }
  .p-5 {
    padding: 5px;
  }
  .location-row {
    display: flex;
    align-self: flex-start;
    justify-items: flex-start;
    flex-wrap: wrap;
  }

  .info-container {
    display: flex;
    width: 80%;
    padding: auto;
  }
`;
export const EditDamages = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  border-radius: 10px;
  .attach .fade-btn {
    padding: 0;
  }
  .gridy {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(241px, 1fr));
    padding: 15px;
    grid-gap: 23px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray5};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      grid-gap: 5px;
      grid-template-columns: 1fr;
    }
  }

  .total-technician-prices {
    display: flex;
    padding: 20px;
    align-items: flex-end;
    flex-direction: column;
    font-size: small;
  }
  .damages-table {
    display: flex;
    flex-direction: column;
  }

  .damages-table-head {
    margin-top: 30px;
    display: grid;
    grid-template-columns: 4fr 1.5fr 0.2fr;
  }
  .damages-table-foot {
    display: grid;
    /* 
    grid-template-columns: 4fr 1.47fr 0.45fr; */
    grid-template-columns: 4fr 1.4fr 0.45fr;

    background-color: ${({ theme }) => theme.colors.gray6};
  }

  .last-child {
    margin-right: 10px;
  }
  .damages-paragraph {
    padding: 8px 10px;
    background-color: ${({ theme }) => theme.colors.gray6};
    font-weight: bolder;
    width: max-content;
    font-size: small;
    color: ${({ theme }) => theme.colors.black};
  }
  .damages-paragraph-2 {
    padding: 8px 10px;
    font-weight: bolder;
    font-size: small;
    color: ${({ theme }) => theme.colors.black};
  }
  .m-left {
    margin-left: 10px !important;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      margin-left: auto;
    }
  }
  .m-right {
    margin-right: 10px !important;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      margin-right: auto;
    }
  }

  .damages-paragraph-2:first-child {
    margin-right: 10px;
  }
  .damages-foot-paragraph {
    padding: 8px 10px;
    font-weight: bolder;
    font-size: small;
    background-color: ${({ theme }) => theme.colors.gray6};
    color: ${({ theme }) => theme.colors.black};
  }
  .damages-body {
    display: grid;
    grid-template-columns: 2fr 2fr 1.4fr 0.3fr;
    padding: 10px;
    font-size: small;
    border-top: 2px solid ${({ theme }) => theme.colors.gray6};
  }

  .heading .text,
  .details .title {
    font-size: ${({ theme }) => theme.fontSizes.base};
    color: ${({ theme }) => theme.colors.black2};
    font-family: Poppins-Light;
    margin: 0;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
  .bigger-amount {
    font-size: ${({ theme }) => theme.fontSizes.small};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
  }
  .attach {
    margin-top: 10px;
  }
  .attach .attach-text {
    margin-left: 7px;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.black2};
  }
  .details .lhs .description {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.gray4};
    line-height: 14px;
    margin-top: 7px;
  }
  .grid-small {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 5px;
  }
`;
export const Editable = styled.div`
  margin-bottom: 13px;
  .editable-content {
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    border-radius: 10px;
  }
  .edit-heading {
    margin-bottom: 10px;
  }
  .edit-heading .edit-heading-title {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
  button.edit {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.black2};
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    padding: 1px 8px;
    background-color: ${({ theme }) => theme.colors.white};
    outline: none;
    border-radius: 6px;
  }
  button.edit img {
    margin-right: 3px;
  }
  .editable-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    padding: 15px;
    grid-gap: 23px;
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
  .no-border {
    border-bottom: 0;
  }
`;
export const TabPanel6 = styled.div`
  .next-btn {
    display: flex;
    flex-direction: row-reverse;
  }
  .bold-msg {
    font-size: 18px;
    font-weight: bold !important;
  }
  .member-container {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 15px;
    height: 100vh;
  }
  .member-container {
    color: ${({ theme }) => theme.colors.black2};
  }
  .rating-star {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }
  .start-paragraph {
    padding: 0px 20px;
  }
  .start-btn {
    display: flex;
    justify-content: center;
    margin-top: 30px;
    margin-bottom: 10px;
  }
  .panel6-flex {
    margin-top: 0px;
    align-items: flex-end;
    flex-wrap: wrap-reverse;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      flex-direction: column-reverse;
      align-items: flex-start;
    }
  }

  .editables {
    width: 80%;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      margin-top: 20px;
      width: 100%;
    }
  }
  .additional-heading {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
  .email-notification {
    margin-top: 15px;
  }
  .additional-content {
    margin-top: 15px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    border-radius: 10px;
    padding: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(330px, 2fr));
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      grid-template-columns: 1fr;
    }
  }
  .additional-content .label {
    margin: 0 20px 0 -17px;
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
  }
  .sub-small-heading {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    margin-left: 8px;
  }
  .mb-6 {
    margin-bottom: 6px;
    margin-right: 10px;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .currency {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
  .currency-input {
    width: 80px;
    margin-left: 4px;
  }
  .default-price {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
  }
`;
export const TabPanel2 = styled.div`
  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    width: 100%;
  }
  .next-btn {
    display: flex;
    flex-direction: row-reverse;
  }
  .gridy {
    display: grid;
    grid-gap: 35px;
    grid-row-gap: 15px;
    grid-template-columns: 1fr 1fr;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      .next-btn {
        position: absolute;
        right: 5px;
        top: 100px;
      }
      grid-template-columns: 1fr;
      margin-top: 30px;
    }

    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      .next-btn {
        position: absolute;
        right: 5px;
        top: 120px;
      }
      grid-template-columns: 1fr;
      margin-top: 30px;
    }
  }
  .mb-15 {
    margin-bottom: 15px;
  }
  .lower {
    margin-top: 60px;
  }
  .full-row {
  }

  .MuiSvgIcon-root {
    right: 5px;
    width: 14px;
    fill: ${({ theme }) => theme.colors.gray4} !important;
  }
  .sub-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(149px, 1fr));
    grid-gap: 25px;
  }
`;

export const ChatBox = styled.div`
  display: ${(props) => !props?.feedback && "grid"};
  grid-template-columns: ${(props) => !props?.feedback && "1fr max-content"};
  @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
    grid-template-columns: 1fr;
    margin-bottom: 10px;
  }
  height: auto;
  width: 100%;
  border-radius: 14px;
  padding: 10px;
  margin: 20px;
  position: relative;
  background-color: ${({ theme }) => theme.colors.gray6};
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  border-bottom-right-radius: 0;
  ::before and ::after {
    content: "";
    display: block;
    position: absolute;
    left: 100%;
    width: 0;
    height: 0;
  }
  div > p {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
  }

  .chat-box-main {
    display: flex;
    height: auto;
    word-break: break-word;
    justify-content: space-around;
  }

  .note-wrapper {
    flex-grow: 6;
    flex-shrink: 1;
    margin-bottom: 20px;
    flex-basis: 60em;
  }

  .name {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.small};
    font-weight: bold;
  }

  .note-details-wrapper {
    flex-grow: 0.5;
    flex-shrink: 0;
    align-self: flex-end;
    padding-top: 10px;
  }
`;

export const TabPanel7 = styled.div`
  #input {
    border-radius: 14px;
    padding: 6px;
    background-color: white;
  }
  .inputs {
    display: flex;
  }
  .note-btn {
    margin: 20px 5px 0px 5px;
    padding: 0px 10px;
    height: 35px;
    font-size: small;
  }
  .chat-box-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    flex-basis: auto;
    padding: 10px;
  }

  .update-delete {
    display: flex;
  }

  #notes-input:after,
  #notes-input:before {
    content: "";
    display: block;
    position: absolute;
    left: 100%;
    width: 0;
    height: 0;
  }
  #notes-input::before {
    bottom: 0;
    border-right: 11px solid transparent;
    border-bottom: 12px solid #e8e9eb;
  }
  #notes-input::after {
    bottom: 1px !important;
    width: 10px !important;
    height: 10px !important;
    border-right: 10px solid transparent !important;
    border-bottom: 9px solid #e8e9eb !important;
  }
  #notes-input > p {
    color: black;
    font-size: x-small;
  }
  #load-more-btn-div {
    margin-top: 10px;
    display: flex;
    justify-content: center;
    text-align: center;
  }
  #load-more-btn {
    border-radius: 14px !important;
    color: black;
  }
  .input-label {
    color: #979797;
  }
`;

export const ImageHolder = styled.div`
  position: relative;
  padding: 33px 0 20px 0;
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  border-radius: 10px;
  #close {
    position: absolute;
    top: 6px;
    right: 6px;
  }
  .placeholder {
    display: flex;
    align-self: center;
    justify-content: center;
    height: 160px;
    cursor: pointer;
  }

  .place-holder-img {
    max-width: 100%;
    padding: 15px;
    background-repeat: no-repeat;
  }

  .below {
    padding: 10px;
    margin-top: 15px;
    border-top: 1px solid ${({ theme }) => theme.colors.gray5};
  }
  .below .about {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.base};
    line-height: 22px;
  }
  .below .detail {
    color: ${({ theme }) => theme.colors.gray4};
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-top: 10px;
    overflow-wrap: break-word;
  }
`;
export const TabPanel3 = styled.div`
  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    width: 100%;
  }

  .white-btn,
  .save-btn {
    width: 112px;
    border-radius: 10px;
    padding-left: 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    padding: 5px;
    font-family: Poppins-Light;
    height: 35px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black2};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      /* width: auto; */
      white-space: nowrap;
    }
  }
  .white-btn:hover {
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
    transition: 0.3s;
  }
  .save-btn {
    padding-left: 20px;
    padding-right: 20px;
    background-color: ${({ theme }) => theme.colors.deepblue};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
  }
  .save-btn:hover {
    color: ${({ theme }) => theme.colors.deepblue};
    background-color: ${({ theme }) => theme.colors.white};
    transition: 0.3s;
  }
  .next-btn {
    display: flex;
    flex-direction: row-reverse;

    position: ${({ stickAtTop }) => stickAtTop && "fixed"};
    z-index: 2;
    top: ${({ stickAtTop }) => stickAtTop && "100"}px;
    right: ${({ stickAtTop }) => stickAtTop && "65"}px;
  }
  .gridy {
    display: grid;
    grid-gap: 35px;
    grid-row-gap: 15px;
    grid-template-columns: 1fr 1fr 1fr;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      .next-btn {
        position: absolute;
        right: 5px;
        top: 100px;
      }
      grid-template-columns: 1fr;
      margin-top: 30px;
    }

    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      margin-top: 30px;
      .next-btn {
        position: absolute;
        right: 5px;
        top: 100px;
      }
      grid-template-columns: 1fr;
    }
  }
  .mb-15 {
    margin-bottom: 15px;
  }
  .MuiSvgIcon-root {
    fill: ${({ theme }) => theme.colors.gray4} !important;
    width: 14px;
    right: 5px;
  }
  .sub-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(149px, 1fr));
    grid-gap: 25px;
  }
`;
export const CustomizedAccordions = styled.div`
  .MuiAccordionSummary-root {
    background-color: transparent;
  }
  .next-btn {
    display: flex;

    position: ${({ stickAtTop }) => stickAtTop && "fixed"};
    z-index: 2;
    top: ${({ stickAtTop }) => stickAtTop && "100"}px;
    right: ${({ stickAtTop }) => stickAtTop && "48"}px;
    flex-direction: row-reverse;
  }

  .white-btn,
  .save-btn {
    width: 105px;
    border-radius: 10px;
    padding-left: 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    padding: 5px;
    font-family: Poppins-Light;
    height: 35px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black2};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      /* width: auto; */
      white-space: nowrap;
    }
  }
  .white-btn:hover {
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
    transition: 0.3s;
  }
  .save-btn {
    background-color: ${({ theme }) => theme.colors.deepblue};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
  }
  .save-btn:hover {
    color: ${({ theme }) => theme.colors.deepblue};
    background-color: ${({ theme }) => theme.colors.white};
    transition: 0.3s;
  }
  .modal-btn-trigger {
    width: fit-content;
  }

  .dent-category-inputs {
    display: flex;
  }

  .image-holder {
    margin-top: 20px;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(149px, 1fr));
    grid-gap: 20px;
  }
  .last-btns {
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin-left: 20px;
  }
  .MuiSvgIcon-root {
    fill: ${({ theme }) => theme.colors.gray4} !important;
    width: 16px;
    height: 16px;
  }

  .MuiAccordionDetails-root {
    display: block;
  }
  .check-flex {
    align-items: flex-end;
    margin-bottom: 15px;
  }
  .amount {
    width: 135px;
  }
  .btn {
    margin-top: 30px;
  }
  .select {
    width: 92%;
    margin-left: auto;
  }
  .MuiSelect-selectMenu {
    font-family: "Poppins-Light";
  }

  .MuiAccordion-root {
    ${(props) =>
      props?.border === "hide"
        ? `null`
        : css`
            border: 1px solid ${({ theme }) => theme.colors.link};
          `}
    padding-left: 5px;
    padding-right: 5px;
    border-bottom-width: 0.1px;
  }
  .MuiAccordionDetails-root {
    padding: 0 0 20px 0;
  }
  .upper {
    padding: 0 15px;
  }
  .MuiCollapse-container {
    padding: 0 10px !important;
  }
  .MuiAccordionSummary-root.Mui-expanded {
    border-bottom: 0;
  }

  .trigger .text {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.large};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      font-size: ${({ theme }) => theme.fontSizes.base};
    }
  }

  .text-unsave {
    color: ${({ theme }) => theme.colors.red1};
    font-weight: bold;
  }
  .description {
    color: ${({ theme }) => theme.colors.gray4};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
  .upper {
    margin-top: 20px;
  }
  .ant-input {
    margin-top: 10px;
    margin-bottom: 30px;
    padding: 15px;
    color: ${({ theme }) => theme.colors.black};
    font-size: ${({ theme }) => theme.fontSizes.base};
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    border-radius: 10px;
    width: 100%;
  }
  .ant-input:focus:hover {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.bg2};
    border-color: ${({ theme }) => theme.colors.deepblue};
  }
  .MuiAccordionSummary-content {
    display: block;
  }
`;
export const CompanyCard = styled.div`
  background-color: ${({ theme }) => theme.colors.bg2};
  padding: 25px;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .check {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  .images {
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    height: 80px;
    border-radius: 10px;
    width: 80px;
    margin: auto;
  }
  .direct {
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      display: grid;
      justify-items: center;
    }
  }
  .avatar {
    position: absolute;
    bottom: -5px;
    right: -11px;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
  }
  .mrl-5 {
    margin: 0 5px;
  }
  .mrl-10 {
    margin: 0 10px;
  }
  .text {
    color: ${({ theme }) => theme.colors.black2};
    margin-bottom: 15px;
    text-align: center;
  }
  .name {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
  .addr,
  .rep,
  .tags {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
  }
  .tags {
    margin: 10px 0;
    color: ${({ theme }) => theme.colors.white};
    justify-content: center;
  }
  .tag {
    padding: 3px 10px;
    border-radius: 5px;
  }
  .tags .fade-red {
    background-color: ${({ theme }) => theme.colors.red2};
  }
  .tags .green {
    background-color: ${({ theme }) => theme.colors.green2};
  }
  .socials {
    margin: 15px 0;
    justify-content: center;
  }
  .ratings {
    justify-content: center;
    align-items: center;
  }
  .redirect {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    margin: 10px 0 20px 0;
    color: ${({ theme }) => theme.colors.gray4};
  }
  .redirect span {
    margin-left: 5px;
    white-space: nowrap;
  }
  .direct img {
    height: 16px;
  }
  .info {
    padding: 12px;
    border-radius: 10px;
    line-height: 14px;
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    background-color: ${({ theme }) => theme.colors.gray6};
  }

  .ratings .rating {
    margin-left: 8px;
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.gray4};
  }
`;
export const DamagesTabPanel1 = styled.div`
  display: grid;
  grid-template-columns: 60% 40%;
  overflow: hidden !important;
  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    grid-template-columns: 1fr;
  }
  .motor {
    max-width: 100%;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      margin: 20px 0;
    }
  }
  .mobile-device-msg {
    display: none;
    margin-top: 20px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      display: block;
    }
  }
`;
export const RatingStar = styled.div`
  .MuiSvgIcon-root {
    fill: #f69508 !important;
  }
`;
export const TabPanel5 = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  .map {
    display: flex;
    flex-grow: 2;
    flex-basis: 20em;
    margin-bottom: 70px;
    margin-top: 30px;
  }
  .white-btn,
  .save-btn {
    width: 105px;
    border-radius: 10px;
    padding-left: 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    padding: 5px;

    font-family: Poppins-Light;
    height: 35px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black2};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      width: auto;
      white-space: nowrap;
    }
  }
  .white-btn:hover {
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
    transition: 0.3s;
  }
  .save-btn {
    padding-left: 20px;
    padding-right: 20px;
    background-color: ${({ theme }) => theme.colors.deepblue};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
  }
  .save-btn:hover {
    color: ${({ theme }) => theme.colors.deepblue};
    background-color: ${({ theme }) => theme.colors.white};
    transition: 0.3s;
  }
  .next-btn {
    display: flex;
    position: ${({ stickAtTop }) => stickAtTop && "absolute"};
    z-index: 2;
    top: ${({ stickAtTop }) => stickAtTop && "0"}px;
    right: ${({ stickAtTop }) => stickAtTop && "20"}px;
    flex-direction: row-reverse;
  }
  .next-btn button {
    position: ${({ stickAtTop }) => stickAtTop && "fixed"};
  }

  .technicain-card-container {
    flex-shrink: 1;
    flex-basis: 40em;
    z-index: 1;
  }

  .load-btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1;
    margin-top: 20px;
  }

  .slider {
    z-index: 1;
    position: relative;
    overflow: hidden;
    top: 0;
  }

  .grid-card {
    display: grid;
    grid-gap: 15px;
    grid-template-columns: repeat(auto-fill, minmax(241px, 1fr));
  }

  .MuiSlider-rail,
  .MuiSlider-track {
    height: 4px;
  }
  .MuiSlider-root {
    color: ${({ theme }) => theme.colors.deepblue};
  }
  .MuiSlider-rail {
    color: ${({ theme }) => theme.colors.gray5};
    opacity: 1;
  }
  .sort,
  .value {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
  .value {
    color: ${({ theme }) => theme.colors.gray4};
  }
  .sort {
    color: ${({ theme }) => theme.colors.black2};
  }
  .sorts {
    grid-template-columns: repeat(auto-fill, minmax(256px, 1fr));
    display: grid;
    margin: 20px 0 30px 0;
    grid-gap: 20px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      grid-gap: 0;
    }
  }

  .sort-ratings {
    margin-left: 10px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      margin-left: 0;
    }
  }
`;
export const TabPanel4 = styled.div`
  overflow: hidden;

  .mb-6 {
    margin-bottom: 6px;
  }
  .wrap {
    flex-wrap: wrap !important;
  }
  .bold {
    font-weight: bolder;
    color: black;
    margin-right: 10px;
  }
  .justify-text {
    text-align: justify;
  }
  display: grid;
  grid-template-columns: 1fr;
  .white-btn,
  .save-btn {
    width: auto;
    font-size: ${({ member }) => (member ? "medium" : "auto")};
    border-radius: 10px;
    padding-left: 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    padding: 5px 15px;
    font-family: Poppins-Light;
    height: "35px";
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black2};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      /* width: auto; */
      white-space: nowrap;
    }
  }
  .damage-photo-desc {
    padding-left: 5px;
    font-weight: bold;
    margin-top: 3px;
    color: ${({ theme }) => theme.colors.deepblue};
  }
  .save-error {
    display: flex;
    flex-direction: row-reverse;
  }
  .save-error small {
    color: ${({ theme }) => theme.colors.red1};
  }
  .white-btn:hover {
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
    transition: 0.3s;
  }
  .save-btn {
    background-color: ${({ theme }) => theme.colors.deepblue};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
  }
  .save-btn:hover {
    color: ${({ theme }) => theme.colors.deepblue};
    background-color: ${({ theme }) => theme.colors.white};
    transition: 0.3s;
  }
  .dent-page-cont-btn {
    text-align: center;
    float: right;

    position: ${({ stickAtTop }) => stickAtTop && "fixed"};
    z-index: 2;
    top: ${({ stickAtTop }) => stickAtTop && "100"}px;
    justify-self: end !important;
  }
  .MuiBox-root {
    padding: 0;
  }

  .mono-motor {
    justify-content: center;
    margin-top: 50px;
  }

  .grid-panel {
    margin-bottom: 20px;
    align-items: center;
  }
`;
export const Tabset = styled.div`
  .MuiTabs-fixed {
    height: 43px;
    overflow-y: hidden !important;
    overflow-x: scroll !important;
  }
  .review-customer {
    position: absolute;
    right: 0;
    top: -5px;
  }
  .copy-link {
    display: flex;
    justify-content: flex-end;
  }
  .copy-link small {
    font-size: 13px;
    margin-right: 7px;
  }
  .copy-img {
    cursor: pointer;
  }
  .link-address {
    background-color: ${({ theme }) => theme.colors.white};
    padding: 10px;
  }
  .MuiTabs-fixed::-webkit-scrollbar {
    height: 0.9px;
  }
  .hint {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
  .MuiTabs-fixed::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  .MuiTabs-fixed::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
  .grid-panel {
    display: grid;
    position: relative;
    align-items: flex-start;
    grid-template-columns: 1fr max-content;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      display: ${({ member }) => {
        !member && "flex";
      }};
      grid-gap: 20px;
      flex-wrap: wrap;
      flex-direction: column-reverse;
      align-items: flex-end;
    }
  }
  .grid-panel1 {
    grid-gap: 30px !important;
  }

  .grid-panel-center {
    align-items: center;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      align-items: flex-start;
    }
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      display: grid;
    }
  }
  .MuiTab-root {
    min-width: auto;
    padding-right: 30px;
    min-height: 40px;
  }
  .odd {
    border-top-left-radius: 0px;
  }
  .MuiTab-wrapper {
    z-index: 1;
    text-align: left;
    text-transform: capitalize;
    align-items: flex-start;
    color: ${({ theme }) => theme.colors.gray4};
    font-size: ${({ theme }) => theme.fontSizes.base};
    font-family: "Poppins-Light";
  }

  .tabpanel {
    border-radius: 15px;
    padding-bottom: 40px;
    margin-top: -6px;
    border-top-left-radius: 0;
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.bg2};
    background-color: ${({ theme }) => theme.colors.white};
  }
  .MuiTab-textColorPrimary {
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 15px;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }
  .MuiTab-textColorPrimary.Mui-selected span {
    color: ${({ theme, member }) =>
      !member ? theme.colors.deepblue : theme.colors.black};
    background-color: ${({ theme, member }) =>
      !member ? theme.colors.white : theme.colors.lightBluish};
  }
  .MuiTabs-indicator {
    background-color: transparent;
  }
`;

export const NotesUI = styled.div`
  .feedbacks {
    display: flex;
    width: 90%;
    justify-content: space-between;
    margin-bottom: 20px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      width: 100%;
    }

    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      width: 100%;
      flex-direction: column;
    }
  }
  .feedbacks .member-feedback,
  .technician-feedback {
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;
    padding-right: 20px;
    background-color: ${({ theme }) => theme.colors.gray6};
    border-radius: 15px;
  }
  .last-requested {
    margin-top: 8px;
    margin-bottom: -8px;
    font-size: small;
  }
  .manually-btn {
    width: 70%;

    font-size: small;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      width: 100%;
    }
  }
  .notes-button {
    position: absolute;
    top: 110px;
    right: 25px;
  }
  .note-div {
    display: flex;
    z-index: 142;
    position: ${({ stickAtTop }) => stickAtTop && "fixed"};
    top: ${({ stickAtTop }) => stickAtTop && "100"}px;
    right: ${({ stickAtTop }) => stickAtTop && "48"}px;
    justify-content: flex-end;
  }
  .white-btn,
  .save-btn {
    width: 105px;
    border-radius: 10px;
    padding-left: 20px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    padding: 5px;
    font-family: Poppins-Light;
    height: 35px;
    background-color: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black2};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      /* width: auto; */
      white-space: nowrap;
    }
  }
  .white-btn:hover {
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
    transition: 0.3s;
  }
  .save-btn {
    background-color: ${({ theme }) => theme.colors.deepblue};
    color: ${({ theme }) => theme.colors.white};
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
  }
  .save-btn:hover {
    color: ${({ theme }) => theme.colors.deepblue};
    background-color: ${({ theme }) => theme.colors.white};
    transition: 0.3s;
  }
  @media (max-width: ${(props) => props.theme.breakpoint.sm}) {
    .notes-button {
      position: static;
      float: right;
      margin-top: 20px;
    }
  }
`;
export const TechnicianReviewPage = styled.div`
  .tech-container {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 15px;
  }
  .review-message-cont {
    border-radius: 10px;
    background-color: ${({ theme }) => theme.colors.white};
    padding: 15px;
    height: 100vh;
  }
  .tech-container {
    color: ${({ theme }) => theme.colors.black2};
  }
  .feedback-btn {
    display: flex;
    flex-direction: row-reverse;
    font-size: smaller;
  }
  .tech-pad {
    padding: 15px 0px;
  }
  .date {
    width: 30%;
    display: grid;
  }
  .tech-text-area {
    width: 70%;
    display: grid;
    height: 100px;
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    .date {
      width: 100%;
    }
    .tech-text-area {
      width: 100%;
    }
  }
`;
