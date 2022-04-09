//
import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";

import ErrorMessage from "../ErrorMessage";

import * as S from "./styled";

import theme from "@/styles/theme";

export default function ModelDropDown({
  data,
  value,
  defaultValue,
  error,
  onChange,
  disabled,
  name,
  label,
  ...props
}) {
  return (
    <S.DropDownContainer>
      {label && <h6 className="input_label">{label}</h6>}
      <Select
        value={value}
        defaultValue={defaultValue}
        menuPortalTarget={document.querySelector("body")}
        styles={{
          control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            borderRadius: "10px",
            height: 34,
            minHeight: 34,
            borderColor: error ? theme.colors.yellowishOrange : "#C6C6C6",
            boxShadow: "none",
            "&:hover": {
              borderColor: error ? theme.colors.yellowishOrange : "#0057FF",
            },
            "&:focus": {
              borderColor: error ? theme.colors.yellowishOrange : "#0057FF",
            },
          }),
        }}
        name={name}
        isDisabled={disabled}
        options={Array.isArray(data) ? data : []}
        onChange={onChange}
        getOptionValue={(opt) => opt.Model_ID}
        getOptionLabel={(opt) => opt.Model_Name}
        {...props}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </S.DropDownContainer>
  );
}

ModelDropDown.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      Model_ID: PropTypes.string,
      Model_Name: PropTypes.string,
    }),
  ).isRequired,
  handleChange: PropTypes.func.isRequired,
  selectedItem: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
};

ModelDropDown.defaultProps = {
  selectedItem: "",
  error: "",
};
