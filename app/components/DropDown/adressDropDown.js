/* eslint-disable indent */
import React from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import PropTypes from "prop-types";
import Clear from "@material-ui/icons/Clear";

import theme from "@/styles/theme";

import ErrorMessage from "../ErrorMessage";

import * as S from "./styled";

// eslint-disable-next-line
const AddressDropDown = ({ handleChange, val, label, error, ...rest }) => (
  <S.DropDownContainer>
    <h6 className="input_label">{label}</h6>
    <GooglePlacesAutocomplete
      selectProps={{
        components: {
          IndicatorSeparator: () => null,
          NoOptionsMessage: () => (
            <center style={{ padding: "5px" }}>
              <small className="search-text">
                Start typing to see address suggestions
              </small>
            </center>
          ),
          DropdownIndicator: () => (
            <Clear
              onClick={rest?.handleClear}
              style={{
                marginRight: "15px",
                width: "20px",
                height: "20px",
                cursor: "pointer",
              }}
            />
          ),
        },
        styles: {
          control: (styles) => ({
            ...styles,
            backgroundColor: "white",
            borderRadius: "10px",
            height: 34,
            minHeight: 34,
            // eslint-disable-next-line
            borderColor: error
              ? theme.colors.yellowishOrange
              : rest?.blueLine
              ? "#0057FF"
              : "#C6C6C6",
            boxShadow: "none",
            "&:hover": {
              borderColor: error ? theme.colors.yellowishOrange : "#0057FF",
            },
            "&:focus": {
              borderColor: error ? theme.colors.yellowishOrange : "#0057FF",
            },
          }),
        },
        value: {
          label: val,
          value: val ?? "",
        },
        onChange: ({ value }) => {
          handleChange(value?.place_id);
        },
      }}
      apiKey="AIzaSyCT8tgryBs-D7w05IHPMmHkFeZwxMfFIuE"
      minLengthAutocomplete={3}
      placeholder="Enter your address"
      apiOptions={{
        region: "us",
        language: "en",
      }}
      autocompletionRequest={{
        componentRestrictions: { country: "us" },
      }}
      onLoadFailed={(status) => console.log(status)}
    />
    <ErrorMessage>{error}</ErrorMessage>
  </S.DropDownContainer>
);

AddressDropDown.prototype = {
  handleChange: PropTypes.func.isRequired,
  val: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
};

AddressDropDown.defaultProps = {
  error: "",
};

export default AddressDropDown;
