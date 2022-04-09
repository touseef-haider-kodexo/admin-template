/* eslint-disable  */

import React, { useState, useRef, useEffect } from "react";
import { useMutation } from "react-query";
import PropTypes from "prop-types";
import TextArea from "antd/lib/input/TextArea";
import { useDispatch, useSelector } from "react-redux";
// eslint-disable-next-line
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

import TextInput from "../Input";
import CheckboxInput from "../Input/CheckboxInput";
import CurrencyFormatInput from "../Input/formatCurrency";
import Button from "../Button";
import Modal from "../Modal";
import ImageModal from "../Modal/ImageModal";
import RAndIDropDown from "../DropDown/rAndIDropDown";
import CategoryDropDown from "../DropDown/CategoryDropDown";

import { ROLES } from "@/utils/constants";
import {
  showUI,
  showCloseButton,
  showDescription,
  disableCancelButton,
} from "@/utils/UI";

// eslint-disable-next-line
import ImageHolder from "./ImageHolder";
import { remove_internal_price } from "../../containers/PageClaims/actions";

// eslint-disable-next-line
import * as S from "./styled";

import { baseImageURL } from "@/utils/axios";
import accordUp from "@/assets/images/accordUp.svg";
import accordDown from "@/assets/images/accordDown.svg";
import close from "@/assets/images/xclose.svg";
// eslint-disable-next-line
import {
  remove_before_images,
  remove_dent,
  set_saved_dents,
  remove_saved_dents,
  remove_technician_r_and_i_price,
  set_dent,
  is_reset_index,
  set_saved,
  remove_technician_price,
} from "@/containers/PageClaims/actions";
import AppService from "@/services/api/app-service";
import IsLoadingHOC from "@/hoc/isLoading";

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

