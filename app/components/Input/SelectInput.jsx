import React from "react";
import PropTypes from "prop-types";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

import * as S from "./styled";

function SelectInput({ blueLine, error, label, onChange, options, value }) {
  const handleChange = (event) => {
    onChange(event.target.value);
  };
  return (
    <S.Select>
      <h6 className="input_label">{label}</h6>
      <Select
        className={`${blueLine}  ${error && "error-border"}`}
        onChange={handleChange}
        value={value}
      >
        {options.map((option) => (
          <MenuItem
            key={option.value}
            style={{
              color: "#3f434a",
              fontSize: "12px",
              padding: "3px 10px",
              fontFamily: "Poppins-Light",
            }}
            value={option.value}
          >
            {option.item}
          </MenuItem>
        ))}
      </Select>
    </S.Select>
  );
}

SelectInput.propTypes = {
  blueLine: PropTypes.string,
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  options: PropTypes.func.isRequired,
  value: PropTypes.string,
};

SelectInput.defaultProps = {
  error: "",
};

export default SelectInput;
