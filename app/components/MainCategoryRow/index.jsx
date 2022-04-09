import React, { useState } from "react";
import PropTypes from "prop-types";
import * as yup from "yup";
import { Formik } from "formik";

import plusDark from "@/assets/images/plus-dark.svg";
import editIcon from "@/assets/images/edit.svg";
import deleteIcon from "@/assets/images/delete.svg";
import ImageButton from "@/components/ImageButton";
import TextInput from "@/components/Input";
import Button from "@/components/Button";

import SubCategoryRow from "../SubCategoryRow";
import CurrencyFormatInput from "../Input/formatCurrency";

import * as S from "./styled";

export default function MainCategoryRow({
  cancelHandler,
  deleteHandler,
  isAddCategory,
  item,
  saveHandler,
  setIsAddCategory,
  title,
  updateHandler,
}) {
  const [isEdit, setisEdit] = useState(false);
  const [isAddSubCategory, setisAddSubCategory] = useState(false);

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
      // match only number
      .matches(/^[0-9]*$/, "*Price invalid")
      .required("*Price is required"),
    description: yup
      .string()
      .min(2, "*Description must be at least 2 characters")
      .max(200, "*Description must be less than 200 characters"),
  });

  const categoryChild = () => (
    <>
      {isAddSubCategory && (
        <SubCategoryRow
          id={item._id}
          isAddCategory={isAddSubCategory}
          saveHandler={saveHandler}
          setisAddSubCategory={setisAddSubCategory}
        />
      )}
      {item?.child?.map(({ _id, description, name, price }) => (
        <SubCategoryRow
          key={_id}
          deleteHandler={deleteHandler}
          description={description}
          id={item._id}
          myid={_id}
          name={name}
          price={price}
          saveHandler={saveHandler}
          updateHandler={updateHandler}
          setisAddSubCategory={() => {}}
        />
      ))}
    </>
  );

  function expandBox() {
    return (
      <Formik
        // eslint-disable-next-line
        initialValues={{
          name: item.name,
          price: item.price,
          description: item.description,
        }}
        //  eslint-disable-next-line
        onSubmit={async ({ name, price, description }) => {
          if (isEdit) {
            updateHandler({ name, price, description }, item._id);
            setisEdit(false);
          } else {
            saveHandler({ name, price, description });
            setisAddSubCategory(false);
            setIsAddCategory(false);
          }
        }}
        //  eslint-disable-next-line
        // validateOnMount={backCount <= 0 ? true : false}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={SubCategorySchema}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          // isSubmitting,
          // eslint-disable-next-line
          touched,
          setFieldValue,
          values,
          /* and other goodies */
        }) => (
          <S.Category>
            {console.log(values)}
            <form onSubmit={handleSubmit}>
              <div className="gray-bg ">
                <div className="gridish">
                  <div className="gridish-left">
                    <div className=" flex">
                      <p className="gray text mr">Item Title</p>
                      <div className="w-50">
                        <TextInput
                          error={errors.name}
                          name="name"
                          onChange={handleChange("name")}
                          value={values.name}
                          maxLength={80}
                        />
                      </div>
                    </div>

                    <div className=" flex ">
                      <p className="text gray mr">Default for technician</p>
                      <div className="w-50">
                        <CurrencyFormatInput
                          error={errors.price}
                          name="price"
                          type="input"
                          onBlur={handleBlur("price")}
                          onChange={handleChange("price")}
                          onValueChange={(opt) => {
                            setFieldValue("price", opt.value);
                          }}
                          value={values.price}
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
                        maxLength={200}
                        error={errors.description}
                        name="description"
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
                      cancelHandler();
                      setisEdit(false);
                    }}
                    type="button"
                  >
                    Cancel
                  </button>
                  <Button
                    size="xsmall"
                    type="submit"
                    value={isEdit ? "Update" : "Save"}
                  />
                </div>
              </div>
              {categoryChild()}
            </form>
          </S.Category>
        )}
      </Formik>
    );
  }

  if (isEdit) {
    return expandBox();
  }
  if (isAddCategory) {
    return expandBox();
  }

  return (
    <>
      <S.Category>
        <div className="gray-bg flex j-btw">
          <div className="left">
            <p className="bold text">{title}</p>
            <p className="gray text">{item.description}</p>
          </div>
          <div className="main-category-price-row">
            <div>
              <p className="text gray">Default for technician</p>
            </div>
            <div>
              <TextInput
                disabled
                // eslint-disable-next-line
                value={"$" + item.price}
              />
            </div>
          </div>
          <div className="right flex flex-end">
            <button
              className="mr"
              onClick={() => setisAddSubCategory(true)}
              type="button"
            >
              <img alt="plus-dark" src={plusDark} />
              <span>Add Item</span>
            </button>
            <ImageButton
              img={editIcon}
              onClick={() => {
                setisEdit(true);
              }}
            />
            <ImageButton
              img={deleteIcon}
              onClick={() => deleteHandler(item._id)}
            />
          </div>
        </div>
      </S.Category>
      {categoryChild()}
    </>
  );
}

MainCategoryRow.propTypes = {
  cancelHandler: PropTypes.func,
  deleteHandler: PropTypes.func,
  description: PropTypes.string,
  isAddCategory: PropTypes.bool,
  item: PropTypes.shape({
    _id: PropTypes.number,
    child: PropTypes.arrayOf({
      _id: PropTypes.number,
      description: PropTypes.string,
      name: PropTypes.string,
      price: PropTypes.string,
    }),
    description: PropTypes.string,
    name: PropTypes.string,
    price: PropTypes.string,
  }),
  saveHandler: PropTypes.func,
  setIsAddCategory: PropTypes.func,
  title: PropTypes.string,
  updateHandler: PropTypes.func,
};
