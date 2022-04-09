/*eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import AppService from "@/services/api/app-service";
import { useMutation } from "react-query";
import * as D from "@/components/Tabset/styled";
import accordUp from "@/assets/images/accordUp.svg";
import accordDown from "@/assets/images/accordDown.svg";
import Button from "../Button/index";
import Modal from "../Modal/index";
import { useSelector, useDispatch } from "react-redux";
import close from "@/assets/images/xclose.svg";
import { baseImageURL } from "@/utils/axios";

import ImageHolder from "./ImageHolder";
import BeforeAndAfterImageModal from "../Modal/BeforeAndAfterImageModal";
import IsLoadingHOC from "@/hoc/isLoading";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "../Categories/index";

import { ROLES } from "@/utils/constants";
import {
  // import { set_after_images_discription }import { set_before_images_discription } from "@/containers/PageClaims/actions";
  //  from '../../containers/PageClaims/actions';
  remove_after_images,
  set_after_images,
  remove_before_images,
  set_before_images,
  set_after_images_discription,
  set_before_images_discription,
} from "@/containers/PageClaims/actions";

const TabPanel8 = ({
  setLoading,
  setValue,
  beforeAndAfterInfoSubmitRef,
  stickAtTop,
  handleScroll,
}) => {
  const dispatch = useDispatch();
  const filePicker = useRef(null);
  const filePickerAfter = useRef(null);
  const { dents, saved_dents, claim_id } = useSelector((state) => state.claim);
  const [expand, setExpand] = useState([]);
  const { currentUser } = useSelector((state) => state.global);
  const [isVisible, setIsVisible] = useState(false);
  const [isClick, setisClick] = useState(false);
  const [isClickAfter, setisClickAfter] = useState(false);
  const [isVisibleAfter, setIsVisibleAfter] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [imageUrlAfter, setimageUrlAfter] = useState("");
  const [imgDescription, setImgDescription] = useState("");
  const [imgDescriptionAfter, setImgDescriptionAfter] = useState("");
  const [hasGalleryOpen, setHasGalleryOpen] = useState(null);
  const [hasGalleryOpenAfter, setHasGalleryOpenAfter] = useState(null);
  const [beforeIndex, setBeforeIndex] = useState(null);
  const [afterIndex, setAfterIndex] = useState(null);
  const upload_photo = useMutation((data) => AppService.upload(data), {
    onSuccess: (data) => {
      console.log("data", data);
    },
    onError: (err) => {
      console.log("err", err);
      setLoading(false);
      setIsVisible(false);
      setIsVisibleAfter(false);
    },
  });
  const remove_photo = useMutation((data) => AppService.removeImage(data), {
    onSuccess: () => {
      setLoading(false);
    },
  });
  const addClaimImages = useMutation((data) => AppService.addClaimImages(data));

  const uploadImage = (data, name) => {
    return upload_photo.mutateAsync(data);
  };
  window.onscroll = handleScroll;

  const handleBefore = async (e) => {
    setisClick(!isClick);
    setIsVisible(false);
    if (imageUrl) {
      setLoading(true);
      const file = new FormData();
      file.append("file", imageUrl?.raw);
      let { data } = await uploadImage(file);
      dispatch(
        set_before_images({
          index: beforeIndex,
          data: {
            image: window.encodeURIComponent(data.key),

            image_description: imgDescription,
            uploaded_by: currentUser,
            uploaded_at: new Date(),
            is_uploaded_by_member:
              currentUser?.role === ROLES.member.value ? true : false,
          },
        }),
      );

      setImgDescription("");
      setimageUrl("");
      setIsVisible(false);
      setLoading(false);
    }
  };

  // handle the image upload to clear the save image
  useEffect(() => {
    if (!isVisible) {
      setHasGalleryOpen(null);
    }
  }, [isVisible]);
  useEffect(() => {
    if (!isVisibleAfter) {
      setHasGalleryOpenAfter(null);
    }
  }, [isVisibleAfter]);

  const handleAfter = async (e) => {
    setisClickAfter(!isClickAfter);
    setIsVisibleAfter(false);
    if (imageUrlAfter) {
      setLoading(true);
      const file = new FormData();
      file.append("file", imageUrlAfter?.raw);
      let { data } = await uploadImage(file);

      dispatch(
        set_after_images({
          index: afterIndex,
          data: {
            image: window.encodeURIComponent(data.key),

            image_description: imgDescriptionAfter,
            uploaded_by: currentUser,
            uploaded_at: new Date(),
            is_uploaded_by_member:
              currentUser?.role === ROLES.member.value ? true : false,
          },
        }),
      );
      setImgDescriptionAfter("");
      setimageUrlAfter("");
      setIsVisibleAfter(false);
      setLoading(false);
    }
  };

  const handleRemoveBefore = async (ind, imgIndex, image_key) => {
    setLoading(true);
    dispatch(
      remove_before_images({ index: ind, before_image_index: imgIndex }),
    );
    await remove_photo.mutateAsync(image_key);
  };

  const handleRemoveAfter = async (ind, imgIndex, image_key) => {
    setLoading(true);

    dispatch(remove_after_images({ index: ind, after_image_index: imgIndex }));
    await remove_photo.mutateAsync(image_key);
  };

  const getBefore = (ind) => {
    return (
      Array.isArray(dents) &&
      dents[ind]?.before_images?.map((item, imgIndex) => (
        <ImageHolder
          key={imgIndex}
          index={imgIndex}
          setHasGalleryOpen={setHasGalleryOpen}
          image={`${baseImageURL}${item?.image}`}
          description={item?.image_description}
          title={"image"}
          time={item?.uploaded_at}
          from={
            currentUser?.role === ROLES.member.value &&
            item?.is_uploaded_by_member
              ? "Uploaded by member"
              : item?.is_uploaded_by_member
              ? "Uploaded by member"
              : item?.uploaded_by?.first_name
          }
          close={
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleRemoveBefore(ind, imgIndex, item?.image);
              }}
              alt="close"
              id="close"
              src={close}
            />
          }
        />
      ))
    );
  };

  const getAfter = (ind) => {
    console.log("after index ", ind);
    return (
      Array.isArray(dents) &&
      dents[ind].after_images?.map((item, imgIndex) => (
        <ImageHolder
          key={imgIndex}
          index={imgIndex}
          setHasGalleryOpen={setHasGalleryOpenAfter}
          image={`${baseImageURL}${item?.image}`}
          description={item?.image_description}
          title={"image"}
          time={item?.uploaded_at}
          from={
            currentUser?.role === ROLES.member.value &&
            item?.is_uploaded_by_member
              ? "Uploaded by member"
              : item?.is_uploaded_by_member
              ? "Uploaded by member"
              : item?.uploaded_by?.first_name
          }
          close={
            <img
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleRemoveAfter(ind, imgIndex, item?.image);
              }}
              alt="close"
              id="close"
              src={close}
            />
          }
        />
      ))
    );
  };

  // logic for before and after images end here

  // open the images gallery
  useEffect(() => {
    if (hasGalleryOpen != null) {
      setIsVisible(true);
    }
  }, [hasGalleryOpen]);

  useEffect(() => {
    if (hasGalleryOpenAfter != null) {
      setIsVisibleAfter(true);
    }
  }, [hasGalleryOpenAfter]);

  //open the modal with image loaded on it
  const handleChangeImageBefore = async (e) => {
    console.log(e.target.name);
    if (e.target.files.length) {
      // here i am grabbing id from name because i have set the name to id
      setimageUrl({
        image: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });

      setIsVisible(true);
      e.target.value = "";
    }
  };

  //open the
  const handleChangeImageAfter = async (e) => {
    console.log(e.target.name);

    if (e.target.files.length) {
      setimageUrlAfter({
        image: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });

      setIsVisibleAfter(true);
      e.target.value = "";
    }
  };

  useEffect(() => {
    const temp = Array.isArray(dents) && dents.map(() => ({ expand: false }));
    setExpand(temp);
  }, []);

  const handleClick = () => {
    const obj = {
      damages: { dents: [...dents], saved_dents: [...saved_dents] },
      claimId: claim_id,
    };
    console.log(`beofre`);
    addClaimImages.mutate(obj);
    console.log(`after`);
    setValue(0);
  };
  window.onscroll = handleScroll;
  return (
    <div>
      <D.CustomizedAccordions stickAtTop={stickAtTop} claim_id={claim_id}>
        <div>
          <div className="next-btn">
            <button
              ref={beforeAndAfterInfoSubmitRef}
              className="dent-page-cont-btn save-btn"
              onClick={handleClick}
            >
              {new URLSearchParams(window.location.search).get("id")
                ? "Update"
                : "Continue"}
            </button>
          </div>
          {Array.isArray(dents) &&
            dents?.map((val, ind) => (
              <Accordion
                style={{ marginTop: "45px" }}
                key={val?.id}
                expanded={expand.length > 0 && expand[ind].expand}
                onChange={() => {
                  const temp = [...expand];
                  temp[ind].expand = !temp[ind].expand;
                  setExpand(temp);
                }}
                square
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                >
                  <div className="trigger flex j-btw">
                    <div className="flex">
                      <p
                        style={{
                          fontFamily: "Poppins-Light",
                          fontSize: "25px",
                          fontWeight: "bolder",
                        }}
                        className="text"
                      >
                        {val?.title}
                      </p>
                    </div>
                    {expand.length > 0 && expand[ind].expand ? (
                      <img alt="accordUp" src={accordUp} />
                    ) : (
                      <img alt="accordDown" src={accordDown} />
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex">
                    <div className="btn modal-btn-trigger">
                      <input
                        type="file"
                        name={`before${ind}`}
                        style={{ display: "none" }}
                        ref={filePicker}
                        accept=".png,.jpeg,jpg,image/*"
                        onChange={(e) => handleChangeImageBefore(e)}
                      />
                      <div className="flex">
                        <h3 style={{ marginRight: "5px" }}>Before :</h3>

                        <Button
                          onClick={() => {
                            setBeforeIndex(ind);
                            filePicker?.current?.click();
                          }}
                          size="xsmall"
                          value={`Add Image `}
                        />
                      </div>
                    </div>
                  </div>

                  <Modal
                    widthFit="image-modal"
                    setVisible={setIsVisible}
                    visible={isVisible}
                    modalContent={
                      <BeforeAndAfterImageModal
                        isClick={isClick}
                        name={`before${ind}`}
                        imageActiveIndex={hasGalleryOpen}
                        setDescription={setImgDescription}
                        images={
                          hasGalleryOpen !== null
                            ? val?.before_images
                            : imageUrl
                        }
                        setImageActiveIndex={setHasGalleryOpen}
                        dentIndex={ind}
                        action={set_before_images_discription}
                        title={`before${ind}-${val?.title}`}
                        onClick={(e) => handleBefore(e)}
                      />
                    }
                    trigger={<div />}
                  />
                  {/* image holder */}
                  <div className="image-holder">{getBefore(ind)}</div>

                  {/* image holder */}
                  {/* {new URLSearchParams(window.location.search).get("id") ? ( */}
                  <>
                    <div className="flex">
                      <div className="btn modal-btn-trigger">
                        <input
                          type="file"
                          name={`after${ind}`}
                          style={{ display: "none" }}
                          ref={filePickerAfter}
                          accept=".png,.jpeg,jpg,image/*"
                          onChange={(e) => handleChangeImageAfter(e)}
                        />
                        <div className="flex">
                          <h3 style={{ marginRight: "5px" }}>After :</h3>

                          <Button
                            onClick={() => {
                              setAfterIndex(ind);
                              filePickerAfter?.current?.click();
                            }}
                            size="xsmall"
                            index={ind}
                            value={`Add Image`}
                          />
                        </div>
                      </div>
                    </div>
                    {/* image holder */}
                    <div className="image-holder">{getAfter(ind)}</div>
                    {/* image holder */}
                  </>
                  {/* ) : null} */}
                  <Modal
                    widthFit="image-modal"
                    setVisible={setIsVisibleAfter}
                    visible={isVisibleAfter}
                    modalContent={
                      <BeforeAndAfterImageModal
                        isClick={isClickAfter}
                        name={`after${ind}`}
                        imageActiveIndex={hasGalleryOpenAfter}
                        setImageActiveIndex={setHasGalleryOpenAfter}
                        setDescription={setImgDescriptionAfter}
                        images={
                          hasGalleryOpenAfter !== null
                            ? val?.after_images
                            : imageUrlAfter
                        }
                        dentIndex={ind}
                        action={set_after_images_discription}
                        onClick={(e) => handleAfter(e)}
                        title={`after-${val?.title}`}
                      />
                    }
                    trigger={<div />}
                  />
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      </D.CustomizedAccordions>
    </div>
  );
};

export default IsLoadingHOC(TabPanel8);
