import React, { useState } from "react";

import * as S from "./styled";

import Button from "@/components/Button";

const ScrollToTop = () => {
  const [display, setDisplay] = useState(false);

  const handleScroll = () => {
    if (
      window.document.body.scrollTop > 20 ||
      window.document.documentElement.scrollTop > 20
    ) {
      setDisplay(true);
    } else {
      setDisplay(false);
    }
  };

  window.onscroll = handleScroll;

  const handleClick = () => {
    window.document.body.scrollTop = 0;
    window.document.documentElement.scrollTop = 0;
  };
  return (
    <S.Scroll display={display}>
      <Button value="Top" size="xsmall" onClick={handleClick} />
    </S.Scroll>
  );
};

export default ScrollToTop;
