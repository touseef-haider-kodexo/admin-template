//
import React, { useCallback } from "react";
import Select, { components as defaultComponents } from "react-select";
import PropTypes from "prop-types";

import ErrorMessage from "../ErrorMessage";

import * as S from "./styled";

import theme from "@/styles/theme";

export default function GenericDropDown({
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
  const renderValueContainer = useCallback(
    ({ children, ...valueContainerProps }) => (
      <defaultComponents.ValueContainer {...valueContainerProps}>
        {children}
      </defaultComponents.ValueContainer>
    ),
    [],
  );
  return (
    <S.DropDownContainer>
      {label && <h6 className="input_label">{label}</h6>}
      <Select
        isDisabled={disabled}
        value={value}
        defaultValue={defaultValue}
        isMulti={props?.isMulti}
        menuPortalTarget={document.querySelector("body")}
        styles={{
          control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            borderRadius: "10px",
            height: 34,
            maxWidth: props?.isMulti ? "300px" : "auto",
            minWidth: props?.isMulti ? "300px" : "auto",
            minHeight: 34,
            overflow: "hidden",
            textOverflow: "ellipsis",
            flexWrap: "nowrap",
            whiteSpace: "nowrap",
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
        placeholder={props?.placeholder}
        name={name}
        options={Array.isArray(data) ? data : []}
        onChange={onChange}
        components={{
          ValueContainer: renderValueContainer,
        }}
        getOptionValue={(opt) => opt?.value}
        getOptionLabel={(opt) => opt?.label}
        {...props}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </S.DropDownContainer>
  );
}

GenericDropDown.propTypes = {
  handleChange: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  isMulti: PropTypes.bool,
  placeholder: PropTypes.string,
  selectedItem: PropTypes.string,
};

GenericDropDown.defaultProps = {
  selectedItem: "",
  error: "",
};
