import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

export default function ErrorMessage({ children }) {
  return <S.Span>{children}</S.Span>;
}

ErrorMessage.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};
