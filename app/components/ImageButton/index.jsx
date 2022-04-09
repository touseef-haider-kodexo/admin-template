import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

export default function ImageButton({ img, onClick }) {
  return (
    <S.Button onClick={onClick}>
      <img src={img} alt="" />
    </S.Button>
  );
}

ImageButton.propTypes = {
  img: PropTypes.string,
  onClick: PropTypes.func,
};
