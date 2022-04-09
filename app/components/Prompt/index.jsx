import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

const Prompt = ({ when }) => {
  const history = useHistory();

  useEffect(() => {
    if (when) {
      // eslint-disable-next-line
      const unblock = history.block((location) => {});
    }
  }, [when]);

  return <div />;
};

Prompt.propTypes = {
  when: PropTypes.bool.isRequired,
};

export default Prompt;
