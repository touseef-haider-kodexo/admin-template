/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import ItemsCarousel from "react-items-carousel";
import PropTypes from "prop-types";

import { baseImageURL } from "../../utils/axios";

import * as S from "./styled";

import prev from "@/assets/images/Prev.svg";

const ImageSlider = ({
  images,
  imageActiveIndex,
  setDescription,
  setFrom,
  setImageActiveIndex,
  setWhen,
}) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);
  const chevronWidth = 40;
  useEffect(() => {
    if (imageActiveIndex !== null) {
      setActiveItemIndex(imageActiveIndex);
    }
  }, [imageActiveIndex]);

  const handleChange = (currentIndex) => {
    setActiveItemIndex(currentIndex);
    setImageActiveIndex(currentIndex);
    if (imageActiveIndex !== null) {
      setDescription(images[currentIndex]?.image_description);
      setWhen(images[currentIndex]?.uploaded_at);
      if (images[currentIndex]?.is_uploaded_by_member) {
        setFrom("Uploaded by member");
      } else {
        setFrom(images[currentIndex]?.uploaded_by?.first_name);
      }
    }
  };

  //

  return (
    <S.ImageSlider>
      <ItemsCarousel
        activeItemIndex={activeItemIndex}
        chevronWidth={chevronWidth}
        gutter={20}
        leftChevron={<img alt="prev" className="chevron" src={prev} />}
        numberOfCards={1}
        outsideChevron
        requestToChangeActive={handleChange}
        rightChevron={
          <img alt="next" className="flipped chevron2" src={prev} />
        }
      >
        {Array.isArray(images) &&
          images.map((image) => (
            <div className="slide-container-box">
              {image?.uploaded_by?._id ||
              image?._id ||
              image?.is_uploaded_by_member ? (
                <img
                  key={image?.image}
                  alt="dent-slide"
                  className="slide"
                  src={`${baseImageURL}${image?.image}`}
                />
              ) : (
                <img
                  key={image?.image}
                  alt="dent-slide"
                  className="slide"
                  src={image?.image}
                />
              )}
            </div>
          ))}
      </ItemsCarousel>
    </S.ImageSlider>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object),
  imageActiveIndex: PropTypes.number,
  setFrom: PropTypes.func,
  setDescription: PropTypes.func,
  setImageActiveIndex: PropTypes.func,
  setWhen: PropTypes.func,
};

ImageSlider.defaultProps = {
  images: [],
  imageActiveIndex: null,
  setDescription: () => {},
};

export default ImageSlider;
