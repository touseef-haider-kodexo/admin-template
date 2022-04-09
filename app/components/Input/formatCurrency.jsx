//
import React from "react";
import NumberFormat from "react-number-format";
import PropTypes from "prop-types";

import ErrorMessage from "@/components/ErrorMessage";

import * as S from "./styled";

export default function CurrencyFormatInput({
  blueLine,
  defaultValue,
  disabled,
  error,
  onValueChange,
  removeFormatting,
  helper,
  label,
  onBlur,
  type,
  value,
  prefix,
  suffix,
}) {
  return (
    <S.Wrapper>
      <h6 className="input_label">{label}</h6>
      <NumberFormat
        className={`${blueLine}  ${
          error ? "input-error error-border" : "input"
        }`}
        // eslint-disable-next-line
        prefix={prefix ? prefix : "$"}
        // eslint-disable-next-line
        suffix={suffix ? suffix : ""}
        displayType={type}
        thousandSeparator={Boolean(true)}
        defaultValue={defaultValue}
        disabled={disabled}
        // onBlur={onBlur}
        onChange={onBlur}
        type={type}
        value={value}
        removeFormatting={removeFormatting}
        onValueChange={onValueChange}
      />
      {helper}
      <ErrorMessage>{error}</ErrorMessage>
    </S.Wrapper>
  );
}

CurrencyFormatInput.propTypes = {
  blueLine: PropTypes.string,
  defaultValue: PropTypes.string,
  onValueChange: PropTypes.func,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  helper: PropTypes.string,
  label: PropTypes.string,
  onBlur: PropTypes.func,
  prefix: PropTypes.string,
  type: PropTypes.string,
  suffix: PropTypes.string,
  value: PropTypes.string,
  removeFormatting: PropTypes.bool,
};