function CustomizedAccordions({
  onClickCancel,
  onClickSave,
  expand,
  handleChange,
  index,
  title,
  is_edit,
  setLoading,
  resetCanvas,
  ...props
}) {
  const [dentCategory, setDentCategory] = useState(null);
  const [amount, setAmount] = useState(0);
  const [toggle, settoggle] = useState(expand === index);

  const [prevIndex, setprevIndex] = useState(null);
  const [imgDescription, setImgDescription] = useState("");
  const [dentDescription, setDentDescription] = useState("");
  const [addOns, setAddOns] = useState([]);
  const [upload, setUpload] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isSave, setIsSave] = useState(false);
  const [imageUrl, setimageUrl] = useState("");
  const [imageArr, setimageArr] = useState([]);
  const [rAndI, setRAndI] = useState([]);
  const [rAndIError, setRAndIError] = useState(false);
  const [checkboxCategory, setCheckboxCategory] = useState({
    rAndI: false,
  });
  const [rNIArr, setrNIArr] = useState([]);
  const [dentCategoryError, setDentCategoryError] = useState(false);

  const [hasGalleryOpen, setHasGalleryOpen] = useState(null);

  const filePicker = useRef(null);

  const dispatch = useDispatch();
  const { claim_info, dents } = useSelector((state) => state.claim);
  const { currentUser } = useSelector((state) => state.global);
  const [categories, setCategories] = useState([]);
  const [categoryPrice, setCategoryPrice] = useState(null);
  // eslint-disable-next-line
  const claim = useSelector((state) => state.claim);
  useEffect(() => {
    const cat = [];
    // eslint-disable-next-line
    claim_info?.claim_type?.child?.map((c) => {
      if (c?.child?.length > 0) {
        // eslint-disable-next-line
        c?.child?.map((inner_child) => {
          cat.push({
            child_id: inner_child?._id,
            name: inner_child?.name,
            parent: inner_child?.parent,
            price: inner_child?.price,
            description: inner_child?.description,
            substitute_name: `${c?.name}-${inner_child?.name}`,
          });
        });
      } else {
        cat.push({
          child_id: c?._id,
          name: c?.name,
          parent: c?.parent,
          price: c?.price,
          description: c?.description,
          substitute_name: `${c?.name}`,
        });
      }
    });
    setCategories([...cat]);
  }, []);
  useEffect(() => {
    if (expand !== index) {
      settoggle(false);
    }
  }, [dents, expand]);

  useEffect(() => {
    if (isSave) {
      dispatch(remove_saved_dents({ index: index }));
      dispatch(set_saved({ index: index, is_saved: true }));
    }
  }, [isSave]);

  const upload_photo = useMutation((data) => AppService.upload(data), {
    onSuccess: () => {
      // console.log(data);
      setUpload(false);
      setIsVisible(false);
    },
    onError: (error) => {
      console.log(error);
      setLoading(false);
      setIsVisible(false);
    },
  });
  const remove_photo = useMutation((data) => AppService.removeImage(data));

  const handleAccordionChange = () => {
    if (expand === index && !prevIndex) {
      settoggle(!toggle);
    } else {
      handleChange(index);
      settoggle(!toggle);
    }
  };

  const uploadImage = (data) => {
    return upload_photo.mutateAsync(data);
  };

  const removeImage = async (imgIndex, image_key) => {
    // console.log("REMOVED IMAGE", imgIndex);
    // console.log("REMOVED IMAGE", image_key);
    setLoading(true);
    try {
      await remove_photo.mutateAsync(image_key);
      dispatch(
        remove_before_images({ index: index, before_image_index: imgIndex }),
      );
      // eslint-disable-next-line
    } catch (error) {
      // eslint-disable-next-line
      console.log(error);
    }
    // eslint-disable-next-line
    setIsSave(true);
    // eslint-disable-next-line
    setLoading(false);
  };

  useEffect(() => {
    if (is_edit) {
      // eslint-disable-next-line
      setIsSave(false);
    }
    if (!is_edit) {
      setRAndI(props?.r_and_i);
      if (props?.r_and_i?.length > 0) {
        setrNIArr([...props?.r_and_i]);
      }
      setCheckboxCategory({
        ...checkboxCategory,
        rAndI: props?.r_and_i?.length > 0 ? true : false,
      });
      setAddOns([...props?.add_ons]);
      setDentCategory(props?.dent_category);
      setAmount(props?.amount && props?.amount);
      setCategoryPrice(props?.category_price);
    }
    if (is_edit === undefined) {
      setIsSave(true);
    }
  }, [is_edit]);

  const { rAndI: rL } = checkboxCategory;
  const handlecheckboxCategoryChange = (e, id) => {
    const getAddOn = [...claim_info?.claim_type?.add_ons].find(
      (i) => i._id === id,
    );
    let newArray = [
      ...addOns,
      {
        category: { ...getAddOn },
        add_on_default_price: getAddOn?.price,
      },
    ];
    let includes = [...addOns].find((item) => item?.category?._id === id);
    if (includes) {
      newArray = newArray.filter((i) => i?.category?._id !== id);
    }
    setIsSave(true);
    setAddOns(newArray);
  };

  // open the images gallery
  useEffect(() => {
    if (hasGalleryOpen != null) {
      setIsVisible(true);
    }
  }, [hasGalleryOpen]);

  // set the existing images
  useEffect(() => {
    //  setLoading(false);
    if (props?.before_images?.length < 0) return;

    setimageArr([...imageArr, ...props.before_images]);
    if (props?.description) {
      setDentDescription(props?.description);
      setAddOns(props?.add_ons);
    }
  }, []);

  // handle the image upload to clear the save image
  useEffect(() => {
    if (!isVisible) {
      setimageUrl("");
      setHasGalleryOpen(null);
    }
  }, [isVisible]);

  // handle the image upload to  save the image
  useEffect(async () => {
    if (imageUrl && upload) {
      setLoading(true);
      const file = new FormData();
      file.append("file", imageUrl?.raw);
      let { data } = await uploadImage(file);
      // console.log(`data`, data);
      if (currentUser?.role !== ROLES.member.value) {
        setimageArr([
          ...imageArr,
          {
            image: window.encodeURIComponent(data.key),
            image_description: imgDescription,
            uploaded_by: currentUser,
            uploaded_at: new Date(),
          },
        ]);
      } else {
        setimageArr([
          ...imageArr,
          {
            image: window.encodeURIComponent(data.key),
            image_description: imgDescription,
            uploaded_at: new Date(),
            is_uploaded_by_member:
              currentUser?.role === ROLES.member.value ? true : false,
          },
        ]);
      }
      setLoading(false);
      setImgDescription("");
      setimageUrl("");
      setIsSave(true);
      setIsVisible(false);
    }
  }, [upload, imgDescription]);

  const handleChangeImage = (e) => {
    if (e.target.files.length) {
      setimageUrl({
        image: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
      setIsVisible(true);
      e.target.value = "";
    }
  };

  const handleClick = () => {
    if (props?.saved) return;
    try {
      if (
        (currentUser?.role === ROLES.admin.value ||
          currentUser?.role === ROLES.accountManager.value) &&
        !window.location.href.includes("carvana")
      ) {
        if (
          !dentCategory ||
          dentCategory === null ||
          dentCategory === undefined
        ) {
          setDentCategoryError(true);
          return;
        }
        if (rL && rNIArr?.length <= 0) {
          setRAndIError(true);
          return;
        }
        dispatch(
          set_dent({
            index: index,
            data: {
              description: dentDescription,
              amount: Number(amount),
              before_images: [...imageArr],
            },
            addOns,
            categoryPrice: categoryPrice,
            dentCategory: dentCategory,
            rAndI: rNIArr,
            technician_price: props?.technician_price ?? null,
            internal_price: props?.internal_price ?? null,
            is_edit: false,
          }),
        );
        dispatch(
          set_saved_dents({
            index: index,
          }),
        );
        setRAndIError(false);
        setDentCategoryError(false);
        setIsSave(false);
        dispatch(set_saved({ saved: true, index: index }));
        setRAndIError(false);
      } else {
        console.log("*******");

        dispatch(
          set_dent({
            index: index,
            data: {
              description: dentDescription,
              amount: Number(amount),
              before_images: [...imageArr],
            },
            addOns,
            categoryPrice: categoryPrice,
            dentCategory: dentCategory,
            rAndI: rNIArr,
            technician_price: props?.technician_price ?? null,
            internal_price: props?.internal_price ?? null,
            is_edit: false,
          }),
        );
        dispatch(
          set_saved_dents({
            index: index,
          }),
        );
        setIsSave(false);
        dispatch(set_saved({ saved: true, index: index }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Accordion expanded={toggle} onChange={handleAccordionChange} square>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <div className="trigger flex j-btw">
            <p className={`${isSave && "text-unsave"}`}>{title}</p>
            {toggle ? (
              <img alt="accordUp" src={accordUp} />
            ) : (
              <img alt="accordDown" src={accordDown} />
            )}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <div className="upper">
            <p className="description">Description</p>
            <TextArea
              onChange={(e) => {
                setDentDescription(e.target.value);
                setIsSave(true);
              }}
              disabled={showDescription(currentUser, ROLES, claim_info, props)}
              defaultValue=" This damage is significant to the left front door and is causing
              other damage."
              value={dentDescription}
            />
            {!window.location.href.includes("carvana") &&
              showUI(currentUser, ROLES, props) && (
                <CategoryDropDown
                  style={{
                    width: "100% !important",
                    border: "1px solid black",
                  }}
                  data={Array.isArray(categories) && categories}
                  label="Dent Categories"
                  value={dentCategory}
                  error={
                    dentCategoryError ? "*dent category is required" : false
                  }
                  onChange={(value) => {
                    dispatch(remove_technician_price({ index: index }));
                    dispatch(
                      remove_internal_price({
                        index: index,
                      }),
                    );
                    setDentCategory(value);
                    setIsSave(true);
                  }}
                />
              )}
            {!window.location.href.includes("carvana") &&
              showUI(currentUser, ROLES, props) && (
                <CurrencyFormatInput
                  label="price"
                  type="input"
                  style={{ width: "100% !important" }}
                  value={categoryPrice}
                  onBlur={(e) => {
                    setIsSave(true);
                    dispatch(remove_technician_price({ index: index }));
                    dispatch(remove_internal_price({ index: index }));
                    setCategoryPrice(e.target.value.replace(/[$,]/gi, ""));
                  }}
                />
              )}
            <div className="check-flex flex-wrap j-btw flex">
              <div className="checkboxes">
                {Array.isArray(claim_info?.claim_type?.add_ons) &&
                  !window.location.href.includes("carvana") &&
                  showUI(currentUser, ROLES, props) &&
                  claim_info?.claim_type?.add_ons.map((addOn) => (
                    <CheckboxInput
                      checked={Boolean(
                        addOns.find((item) => {
                          return item?.category?._id === addOn?._id
                            ? true
                            : false;
                        }),
                      )}
                      label={addOn?.name}
                      name={addOn?._id}
                      onChange={(e) =>
                        handlecheckboxCategoryChange(e, addOn?._id)
                      }
                    />
                  ))}
                {claim_info?.claim_type?.r_and_i?.length > 0 &&
                !window.location.href.includes("carvana") &&
                showUI(currentUser, ROLES, props) ? (
                  <CheckboxInput
                    checked={rL}
                    label="R&l"
                    name="rL"
                    onChange={(e) => {
                      setIsSave(true);
                      if (e.target.checked) {
                        setCheckboxCategory({
                          ...checkboxCategory,
                          rAndI: e.target.checked,
                        });
                      } else {
                        setRAndI([]);
                        setrNIArr([]);
                        dispatch(
                          remove_technician_r_and_i_price({ index: index }),
                        );
                        setCheckboxCategory({
                          ...checkboxCategory,
                          rAndI: e.target.checked,
                        });
                      }
                    }}
                  />
                ) : null}
              </div>

              {claim?.claim_info?.claim_type?.r_and_i?.length > 0 &&
                !window.location.href.includes("carvana") &&
                showUI(currentUser, ROLES, props) && (
                  <div className="amount">
                    <CurrencyFormatInput
                      type="input"
                      onBlur={(e) => {
                        setAmount(e.target.value.replace(/[$,]/gi, ""));
                        dispatch(
                          remove_technician_r_and_i_price({ index: index }),
                        );
                        setIsSave(true);
                      }}
                      value={amount}
                      defaultValue={amount}
                      // onValueChange={(values) => {
                      //   setAmount(values.value);
                      // }}
                    />
                  </div>
                )}

              <Modal
                widthFit="image-modal"
                setVisible={setIsVisible}
                visible={isVisible}
                modalContent={
                  <ImageModal
                    setVisible={setIsVisible}
                    imageActiveIndex={hasGalleryOpen}
                    setImageActiveIndex={setHasGalleryOpen}
                    setDescription={setImgDescription}
                    images={hasGalleryOpen !== null ? imageArr : imageUrl}
                    setimageArr={setimageArr}
                    setIsSave={setIsSave}
                    title={title}
                    index={index}
                    setUpload={setUpload}
                  />
                }
                trigger={<div />}
              />
            </div>
            {(checkboxCategory.rAndI ||
              claim?.claim_info?.claim_type?.r_and_i?.length > 0) &&
              !window.location.href.includes("carvana") &&
              showUI(currentUser, ROLES, props) && (
                <RAndIDropDown
                  data={
                    Array.isArray(claim?.claim_info?.claim_type?.r_and_i) &&
                    claim?.claim_info?.claim_type?.r_and_i
                  }
                  label="R & I"
                  value={rAndI}
                  error={rAndIError ? "* please select R&I" : ""}
                  onChange={(value) => {
                    setIsSave(true);
                    let rNI = [...claim?.claim_info?.claim_type?.r_and_i].find(
                      (rni) => rni?._id === value?._id,
                    );
                    let r_n_i = [rNI];
                    const include = [...rNIArr].find(
                      (rni) => rni === value?.id,
                    );
                    if (include) {
                      r_n_i = r_n_i?.filter((rni) => rni?._id !== value?._id);
                    }
                    dispatch(remove_technician_r_and_i_price({ index: index }));
                    setRAndI(value);
                    setrNIArr(r_n_i);
                  }}
                />
              )}
            <div className="btn modal-btn-trigger">
              <input
                type="file"
                style={{ display: "none" }}
                ref={filePicker}
                accept=".jpg,.jpeg,.png,image/*"
                onChange={handleChangeImage}
              />
              <Button
                onClick={() => filePicker?.current?.click()}
                size="xsmall"
                value="Add Image"
              />
            </div>
          </div>
          <div className="lower">
            <div className="image-holder">
              {Array.isArray(imageArr) &&
                imageArr?.length > 0 &&
                imageArr.map((val, imgIndex) => (
                  <ImageHolder
                    key={imgIndex}
                    index={imgIndex}
                    setHasGalleryOpen={setHasGalleryOpen}
                    image={`${baseImageURL}${val?.image}`}
                    description={val?.image_description}
                    title={title}
                    time={val?.uploaded_at}
                    from={
                      currentUser?.role === ROLES.member.value &&
                      val?.is_uploaded_by_member
                        ? "Uploaded by member"
                        : val?.is_uploaded_by_member
                        ? "Uploaded by member"
                        : val?.uploaded_by?.first_name
                    }
                    close={
                      showCloseButton(currentUser, ROLES, claim_info, val) ? (
                        <img
                          style={{ cursor: "pointer", objectFit: "contain" }}
                          onClick={() => {
                            const arr = [...imageArr];
                            arr.splice(imgIndex, 1);
                            setimageArr(arr);
                            removeImage(imgIndex, val?.image);
                          }}
                          alt="close"
                          id="close"
                          src={close}
                        />
                      ) : (
                        ""
                      )
                    }
                  />
                ))}
            </div>

            <div className="last-btns">
              <button
                onClick={handleClick}
                className={`${!isSave ? "save-btn" : "white-btn "}`}
                type="button"
              >
                {!isSave ? "Saved" : "Save"}
              </button>

              <button
                className="white-btn"
                disabled={disableCancelButton(
                  currentUser,
                  ROLES,
                  props,
                  claim_info,
                )}
                onClick={() => {
                  dispatch(remove_dent(index));
                  dispatch(remove_saved_dents({ index }));
                  dispatch(is_reset_index(props?.canvas_id));
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
CustomizedAccordions.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
  expand: PropTypes.bool,
  handleChange: PropTypes.func,
  index: PropTypes.number,
  title: PropTypes.string,
  options: PropTypes.array,
  amount: PropTypes.number,
  dentDescription: PropTypes.string,
  imageUrl: PropTypes.string,
  imageArr: PropTypes.array,
  handlecheckboxCategoryChange: PropTypes.func,
  aluminium: PropTypes.bool,
  hss: PropTypes.bool,
  gluePull: PropTypes.bool,
  rL: PropTypes.bool,
  setAmount: PropTypes.func,
  setDentDescription: PropTypes.func,
  setOption: PropTypes.func,
  setIsVisible: PropTypes.func,
  setHasGalleryOpen: PropTypes.func,
  setImgDescription: PropTypes.func,
  handleChangeImage: PropTypes.func,
};

CustomizedAccordions.defaultProps = {
  onClickCancel: () => {},
  onClickSave: () => {},
  expand: false,
  handleChange: () => {},
  index: 0,
  title: "",
  options: [],
  amount: 0,
  dentDescription: "",
  imageUrl: "",
  imageArr: [],
  handlecheckboxCategoryChange: () => {},
  aluminium: false,
  hss: false,
  gluePull: false,
  rL: false,
  setAmount: () => {},
  setDentDescription: () => {},
  setOption: () => {},
  setIsVisible: () => {},
  setHasGalleryOpen: () => {},
  setImgDescription: () => {},
  handleChangeImage: () => {},
};

export default IsLoadingHOC(CustomizedAccordions);
