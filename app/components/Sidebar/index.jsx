/* eslint-disable indent */
import React, { useState, useMemo, memo } from "react";
import { PropTypes } from "prop-types";
import { Link, useLocation } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { useSelector } from "react-redux";

import Logo from "@/assets/images/logo.webp";

import { ITEMS } from "./constants";
import * as S from "./styled";

function ListItemLink(props) {
  return <ListItem button disableGutters {...props} />;
}

const ItemLink = ({ icon, label, pathname, subUrls, url }) => (
  <ListItemLink
    className={`row-height ${
      pathname === url || (Array.isArray(subUrls) && subUrls.includes(pathname))
        ? "active"
        : ""
    }`}
  >
    <Link className="flex exact" exact to={url}>
      <img
        alt=""
        className={`
           ${
             // eslint-disable-next-line
             pathname === url ||
             (Array.isArray(subUrls) && subUrls.includes(pathname))
               ? "active-filter"
               : ""
           } icon-padding`}
        src={icon}
      />

      <ListItemText
        style={{
          color:
            pathname === url ||
            (Array.isArray(subUrls) && subUrls.includes(pathname))
              ? "white"
              : "#8b8d92",
        }}
        primary={label}
      />
    </Link>
  </ListItemLink>
);

ItemLink.propTypes = {
  icon: PropTypes.string,
  label: PropTypes.string,
  pathname: PropTypes.string,
  subUrls: PropTypes.arrayOf(PropTypes.string),
  url: PropTypes.string,
};

const ItemCollapse = ({
  childs,
  icon,
  label,
  pathname,
  subUrls,
  url,
  role,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <ListItem
        disableGutters={Boolean(true)}
        className={`row-height ${
          pathname === url ||
          (Array.isArray(subUrls) && subUrls.includes(pathname))
            ? "active"
            : ""
        }`}
        onClick={() => setOpen(!open)}
      >
        <div className="flex exact j-btw">
          <img
            alt=""
            className={`${
              pathname === url ||
              (Array.isArray(subUrls) && subUrls.includes(pathname))
                ? "active-filter"
                : ""
            } icon-padding`}
            src={icon}
          />
          <ListItemText
            style={{
              color:
                pathname === url ||
                (Array.isArray(subUrls) && subUrls.includes(pathname))
                  ? "white"
                  : "#8b8d92",
            }}
            primary={label}
          />
        </div>
        {open ? (
          <ExpandLess
            className={`${
              pathname === url ||
              (Array.isArray(subUrls) && subUrls.includes(pathname))
                ? "active-filter"
                : ""
            } grey-color`}
          />
        ) : (
          <ExpandMore
            className={`${
              pathname === url ||
              (Array.isArray(subUrls) && subUrls.includes(pathname))
                ? "active-filter"
                : ""
            } grey-color`}
          />
        )}
      </ListItem>
      <Collapse
        in={
          open ||
          pathname === url ||
          (Array.isArray(subUrls) && subUrls.includes(pathname))
            ? Boolean(true)
            : Boolean(false)
        }
        timeout="auto"
        unmountOnExit
      >
        {childs?.map((val) => {
          if (val.roles.includes(role)) {
            return (
              <List component="div" disablePadding>
                <Link
                  className={`${
                    pathname === val?.url ? "sactive" : ""
                  } flex slist`}
                  exact
                  to={`${val?.url}`}
                >
                  <div
                    className={`${
                      pathname === val?.url
                        ? "inactive-img-dot"
                        : "active-img-dot"
                    } icons sicons`}
                  />
                  <ListItemText
                    style={{
                      color: pathname === val?.url ? "#fff" : "#8b8d92",
                    }}
                    primary={val?.label}
                  />
                </Link>
              </List>
            );
          }
          return null;
        })}
      </Collapse>
    </>
  );
};

ItemCollapse.propTypes = {
  childs: PropTypes.arrayOf(),
  icon: PropTypes.string,
  label: PropTypes.string,
  pathname: PropTypes.string,
  subUrls: PropTypes.arrayOf(),
  role: PropTypes.string,
  url: PropTypes.string,
};

function SideBar() {
  // eslint-disable-next-line
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.global);

  const showTabs = useMemo(
    () =>
      ITEMS.map(
        (item, index) =>
          Array.isArray(item?.childs) &&
          item?.childs.length > 0 && (
            <ItemCollapse
              // eslint-disable-next-line
              key={index}
              {...{ role: currentUser?.role }}
              {...item}
              {...location}
            />
          ),
      ),
    [currentUser?.role],
  );

  return (
    <S.ListItem>
      <List>
        <>
          <div>
            <Link to="/">
              <center>
                <img id="logo" alt="LOGO" width={250} height={120} src={Logo} />
              </center>
            </Link>
          </div>
          {showTabs}
        </>
      </List>
    </S.ListItem>
  );
}

export default memo(SideBar);
