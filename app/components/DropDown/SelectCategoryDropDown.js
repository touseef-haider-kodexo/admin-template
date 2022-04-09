import React from "react";
import Select from "react-select";
import PropTypes from "prop-types";
import { useQuery } from "react-query";

import theme from "@/styles/theme";
import AppService from "@/services/api/app-service";

import ErrorMessage from "../ErrorMessage";

import * as S from "./styled";

export default function SelectCategoryDropDown({
  defaultValue,
  error,
  onChange,
  selectedType,
  ...props
}) {
  const getCategory = () => AppService.getCategoryWithChilds();

  const { data: category } = useQuery("category", () => getCategory());

  return (
    <S.DropDownContainer>
      <h6 className="input_label">Claim Type</h6>
      <Select
        defaultValue={defaultValue}
        getOptionLabel={(opt) => opt.name}
        getOptionValue={(opt) => opt._id}
        menuPortalTarget={document.querySelector("body")}
        name="claimType"
        onChange={onChange}
        options={Array.isArray(category?.result) ? category?.result : []}
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
        value={selectedType}
        {...props}
      />
      <ErrorMessage>{error}</ErrorMessage>
    </S.DropDownContainer>
  );
}

SelectCategoryDropDown.propTypes = {
  handleChange: PropTypes.func.isRequired,
  selectedType: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
};

SelectCategoryDropDown.defaultProps = {
  selectedType: "",
  error: "",
};
