//
import React from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

import * as S from "./styled";

import ErrorMessage from "@/components/ErrorMessage";

export default function NumberFormatInput({
  blueLine,
  defaultValue,
  disabled,
  error,
  helper,
  label,
  onBlur,
  type,
  value,
  setFieldValue,
  name,
}) {
  return (
    <S.Wrapper>
      <h6 className="input_label">{label}</h6>
      <NumberFormat
        className={`${blueLine}  ${
          error ? "input-error error-border" : "input"
        }`}
        format="+1 (###) ###-####"
        allowEmptyFormatting
        mask="_"
        defaultValue={defaultValue}
        disabled={disabled}
        onBlur={onBlur}
        type={type}
        value={value}
        onValueChange={(values) => {
          const { value: val } = values;
          setFieldValue(name, val);
        }}
      />
      {helper}
      <ErrorMessage>{error}</ErrorMessage>
    </S.Wrapper>
  );
}

NumberFormatInput.propTypes = {
  blueLine: PropTypes.string,
  defaultValue: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helper: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.string,
  setFieldValue: PropTypes.func,
  name: PropTypes.string,
};
