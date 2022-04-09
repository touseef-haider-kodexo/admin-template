import { createGlobalStyle, css } from "styled-components";

import popins_light from "../assets/fonts/Poppins-Light.otf";
import popins_medium from "../assets/fonts/Poppins-Medium.otf";

const reset = css`
  html,
  body,
  div,
  span,
  applet,
  object,
  iframe,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  a,
  abbr,
  acronym,
  address,
  big,
  cite,
  code,
  del,
  dfn,
  em,
  img,
  ins,
  kbd,
  q,
  s,
  samp,
  small,
  strike,
  sub,
  sup,
  tt,
  var,
  u,
  i,
  center,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  form,
  label,
  legend,
  table,
  caption,
  tbody,
  tfoot,
  thead,
  tr,
  th,
  td,
  article,
  aside,
  canvas,
  details,
  embed,
  figure,
  figcaption,
  footer,
  header,
  hgroup,
  menu,
  nav,
  output,
  ruby,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }
  body {
    line-height: 1;
  }
  img {
    vertical-align: middle;
  }
  a {
    color: #000;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
      transition: 0.3s;
    }
  }
  ol,
  ul {
    list-style: none;
  }
  blockquote,
  q {
    quotes: none;
  }
  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
    font-family: "Poppins-Light";
  }
  .input {
    font-family: "Poppins-Light";
  }

  * {
    font-family: "Poppins-Light";
  }

  html {
    scroll-behavior: smooth;
  }

  /* git push --set-upstream origin dashboard-api */
`;

const base = css`
  /* body { */
  /* @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    src: url("dist/fonts.css");
  } */

  @font-face {
    font-family: "Poppins-Light";
    font-style: normal;
    /* font-weight: 400; */
    src: url(${popins_light}) format("opentype");
  }
  @font-face {
    font-family: "Poppins-Medium";
    font-style: normal;
    /* font-weight: 400; */
    src: url(${popins_medium}) format("opentype");
  }
  .flex {
    display: flex;
    align-items: center;
  }
  * {
    box-sizing: border-box;
  }
  html,
  body {
    height: 100%;
    width: 100%;
    line-height: 1.5;
    color: #3f434a;
  }
  .mb-10 {
    margin-bottom: 10px;
  }
  .MuiMenu-paper {
    top: 66px;
  }
  .flex-wrap {
    flex-wrap: wrap;
  }
  .flipped {
    transform: scaleX(-1);
  }
  .MuiMenuItem-root {
    color: ${({ theme }) => theme.colors.black2};
    font-size: ${({ theme }) => theme.fontSizes.small};
  }
  .fade-btn {
    border: none;
    outline: none;
    background-color: rgba(0, 0, 0, 0);
  }
  .mb-15 {
    margin-bottom: 15px;
  }
  body,
  button {
    font-family: Poppins-Light;
  }
  body.fontLoaded {
    font-family: Poppins-Light;
  }
  .j-btw {
    justify-content: space-between;
  }
  .j-evenly {
    justify-content: space-evenly;
  }

  .grid {
    display: grid;
  }
  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }
  p,
  label {
    font-family: Poppins-Light;
    line-height: 18px;
  }
  button {
    cursor: pointer;
  }
`;

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${base}
`;

export default GlobalStyle;
