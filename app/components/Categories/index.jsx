/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import MuiAccordion from "@material-ui/core/Accordion";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";

import * as D from "../Tabset/styled";
import CheckboxInput from "../Input/CheckboxInput";
import CurrencyFormatInput from "../Input/formatCurrency";
import Button from "../Button";

import AppService from "@/services/api/app-service";
import accordUp from "@/assets/images/accordUp.svg";
import accordDown from "@/assets/images/accordDown.svg";

export const Accordion = withStyles({
  root: {
    borderRadius: "10px",

    borderColor: "white",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    margin: "10px",

    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
      borderColor: "white",
    },
    "&$expanded": {
      borderRadius: "10px",
      borderColor: "white",
      boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    },
  },
  expanded: {},
})(MuiAccordion);

export const AccordionSummary = withStyles({
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

export const AccordionDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiAccordionDetails);

const Categories = ({
  technician_category,
  additional_claim,
  submitCategory,
  isEdit,
  price_name,
  misc_categories,
}) => {
  const [expand, setExpand] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(technician_category);
  const [selectedAdditionalClaim, setSelectedAdditionalClaim] =
    useState(additional_claim);
  const [selectedMiscCat, setSelectedMiscCat] = useState(misc_categories);

  const { data: categories, refetch: fetchCategories } = useQuery(
    "getCategoryWithChilds",
    () => AppService.getCategoryWithChilds(),
    {
      onSuccess: (data) => {
        let temp = [...selectedCategory];
        let miscTemp = [...selectedMiscCat];
        data?.result?.map((item) => {
          const index = temp.findIndex((one) => one.category === item?._id);
          if (index === -1) {
          } else {
            item?.child.forEach((val) => {
              val.child.forEach((val3) => {
                const i3 = temp.findIndex((a) => a.category === val3._id);
                if (i3 !== -1) {
                  // temp.splice(i3, 1)
                  temp[i3] = {
                    ...temp[i3],
                    checked: true,
                  };
                }
              });
            });
            item?.child.forEach((val2) => {
              const i4 = temp.findIndex((a) => a.category === val2._id);
              if (i4 !== -1) {
                // temp.splice(i4, 1)
                temp[i4] = {
                  ...temp[i4],
                  checked: true,
                };
              }
            });
            item?.add_ons.forEach((add_on) => {
              const i5 = miscTemp?.findIndex(
                (a) => a.misc_category_id === add_on._id,
              );
              if (i5 !== -1) {
                // temp.splice(i5, 1)
                miscTemp[i5] = {
                  ...miscTemp[i5],
                  checked: true,
                };
              }
            });
            item?.r_and_i.forEach((rni) => {
              const i6 = miscTemp?.findIndex(
                (a) => a.misc_category_id === rni._id,
              );
              if (i6 !== -1) {
                // temp.splice(i5, 1)
                miscTemp[i6] = {
                  ...miscTemp[i6],
                  checked: true,
                };
              }
            });

            temp[index] = {
              ...temp[index],
              checked: true,
            };
          }
        });
        setSelectedCategory(temp);
        setSelectedMiscCat(miscTemp);
      },
      enabled: false,
    },
  );

  console.log("selectCategory", selectedCategory);
  console.log("selectedMiscCat", selectedAdditionalClaim);

  const { data: additionalClaimItems, refetch: fetchAdditinalClaimItems } =
    useQuery(
      "getAdditinalClaimItem",
      () => AppService.getAdditinalClaimItem(),
      {
        onSuccess: (data) => {
          let cat = [...selectedAdditionalClaim];
          data?.map(({ _id }) => {
            let index = cat?.findIndex((item) => item?.category === _id);
            if (index !== -1) {
              cat[index] = { ...cat[index], checked: true };
            }
          });

          setSelectedAdditionalClaim(cat);
        },
        enabled: false,
      },
    );

  // get
  useEffect(() => {
    fetchCategories();
    fetchAdditinalClaimItems();
  }, []);

  useEffect(() => {
    const temp =
      Array.isArray(categories?.result) &&
      categories?.result.map(() => ({ expand: false }));
    setExpand(temp);
  }, [categories]);

  const selectCategory = (e, selectedId, parent, ind, child) => {
    const expTemp = [...expand];
    expTemp[ind].expand = true;
    const temp = [...selectedCategory];
    setExpand(expTemp);
    const index = temp.findIndex((one) => one.category === selectedId);
    if (index !== -1) {
      child.forEach((val) => {
        val.child.forEach((val3) => {
          const i3 = temp.findIndex((a) => a.category === val3._id);
          if (i3 !== -1) {
            // temp.splice(i3, 1)
            temp[i3] = {
              ...temp[i3],
              checked: e.target.checked,
            };
          }
        });
      });
      child.forEach((val2) => {
        const i4 = temp.findIndex((a) => a.category === val2._id);
        if (i4 !== -1) {
          // temp.splice(i4, 1)
          temp[i4] = {
            ...temp[i4],
            checked: e.target.checked,
          };
        }
      });

      // temp.splice(index, 1);
      temp[index] = {
        ...temp[index],
        checked: e.target.checked,
      };
    } else {
      temp.push({ category: selectedId, parent, checked: e.target.checked });
    }
    setSelectedCategory(temp);
  };

  const selectChildCategory = (e, cId, parent, child) => {
    const temp = [...selectedCategory];
    const index = temp.findIndex((one) => one.category === cId);
    if (index !== -1) {
      child.forEach((val) => {
        const i = temp.findIndex((a) => a.category === val._id);
        if (i !== -1) {
          // temp.splice(i, 1)
          temp[i] = {
            ...temp[i],
            checked: e.target.checked,
          };
        }
      });
      // temp.splice(index, 1);
      temp[index] = {
        ...temp[index],
        checked: e.target.checked,
      };
    } else {
      temp.push({ category: cId, parent, checked: e.target.checked });
    }
    setSelectedCategory(temp);
  };

  const selectChildChildCategory = (e, threeId, parent) => {
    const temp = [...selectedCategory];
    const index = temp.findIndex((one) => one.category === threeId);
    if (index !== -1) {
      // temp.splice(index, 1);
      temp[index] = {
        ...temp[index],
        checked: e.target.checked,
      };
    } else {
      temp.push({
        category: threeId,
        parent,
        [price_name]: "",
        checked: e.target.checked,
      });
    }
    setSelectedCategory(temp);
  };

  const setAmountInCategorychild = (price, id) => {
    const temp = [...selectedCategory];
    const i = selectedCategory.findIndex((one) => one?.category === id);
    temp[i][price_name] = price;
    setSelectedCategory(temp);
  };

  const returnAmountOfCategoryChild = (id) => {
    const i = selectedCategory.findIndex((one) => one?.category === id);
    return selectedCategory[i]?.[price_name] || "";
  };

  const generateSelectedCategory = () => {
    const temp = [...selectedCategory];
    return temp.filter((one) => {
      if (one.parent === null) {
        let check = true;
        const index = categories?.result?.findIndex(
          (two) => one.category === two._id,
        );
        categories?.result[index]?.child.filter((three) =>
          // eslint-disable-next-line no-loop-func
          temp.find((four) => {
            if (three._id === four.category) {
              check = false;
            }
            // return four;
            // console.log(four?.category);
          }),
        );
        if (check) {
          let anotherChecker = true;
          categories?.result[index]?.r_and_i.filter((three) =>
            // eslint-disable-next-line no-loop-func
            selectedMiscCat.find((four) => {
              if (three._id === four.misc_category_id) {
                anotherChecker = false;
              }
              console.log(four);
              // return four;
            }),
          );
          categories?.result[index]?.add_ons.filter((three) =>
            // eslint-disable-next-line no-loop-func
            selectedMiscCat.find((four) => {
              if (three._id === four.misc_category_id) {
                anotherChecker = false;
              }
              // return four;
            }),
          );
          if (anotherChecker) return false;
          else {
            return true;
          }
        } else {
          return true;
        }
      }
      return true;
    });
  };

  // FOR ADDTIONAL CLAIM

  const selectAdditonalClaim = (e, threeId) => {
    const temp = [...selectedAdditionalClaim];
    const index = temp.findIndex((one) => one.category === threeId);
    if (index !== -1) {
      // temp.splice(index, 1);
      temp[index] = {
        ...temp[index],
        checked: e.target.checked,
      };
    } else {
      temp.push({
        category: threeId,
        [price_name]: "",
        checked: e.target.checked,
      });
    }
    setSelectedAdditionalClaim(temp);
  };

  const setAmountInAdditonalClaim = (price, id) => {
    const temp = [...selectedAdditionalClaim];
    const i = selectedAdditionalClaim.findIndex((one) => one?.category === id);
    temp[i][price_name] = price;
    setSelectedAdditionalClaim(temp);
  };

  // FOR MISC CATEGORY

  const selectMiscCat = (e, threeId, parent) => {
    const temp = [...selectedMiscCat];
    const index = temp.findIndex((one) => one.misc_category_id === threeId);
    if (index !== -1) {
      // temp.splice(index, 1);
      temp[index] = {
        ...temp[index],
        checked: e.target.checked,
      };
    } else {
      temp.push({
        misc_category_id: threeId,
        [price_name]: "",
        parent,
        checked: e.target.checked,
      });
    }
    setSelectedMiscCat(temp);
  };

  const setAmountInMiscCat = (price, id) => {
    const temp = [...selectedMiscCat];
    const i = selectedMiscCat.findIndex((one) => one?.misc_category_id === id);
    temp[i][price_name] = price;
    setSelectedMiscCat(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitCategory(
      generateSelectedCategory(),
      selectedAdditionalClaim,
      selectedMiscCat,
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <D.CustomizedAccordions border="hide">
        <div style={{ maxWidth: "90%" }}>
          <div
            style={{
              display: `${categories?.result?.length <= 0 ? "none" : "block"}`,
            }}
          >
            <Button
              className="next-btn"
              onClick={handleSubmit}
              size="auto"
              //   type="submit"
              value={isEdit ? "Update" : "Submit"}
            />
          </div>
          <Accordion
            // expanded={}
            onChange={() => {}}
            square
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <div className="trigger flex j-btw">
                <div className="flex">
                  <p className="text">Additional Claim Items</p>
                </div>
                {true ? (
                  <img alt="accordUp" src={accordUp} />
                ) : (
                  <img alt="accordDown" src={accordDown} />
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {Array.isArray(additionalClaimItems) &&
                additionalClaimItems?.map((act) => {
                  const data = selectedAdditionalClaim?.find(
                    (one) => one.category === act._id,
                  );

                  return (
                    <div key={act?._id} className="ml-20 mb-15 grid-short">
                      <CheckboxInput
                        checked={data?.checked ?? false}
                        label={act.name}
                        name={act.name}
                        onChange={(e) => {
                          selectAdditonalClaim(e, act?._id);
                        }}
                      />
                      <div className="ml-40">
                        {data?.checked && (
                          <div>
                            <CurrencyFormatInput
                              name="price"
                              helper={
                                <p className="helper">
                                  {`Default cost ${act.price}.00`}
                                </p>
                              }
                              type="input"
                              label="Cost"
                              onChange={(amount) =>
                                setAmountInAdditonalClaim(
                                  amount.target.value,
                                  act._id,
                                )
                              }
                              onValueChange={(values) => {
                                const { value } = values;
                                setAmountInAdditonalClaim(value, act._id);
                              }}
                              value={data[price_name]}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
            </AccordionDetails>
          </Accordion>
          {Array.isArray(categories?.result) &&
            categories?.result?.map((val, ind) => (
              <Accordion
                key={val._id}
                expanded={expand?.length > 0 && expand[ind]?.expand}
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
                      <CheckboxInput
                        // label={val.name}
                        checked={
                          selectedCategory?.find(
                            (one) => one.category === val?._id,
                          )?.checked ?? false
                        }
                        name={val.name}
                        onChange={(e) =>
                          selectCategory(e, val._id, val.parent, ind, val.child)
                        }
                      />
                      <p className="text">{val.name}</p>
                    </div>
                    {expand.length > 0 && expand[ind].expand ? (
                      <img alt="accordUp" src={accordUp} />
                    ) : (
                      <img alt="accordDown" src={accordDown} />
                    )}
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  {selectedCategory?.find((one) => one.category === val?._id)
                    ?.checked && (
                    <>
                      {val?.child.map((child) => (
                        <div key={child._id} className="ml-20">
                          <div className="mb-15">
                            <div className=" mb-15 grid-short">
                              <CheckboxInput
                                checked={
                                  selectedCategory?.find(
                                    (one) => one.category === child?._id,
                                  )?.checked ?? false
                                }
                                label={child.name}
                                name={child.name}
                                onChange={(e) =>
                                  selectChildCategory(
                                    e,
                                    child._id,
                                    child.parent,
                                    child.child,
                                  )
                                }
                              />
                              {selectedCategory?.find(
                                (one) => one.category === child?._id,
                              )?.checked && (
                                <CurrencyFormatInput
                                  helper={
                                    <p className="helper">
                                      {`Default cost ${child.price}.00`}
                                    </p>
                                  }
                                  type="input"
                                  label="Cost"
                                  onChange={(amount) =>
                                    setAmountInCategorychild(
                                      amount.target.value,
                                      child._id,
                                    )
                                  }
                                  onValueChange={(values) => {
                                    setAmountInCategorychild(
                                      values.value,
                                      child._id,
                                    );
                                  }}
                                  value={returnAmountOfCategoryChild(child._id)}
                                />
                              )}
                            </div>
                            {selectedCategory?.find(
                              (one) => one.category === child?._id,
                            )?.checked &&
                              child?.child?.map((val3) => (
                                <div
                                  key={val3._id}
                                  className="ml-20 mb-15 grid-short"
                                >
                                  <CheckboxInput
                                    checked={
                                      selectedCategory?.find(
                                        (one) => one.category === val3._id,
                                      )?.checked ?? false
                                    }
                                    label={val3.name}
                                    name={val3.name}
                                    onChange={(e) =>
                                      selectChildChildCategory(
                                        e,
                                        val3._id,
                                        val3.parent,
                                      )
                                    }
                                  />
                                  <div className="ml-40">
                                    {selectedCategory?.find(
                                      (one) => one.category === val3._id,
                                    )?.checked && (
                                      <CurrencyFormatInput
                                        helper={
                                          <p className="helper">
                                            {`Default cost ${val3.price}.00`}
                                          </p>
                                        }
                                        type="input"
                                        label="Cost"
                                        onChange={(amount) =>
                                          setAmountInCategorychild(
                                            amount.target.value,
                                            val3._id,
                                          )
                                        }
                                        onValueChange={(values) => {
                                          setAmountInCategorychild(
                                            values.value,
                                            val3._id,
                                          );
                                        }}
                                        value={returnAmountOfCategoryChild(
                                          val3._id,
                                        )}
                                      />
                                    )}
                                  </div>
                                </div>
                              ))}
                          </div>
                        </div>
                      ))}
                      <div className="mb-15">
                        {val?.r_and_i.length > 0 && (
                          <div className="ml-30 trigger">
                            <p className="text">R&I</p>
                          </div>
                        )}
                        {val?.r_and_i?.map((add_ons) => {
                          const data = selectedMiscCat?.find(
                            (one) => one.misc_category_id === add_ons._id,
                          );
                          return (
                            <div
                              key={add_ons?._id}
                              className="ml-20 mb-15 grid-short"
                            >
                              <CheckboxInput
                                checked={data?.checked ?? false}
                                label={add_ons.name}
                                name={add_ons.name}
                                onChange={(e) =>
                                  selectMiscCat(e, add_ons._id, val._id)
                                }
                              />
                              <div className="ml-40">
                                {data?.checked && (
                                  <CurrencyFormatInput
                                    helper={
                                      <p className="helper">
                                        {`Default cost ${add_ons.price}.00`}
                                      </p>
                                    }
                                    type="input"
                                    label="Cost"
                                    onChange={(amount) =>
                                      setAmountInMiscCat(
                                        amount.target.value,
                                        add_ons._id,
                                      )
                                    }
                                    onValueChange={(values) => {
                                      setAmountInMiscCat(
                                        values.value,
                                        add_ons._id,
                                      );
                                    }}
                                    value={data[price_name]}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mb-15">
                        {val?.add_ons.length > 0 && (
                          <div className="ml-30 trigger">
                            <p className="text">Add-ons</p>
                          </div>
                        )}
                        {val?.add_ons?.map((add_ons) => {
                          const data = selectedMiscCat?.find(
                            (one) => one.misc_category_id === add_ons._id,
                          );
                          return (
                            <div
                              key={add_ons?._id}
                              className="ml-20 mb-15 grid-short"
                            >
                              <CheckboxInput
                                checked={data?.checked ?? false}
                                label={add_ons.name}
                                name={add_ons.name}
                                onChange={(e) =>
                                  selectMiscCat(e, add_ons._id, val._id)
                                }
                              />
                              <div className="ml-40">
                                {data?.checked && (
                                  <CurrencyFormatInput
                                    helper={
                                      <p className="helper">
                                        {`Default cost ${add_ons.price}.00%`}
                                      </p>
                                    }
                                    suffix="%"
                                    prefix=" "
                                    type="input"
                                    label="Cost"
                                    onChange={(amount) =>
                                      setAmountInMiscCat(
                                        amount.target.value,
                                        add_ons._id,
                                      )
                                    }
                                    onValueChange={(values) => {
                                      setAmountInMiscCat(
                                        values.value,
                                        add_ons._id,
                                      );
                                    }}
                                    value={data[price_name]}
                                  />
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
        </div>
      </D.CustomizedAccordions>
    </form>
  );
};

Categories.propTypes = {
  technician_category: PropTypes.objectOf(PropTypes.any).isRequired,
  submitCategory: PropTypes.func,
  isEdit: PropTypes.bool,
  price_name: PropTypes.string,
  misc_categories: PropTypes.objectOf(PropTypes.any).isRequired,
  additional_claim: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Categories;
