import styled from "styled-components";

export const Statuses = styled.div`
  padding: 20px 10px 60px 10px;
  border-radius: 15px;
  box-shadow: 0 0 5px ${({ theme }) => theme.colors.bg2};

  background-color: ${({ theme }) => theme.colors.white};
  .sub-head {
    font-size: ${({ theme }) => theme.fontSizes.large};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
  .with-toggle {
    margin-bottom: 35px;
  }
  .text {
    margin-left: 15px;
  }
  img {
    width: 23px;
    height: 23px;
  }

  .grid-flex {
    width: auto;
    background-color: ${({ theme }) => theme.colors.bg2};
    padding: 8px 15px;
    border-radius: 12px;
    border: 2px solid rgba(0, 0, 0, 0);
    cursor: pointer;
    transition: 0.3s;
  }
  .process {
    &:hover {
      border: 2px solid #02aaf0;
    }
  }
  .pending {
    &:hover {
      border: 2px solid #fc827f;
    }
  }

  .registered {
    &:hover {
      border: 2px solid #7260c6;
    }
  }
  .scheduled {
    &:hover {
      border: 2px solid #ffb66b;
    }
  }
  .followup {
    &:hover {
      border: 2px solid #7571d5;
    }
  }
  .closed {
    &:hover {
      border: 2px solid #75d7e7;
    }
  }
  .complete {
    &:hover {
      border: 2px solid #ff6f97;
    }
  }
  .active {
    border: 2px solid ${({ theme }) => theme.colors.gray3};
  }

  .name {
    font-size: ${({ theme }) => theme.fontSizes.base};
  }
  .count {
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin-top: 8px;
    font-weight: 600;
  }
  .grid {
    gap: 20px;
    grid-template-columns: repeat(auto-fill, minmax(219px, 1fr));
  }
  .blue {
    color: ${({ theme }) => theme.colors.link};
  }
`;

export const GridClaim = styled.div`
  margin-top: 50px;

  .sub-head {
    font-size: ${({ theme }) => theme.fontSizes.large};
    margin-bottom: 20px;
  }

  .profile-logo-container {
    width: 45px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: solid 1px ${({ theme }) => theme.colors.gray5};
    border-radius: 22px;
  }

  .mouse-cursor {
    cursor: pointer;
  }

  .profile-logo {
    object-fit: contain;
    border-radius: 22px;
  }
  .notification,
  .recent-claim {
    padding: 30px 10px 5px 20px;
    border-radius: 15px;
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.bg2};

    background-color: ${({ theme }) => theme.colors.white};
  }
  .grid {
    grid-template-columns: 1fr 1fr;
    grid-gap: 35px;
    @media screen and (max-width: ${({ theme }) => theme.breakpoint.md}) {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
  }
  .icon {
    color: ${({ theme }) => theme.colors.blue1};
    font-weight: bolder;
    text-transform: uppercase;
    font-size: ${({ theme }) => theme.fontSizes.medium};
  }
  .mr-30 {
    margin-right: 30px;
  }
  .oval {
    border-radius: 50%;
    min-width: 40px;
    justify-content: center;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.blue2};
    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
      margin-right: 10px;
    }
  }
  .flex-notify,
  .flex-recent {
    border-bottom: 1px solid ${({ theme }) => theme.colors.bg2};
    padding: 10px 0;
  }
  .flex-recent {
    .text {
      padding-left: 50px;
    }
    .pl20 {
      padding-left: 20px;
    }

    .updated {
      border-left: 2px solid none;
    }
    .process {
      border-left: 2px solid none;
    }
    .complete {
      border-left: 4px solid ${({ theme }) => theme.colors.deepblue};
    }
  }
  .action,
  .view {
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
  .view {
    border: 1px solid ${({ theme }) => theme.colors.bg2};
    text-align: left;
    margin: 10px 0 0 auto;
    width: 95px;
    padding: 7px;
    border-radius: 13px;
    &:hover {
      text-decoration: underline;
      transition: 0.3s;
      cursor: pointer;
    }
    a {
      color: ${({ theme }) => theme.colors.black2};
    }
  }
  .name {
    font-size: ${({ theme }) => theme.fontSizes.xsmall};
    color: ${({ theme }) => theme.colors.gray4};
    line-height: 10px;
    margin-top: 5px;
  }
  .who {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray4};
  }
  .what {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.black2};
    line-height: 12px;
    margin-top: 5px;
  }
  .blue {
    color: ${({ theme }) => theme.colors.link};
  }
`;

export const Pagination = styled.div`
  .pagination {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray4};
    margin: 0 30px 0 70px;
    @media screen and (max-width: ${({ theme }) => theme.breakpoint.sm}) {
      margin: 0px 30px;
    }
  }
  .page-number {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.black2};
    padding: 10px;
    border: none;
    background-color: rgba(0, 0, 0, 0);
    outline: none;
  }
`;

export const Toggle = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray5};
  border-radius: 15px;
  .react-switch-checkbox {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  .antd-switch-active-bg {
    background-color: ${({ theme }) => theme.colors.deepblue};
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
  }

  .ant-switch-checked {
    background-color: ${({ theme }) => theme.colors.deepblue};
  }

  .react-switch-label {
    font-size: ${({ theme }) => theme.fontSizes.base};
    cursor: pointer;
    width: 225px;
    height: 40px;
    background-color: ${({ theme }) => theme.colors.white};
    border-radius: 15px;
    border: 1px solid ${({ theme }) => theme.colors.gray5};
    position: relative;
    color: ${({ theme }) => theme.colors.black2};
    transition: background-color 0.2s;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      width: 150px;
      font-size: ${({ theme }) => theme.fontSizes.xsmall};
    }
  }

  .react-switch-label .react-switch-button {
    content: "";
    position: absolute;
    top: 2px;
    left: 2px;
    height: 35px;
    transition: 0.2s;
    background-color: ${({ theme }) => theme.colors.deepblue};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
    padding: 8px;
    text-align: left;

    width: 116px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      width: 75px;
    }
  }
  .my-claims {
    margin-left: 10px;
  }
  .text {
    margin: 0 33px 0 auto;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      margin: 0 9px 0 auto;
    }
  }
  .cursor-pointer {
    cursor: pointer;
  }
  .active {
    background-color: ${({ theme }) => theme.colors.deepblue};
    color: ${({ theme }) => theme.colors.white};
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.colors.deepblue};
    padding: 8px;
    /* text-align: left; */
    /* width: 116px; */
    /* margin: 0 8px; */
    /* z-index: 2; */
  }
  p,
  h2 {
    padding: 8px;
  }
  .react-switch-checkbox:checked + .react-switch-label .react-switch-button {
    left: calc(100% - 2px);
    transform: translateX(-100%);
  }

  .react-switch-label:active .react-switch-button {
    width: 60px;
  }
`;
