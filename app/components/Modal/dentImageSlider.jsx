import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ItemsCarousel from "react-items-carousel";
import PropTypes from "prop-types";
import loadImage from "image-promise";
import { Skeleton } from "antd";

import CanvasView from "../Tabset/canvas";
import { vehicleImageURL } from "../../utils/axios";

import * as S from "./styled";

import prev from "@/assets/images/Prev.svg";

const DentImageSlider = ({ images, setcurrent }) => {
  const { claim_info } = useSelector((state) => state.claim);
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const [isShow, setisShow] = useState(false);
  const chevronWidth = 10;

  const handleChange = (currentIndex) => {
    setActiveItemIndex(currentIndex);
  };

  useEffect(() => {
    setActiveItemIndex(0);
  }, []);

  const imageUrls = images.map((image) => `${vehicleImageURL}${image.image}`);
  loadImage(imageUrls).then(() => setisShow(true));

  return (
    <S.DentSlider>
      {isShow ? (
        <ItemsCarousel
          activeItemIndex={activeItemIndex}
          chevronWidth={chevronWidth}
          gutter={1}
          activePosition="center"
          infiniteLoop={false}
          leftChevron={<img alt="prev" className="chevron" src={prev} />}
          numberOfCards={1}
          disableSwipe
          showSlither={false}
          slidesToScroll={1}
          alwaysShowChevrons={false}
          outsideChevron
          requestToChangeActive={handleChange}
          rightChevron={
            <img alt="next" className="flipped chevron2" src={prev} />
          }
        >
          {Array.isArray(images) &&
            images.map((image) => (
              <div
                className="slide-container-box"
                style={{
                  padding: `${
                    String(claim_info?.claim_type?.name).toLowerCase() ===
                    String("interior").toLowerCase()
                  }`
                    ? "0px 20px"
                    : "0px",
                }}
              >
                <CanvasView setcurrent={setcurrent} image={image} />
              </div>
            ))}
        </ItemsCarousel>
      ) : (
        <center>
          <Skeleton.Avatar
            style={{
              margin: 20,
              marginTop: 40,
              borderRadius: 10,
            }}
            active
            size={550}
            shape="sqaure"
          />
        </center>
      )}
    </S.DentSlider>
  );
};

DentImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.any),
  setcurrent: PropTypes.func,
};

DentImageSlider.defaultProps = {
  images: [],
};

export default DentImageSlider;
