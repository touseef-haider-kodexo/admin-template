/*eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ImageModal from "../Modal/ImageModal";

import * as S from "./styled";

import attach from "@/assets/images/attach.svg";
import Modal from "@/components/Modal";

function MemberDamages() {
  const { dents } = useSelector((state) => state.claim);
  const [hasGalleryOpen, setHasGalleryOpen] = useState(null);
  const [visible, setVisible] = useState(false);
  const [, setDescription] = useState("");
  const [imageArr, setImageArr] = useState([]);

  // open the images gallery
  useEffect(() => {
    if (hasGalleryOpen != null) {
      setVisible(true);
    }
  }, [hasGalleryOpen]);
  // handle the image upload to clear the save image
  useEffect(() => {
    if (!visible) {
      setHasGalleryOpen(null);
    }
  }, [visible]);

  return (
    <S.EditDamages>
      {dents?.map((dent, index) => (
        <div className="details gridy">
          <div className="lhs">
            <p className="title">{dent?.title}</p>
            <p className="description">{dent?.description}</p>
            {dent?.before_images?.map((i, imgIndex) => (
              <div className="flex attach">
                <img
                  aria-label="attach"
                  alt="attach"
                  onKeyPress={() => {}}
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setHasGalleryOpen(imgIndex);
                    setImageArr(dent?.before_images);
                    setVisible(true);
                  }}
                  src={attach}
                />
                <p
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    setHasGalleryOpen(imgIndex);
                    setImageArr(dent?.before_images);
                    setVisible(true);
                  }}
                  className="attach-text"
                >
                  {i?.image}
                </p>
              </div>
            ))}
            <Modal
              widthFit="image-modal"
              setVisible={setVisible}
              visible={visible}
              modalContent={
                <ImageModal
                  setDescription={setDescription}
                  imageActiveIndex={hasGalleryOpen}
                  images={Array.isArray(imageArr) && imageArr}
                  index={index}
                  title={dent?.title}
                />
              }
              trigger={<div />}
            />
          </div>
        </div>
      ))}
    </S.EditDamages>
  );
}

MemberDamages.propTypes = {};

export default MemberDamages;
