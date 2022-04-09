import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Tag } from "antd";

import pc from "@/assets/images/pc.svg";
import agreementLogo from "@/assets/images/agreementCheck.svg";
import location_logo from "@/assets/images/location.svg";
import cart from "@/assets/images/cart.svg";
import kite from "@/assets/images/kite.svg";
import envelope from "@/assets/images/envelope.svg";
import Button from "@/components/Button";
import { meterToMiles } from "@/utils/distanceCalculator";
import { baseImageURL } from "@/utils/axios";
import MessageModal from "@/components/Modal/MessageModel";
import { set_prices } from "@/containers/PageClaims/actions";

import Modal from "../Modal";
import TechnicianReviewModal from "../Modal/TechnicianReviewModal";

import * as S from "./styled";
import RatingStar from "./RatingStar";

const colorArray = ["#F7FE72", "#F4E76E", "#8FF7A7", "#51BBFE"];

function TechnicianCard(props) {
  const {
    // ratings,
    name,
    business_name,
    business_address_one,
    // apt_suite,
    locations,
    has_shop,
    radius_of_services,
    business_logo,
    profile_image,
    phone,
    website,
    email,
    agreement_signed,
    additional_claim,
    technician_category,
    _id,
    setTechnicianLocId,
    technicianLocId,
    columnSize,
    hasSelectButton,
    categoryNames,
    avg_rating,
    disabled,

    setSelectedTechnician,
    calculated_distance,
    claim_id,
  } = props;
  const techData = {
    // ratings,
    name,
    business_name,
    business_address_one,
    // apt_suite,
    locations,
    has_shop,
    radius_of_services,
    business_logo,
    profile_image,
    phone,
    website,
    email,
    agreement_signed,
    technician_category,
    additional_claim,
    _id,
  };

  const [visible, setVisible] = useState(false);

  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useDispatch();

  const color = useMemo(
    () => colorArray[Math.round(Math.random() * colorArray.length)],
    [],
  );

  const unSelectTech = () => {
    setTechnicianLocId(null);
    setSelectedTechnician(null);
    setShowMessage(false);
    dispatch(set_prices());
  };

  const selectTech = () => {
    setTechnicianLocId(locations._id);
    setSelectedTechnician(techData);
    setShowMessage(false);
    dispatch(set_prices());
  };

  const handleShowMessage = () => {
    if (technicianLocId === locations?._id) {
      unSelectTech();
      return;
    }
    selectTech();
  };

  const handleCancel = () => {
    if (technicianLocId === locations?._id) {
      selectTech();
      return;
    }
    setShowMessage(false);
  };

  return (
    <S.TechnicianCard>
      <S.ColumnOne>
        <MessageModal
          setVisible={setShowMessage}
          visible={showMessage}
          widthFit="width-fit"
          handleContinue={handleShowMessage}
          handleCancel={handleCancel}
          title="technician"
          messageTitle="price calculation"
        />
        <div className="">
          {business_logo ? (
            <div className="business-logo-container">
              <Modal
                modalContent={<TechnicianReviewModal {...props} />}
                setVisible={setVisible}
                trigger={
                  <div
                    onKeyPress={() => {}}
                    role="presentation"
                    onClick={() => setVisible(true)}
                  >
                    <div>
                      <img
                        alt="business-logo"
                        className="business-logo"
                        src={`${baseImageURL}${business_logo}`}
                        width={60}
                        height={60}
                      />
                    </div>
                  </div>
                }
                visible={visible}
              />
            </div>
          ) : (
            <div className="business-logo-container-dark">
              <Modal
                modalContent={<TechnicianReviewModal {...props} />}
                setVisible={setVisible}
                trigger={
                  <div
                    onKeyPress={() => {}}
                    role="presentation"
                    onClick={() => setVisible(true)}
                  >
                    <div>
                      <div
                        style={{
                          width: 60,
                          height: 60,
                          color: "#0057FF",
                        }}
                        className="avatar-text"
                      >
                        {String(business_name).charAt(0)}
                      </div>
                    </div>
                  </div>
                }
                visible={visible}
              />
            </div>
          )}
        </div>
      </S.ColumnOne>

      <S.ColumnTwo columnBasis={columnSize}>
        <div className="technician-details">
          <div>
            <p className="name">
              {business_name}
              {props?.is_active === false && (
                <Tag className="in-active-tag" color="#ff6766">
                  Inactive
                </Tag>
              )}
            </p>
            <p className="addr">{business_address_one}</p>
          </div>
        </div>

        <div className="location-row redirect">
          <div className="direct p-5">
            <img alt="location" src={location_logo} />
            <span>{meterToMiles(calculated_distance?.distance)} mi</span>
          </div>
          {has_shop && (
            <div className="direct p-5">
              <img alt="cart" src={cart} />
              <span>Has Shop</span>
            </div>
          )}
          {radius_of_services && (
            <div className="direct p-5">
              <img alt="kite" src={kite} />
              <span>Mobile up to {radius_of_services}</span>
            </div>
          )}
        </div>
        <div className="profile-container">
          {!profile_image ? (
            <div
              className="profile-logo-container-dark"
              style={{
                alignItems: "center",
                color: "#0057FF",
              }}
            >
              {String(name).charAt(0)}
            </div>
          ) : (
            <div className="profile-logo-container">
              <img
                alt="avatar"
                style={{ objectFit: "contain", borderRadius: "50%" }}
                width={42}
                height={42}
                className="profile-logo"
                src={`${baseImageURL}${profile_image}`}
              />
            </div>
          )}
          <p className="addr">
            {name}:{phone}
          </p>
        </div>

        <div className="chatbox">
          <p>{locations?.personal_notes?.note}</p>
        </div>
      </S.ColumnTwo>

      <S.ColumnThree>
        {hasSelectButton && (
          <Button
            onClick={() => {
              if (claim_id) {
                if(technicianLocId){

                  setShowMessage(true);
                  return;
                }
              }
              if (technicianLocId === locations?._id) {
                unSelectTech();
                return;
              }
              selectTech();
            }}
            hasBlueBackground={Boolean(technicianLocId === locations?._id)}
            size="auto"
            disabled={props?.is_active === false ? true : disabled}
            value={
              technicianLocId === locations?._id
                ? "Selected Technician"
                : "Select Technician"
            }
          />
        )}

        <div className="ratings flex">
          <RatingStar
            disabled
            size="small"
            defaultValue={avg_rating && avg_rating}
          />
          <span className="rating">({props?.ratings?.length})</span>
        </div>

        <div className="tags">
          {Array.isArray(categoryNames) &&
            categoryNames
              .filter(
                (val) =>
                  Object.prototype.hasOwnProperty.call(val, "parent") &&
                  val?.parent == null,
              )
              .map((category) => (
                <S.Tag tagColor={color}>{category?.name}</S.Tag>
              ))}
        </div>

        <div className="socials">
          {agreement_signed && <img alt="watch" src={agreementLogo} />}

          {email && (
            <a href={`mailto:${email}`} target="_blank">
              <img alt="envelope" className="mrl-10" src={envelope} />
            </a>
          )}

          {website && (
            <a href={website} target="_blank">
              <img alt="pc" src={pc} />
            </a>
          )}
        </div>
      </S.ColumnThree>
    </S.TechnicianCard>
  );
}

