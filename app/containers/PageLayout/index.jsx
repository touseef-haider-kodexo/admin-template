/*eslint-disable*/
import Container from "@material-ui/core/Container";
import Drawer from "@material-ui/core/Drawer";
import React from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { useQuery } from "react-query";

import AppService from "@/services/api/app-service";
import Button from "@/components/Button";
import SideBar from "@/components/Sidebar";
import arrowDown from "@/assets/images/arrowDown.svg";
import plus from "@/assets/images/plus.svg";
import bell from "@/assets/images/bell.svg";
import BellWithotRed from "@/assets/images/BellWithoutRed.svg";
import menuIcon from "@/assets/images/MenuIcon.svg";
import { logout } from "@/redux/global/actions";

import storage from "@/utils/storage";
import { ROLES } from "@/utils/constants";
import { baseImageURL } from "@/utils/axios";

import * as S from "./styled";

function PageLayout({ children, gridy, rightHeader, title }) {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const { currentUser, loading } = useSelector((state) => state.global);
  const dispatch = useDispatch();

  const { data: notificationData } = useQuery("getNotification", () =>
    AppService.getNotification({ current: 1, pageSize: 5 }),
  ) || { data: [] };
  const { notifications } = notificationData || {};

  const { first_name, last_name, _id } = currentUser || {
    first_name: "",
    last_name: "",
  };
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    if (anchorEl) {
      setAnchorEl(null);
      return;
    }
    setAnchorEl(event.currentTarget);
  };

  const handleClose = (e) => {
    // setAnchorEl(null);

    history.push(`/systems/users/edit?id=${currentUser._id}`);
  };

  const handleCloseMenu = (e) => {
    setAnchorEl(null);
  };

  //FYI: JUST TO COVER THE CASE IF THE USER CHANGE THE PASSWORD AND GET REDIRECTED TO THE DASHBORAD , SO WE HAVE TO FETCH THE PROFILE AGAIN.
  // React.useEffect(() => {
  //   let isDone = false;
  //   window.addEventListener("visibilitychange", function () {
  //     console.log("visibilitychange");
  //     if (
  //       document.visibilityState === "visible" &&
  //       storage.get("access_token") &&
  //       !loading &&
  //       !isDone
  //     ) {
  //       dispatch(getUserProfile.request());
  //       isDone = true;
  //     }
  //   });
  //   return () => {
  //     window.removeEventListener("visibilitychange", function () {});
  //   };
  // }, []);

  const handleLogout = async () => {
    storage.clear();
    dispatch(logout());
    history.push(`/login`);
  };

  return (
    <S.Wrapper>
      <div className="body-grid">
        <>
          <Drawer
            className="desktop MuiDrawer-paper-desktop"
            open={!open}
            variant="persistent"
          >
            <SideBar />
          </Drawer>
          <Drawer
            anchor="left"
            className="mobile"
            open={open}
            variant="persistent"
          >
            <SideBar />
          </Drawer>
        </>
        <main className={open === false ? "mleft" : "notmleft"}>
          <AppBar className="app-bar-border">
            <Toolbar
              className={`${
                open === false ? "mleft" : "notmleft"
              } navbar flex j-btw `}
            >
              <IconButton
                aria-label="open drawer"
                className="menu-icon"
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <img alt="MenuIcon" src={menuIcon} />
              </IconButton>

              <div className="rhs flex">
                <div className="dropdown ">
                  <button
                    className="trigger flex j-btw fade-btn"
                    onClick={handleClick}
                    type="button"
                  >
                    {/* <img alt="avatar" src={avatar} /> */}
                    <p className="dp-name">{`${first_name ?? ""} ${
                      last_name ?? ""
                    }`}</p>
                    <img alt="arrowDown" src={arrowDown} />
                  </button>
                  <Menu
                    anchorEl={anchorEl}
                    id="simple-menu"
                    keepMounted
                    onClose={handleCloseMenu}
                    open={Boolean(anchorEl)}
                    style={{
                      top: "53px",
                    }}
                  >
                    <MenuItem
                      onClick={handleClose}
                      style={{
                        color: "#3f434a",
                        fontSize: "12px",
                        padding: "3px 10px",
                        fontFamily: "Poppins-Light",
                      }}
                    >
                      My Account
                    </MenuItem>
                    <MenuItem
                      onClick={handleLogout}
                      style={{
                        color: "#3f434a",
                        fontSize: "12px",
                        padding: "3px 10px",
                        fontFamily: "Poppins-Light",
                      }}
                    >
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </Toolbar>
          </AppBar>
          <Container maxWidth="lg">
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
PageLayout.propTypes = {
  children: PropTypes.func,
  gridy: PropTypes.string,
  rightHeader: PropTypes.func,
  title: PropTypes.string,
};

export default React.memo(PageLayout);
