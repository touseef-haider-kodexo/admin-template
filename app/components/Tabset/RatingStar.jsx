import React from "react";
import PropTypes from "prop-types";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";

import * as S from "./styled";

export default function RatingStar({
  defaultValue,
  value,
  disabled,
  size,
  name,
  onChange,
}) {
  return (
    <S.RatingStar>
      <Rating
        name={name}
        size={size ?? "small"}
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        emptyIcon={<StarBorderIcon fontSize="inherit" />}
        onChange={onChange}
      />
    </S.RatingStar>
  );
}

RatingStar.propTypes = {
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
};
