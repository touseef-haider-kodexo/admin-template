import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";

import Logo from "@/assets/images/logo.webp";
import CarvanaLogo from "@/assets/images/carvana-logo.png";

import * as S from "./styled";

function UnAuthPageLayout({ children, gridy, rightHeader, title, ...props }) {
  return (
    <S.Wrapper member>
      <div className="body-grid">
        <main className="notmleft">
          <AppBar
            style={{
              backgroundColor: "#1E1f2D",
            }}
          >
            <center>
              {!props?.carvana ? (
                <img alt="logo" id="logo" width={200} height={80} src={Logo} />
              ) : (
                <img
                  alt="logo"
                  id="logo"
                  width={200}
                  height={80}
                  src={CarvanaLogo}
                />
              )}
            </center>
          </AppBar>
          <Container style={{ marginTop: "50px" }}>
            <div className={`${gridy} flex j-btw dash-head`}>
              <p className="title">{title}</p>
              {rightHeader}
            </div>
            {children}
          </Container>
        </main>
      </div>
    </S.Wrapper>
  );
}
UnAuthPageLayout.propTypes = {
  children: PropTypes.func,
  gridy: PropTypes.string,
  rightHeader: PropTypes.func,
  title: PropTypes.string,
  carvana: PropTypes.bool,
};

export default React.memo(UnAuthPageLayout);
