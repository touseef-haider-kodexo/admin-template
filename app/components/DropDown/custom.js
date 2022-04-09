import React from "react";
import AsyncSelect from "react-select/async";
import { components } from "react-select";
import { Button } from "antd";
import PropTypes from "prop-types";

import ErrorMessage from "../ErrorMessage";

import * as S from "./styled";

import theme from "@/styles/theme";

const Menu = (props) => (
  <>
    <components.Menu {...props}>
      <div>
        <div>{props.children}</div>
        <Button
          onClick={props.selectProps.changeOptionsData}
          style={{ width: "100%", borderLeft: "none", borderRight: "none" }}
        >
          {props.selectProps.fetchingData ? "Fetching ..." : "Load More"}
        </Button>
      </div>
    </components.Menu>
  </>
);

const Option = (props) => (
  <components.Option {...props}>{props.children}</components.Option>
);

const Custom = ({
  options,
  changeOptionsData,
  disabled,
  fetchingData,
  loadOptions,
  onChange,
  error,
  value,
  onInputChangeHandler,
  isClearable,
}) => (
  <S.DropDownContainer>
    <AsyncSelect
      isClearable={isClearable || false}
      defaultOptions={options}
      cacheOptions
      loadOptions={loadOptions}
      fetchingData={fetchingData}
      isDisabled={disabled}
      changeOptionsData={changeOptionsData}
      onChange={onChange}
      defaultValue={value}
      components={{ Menu, Option, IndicatorSeparator: () => null }}
      value={value}
      menuPortalTarget={document.querySelector("body")}
      maxMenuHeight={300}
      getOptionValue={(opt) => opt?._id}
      getOptionLabel={(opt) => opt?.name}
      onInputChange={onInputChangeHandler}
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
            borderColor: "#0057FF",
          },
          "&:focus": {
            borderColor: "#0057FF",
          },
        }),
      }}
    />
    <ErrorMessage>{error}</ErrorMessage>
  </S.DropDownContainer>
);

Custom.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  changeOptionsData: PropTypes.func,
  fetchingData: PropTypes.bool,
  loadOptions: PropTypes.func,
  onChange: PropTypes.func,
  error: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onInputChangeHandler: PropTypes.func,
  disabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  // defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
};

Custom.defaultProps = {
  options: [],
  changeOptionsData: () => {},
  fetchingData: false,
  loadOptions: () => {},
  onChange: () => {},
  error: "",
  value: "",
  disabled: false,
  isClearable: true,
  onInputChangeHandler: () => {},
};

Menu.propTypes = {
  children: PropTypes.node,
  selectProps: PropTypes.shape({
    changeOptionsData: PropTypes.func,
    fetchingData: PropTypes.bool,
  }),
};

Option.propTypes = {
  children: PropTypes.node,
};

export default Custom;
