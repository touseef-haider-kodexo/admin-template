import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import * as S from "./styled";

function ImageHolder({
  close,
  image,
  description,
  from,
  time,
  setHasGalleryOpen,
  index,
}) {
  return (
    <S.ImageHolder>
      {close}
      <div onClick={() => setHasGalleryOpen(index)} className="placeholder">
        <img alt="dent-image" className="place-holder-img" src={image} />
      </div>
      <div className="below">
        <p className="about">From:{from}</p>
        <p className="about">
          {moment(time).format("MMMM Do YYYY, h:mm:ss a")}
        </p>
        {/* <p className="about"></p> */}
        <p className="detail">{description}</p>
      </div>
    </S.ImageHolder>
  );
}

ImageHolder.propTypes = {
  below: PropTypes.func,
  close: PropTypes.func,
  image: PropTypes.string,
  description: PropTypes.string,
  from: PropTypes.string,
  time: PropTypes.string,
  setHasGalleryOpen: PropTypes.func,
  index: PropTypes.number,
};
ImageHolder.defaultProps = {
  below: () => {},
  close: () => {},
  image: "",
  description: "",
  from: "",
  time: "",
  setHasGalleryOpen: () => {},
  index: 0,
};

export default ImageHolder;
