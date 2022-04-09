import React from "react";
import PropTypes from "prop-types";

import ErrorMessage from "@/components/ErrorMessage";

import * as S from "./styled";

const TextArea = ({
  blueLine,
  defaultValue,
  disabled,
  error,
  helper,
  label,
  maxLength,
  onBlur,
  onChange,
  placeholder,
  type,
  value,
  ...rest
}) => (
  <S.Wrapper>
    <h6 className="input_label">{label}</h6>
    <textarea
      className={`${blueLine}  ${error ? "input-error error-border" : "input"}`}
      defaultValue={defaultValue}
      disabled={disabled}
      maxLength={maxLength}
      onBlur={onBlur}
      onChange={onChange}
      placeholder={placeholder}
      rows="7"
      type={type}
      value={value}
      {...rest}
    />
    {helper}
    <ErrorMessage>{error}</ErrorMessage>
  </S.Wrapper>
);

TextArea.propTypes = {
  blueLine: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helper: PropTypes.func,
  label: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

TextArea.defaultProps = {
  disabled: false,
  error: "",
  type: "text",
  value: "",
};
export default TextArea;
