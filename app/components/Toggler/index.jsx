import PropTypes from "prop-types";
import React from "react";
import { Switch } from "antd";

import * as S from "./styled";

function Toggler({ label, onChange, value, hasLabelBefore, ...rest }) {
  return (
    <S.Toggler hasLabelBefore={hasLabelBefore} className="flex">
      <div className="toggler flex">
        {hasLabelBefore ? (
          <>
            <h1 className="toggler-label" style={{ marginRight: "5px" }}>
              {label}
            </h1>

            <Switch
              checkedChildren={rest?.checkedChildren}
              unCheckedChildren={rest?.unCheckedChildren}
              checked={value}
              className="antd-switch-active-bg"
              disabled={rest?.disabled}
              onChange={onChange}
            />
            <label
              className={`${value ? "blue-bg" : "gray-bg"} `}
              htmlFor="react-switch-new"
            >
              <span className="react-switch-button" />
            </label>
          </>
        ) : (
          <>
            <Switch
              checked={value}
              checkedChildren={rest?.checkedChildren}
              unCheckedChildren={rest?.unCheckedChildren}
              className="antd-switch-active-bg"
              onChange={onChange}
            />
            <label
              className={`${value ? "blue-bg" : "gray-bg"} `}
              htmlFor="react-switch-new"
            >
              <span className="react-switch-button" />
            </label>
            <p>{label}</p>
          </>
        )}
      </div>
    </S.Toggler>
  );
}

Toggler.propTypes = {
  label: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.bool,
  hasLabelBefore: PropTypes.bool,
};

export default Toggler;
