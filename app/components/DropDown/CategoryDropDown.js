import React, { useState } from "react";
import Select from "react-select";
import PropTypes from "prop-types";

import theme from "@/styles/theme";

import ErrorMessage from "../ErrorMessage";

import * as S from "./styled";

export default function CategoryDropDown({
  data,
  value,
  error,
  disabled,
  onChange,
  label,
  ...props
}) {
  return (
    <S.DropDownContainer>
      {label && <h6 className="input_label">{label}</h6>}
      <Select
        value={value}
        menuPortalTarget={document.querySelector("body")}
        styles={{
          control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            borderRadius: "10px",
            height: 34,
            minHeight: 34,
            width: "100%",
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
        name="claimType"
        options={Array.isArray(data) ? data : []}
        onChange={onChange}
        isDisabled={disabled}
        getOptionValue={(opt) => opt.child_id}
        getOptionLabel={(opt) => opt.substitute_name}
        {...props}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </S.DropDownContainer>
  );
}

CategoryDropDown.propTypes = {
  handleChange: PropTypes.func.isRequired,
  selectedItem: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
};

CategoryDropDown.defaultProps = {
  selectedItem: "",
  error: "",
};
