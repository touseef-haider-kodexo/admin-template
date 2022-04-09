import React, { useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";

import * as S from "./styled";

import theme from "@/styles/theme";

const IsLoadingHOC = (WrappedComponent) => {
  function HOC(props) {
    const [isLoading, setLoading] = useState(false);

    const setLoadingState = (isComponentLoading) => {
      setLoading(isComponentLoading);
    };

    return (
      <>
        {isLoading && (
          <S.Container isLoading={isLoading}>
            <PuffLoader color={theme.colors.deepblue} loading={isLoading} />
          </S.Container>
        )}
        <WrappedComponent {...props} setLoading={setLoadingState} />
      </>
    );
  }
  return HOC;
};
export default IsLoadingHOC;
