import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

function Editable({ content, edit, title }) {
  return (
    <S.Editable>
      <div className="edit-heading flex j-btw">
        <p className="edit-heading-title">{title}</p>
        {edit}
      </div>
      {content}
    </S.Editable>
  );
}

Editable.propTypes = {
  content: PropTypes.func,
  edit: PropTypes.func,
  title: PropTypes.string,
};

export default Editable;
