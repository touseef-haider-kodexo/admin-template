/* eslint-disable*/
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import * as S from "./styled";
import ImageSlider from "./ImageSlider";

import TextInput from "../Input";
import Button from "../Button";

function ImageModal({
  images,
  setDescription,
  title,
  imageActiveIndex,
  setImageActiveIndex,
  setimageArr,
  setIsSave,
  setUpload,
  setVisible,
}) {
  const [isClick, setisClick] = useState(false);
  const [text, setText] = useState("");
  const [from, setFrom] = useState("");
  const [when, setWhen] = useState("");
  useEffect(() => {
    // setDescription(text);
    // setUpload(true);
    setText("");
  }, [isClick]);
  useEffect(() => {
    if (imageActiveIndex === null) return;
    if (images[imageActiveIndex]?.is_uploaded_by_member) {
      setFrom("Uploaded by member");
    } else {
      setFrom(images[imageActiveIndex]?.uploaded_by?.first_name ?? "");
    }
    setWhen(images[imageActiveIndex]?.uploaded_at ?? "");
    setText(images[imageActiveIndex]?.image_description ?? "");
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
          setFrom={setFrom}
          setWhen={setWhen}
          setDescription={setText}
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
              if (imageActiveIndex !== null) {
                let imgs = [...images];
                imgs[imageActiveIndex] = {
                  ...imgs[imageActiveIndex],
                  image_description: e.target.value,
                };
                setimageArr(imgs);
                setIsSave(true);
              }
              setText(e.target.value);
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
          marginTop: 10,
        }}
      >
        {
          <Button
            type="submit"
            onClick={() => {
              console.log("clicked");
              setUpload(true);
              setDescription(text);
              setVisible(false);
              setisClick(!isClick);
            }}
            value={imageActiveIndex == null ? "Save" : "Update"}
            // value="Save"
          />
        }
      </div>
    </S.ImageModal>
  );
}

ImageModal.propTypes = {
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

export default ImageModal;
