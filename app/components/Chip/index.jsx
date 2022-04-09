import React from "react";
import PropTypes from "prop-types";
import Chip from "@material-ui/core/Chip";

import * as S from "./styled";

function index(onDelete) {
  return (
    <S.Wrapper>
      <Chip
        color="primary"
        label="Deletable primary"
        onDelete={onDelete}
        variant="outlined"
      />
    </S.Wrapper>
  );
}

index.propTypes = {
  onDelete: PropTypes.func,
};

export default index;
