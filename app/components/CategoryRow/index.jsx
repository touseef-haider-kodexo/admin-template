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

export default function Row({
  deleteHandler,
  description,
  isAddCategory,
  myid,
  name,
  price,
  saveHandler,
  setisAddSubCategory,
  updateHandler,
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [categoryItem, setCategoryItem] = useState({
    name,
    price,
    description,
  });

  useEffect(() => {
    setIsEdit(isAddCategory);
  }, [isAddCategory]);

  const SubCategorySchema = yup.object().shape({
    name: yup
      .string()
      // eslint-disable-next-line
      .matches(/^[^~`!@#%\^&*+_=]+$/, "*Title invalid")
      .min(2, "*Title must be at least 2 characters")
      .max(80, "*Title must be less than 80 characters")
      .required("*Title is required"),
    price: yup
      .string()
      .matches(/^[0-9]*$/, "*Price invalid")
      .required("*Price is required"),
    description: yup
      .string()
      .min(2, "*Description must be at least 2 characters")
      .max(200, "*Description must be less than 200 characters"),
  });

  return (
    <S.Category>
      <div className="s-width">
        {!isEdit ? (
          <div className="gray-bg gridish">
            <div className="gridish-left">
              <div className="left">
                <p className="bold text">{name}</p>
                <p className="gray text">{description}</p>
              </div>
              <div className="mid flex flex-wrap j-btw">
                <p className="text gray">Default for technician</p>

                <TextInput
                  disabled
                  // eslint-disable-next-line
                  value={"$" + price}
                />
              </div>
            </div>
            <div className="right flex flex-end ">
              <ImageButton
                img={editIcon}
                onClick={() => {
                  setIsEdit(!isEdit);
                  // setisAddSubCategory(!isAddCategory);
                }}
              />
              <ImageButton
                img={deleteIcon}
                onClick={() => deleteHandler(myid)}
              />
            </div>
          </div>
        ) : (
          <Formik
            key={0}
            // eslint-disable-next-line
            initialValues={{
              name: categoryItem.name,
              price: categoryItem.price,
              description: categoryItem.description,
            }}
            //  eslint-disable-next-line
            onSubmit={async ({ name, price, description }) => {
              setCategoryItem({ name, price, description });
              if (isEdit && !isAddCategory) {
                updateHandler({ name, price, description }, myid);
                setIsEdit(false);
              } else {
                saveHandler({ name, price, description });
                setisAddSubCategory(false);
              }
            }}
            validateOnChange={false}
            //  eslint-disable-next-line
            validateOnBlur={false}
            validationSchema={SubCategorySchema}
          >
            {({
              errors,
              handleChange,
              setFieldValue,
              handleSubmit,
              // isSubmitting,
              // eslint-disable-next-line
              touched,
              values,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <div className="gray-bg ">
                  <div className="gridish">
                    <div className="gridish-left">
                      <div className="flex">
                        {/* {!errors.name && ( */}
                        <p className="gray text mr">Item Title</p>
                        {/* )} */}
                        <div className="w-50">
                          <TextInput
                            error={errors.name}
                            maxLength={80}
                            name="name"
                            onChange={handleChange("name")}
                            value={values.name}
                          />
                        </div>
                      </div>

                      <div className="flex">
                        {/* {!errors.price && ( */}
                        <p className="text gray mr">Default for technician</p>
                        {/* )} */}
                        <div className="w-50">
                          <CurrencyFormatInput
                            error={errors.price}
                            name="price"
                            onChange={handleChange("price")}
                            type="input"
                            onValueChange={(opt) => {
                              const { value } = opt;
                              setFieldValue("price", value);
                            }}
                            value={values.price}
                          />
                          {/* <TextInput
                            error={errors.price}
                            name="price"
                            onChange={handleChange("price")}
                            type="number"
                            value={values.price}
                          /> */}
                        </div>
                      </div>
                    </div>
                    <div className="right flex flex-end ">
                      {isEdit ? "" : <img alt="delete" src={deleteIcon} />}
                    </div>
                  </div>

                  <div className="descr gridish mt-15">
                    <div className="left flex">
                      <p className="gray text mr">Description</p>
                      <div className="width-100">
                        <TextInput
                          maxLength={200}
                          error={errors.description}
                          name="description"
                          onChange={handleChange("description")}
                          value={values.description}
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
                        if (isAddCategory) setisAddSubCategory(!isAddCategory);
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
          </Formik>
        )}
      </div>
    </S.Category>
  );
}

Row.propTypes = {
  deleteHandler: PropTypes.func,
  description: PropTypes.string,
  isAddCategory: PropTypes.bool,
  myid: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  saveHandler: PropTypes.func,
  setisAddSubCategory: PropTypes.func,
  updateHandler: PropTypes.func,
};
