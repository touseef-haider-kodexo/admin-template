import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

const Button = ({ extend, disabled, onClick, ref, size, value, ...rest }) => (
  <S.Button
    onClick={onClick}
    disabled={disabled}
    type="button"
    ref={ref}
    name={rest.name}
    extend={extend}
    size={size}
    stickAtTop={rest.stickAtTop}
    onScroll={rest.onScroll}
    {...rest}
  >
    {value}
  </S.Button>
);

Button.propTypes = {
  extend: PropTypes.bool,
  rest: PropTypes.shape(),
  size: PropTypes.string,
  value: PropTypes.func,
  hasBlueBackground: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  ref: PropTypes.func,
};

Button.defaultProps = {
  extend: false,
  rest: {},
  size: "small",
  value: () => {},
  hasBlueBackground: true,
  disabled: false,
};

export default Button;
