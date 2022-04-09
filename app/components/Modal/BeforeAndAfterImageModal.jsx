/*eslint-disable */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import * as S from "./styled";
import ImageSlider from "./ImageSlider";

import TextInput from "../Input";
import Button from "../Button";

function BeforeAndAfterImageModal({
  images,
  dentIndex,
  action,
  setDescription,
  title,
  name,
  isClick,
  onClick,
  imageActiveIndex,
  setImageActiveIndex,
}) {
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [from, setFrom] = useState("");
  const [when, setWhen] = useState("");

  useEffect(() => {
    setText("");
  }, [isClick]);

  useEffect(() => {
    if (imageActiveIndex == null) return;
    setFrom(
      images[imageActiveIndex]?.is_uploaded_by_member
        ? "uploaded by member"
        : images[imageActiveIndex]?.uploaded_by?.first_name,
    );

    setWhen(images[imageActiveIndex]?.uploaded_at);
    setText(images[imageActiveIndex]?.image_description);
    return () => {
      setFrom("");
      setWhen("");
      setText("");
    };
  }, [imageActiveIndex]);

  return (
    <S.ImageModal>
      <h1 className="modal-title">{title}</h1>
      <div className="image-slider">
        <ImageSlider
          setDescription={setText}
          setFrom={setFrom}
          setWhen={setWhen}
          imageActiveIndex={imageActiveIndex}
          setImageActiveIndex={setImageActiveIndex}
          images={!Array.isArray(images) ? [images] : images}
        />
      </div>
      <div className="texts">
        <div className="flex j-btw flex-text">
          <div className="lhs">
            <p className="text">{`${from && `From:${from}`} `} </p>
            <p className="text">{`${when && `On:${when}`} `}</p>
          </div>
        </div>
        <h3 className="desc-text">Description</h3>
        <div className="chatbox">
          <TextInput
            onChange={(e) => {
              setDescription(e.target.value);
              setText(e.target.value);
              if (imageActiveIndex !== null) {
                let imgs = [...images];
                imgs[imageActiveIndex] = {
                  ...imgs[imageActiveIndex],
                  image_description: e.target.value,
                };
                dispatch(
                  action({
                    index: dentIndex,
                    data: imgs,
                  }),
                );
                setIsSave(true);
              }
            }}
            value={text}
          />
        </div>
      </div>
      <div
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
          display: "flex",
          margin: 10,
        }}
      >
        {
          <Button
            type="submit"
            name={name}
            onClick={onClick}
            value={imageActiveIndex == null ? "Save" : "Update"}
          />
        }
      </div>
    </S.ImageModal>
  );
}

BeforeAndAfterImageModal.propTypes = {
  images: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string,
  ]),
  setDescription: PropTypes.func,
  title: PropTypes.string,
  imageActiveIndex: PropTypes.number,
  title: PropTypes.string,
};

export default BeforeAndAfterImageModal;
