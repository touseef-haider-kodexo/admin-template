import React from "react";
import PropTypes from "prop-types";

import avatar from "@/assets/images/maleAvatar.svg";
import envelope from "@/assets/images/envelope.svg";
import pc from "@/assets/images/pc.svg";
import watch from "@/assets/images/agreementCheck.svg";
import location from "@/assets/images/location.svg";
import cart from "@/assets/images/cart.svg";
import kite from "@/assets/images/kite.svg";

import Modal from "../Modal";
import RoundCheckbox from "../Input/RoundCheckbox";
import TechnicianReviewModal from "../Modal/TechnicianReviewModal";

import RatingStar from "./RatingStar";
import * as S from "./styled";

function CompanyCard({ checked, name, onChange }) {
  return (
    <S.CompanyCard>
      <div className="check">
        <RoundCheckbox checked={checked} name={name} onChange={onChange} />
      </div>
      <div className="images">
        <img alt="avatar" className="avatar" src={avatar} />
      </div>
      <div className="flex socials ">
        <img alt="watch" src={watch} />
        <img alt="envelope" className="mrl-5" src={envelope} />
        <img alt="pc" src={pc} />
      </div>
      <div className="text">
        <Modal
          modalContent={<TechnicianReviewModal />}
          trigger={<p className="name">Braden’s Auto Service, Inc.</p>}
        />

        <p className="addr">14829 N 46th St, Costa Mes, CA 92626</p>
        <p className="rep">Jeff Angell: (602) 686-9954</p>
      </div>
      <div className="ratings flex">
        <RatingStar defaultValue="4" /> <span className="rating">(1,203)</span>
      </div>
      <div className="flex tags">
        <p className="tag yellow">PDR</p>
        <p className=" tag mrl-10 fade-red">Wheel</p>
        <p className="tag green">Exterior</p>
      </div>
      <div className="flex redirect j-btw">
        <div className="direct">
          <img alt="location" src={location} />
          <span>8.6mi</span>
        </div>
        <div className="direct">
          <img alt="cart" src={cart} />
          <span>Has Shop</span>
        </div>
        <div className="direct">
          <img alt="kite" src={kite} />
          <span>Mobile up to 20mi</span>
        </div>
      </div>
      <p className="info">
        This is where the Dent Doc team will see notes, only they can see notes
        regrarding technicians.
      </p>
    </S.CompanyCard>
  );
}

CompanyCard.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
};

export default CompanyCard;
