import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";

import editIcon from "@/assets/images/edit.svg";
import deleteIcon from "@/assets/images/delete.svg";
import Button from "@/components/Button";
import TextInput from "@/components/Input";
import ImageButton from "@/components/ImageButton";

import CurrencyFormatInput from "../Input/formatCurrency";

import * as S from "./styled";

export default function SubCategoryRow({
  deleteHandler,
  description,
  id,
  isAddCategory,
  myid,
  name,
  price,
  saveHandler,
  setisAddSubCategory,
  updateHandler,
}) {
  const [isEdit, setIsEdit] = useState(false);
  // eslint-disable-next-line
  const [categoryItem, setCategoryItem] = useState({});

  useEffect(() => {
    setIsEdit(isAddCategory);
  }, [isAddCategory]);

  useEffect(() => {
    setCategoryItem({ price, name, description });
  }, []);

  const SubCategorySchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[a-zA-Z0-9 ]+$/, "*Title is invalid")
      .min(2, "*Title must be at least 2 characters")
      .max(80, "*Title must be less than 80 characters")
      .required("*Title is required"),
    price: yup
      .string()
      // only allow numbers
      .matches(/^[0-9]*$/, "*Price is invalid")
      .required("*Price is required"),
    description: yup
      .string()
      .min(2, "*Description must be at least 2 characters")
      .max(200, "*Description must be less than 200 characters"),
  });
  return (
    <S.Category>
      <Formik
        // eslint-disable-next-line
        initialValues={{ name, price, description }}
        //  eslint-disable-next-line
        onSubmit={async ({ name, price, description }) => {
          if (isEdit && !isAddCategory) {
            updateHandler({ name, price, description }, myid);
            setIsEdit(false);
          } else {
            saveHandler({ name, price, description }, id);
            setisAddSubCategory(false);
          }
        }}
        //  eslint-disable-next-line
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={SubCategorySchema}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          setFieldValue,
          // isSubmitting,
          // eslint-disable-next-line
          touched,
          values,
          /* and other goodies */
        }) => (
          <div className="s-width">
            {/* {console.log({ values })} */}
            {!isEdit ? (
              <div className="gray-bg gridish">
                <div className="gridish-left">
                  <div className="left">
                    <p className="bold text">{name}</p>
                    <p className="gray text">{description}</p>
                  </div>
                  <div
                    className="sub-category-price-row"
                    //  className="mid flex flex-wrap j-btw"
                  >
                    <div>
                      <p className="text gray">Default for technician</p>
                    </div>
                    <div>
                      <TextInput
                        disabled
                        // eslint-disable-next-line
                        value={"$" + price}
                      />
                    </div>
                  </div>
                </div>
                <div className="right flex flex-end ">
                  <ImageButton
                    img={editIcon}
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setisAddSubCategory(!isAddCategory);
                    }}
                  />
                  <ImageButton
                    img={deleteIcon}
                    onClick={() => deleteHandler(myid)}
                  />
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="gray-bg ">
                  <div className="gridish">
                    <div className="gridish-left">
                      <div className="left flex">
                        {/* {!errors.name && ( */}
                        <p className="gray text mr">Item Title</p>
                        {/* // )} */}
                        <div className="w-50">
                          <TextInput
                            maxLength={80}
                            error={errors.name}
                            name="name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.name}
                          />
                        </div>
                      </div>

                      <div className="mid flex flex-wrap j-btw">
                        {/* {!errors.price && ( */}
                        <p className="text gray">Default for technician</p>
                        {/* )} */}
                        <div className="w-50">
                          <CurrencyFormatInput
                            error={errors.price}
                            name="price"
                            type="input"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            onValueChange={(option) => {
                              setFieldValue("price", option.value);
                            }}
                            value={values?.price}
                          />
                          {/* <TextInput
                            error={errors.price}
                            name="price"
                            type="number"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values?.price}
                          /> */}
                        </div>
                      </div>
                    </div>
                    {/* <div className="right flex flex-end ">
                    <img alt="delete" src={deleteIcon} />
                  </div> */}
                  </div>

                  <div className="descr gridish mt-15">
                    <div className="left flex">
                      <p className="gray text mr">Description</p>
                      <div className="width-100">
                        <TextInput
                          error={errors.description}
                          maxLength={200}
                          name="description"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values?.description}
                        />
                      </div>
                    </div>
                    <div />
                  </div>

                  <div className="dent-btns flex">
                    <button
                      className="mr"
                      onClick={() => {
                        setIsEdit(false);
                        setisAddSubCategory(!isAddCategory);
                      }}
                      type="button"
                    >
                      Cancel
                    </button>
                    <Button
                      size="xsmall"
                      type="submit"
                      value={isEdit && !isAddCategory ? "Update" : "Save"}
                    />
                  </div>
                </div>
              </form>
            )}
          </div>
        )}
      </Formik>
    </S.Category>
  );
}

SubCategoryRow.propTypes = {
  deleteHandler: PropTypes.func,
  description: PropTypes.string,
  id: PropTypes.string,
  isAddCategory: PropTypes.bool,
  myid: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  saveHandler: PropTypes.func,
  setisAddSubCategory: PropTypes.func,
  updateHandler: PropTypes.func,
};
