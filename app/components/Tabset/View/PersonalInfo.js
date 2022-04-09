/* eslint-disable  */
import React from "react";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Button as AntButton } from "antd";

import * as S from "./styled";

import Button from "@/components/Button";

const PersonalInfoView = ({ setValue, setIndex, formik, ...props }) => {
  const { claim_info, personal_info } = useSelector((state) => state.claim);
  const column = (head, text) => (
    <div className="editable-grid">
      <p className="text ash">{head}</p>
      <p className="text black">{text}</p>
    </div>
  );

  window.onscroll = props?.handleScroll;

  return (
    <S.TabPanel1View stickAtTop={props?.stickAtTop}>
      <div className="button-claimView-parent-sm">
        <Button
          onClick={() => {
            if (formik.isValid) {
              setValue((prevState) => prevState + 1);
            }
          }}
          value={
            <>
              <span className="text-btn">Confirm Info</span>
            </>
          }
        />
        <button
          type="submit"
          onClick={() => {
            if (!claim_info?.has_updated_by_member) {
              setIndex(2);
            }
          }}
          className="input-height"
        >
          Update Info
        </button>
      </div>
      <div className="flex fd_row j-btw">
        <div className="scale">
          <div className="card">
            <p className="sub-head">Contact Info</p>
            <div className="row">
              {column("First Name", personal_info?.first_name)}
              {column("Last Name", personal_info?.last_name)}
              {column("Address", personal_info?.address)}
              {column("Phone", personal_info?.phone)}
              {column(
                "Cell / SMS (to provide status update on claim)",
                personal_info?.secondary_phone,
              )}
              {column("Email", personal_info?.email)}
              {column("Secondary Email", personal_info?.secondary_email)}
            </div>
          </div>
          <div className="card">
            <div className="row">
              {column("Dealership", personal_info?.d_name)}
              {column("Service Advisor", personal_info?.d_service_advisor)}
              {column("Dealership Phone Number", personal_info?.d_phone)}
              {column("Dealership Address", personal_info?.d_address)}
            </div>
          </div>
        </div>
        <div className="button-claimView-parent">
          <Button
            onClick={() => {
              setValue((prevState) => prevState + 1);
            }}
            className="first-btn"
            value={
              <>
                <span className="text-btn">Confirm Info</span>
              </>
            }
          />
          <AntButton
            onClick={() => {
              if (!claim_info?.has_updated_by_member) {
                setIndex(2);
              }
            }}
            className="input-height"
          >
            Update Info
          </AntButton>
        </div>
      </div>
    </S.TabPanel1View>
  );
};

PersonalInfoView.propTypes = {
  setValue: PropTypes.func.isRequired,
  formik: PropTypes.objectOf(PropTypes.any),
  setIndex: PropTypes.func.isRequired,
};

export default PersonalInfoView;
