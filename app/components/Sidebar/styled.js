import styled from "styled-components";

import dotIcon from "@/assets/images/dotIcon.webp";
import dotActive from "@/assets/images/dotActive.webp";

export const ListItem = styled.div`
  .MuiTypography-body1 {
    font-weight: 500;
    font-size: 14px;
    line-height: 24px;
    // color: ${({ theme }) => theme.colors.lightWhite};
  }
  .exact {
    width: 100%;
  }
  .grey-color {
    fill: #8b8d92 !important;
  }
  .exact:hover {
    text-decoration: none !important;
  }
  .row-height {
    min-height: 4vh;
    cursor: pointer;
    padding: 10px 0 0 20px;
    border-left: 5px solid;
    border-color: rgba(111, 111, 111, 0.2) transparent;
  }
  .row-height:hover {
    background-color: ${({ theme }) => theme.colors.darkBlue};
  }
  .active-filter {
    filter: brightness(0) invert(1);
  }
  #logo {
    padding: 19px 20px;
  }
  .icons {
    margin-right: 10px;
    width: 20px;
    height: 20px;
    background-size: cover;
    background-repeat: no-repeat;
    display: inline-block;
  }
  .sicons {
    width: 6px;
    height: 6px;
  }
  .icon-padding {
    margin-right: 10px;
    align-self: center;
    background-size: cover;
    background-repeat: no-repeat;
    display: inline-block;
  }
  .active-img-dot {
    background-image: url(${dotActive});
  }
  .inactive-img-dot {
    filter: brightness(0) invert(1);
    background-image: url(${dotIcon});
  }
  .MuiListItemIcon-root {
    min-width: 25px;
  }
  .MuiList-padding {
    padding-top: 0;
  }
  .MuiListItem-gutters {
    padding: 10px 20px;
  }
  .active {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    border-left: 5px solid ${({ theme }) => theme.colors.link};
  }
  .slist {
    background: ${({ theme }) => theme.colors.darkGrey};
    padding: 10px 20px 10px 25px;
    text-decoration: none;
  }
  .slist:hover {
    background-color: ${({ theme }) => theme.colors.darkBlue};
    padding: 10px 20px 10px 25px;
  }
  .links {
    color: ${({ theme }) => theme.colors.white} !important;
  }
  .sactive {
    background-color: ${({ theme }) => theme.colors.darkGrey};
    color: ${({ theme }) => theme.colors.darkGrey};
  }

  .MuiListItem-button:hover {
    background: ${({ theme }) => theme.colors.darkBlue};
  }
`;
