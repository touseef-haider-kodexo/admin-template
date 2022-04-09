import React from "react";
import { useFormContext } from "react-hook-form";
import PropTypes from "prop-types";

import Input from "@/components/Input";

import Feedback from "./Feedback";

const Control = ({ register, type, ...rest }) => {
  switch (type) {
    default:
      return <Input ref={register} type={type} {...rest} />;
  }
};

const Field = ({ name, ...rest }) => {
  const { errors, register } = useFormContext();
  const error = errors?.[name]?.message;

  return (
    <>
      <Control invalid={!!error} name={name} register={register} {...rest} />
      {error && <Feedback>{error}</Feedback>}
    </>
  );
};

Control.propTypes = {
  register: PropTypes.func.isRequired,
  rest: PropTypes.shape(),
  type: PropTypes.string,
};

Field.propTypes = {
  name: PropTypes.string.isRequired,
  rest: PropTypes.shape(),
};

Field.defaultProps = {
  rest: {},
};

Control.defaultProps = {
  rest: {},
  type: "text",
};

export default Field;
