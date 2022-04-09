import React from "react";
import { useHistory } from "react-router-dom";
import Button from "@/components/Button";
import * as S from "./styled";
const ErrorPage = ({ status, title, subTitle }) => {
  const history = useHistory();
  return (
    <S.ErrorContainer>
      <div className="error-container">
        <h1 className="error-status">{status}</h1>
        <h1 className="error-title">{title}</h1>
        <small className="error-subtitle">{subTitle}</small>
        <Button
          value={
            <>
              <span className="text-btn">Back to Dashboard</span>
            </>
          }
          className="error-button"
          onClick={() => history.push("/")}
        ></Button>
      </div>
    </S.ErrorContainer>
  );
};

export default ErrorPage;
