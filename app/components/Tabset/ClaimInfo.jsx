/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "@/components/Input";
import Button from "@/components/Button";
import DateInput from "@/components/Input/DateInput";
import {
  remove_dents,
  set_internal_price,
  remove_technician_info,
} from "@/containers/PageClaims/actions";
import * as D from "@/components/Input/styled";
import MessageModal from "@/components/Modal/MessageModel";

import SelectCategoryDropDown from "../DropDown/SelectCategoryDropDown";
import TpaDropDown from "../DropDown/tpaDropDown";
import { CLAIM_STATUS_ARRAY, CLAIM_STATUS, ROLES } from "../../utils/constants";
import GenericDropDown from "../DropDown/genericDropDown";

import * as S from "./styled";

function TabPanel1({
  claimInfoSubmitRef,
  stickAtTop,
  handleScroll,
  claimInfoFormik,
  setClaimInfo,
  setPrevStatus,
}) {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.global);
  const { claim_info, claim_id } = useSelector((state) => state.claim);
  const [visible, setVisible] = useState(false);
  const [reviewed, setReviewed] = useState(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    setClaimInfo({ ...claim_info, role: currentUser?.role });
    setPrevStatus(claim_info?.status?.value);
    if (!claim_id && !claim_info) {
      setClaimInfo({
        ...claim_info,
        status: {
          value: "pending",
          label: "Pending",
        },
        role: currentUser?.role,
      });
    }
  }, [claim_info]);

  useEffect(() => {
    if (!claim_id && !claim_info) {
      setClaimInfo({
        ...claim_info,
        status: {
          value: "pending",
          label: "Pending",
        },
        role: currentUser?.role,
      });
    }
  }, []);

  const handleContinue = () => {
    if (title === "dents") {
      setFieldValue("TPA", reviewed);
      dispatch(set_internal_price());
    } else {
      setFieldValue("claim_type", reviewed);
      dispatch(remove_technician_info(null));
      dispatch(remove_dents([]));
    }
    setVisible(false);
    setReviewed(null);
  };
  const handleCancel = () => {
    setVisible(false);
    setReviewed(null);
  };

  const {
    values: {
      TPA,
      claim_type,
      insurance_claim_number,
      dd_claim_number,
      status,
      follow_up,
      date_recieved,
      date_assigned,
      date_scheduled,
      date_completed,
      tpa_billed,
      tech_invoice_recieved,
    },
    errors,
    handleSubmit,
    setFieldValue,
    handleChange,
  } = claimInfoFormik;
  window.onscroll = handleScroll;

  return (
    <S.TabPanel1 claim_id={claim_id}>
      <MessageModal
        setVisible={setVisible}
        visible={visible}
        widthFit="width-fit"
        handleContinue={handleContinue}
        handleCancel={handleCancel}
        title={title === "dents" ? "TPA" : "claim type"}
        messageTitle={title}
      />
      <form ref={claimInfoSubmitRef} onSubmit={handleSubmit}>
        <div className="next-btn">
          <Button
            stickAtTop={stickAtTop}
            type="submit"
            size="xsmall"
            value="Next"
          />
        </div>
        <div className="gridy">
          <D.Select>
            <h6 className="input_label">TPA</h6>
            <TpaDropDown
              defaultValue={
                currentUser?.TPA ? currentUser?.TPA : claim_info?.TPA
              }
              label="TPA"
              isClearable={TPA?.name ? Boolean(true) : Boolean(false)}
              disabled={currentUser?.TPA ? Boolean(true) : Boolean(false)}
              error={errors.TPA}
              name="TPA"
              onChange={(option) => {
                if (claim_id) {
                  setReviewed(option);
                  setTitle("dents");
                  setVisible(true);
                } else {
                  dispatch(remove_dents([]));

                  setFieldValue("TPA", option);
                }
              }}
              value={TPA}
            />
          </D.Select>

          <SelectCategoryDropDown
            disabled={claim_info?.claim_type ? Boolean(true) : Boolean(false)}
            error={errors.claim_type}
            label="Claim Type"
            name="claim_type"
            onChange={(option) => {
              if (claim_id) {
                setReviewed(option);
                setTitle("dents & technician");
                setVisible(true);
              } else {
                setFieldValue("claim_type", option);
                dispatch(remove_dents([]));
              }
            }}
            value={claim_type}
          />
          <TextInput
            label="Insurance Claim Number"
            name="insurance_claim_number"
            onChange={handleChange}
            error={errors.insurance_claim_number}
            value={insurance_claim_number}
          />
          <TextInput
            label="Dent Doc Claim Number"
            name="dd_claim_number"
            // eslint-disable-next-line
            disabled={true}
            style={{ backgroundColor: "#F8F8F8" }}
            onChange={handleChange}
            value={dd_claim_number}
          />

          <GenericDropDown
            data={
              claim_id
                ? CLAIM_STATUS_ARRAY
                : CLAIM_STATUS_ARRAY.filter(
                    (opt) => opt.value !== CLAIM_STATUS.completed.value,
                  )
            }
            error={errors.status}
            label="Status"
            disabled={
              currentUser?.role === ROLES.tpaAccountManager.value ||
              currentUser?.role === ROLES.tpaAdmin.value
                ? Boolean(true)
                : Boolean(false)
            }
            value={status}
            onChange={(value) => {
              setFieldValue("status", value);
            }}
          />
          {!currentUser?.TPA && (
            <>
              <DateInput
                label="Date Received"
                error={errors.date_recieved}
                name="date_received"
                onChange={(value) => setFieldValue("date_recieved", value)}
                value={date_recieved && moment(date_recieved)}
              />
              <DateInput
                label="Follow Up"
                name="follow_up"
                error={errors.follow_up}
                onChange={(value) => {
                  setFieldValue("follow_up", value);
                  if (value) {
                    setFieldValue(
                      "status",
                      CLAIM_STATUS_ARRAY.find(
                        (opt) => opt.value === CLAIM_STATUS.follow_up.value,
                      ),
                    );
                  } else {
                    setFieldValue("status", "");
                  }
                }}
                value={follow_up && moment(follow_up)}
              />

              <DateInput
                label="Date Assigned"
                name="date_assigned"
                error={errors.date_assigned}
                onChange={(value) => setFieldValue("date_assigned", value)}
                value={date_assigned && moment(date_assigned)}
              />
              <DateInput
                label="Date Scheduled"
                name="date_scheduled"
                error={errors.date_scheduled}
                onChange={(value) => setFieldValue("date_scheduled", value)}
                value={date_scheduled && moment(date_scheduled)}
              />
              <DateInput
                label="Date Completed"
                error={errors.date_completed}
                name="date_completed"
                onChange={(value) => setFieldValue("date_completed", value)}
                value={date_completed && moment(date_completed)}
              />

              <DateInput
                label="TPA Billed"
                name="tpa_billed"
                error={errors.tpa_billed}
                onChange={(value) => setFieldValue("tpa_billed", value)}
                value={tpa_billed && moment(tpa_billed)}
              />
              <DateInput
                label="Tech Invoice Received"
                name="tech_invoice_received"
                error={errors.tech_invoice_recieved}
                onChange={(value) =>
                  setFieldValue("tech_invoice_recieved", value)
                }
                value={tech_invoice_recieved && moment(tech_invoice_recieved)}
              />
            </>
          )}
        </div>
      </form>
    </S.TabPanel1>
  );
}

TabPanel1.propTypes = {
  stickAtTop: PropTypes.bool,
  handleScroll: PropTypes.func,
  setClaimInfo: PropTypes.func,
  setPrevStatus: PropTypes.func,
  claimInfoFormik: PropTypes.objectOf(PropTypes.any),
  claimInfoSubmitRef: PropTypes.objectOf(PropTypes.any),
};

TabPanel1.defaultProps = {
  claimInfoSubmitRef: null,
};

export default TabPanel1;
