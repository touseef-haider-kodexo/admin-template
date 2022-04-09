import React from "react";
import PropTypes from "prop-types";
import { DatePicker } from "antd";

import * as S from "./styled";

import ErrorMessage from "@/components/ErrorMessage";

function DateInput({ value, defaultValue, label, disabled, onChange, error }) {
  return (
    <S.DateInput error={error}>
      <h6 className="input_label">{label}</h6>
      <DatePicker
        value={value}
        disabled={disabled}
        defaultValue={defaultValue}
        onChange={onChange}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </S.DateInput>
  );
}

DateInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

DateInput.defaultProps = {
  onChange: () => {},
};

export default DateInput;
