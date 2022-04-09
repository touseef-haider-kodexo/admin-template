/* eslint-disable indent */
import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import {   Tooltip} from "antd";
import styled from "styled-components";

import Button from "@/components/Button";

import * as S from "./styled";


const CustomTooltip = ({ className, children, ...restProps }) => (
  <Tooltip overlayClassName={className} {...restProps}>
    {children}
  </Tooltip>
);

CustomTooltip.propTypes = {
  className:PropTypes.string,
  children:PropTypes.element
}

const StyledTooltip = styled(CustomTooltip)`
  .ant-tooltip-arrow-content {
    background-color: ${(props) => props.theme.colors.yellowishOrange};
  }
  .ant-tooltip-inner {
    background-color: white;
    border: 1px solid ${(props) => props.theme.colors.yellowishOrange};
    border-radius: 8px;
  }
`;

const ToolTipComponent = () => (
    <div className="up-arrow">
      <p style={{ color: "grey" }}>
        If any information on this page is incorrect,please
        <a
          href="mailto:1800dentdoc@vscconnect.com"
          style={{ color: "#0057FF" }}
        >
          {" "}
          Contact Us.
        </a>
      </p>
    </div>
);

const ClaimInfoView = (props) => {
  const { claim_info, vehicle_info } = useSelector((state) => state.claim);

  const column = (head, text) => (
    <div className="editable-grid">
      <p className="text ash">{head}</p>
      <p className="text black">{text}</p>
    </div>
  );

  window.onscroll = props?.handleScroll;

  return (
    <S.TabPanel1View stickAtTop={props?.stickAtTop}>
      <div
        className="button-claimView-parent-sm "
        style={{ position: "absolute" }}
      >
        <Button
          onClick={() => {
            props?.setValue((prevState) => prevState + 1);
          }}
          value={
            <>
              <span className="text-btn">Confirm Info</span>
            </>
          }
        />
      </div>
      <div className="button-claimView-parent-sm-side ">
        <StyledTooltip placement="bottomRight" title={ToolTipComponent}>
          <button type="submit" className="input-height ">Update Info</button>
        </StyledTooltip>
      </div>
      <div className="button-claimView-parent-sm up-arrow">
        <p style={{ color: "grey" }}>
          If any information on this page is incorrect, please
          <a
            href="mailto:1800dentdoc@vscconnect.com"
            style={{ color: "#0057FF" }}
          >
            Contact Us.
          </a>
        </p>
      </div>
      <div className="flex fd_row j-btw">
        <div className="scale">
          <div className="card">
            <p className="sub-head">Claim Info</p>
            <div className="row">
              {column("Claim Type", claim_info?.claim_type?.name)}
              {column("TPA", claim_info?.TPA?.name)}
              {column(
                "Insurance Claim Number",
                claim_info?.insurance_claim_number,
              )}
              {column("Dent Doc Claim Number", claim_info?.dd_claim_number)}
            </div>
          </div>
          <div className="card">
            <p className="sub-head">Vehicle Info</p>
            <div className="row">
              {column("Vehicle Year", vehicle_info?.year)}
              {column("Make", vehicle_info?.make)}
              {column("Model", vehicle_info?.model)}
              {column("VIN", vehicle_info?.vin)}
            </div>
          </div>
        </div>
        <div className="button-claimView-parent member-tooltip">
          <Button
            
            onClick={() => {
              props?.setValue((prevState) => prevState + 1);
            }}
            className="first-btn"
            value={
              <>
                <span className="text-btn">Confirm Info</span>
              </>
            }
          />

          <StyledTooltip placement="bottomRight" title={ToolTipComponent}>
            <button
            // eslint-disable-next-line
            type="submit" className="input-height ">Update Info</button>
          </StyledTooltip>
        </div>
      </div>
    </S.TabPanel1View>
  );
};

ClaimInfoView.propTypes = {
  setValue: PropTypes.func.isRequired,
  handleScroll: PropTypes.func,
  stickAtTop: PropTypes.bool,
};

export default ClaimInfoView;
