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

export default function AddOnsCard({
  deleteHandler,
  description,
  id,
  isAddCategory,
  myid,
  name,
  price,
  saveHandler,
  setisAddSubCategory,
  type,
  updateHandler,
}) {
  const [isEdit, setIsEdit] = useState(false);

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
      // eslint-disable-next-line
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
                {/*           eslint-disable-next-line */}
                <TextInput
                  disabled
                  value={`${
                    price
                      ? (type !== "add_ons" ? "$" : "") +
                        price +
                        (type === "add_ons" ? "%" : "")
                      : 0
                  }`}
                />
              </div>
            </div>
            <div className="right flex flex-end ">
              <ImageButton
                img={editIcon}
                onClick={() => {
                  setIsEdit(!isEdit);
                  // setCategoryItem({ name, _id: id, description, price });
                  setisAddSubCategory(!isAddCategory);
                }}
              />
              <ImageButton
                img={deleteIcon}
                onClick={() => deleteHandler({ id: myid, type })}
              />
            </div>
          </div>
        ) : (
          <Formik
            // eslint-disable-next-line
            initialValues={{
              name,
              price,
              description,
              _id: id,
            }}
            //  eslint-disable-next-line
            onSubmit={async ({ name, price, description }) => {
              if (isEdit && !isAddCategory) {
                updateHandler({
                  name,
                  price,
                  description,
                  _id: myid,
                  parent: id,
                  type,
                });
                setIsEdit(false);
              } else {
                console.log("post", {
                  name,
                  price,
                  description,
                  parent: id,
                  type,
                });
                saveHandler({ name, price, description, parent: id, type });
                setisAddSubCategory(false);
              }
            }}
            //  eslint-disable-next-line
            validationSchema={SubCategorySchema}
            validateOnMount={false}
            validateOnBlur={false}
            validateOnChange={false}
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
              <form onSubmit={handleSubmit}>
                <div className="gray-bg ">
                  <div className="gridish">
                    <div className="gridish-left">
                      <div className="left flex">
                        {/* {!errors.name && ( */}
                        <p className="gray text mr">Item Title</p>
                        {/* )} */}
                        <div className="w-50">
                          <TextInput
                            error={errors.name}
                            maxLength={80}
                            name="name"
                            onBlur={handleBlur("name")}
                            onChange={handleChange("name")}
                            value={values.name}
                          />
                        </div>
                      </div>

                      <div className="mid flex flex-wrap j-btw">
                        <p className="text gray">Default for technician</p>
                        <div className="w-50">
                          <CurrencyFormatInput
                            error={errors.price}
                            name="price"
                            onBlur={handleBlur("price")}
                            onChange={handleChange("price")}
                            type="input"
                            prefix={type === "add_ons" ? " " : "$"}
                            suffix={type === "add_ons" ? "%" : ""}
                            value={values.price}
                            onValueChange={(opt) => {
                              const { value: val } = opt;
                              setFieldValue("price", val);
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="descr gridish mt-15">
                    <div className="left flex">
                      <p className="gray text mr">Description</p>
                      <div className="width-100">
                        <TextInput
                          error={errors.description}
                          name="description"
                          maxLength={200}
                          onBlur={handleBlur("description")}
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
          </Formik>
        )}
      </div>
    </S.Category>
  );
}

AddOnsCard.propTypes = {
  deleteHandler: PropTypes.func,
  description: PropTypes.string,
  id: PropTypes.string,
  isAddCategory: PropTypes.bool,
  myid: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.number,
  saveHandler: PropTypes.func,
  setisAddSubCategory: PropTypes.func,
  type: PropTypes.string,
  updateHandler: PropTypes.func,
};
