/* elsint-disable */
import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";

import ErrorMessage from "../ErrorMessage";

import * as S from "./styled";

import { ROLES, TPA_ACCESS_LEVEL, _ROLES } from "@/utils/constants";
import theme from "@/styles/theme";

export default function RoleDropDown({
  onChange,
  selectedRole,
  label,
  name,
  error,
  disabled,
  ...props
}) {
  const {
    currentUser: { role },
  } = useSelector((state) => state.global);
  return (
    <S.DropDownContainer>
      <h6 className="input_label">{label}</h6>
      <Select
        isDisabled={disabled}
        value={selectedRole}
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
        options={
          role === ROLES?.admin.value
            ? _ROLES.filter(({ value }) => value !== "member")
            : TPA_ACCESS_LEVEL
        }
        onChange={onChange}
        {...props}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </S.DropDownContainer>
  );
}

RoleDropDown.propTypes = {
  handleChange: PropTypes.func.isRequired,
  selectedRole: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  role: PropTypes.string,
  label: PropTypes.string,
  name: PropTypes.string,
  disabled: PropTypes.bool,
};

RoleDropDown.defaultProps = {
  selectedRole: null,
  error: "",

  disabled: true,
};
