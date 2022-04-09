import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

const Feedback = ({ type, ...rest }) => <S.Feedback type={type} {...rest} />;

Feedback.propTypes = {
  rest: PropTypes.shape(),
  type: PropTypes.string,
};

Feedback.defaultProps = {
  rest: {},
  type: "invalid",
};

export default Feedback;
