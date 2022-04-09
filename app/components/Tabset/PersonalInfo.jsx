import React, { useState, useEffect } from "react";
import { geocodeByPlaceId } from "react-google-places-autocomplete";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import TextInput from "@/components/Input";
import Button from "@/components/Button";
import AddressDropDown from "@/components/DropDown/adressDropDown";
import MessageModal from "@/components/Modal/MessageModel";
import { remove_technician_info } from "@/containers/PageClaims/actions";
import NumberFormatInput from "@/components/Input/formatNumber";
import getLocationFromGoogleResult from "@/utils/getLocation";
import { ROLES } from "@/utils/constants";

import * as S from "./styled";

function TabPanel2({
  personalInfoSubmitRef,
  stickAtTop,
  setInfo,
  info,
  handleScroll,
  formik,
  setPersonalInfoLatLng,
  setDealershipInfoLatLng,
  infoSchema,
  ...props
}) {
  const dispatch = useDispatch();

  const [visible, setVisible] = useState(false);
  const [reviewed, setReviewed] = useState(null);

  const { currentUser } = useSelector((state) => state.global);
  const { personal_info, claim_id } = useSelector((state) => state.claim);

  useEffect(() => {
    setInfo({ ...personal_info });

    if (personal_info?.personal_info_lat_lng) {
      setPersonalInfoLatLng({
        ...personal_info?.personal_info_lat_lng,
      });
    }

    if (personal_info?.dealership_info_lat_lng) {
      setDealershipInfoLatLng({
        ...personal_info?.dealership_info_lat_lng,
      });
    }
  }, []);

  useEffect(() => {
    if (personal_info && props?.carvana) {
      setInfo({ ...personal_info });
    } else if (props?.carvana) {
      setInfo({ ...infoSchema });
    }
  }, [personal_info]);

  const {
    values: {
      first_name,
      last_name,
      address,
      apt_suite,
      city,
      state,
      zip,
      phone,
      secondary_phone,
      email,
      secondary_email,
      d_name,
      d_service_advisor,
      d_phone,
      d_apt_suite,
      d_address,
      d_city,
      d_state,
      d_zip,
    },
    errors,
    handleSubmit,
    setFieldValue,
    handleChange,
  } = formik || {};

  function handleAddressDropDownChange(placeId, fieldNamePrefix) {
    if (placeId) {
      geocodeByPlaceId(placeId)
        .then((results) => {
          const formattedAddress = results[0].formatted_address.split(",")[0];
          setFieldValue(`${fieldNamePrefix}address`, formattedAddress);
          const lat = results[0].geometry.location.lat();
          const lng = results[0].geometry.location.lng();
          if (fieldNamePrefix === "") {
            setPersonalInfoLatLng({
              lat,
              lng,
            });
          } else {
            setDealershipInfoLatLng({
              lat,
              lng,
            });
          }
          // eslint-disable-next-line
          const { zip_code, city, state } =
            getLocationFromGoogleResult(results[0]?.address_components) || {};
          if (claim_id) {
            setReviewed({
              zip_code,
              city,
              state,
              fieldNamePrefix,
            });
            setVisible(true);
          } else {
            setFieldValue(`${fieldNamePrefix}city`, city);
            setFieldValue(`${fieldNamePrefix}state`, state);
            setFieldValue(`${fieldNamePrefix}zip`, zip_code);
          }
        })
        .catch((error) => console.error(error));
    }
  }

  const handleContinue = () => {
    // eslint-disable-next-line
    const { zip_code, city, state, fieldNamePrefix } = reviewed;

    setFieldValue(`${fieldNamePrefix}city`, city);
    setFieldValue(`${fieldNamePrefix}state`, state);
    setFieldValue(`${fieldNamePrefix}zip`, zip_code);
    setVisible(false);
    setReviewed(null);
    dispatch(remove_technician_info(null));
  };

  const resetAddressToOldValues = (fieldNamePrefix) => {
    setFieldValue(
      `${fieldNamePrefix}address`,
      info[`${fieldNamePrefix}address`],
    );
    setFieldValue(`${fieldNamePrefix}city`, info[`${fieldNamePrefix}city`]);
    setFieldValue(`${fieldNamePrefix}state`, info[`${fieldNamePrefix}state`]);
    setFieldValue(`${fieldNamePrefix}zip`, info[`${fieldNamePrefix}zip`]);
  };

  const handleCancel = () => {
    setVisible(false);
    resetAddressToOldValues(reviewed.fieldNamePrefix);
  };
  window.onscroll = handleScroll;
  return (
    <S.TabPanel2
      member={currentUser?.role === ROLES.member.value}
      claim_id={claim_id}
    >
      <MessageModal
        setVisible={setVisible}
        visible={visible}
        widthFit="width-fit"
        handleContinue={handleContinue}
        handleCancel={handleCancel}
        title="address"
        messageTitle="technician"
      />
      <form ref={personalInfoSubmitRef} onSubmit={handleSubmit}>
        <div className="next-btn">
          <Button
            stickAtTop={stickAtTop}
            type="submit"
            size="xsmall"
            value="Next"
          />
        </div>
        <div className="gridy">
          <TextInput
            label="First Name"
            name="first_name"
            onChange={handleChange}
            error={errors.first_name}
            value={first_name}
          />
          <TextInput
            label="Last Name"
            name="last_name"
            onChange={handleChange}
            error={errors.last_name}
            value={last_name}
          />
          <AddressDropDown
            error={errors.address}
            label="Address"
            val={address}
            handleClear={() => {
              setFieldValue("address", "");
              setFieldValue("city", "");
              setFieldValue("state", "");
              setFieldValue("zip", "");
            }}
            handleChange={(val) => handleAddressDropDownChange(val, "")}
          />
          <TextInput
            error={errors.apt_suite}
            label="Apt/Suite"
            name="apt_suite"
            onChange={handleChange}
            value={apt_suite}
          />
          <TextInput
            label="City"
            type="text"
            name="city"
            error={errors.city}
            onChange={handleChange}
            value={city}
          />
          <div className="sub-grid">
            <TextInput
              label="State"
              name="state"
              type="text"
              error={errors.state}
              onChange={handleChange}
              value={state}
            />
            <TextInput
              label="Zip"
              name="zip"
              type="text"
              error={errors.zip}
              onChange={handleChange}
              value={zip}
            />
          </div>
          <NumberFormatInput
            label="Phone"
            name="phone"
            error={errors.phone}
            onChange={handleChange}
            value={phone}
            setFieldValue={setFieldValue}
          />
          <NumberFormatInput
            label="Cell / SMS (to provide status update on claim)"
            name="secondary_phone"
            error={errors.secondary_phone}
            onChange={handleChange}
            value={secondary_phone}
            setFieldValue={setFieldValue}
          />

          <TextInput
            label="Email"
            name="email"
            error={errors.email}
            onChange={(e) => {
              setFieldValue("email", e.target.value.toLowerCase());
            }}
            type="email"
            value={email}
          />
          <TextInput
            label="Secondary Email"
            name="secondary_email"
            error={errors.secondary_email}
            onChange={(e) => {
              setFieldValue("secondary_email", e.target.value.toLowerCase());
            }}
            type="email"
            value={secondary_email}
          />
          {window.location.href.includes("carvana") && (
            <TextInput
              label="Insurance Claim Number"
              name="insurance_claim_number"
              onChange={(e) => {
                props?.setInsuranceClaimNumber(e.target.value);
              }}
              error={
                props?.insuranceClaimNumberError
                  ? "*insurance claim number is required"
                  : ""
              }
              value={props?.insuranceClaimNumber}
            />
          )}
        </div>

        {currentUser?._id && !window.location.href.includes("carvana") && (
          <div className="lower">
            <div className="gridy mb-15">
              <TextInput
                blueLine="blue-line"
                label="Dealership"
                name="d_name"
                type="text"
                error={errors.d_name}
                onChange={handleChange}
                value={d_name}
              />
              <TextInput
                blueLine="blue-line"
                label="Service Advisor"
                name="d_service_advisor"
                type="text"
                error={errors.d_service_advisor}
                onChange={handleChange}
                value={d_service_advisor}
              />
            </div>
            <div className="mb-15">
              <NumberFormatInput
                blueLine="blue-line"
                label="Dealership Phone Number"
                name="d_phone"
                error={errors.d_phone}
                onChange={handleChange}
                value={d_phone}
                setFieldValue={setFieldValue}
              />
            </div>
            <div className="gridy mb-15 ">
              <AddressDropDown
                error={errors.d_address}
                label="Address "
                val={d_address}
                handleClear={() => {
                  setFieldValue("d_address", "");
                  setFieldValue("d_city", "");
                  setFieldValue("d_state", "");
                  setFieldValue("d_zip", "");
                }}
                name="d_address"
                blueLine="blue-line"
                handleChange={(val) => handleAddressDropDownChange(val, "d_")}
              />
              <TextInput
                blueLine="blue-line"
                label="Apt. / Suite #"
                name="d_apt_suite"
                error={errors.d_apt_suite}
                type="text"
                onChange={handleChange}
                value={d_apt_suite}
              />
            </div>
            <div className="gridy mb-15 ">
              <TextInput
                blueLine="blue-line"
                label="City"
                name="d_city"
                type="text"
                error={errors.d_city}
                onChange={handleChange}
                value={d_city}
              />
              <div className="sub-grid">
                <TextInput
                  blueLine="blue-line"
                  label="State"
                  name="d_state"
                  type="text"
                  error={errors.d_state}
                  onChange={handleChange}
                  value={d_state}
                />
                <TextInput
                  blueLine="blue-line"
                  label="Zip"
                  name="d_zip"
                  error={errors.d_zip}
                  onChange={handleChange}
                  value={d_zip}
                />
              </div>
            </div>
          </div>
        )}
      </form>
    </S.TabPanel2>
  );
}
TabPanel2.propTypes = {
  personalInfoSubmitRef: PropTypes.func,
  insuranceClaimNumber: PropTypes.string,
  setInsuranceClaimNumber: PropTypes.func,
  insuranceClaimNumberError: PropTypes.bool,
  stickAtTop: PropTypes.bool,
  handleScroll: PropTypes.func,
  setInfo: PropTypes.func,
  formik: PropTypes.objectOf(PropTypes.any),
  setPersonalInfoLatLng: PropTypes.func,
  setDealershipInfoLatLng: PropTypes.func,
  info: PropTypes.objectOf(PropTypes.any),
  infoSchema: PropTypes.objectOf(PropTypes.any),
  carvana: PropTypes.bool,
};

export default TabPanel2;
