import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

const Toggle = ({
  listedMe,
  listedAll,
  setListedMe,
  setListedAll,
  setListed,
}) => (
  <S.Toggle>
    <div className="flex j-btw">
      {listedMe ? (
        <p
          onClick={() => {
            setListed("me");
            setListedMe(true);
            setListedAll(false);
          }}
          onKeyPress={() => {}}
          role="presentation"
          className="cursor-pointer  active"
        >
          My Claims
        </p>
      ) : (
        <h2
          onKeyPress={() => {}}
          role="presentation"
          onClick={() => {
            setListed("me");
            setListedMe(true);
            setListedAll(false);
          }}
          className="cursor-pointer "
        >
          {" "}
          My Claims
        </h2>
      )}
      {listedAll ? (
        <p
          onClick={() => {
            setListed("all");
            setListedMe(false);
            setListedAll(true);
          }}
          onKeyPress={() => {}}
          role="presentation"
          className="cursor-pointer  active"
        >
          All Claims
        </p>
      ) : (
        <h2
          onKeyPress={() => {}}
          role="presentation"
          onClick={() => {
            setListed("all");
            setListedMe(false);
            setListedAll(true);
          }}
          className="cursor-pointer "
        >
          All Claims
        </h2>
      )}
    </div>
  </S.Toggle>
);

Toggle.propTypes = {
  listedAll: PropTypes.bool,
  listedMe: PropTypes.bool,
  setListed: PropTypes.func,
  setListedAll: PropTypes.func,
  setListedMe: PropTypes.func,
};

export default Toggle;
