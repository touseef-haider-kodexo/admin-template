import PropTypes from "prop-types";
import React, { useState } from "react";

import ErrorMessage from "../ErrorMessage";

import * as S from "./styled";

import visibility from "@/assets/images/visibility.svg";
import visibilityOff from "@/assets/images/visibilityOff.svg";

const TextInput = ({
  error,
  label,
  onBlur,
  onChange,
  placeholder,
  value,
  disabled,
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <S.Wrapper>
      <h6 className="input_label">{label}</h6>
      <div
        className={`flex ${
          error ? "with-input-error error-border" : "with-input"
        }  j-btw ${error && "red-border"}`}
      >
        <input
          disabled={disabled}
          className="pass-input"
          onBlur={onBlur}
          onChange={onChange}
          placeholder={placeholder}
          type={passwordShown ? "text" : "password"}
          value={value}
        />
        <button
          className="fade-btn"
          onClick={togglePasswordVisiblity}
          type="button"
        >
          {passwordShown ? (
            <img alt="visibility" className="icon-see" src={visibility} />
          ) : (
            <img alt="visibilityOff" className="icon-see" src={visibilityOff} />
          )}
        </button>
      </div>
      <ErrorMessage>{error}</ErrorMessage>
    </S.Wrapper>
  );
};

TextInput.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  disabled: PropTypes.bool,
};

TextInput.defaultProps = {
  error: "",
  disabled: false,
};
export default TextInput;