// eslint-disable-next-line
TechnicianCard.propTypes = {
  personal_notes: PropTypes.shape({
    note: PropTypes.string,
  }),
  ratings: PropTypes.arrayOf(
    PropTypes.shape({
      technician_id: PropTypes.string,
      communication: PropTypes.number,
      quality: PropTypes.number,
      timeliness: PropTypes.number,
      claim_id: PropTypes.string,
    }),
  ),
  name: PropTypes.string,
  business_name: PropTypes.string,
  business_address_one: PropTypes.string,
  apt_suite: PropTypes.string,
  locations: PropTypes.shape({
    location: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
    personal_notes: PropTypes.shape({
      note: PropTypes.number,
    }),
    _id: PropTypes.string,
  }),
  claim_location: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  has_shop: PropTypes.bool,
  setTechnicianLocId: PropTypes.func,
  technicianLocId: PropTypes.string,
  categoryNames: PropTypes.arrayOf(PropTypes.shape({})),
  avg_rating: PropTypes.number,
  setSelectedTechnician: PropTypes.func,
  calculated_distance: PropTypes.shape({
    distance: PropTypes.number,
  }),
  claim_id: PropTypes.string,
  radius_of_services: PropTypes.number,
  business_logo: PropTypes.string,
  profile_image: PropTypes.string,
  phone: PropTypes.string,
  website: PropTypes.string,
  technician_id: PropTypes.string,
  disabled: PropTypes.bool,
  email: PropTypes.string,
  additional_claim: PropTypes.arrayOf(PropTypes.shape({})),
  agreement_signed: PropTypes.bool,
  technician_category: PropTypes.arrayOf(
    PropTypes.shape({
      category: PropTypes.shape({
        name: PropTypes.string,
      }),
    }),
  ),
  _id: PropTypes.string,
  setSelectedTech: PropTypes.func,
  selectedTech: PropTypes.string,
  columnSize: PropTypes.number,
  is_active: PropTypes.bool,
  hasSelectButton: PropTypes.bool,
};

// eslint-disable-next-line
TechnicianCard.defaultProps = {
  personal_notes: {},
  ratings: [],
  name: "",
  business_name: "",
  business_address_one: "",
  apt_suite: "",
  claim_location: {},
  has_shop: false,
  radius_of_services: null,
  business_logo: "",
  profile_image: "",
  phone: "",
  website: "",
  email: "",
  agreement_signed: false,
  technician_category: [],
  _id: "",
  setSelectedTech: () => {},
  selectedTech: "",
  columnSize: 30,
  hasSelectButton: true,
};

export default TechnicianCard;
