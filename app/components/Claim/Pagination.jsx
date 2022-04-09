import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

const Pagination = ({ paginate, postsPerPage, totalPosts }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i += 1) {
    pageNumbers.push(i);
  }

  return (
    <S.Pagination>
      <p className="pagination flex">
        {pageNumbers.map((number) => (
          <button
            key={number}
            className="page-number page-link"
            onClick={() => paginate(number)}
            type="button"
          >
            {number}
          </button>
        ))}
      </p>
    </S.Pagination>
  );
};

Pagination.propTypes = {
  paginate: PropTypes.func,
  postsPerPage: PropTypes.func,
  totalPosts: PropTypes.func,
};

export default Pagination;
