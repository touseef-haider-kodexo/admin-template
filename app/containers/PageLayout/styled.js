import styled from "styled-components";

export const Wrapper = styled.div`
  width: ${(props) => props.member && "85%"};
  margin: ${(props) => (props.member ? "0px auto" : "auto")};
  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    width: ${(props) => props.member && "100%"};
  }
  .body-grid {
    min-height: 100vh;
    font-family: "popins_light";
  }
  .verification {
    position: absolute;
    top: -3px;
    margin-left: 10px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      display: none;
    }
  }
  .tpa-logo {
    position: absolute;
    left: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      display: none;
    }
  }
  .tpa-logo-circle {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: ${(props) => props.theme.colors.blue2};
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .tpa-powered {
    color: ${({ theme }) => theme.colors.black};
    font-size: 8px;
    margin-top: 2px;
    font-weight: bold;
    font-style: italic;
    text-decoration: underline;
  }
  .search-input-wrap {
    margin-right: 20px;
    height: 35px;
    padding: 10px;

    color: #8a9099 !important;
    margin-top: 10px;
    background-color: #e9f3f5;

    border-radius: 13px;
    /* background-color: ${({ theme }) => theme.colors.gray6}; */
    position: relative;
    display: flex;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      margin-bottom: 10px;
    }
  }
  .search-input-wrap img {
    position: absolute;
  }
  .multi-select-search {
    overflow: hidden;
    height: 35px !important;
    margin-top: 11px;
    margin-right: 20px;
  }
  .grid {
    /* width: 100%; */
    /* justify-items: end; */
    display: grid;
    grid-template-columns: repeat(3, minmax(0px, 1fr));
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      grid-template-columns: repeat(1, minmax(200px, 1fr));
    }
  }
  .grid-md {
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      display: grid;
      grid-row-gap: 15px;
    }
  }
  .search-input {
    background-color: transparent;
    border: none;
    outline: none;
    margin-left: 15px;
    width: 100%;
    margin-left: 23px;
  }

  .search-input:focus,
  .search-input:hover {
    outline: none;
  }
  .search-input-wrap:focus-within {
    box-shadow: 0 0 5px ${({ theme }) => theme.colors.gray4};
    transition: 0.3s;
  }

  .app-bar-border {
    border-bottom: 5px solid ${({ theme }) => theme.colors.darkblue};
  }

  .search-input::placeholder {
    font-size: ${({ theme }) => theme.fontSizes.small};
    color: ${({ theme }) => theme.colors.gray4};
    font-family: "Poppins-Light";
  }
  .text-btn {
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin-left: 5px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
    }
  }
  #bell {
    padding: 0 15px 0 35px;
    margin-right: 15px;
    border-right: 1px solid ${({ theme }) => theme.colors.gray5};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      margin-right: 5px;
      padding: 0 5px 0 15px;
    }
  }
  .MuiDrawer-paper {
    position: relative;
    background-color: ${({ theme }) => theme.colors.darkGrey};
  }
  .MuiTypography-body1 {
    font-family: "Poppins-Light";
  }
  .trigger {
    img {
      @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
        width: 25px;
      }
    }
  }
  .dp-name {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.base};
    margin: 0 10px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      font-size: ${({ theme }) => theme.fontSizes.small};
      margin: 0 5px;
    }
  }
  .dropdown {
    position: relative;
  }
  .MuiAppBar-colorPrimary {
    /* height: 64px; */
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
    z-index: 2222;
  }
  .MuiDrawer-paper-desktop .MuiDrawer-paperAnchorDockedLeft {
    width: 270px;
    z-index: 2223;
    font-size: ${({ theme }) => theme.fontSizes.small};
    background-color: ${({ theme }) => theme.colors.darkGrey};
    color: ${({ theme }) => theme.colors.gray};
    border-right: 1px solid ${({ theme }) => theme.colors.gray5};
  }
  .MuiDrawer-paperAnchorDockedLeft {
    position: fixed;
  }
  .MuiToolbar-gutters {
    padding: 0 20px 0 20px;
    min-height: 64px !important;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      padding: 0 20px;
    }
  }

  .MuiListItem-gutters {
    padding: 0;
  }

  .MuiDrawer-paperAnchorDockedLeft {
    border-right: none;
  }
  .MuiContainer-root {
    padding: 0;
  }
  main {
    display: block;
    margin-top: 30px;
    padding: 54px 20px 20px 20px;
    overflow-x: scroll;
    &::-webkit-scrollbar {
      height: 0.1rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors.gray};
      border-radius: 0.5rem;
    }
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      margin: 0;
      padding: 20px;
      margin-top: 41px;
    }
  }
  .mleft {
    margin-left: 270px;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      margin-left: 0px;
    }
  }
  .notmleft {
    margin-left: 0px;
  }
  main .MuiContainer-root {
    position: relative;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      padding-left: 0;
      padding-right: 0;
    }
  }

  .desktop {
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      display: none;
    }
  }
  @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
    .makeStyles-drawerPaperClose-10 {
      width: 0px;
    }
  }
  .MuiSvgIcon-root {
    fill: black;
  }
  .mobile {
    display: none;
    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      display: inline-block;
    }
    .MuiDrawer-paperAnchorLeft {
      top: 62px;
    }
  }
  .dash-head {
    margin: 10px 0 20px 0;
  }
  .title {
    font-size: ${({ theme }) => theme.fontSizes.l};
    @media screen and (max-width: ${(props) => props.theme.breakpoint.sm}) {
      font-size: ${({ theme }) => theme.fontSizes.large};
    }
  }
`;
