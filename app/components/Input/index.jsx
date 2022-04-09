import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

import ErrorMessage from "@/components/ErrorMessage";

const TextInput = ({
  blueLine,
  defaultValue,
  disabled,
  error,
  helper,
  label,
  onBlur,
  onChange,
  placeholder,
  type,
  value,
  onKeyDown,
  maxLength,
  ...rest
}) => (
  <S.Wrapper>
    <h6 className="input_label">{label}</h6>
    <input
      maxLength={maxLength}
      className={`${blueLine}  ${error ? "input-error error-border" : "input"}`}
      defaultValue={defaultValue}
      disabled={disabled}
      onBlur={onBlur}
      onChange={onChange}
      onKeyDown={onKeyDown}
      placeholder={placeholder}
      type={type}
      value={value}
      {...rest}
    />
    {helper}
    <ErrorMessage>{error}</ErrorMessage>
  </S.Wrapper>
);

TextInput.propTypes = {
  blueLine: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helper: PropTypes.func,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  maxLength: PropTypes.number,
  onKeyDown: PropTypes.func,
};

TextInput.defaultProps = {
  disabled: false,
  error: "",
  type: "text",
  value: "",
};
export default TextInput;
