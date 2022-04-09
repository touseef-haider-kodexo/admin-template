/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useQuery } from "react-query";
import TextArea from "antd/lib/input/TextArea";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import { withStyles } from "@material-ui/core/styles";

import * as S from "./styled";

import TextInput from "@/components/Input";
import * as T from "@/containers/PageTechnicians/styled";
import AppService from "@/services/api/app-service";
import CheckboxInput from "@/components/Input/CheckboxInput";
import accordUp from "@/assets/images/accordUp.svg";
import accordDown from "@/assets/images/accordDown.svg";
import { baseImageURL } from "@/utils/axios";

function TabPanel(props) {
  const { children, index, value, ...other } = props;

  return (
    <div
      aria-labelledby={`simple-tab-${index}`}
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Accordion = withStyles({
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

// eslint-disable-next-line
function TechnicianReviewModal({
  name,
  business_name,
  business_logo,
  profile_image,
  phone,
  website,
  email,
  technician_category,
  additional_claim,
  technician_misc_categories,
  locations,
}) {
  const [value, setValue] = useState(0);
  const [expand, setExpand] = useState([]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const { data: categories, refetch: fetchCategories } = useQuery(
    "getCategory",
    () => AppService.getCategoryWithChilds(),
    {
      enabled: false,
    },
  ) || { data: [] };

  const { data: additionalClaimItems, refetch: fetchAdditinalClaimItems } =
    useQuery("getAdditinalClaimItem", () => AppService.getAdditinalClaimItem());

  useEffect(() => {
    fetchCategories();
    fetchAdditinalClaimItems();
  }, []);

  // eslint-disable-next-line
  useEffect(() => {
    const temp = [];
    // eslint-disable-next-line no-restricted-syntax
    categories?.result?.forEach(() => {
      temp.push({ expand: true });
    });
    setExpand(temp);
  }, [categories]);

  const showAddTab =
    Array.isArray(additionalClaimItems) &&
    additionalClaimItems?.find((act) =>
      additional_claim?.find((category) => act?._id === category?.category),
    );

  return (
    <S.TechnicianReviewModal>
      <T.SingleTechnician>
        <h1 className="company-name">{business_name}</h1>
        <div className="tab-head">
          <Tabs
            aria-label="simple tabs example"
            onChange={handleChange}
            value={value}
          >
            <Tab className="br" label="Technician Info" {...a11yProps(0)} />
            <Tab
              className="br mid-tab"
              label="Categories & Pricing"
              {...a11yProps(1)}
            />
            <Tab label="Notes" {...a11yProps(2)} />
          </Tabs>
        </div>
        <TabPanel index={0} value={value}>
          <div className="item1">
            <div className="images-modal">
              {business_logo ? (
                <img
                  height="100px"
                  width="100px"
                  alt="company Logo"
                  src={`${baseImageURL}${business_logo}`}
                />
              ) : (
                <div className="img-circle">
                  {String(business_name).charAt(0)}
                </div>
              )}
              {profile_image ? (
                <img
                  height="100px"
                  width="100px"
                  alt="man's face"
                  src={`${baseImageURL}${profile_image}`}
                />
              ) : (
                <div className="img-circle">{String(name).charAt(0)}</div>
              )}
            </div>
            <div className="grid grid-fields">
              <div className="field">
                <TextInput label="Company Name" value={business_name} />
              </div>
              <div className="field">
                <TextInput label="Primary Contact Name" value={name} />
              </div>
              <div className="field">
                <TextInput
                  label="Company Address"
                  value={locations?.business_address_one}
                />
              </div>
              <div className="field">
                <TextInput label="Apt/Suite" value={locations?.apt_suite} />
              </div>
              <div className="field">
                <TextInput
                  label="Dent Doc Claim Number"
                  value={locations?.business_city}
                />
              </div>
              <div className="sgrid field">
                <TextInput label="State" value={locations?.business_state} />
                <TextInput
                  label="ZiP Code"
                  type="number"
                  value={locations?.business_zip_code}
                />
              </div>
              <div className="field">
                <TextInput label="Company Phone" type="number" value={phone} />
              </div>
              <div className="field">
                <TextInput
                  label="Primary Contact Phone"
                  type="number"
                  value={locations?.business_phone}
                />
              </div>
              <div className="field">
                <TextInput label="Email" type="email" value={email} />
              </div>
              <div className="field">
                <TextInput label="Company Webiste" value={website} />
              </div>
            </div>
          </div>
        </TabPanel>
        <TabPanel index={1} value={value}>
          <T.CustomizedAccordions>
            <div style={{ maxWidth: "90%", marginTop: 20 }}>
              {showAddTab && (
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
                      additionalClaimItems?.forEach((act) => {
                        const child = additional_claim?.find(
                          (category) => act?._id === category?.category,
                        );
                        if (child !== undefined) {
                          return (
                            <div
                              key={act?._id}
                              className="ml-20 mb-15 grid-short"
                            >
                              <CheckboxInput
                                checked={Boolean(true)}
                                label={act.name}
                                name={act.name}
                              />
                              <div className="ml-40">
                                <TextInput
                                  helper={
                                    <p className="helper">
                                      {`Default cost ${act.price}.00`}
                                    </p>
                                  }
                                  type="number"
                                  label="Cost"
                                  value={child.technician_price}
                                />
                              </div>
                            </div>
                          );
                        }
                      })}
                  </AccordionDetails>
                </Accordion>
              )}
              {
                // eslint-disable-next-line
                Array.isArray(categories?.result) &&
                  categories?.result?.map((val, ind) => {
                    if (
                      technician_category?.find(
                        (i) => val?._id === i?.category,
                      ) !== undefined
                    ) {
                      return (
                        <Accordion
                          // eslint-disable-next-line
                          key={val?._id}
                          expanded={expand?.length > 0 && expand[ind]?.expand}
                          onChange={() => {
                            const temp = [...expand];
                            // eslint-disable-next-line
                            temp[ind]["expand"] = !temp[ind]["expand"];
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
                                  checked={Boolean(true)}
                                  name={val?.name}
                                />
                                <p className="text">{val?.name}</p>
                              </div>
                              {/*  eslint-disable-next-line */}
                              {expand.length > 0 && expand[ind]["expand"] ? (
                                <img alt="accordUp" src={accordUp} />
                              ) : (
                                <img alt="accordDown" src={accordDown} />
                              )}
                            </div>
                          </AccordionSummary>
                          <AccordionDetails>
                            <>
                              {expand.length > 0 &&
                                // eslint-disable-next-line
                                expand[ind]["expand"] &&
                                val?.child?.map((child) => {
                                  const child2 = technician_category.find(
                                    (category) =>
                                      child?._id === category?.category,
                                  );
                                  if (child2 !== undefined) {
                                    return (
                                      <div key={child?._id} className="ml-20">
                                        <div className="mb-15">
                                          <div className=" mb-15 grid-short">
                                            <CheckboxInput
                                              checked={Boolean(true)}
                                              label={child.name}
                                              name={child.name}
                                            />
                                            <TextInput
                                              helper={
                                                <p className="helper">
                                                  {`Default cost ${
                                                    child.price || 0
                                                  }.00`}
                                                </p>
                                              }
                                              label="Cost"
                                              disabled={Boolean(true)}
                                              value={child2.technician_price}
                                            />
                                          </div>
                                          {expand.length > 0 &&
                                            // eslint-disable-next-line
                                            expand[ind]["expand"] &&
                                            child?.child?.forEach((val3) => {
                                              const child3 =
                                                technician_category.find(
                                                  (category) =>
                                                    val3?._id ===
                                                    category?.category,
                                                );

                                              if (child3 !== undefined) {
                                                return (
                                                  <div
                                                    key={val3?._id}
                                                    className="ml-20 mb-15 grid-short"
                                                  >
                                                    <CheckboxInput
                                                      checked={Boolean(true)}
                                                      label={val3.name}
                                                      name={val3.name}
                                                    />
                                                    <div className="ml-40">
                                                      {expand.length > 0 &&
                                                        // eslint-disable-next-line
                                                        expand[ind][
                                                          "expand"
                                                        ] && (
                                                          <TextInput
                                                            helper={
                                                              <p className="helper">
                                                                {`Default cost ${
                                                                  val3.price ||
                                                                  0
                                                                }.00`}
                                                              </p>
                                                            }
                                                            defaultValue={Boolean(
                                                              true,
                                                            )}
                                                            disabled={Boolean(
                                                              true,
                                                            )}
                                                            type="number"
                                                            label="Cost"
                                                            value={
                                                              child3.technician_price
                                                            }
                                                          />
                                                        )}
                                                    </div>
                                                  </div>
                                                );
                                              }
                                            })}
                                        </div>
                                      </div>
                                    );
                                  }
                                })}
                              <div className="mb-15">
                                {val?.r_and_i?.find((add_ons) =>
                                  technician_misc_categories?.find(
                                    (one) =>
                                      add_ons?._id ===
                                      one?.misc_category_id?._id,
                                  ),
                                ) && (
                                  <div className="ml-30 trigger">
                                    <p className="text">R&I</p>
                                  </div>
                                )}
                                {val?.r_and_i?.map((add_ons) => {
                                  const r = technician_misc_categories?.find(
                                    (one) =>
                                      add_ons?._id === one?.misc_category_id,
                                  );
                                  if (r !== undefined)
                                    return (
                                      <div
                                        key={add_ons?._id}
                                        className="ml-20 mb-15 grid-short"
                                      >
                                        <CheckboxInput
                                          checked={Boolean(true)}
                                          label={add_ons.name}
                                          name={add_ons.name}
                                        />
                                        <div className="ml-40">
                                          <TextInput
                                            helper={
                                              <p className="helper">
                                                {`Default cost ${add_ons.price}.00`}
                                              </p>
                                            }
                                            type="number"
                                            label="Cost"
                                            value={r.technician_price}
                                          />
                                        </div>
                                      </div>
                                    );
                                })}
                              </div>
                              <div className="mb-15">
                                {
                                  // eslint-disable-next-line
                                  val?.add_ons?.find((add_ons) =>
                                    technician_misc_categories?.find(
                                      (one) =>
                                        add_ons?._id === one?.misc_category_id,
                                    ),
                                  ) && (
                                    <div className="ml-30 trigger">
                                      <p className="text">Add_ons</p>
                                    </div>
                                  )
                                }
                                {val?.add_ons?.map((add_ons) => {
                                  const r = technician_misc_categories?.find(
                                    (one) =>
                                      add_ons?._id === one?.misc_category_id,
                                  );
                                  if (r !== undefined)
                                    return (
                                      <div
                                        key={add_ons?._id}
                                        className="ml-20 mb-15 grid-short"
                                      >
                                        <CheckboxInput
                                          checked={Boolean(true)}
                                          label={add_ons.name}
                                          name={add_ons.name}
                                        />
                                        <div className="ml-40">
                                          <TextInput
                                            helper={
                                              <p className="helper">
                                                {`Default cost ${add_ons.price}.00%`}
                                              </p>
                                            }
                                            type="number"
                                            label="Cost"
                                            value={r.technician_price}
                                          />
                                        </div>
                                      </div>
                                    );
                                })}
                              </div>
                            </>
                          </AccordionDetails>
                        </Accordion>
                      );
                    }
                  })
              }
            </div>
          </T.CustomizedAccordions>
        </TabPanel>
        <TabPanel index={2} value={value}>
          <div className="m-t-10">
            <TextArea
              label="Note"
              name="note"
              value={locations?.personal_notes?.note}
              disabled
            />
          </div>
        </TabPanel>
      </T.SingleTechnician>
    </S.TechnicianReviewModal>
  );
}

TechnicianReviewModal.propTypes = {
  technician_category: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  business_name: PropTypes.string,
  phone: PropTypes.string,
  email: PropTypes.string,
  address: PropTypes.string,
  ratings: PropTypes.string,
  claim_location: PropTypes.string,
  location: PropTypes.string,
  business_phone: PropTypes.string,
  business_email: PropTypes.string,
  business_logo: PropTypes.string,
  business_image: PropTypes.string,
  business_address: PropTypes.string,
  website: PropTypes.string,
  categories: PropTypes.objectOf(),
  radius_of_services: PropTypes.string,
  _id: PropTypes.string,
  setSelectedTech: PropTypes.func,
  has_shop: PropTypes.bool,
  agreement_signed: PropTypes.bool,
  personal_notes: PropTypes.objectOf(
    PropTypes.shape({
      note: PropTypes.string,
    }),
  ),
  locations: PropTypes.shape({
    location: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
    personal_notes: PropTypes.shape({
      note: PropTypes.number,
    }),
    _id: PropTypes.string,
    business_address_one: PropTypes.string,
    apt_suite: PropTypes.string,
    business_city: PropTypes.string,
    business_state: PropTypes.string,
    business_zip_code: PropTypes.number,
    business_phone: PropTypes.number,
  }),
};

TechnicianReviewModal.defaultProps = {
  technician_category: [],
  name: "",
  business_name: "",
  phone: "",
  email: "",
  address: "",
  ratings: "",
  claim_location: "",
  location: "",
  business_phone: "",
  business_email: "",
  business_address: "",
  website: "",

  categories: {},
  radius_of_services: "",
  _id: "",
  setSelectedTech: () => {},
  has_shop: false,
  agreement_signed: false,
  personal_notes: {},
};

TechnicianReviewModal.propTypes = {
  setSelectedTech: PropTypes.func,
  has_shop: PropTypes.bool,
  profile_image: PropTypes.string,
  additional_claim: PropTypes.arrayOf(PropTypes.object),
  technician_misc_categories: PropTypes.arrayOf(PropTypes.object),
  technician_category: PropTypes.arrayOf(PropTypes.object),
  agreement_signed: PropTypes.bool,
  personal_notes: PropTypes.objectOf(
    PropTypes.shape({
      note: PropTypes.string,
    }),
  ),
  locations: PropTypes.shape({
    location: PropTypes.shape({
      type: PropTypes.string,
      coordinates: PropTypes.arrayOf(PropTypes.number),
    }),
    _id: PropTypes.string,
    business_address_one: PropTypes.string,
    apt_suite: PropTypes.string,
    business_city: PropTypes.string,
    business_state: PropTypes.string,
    business_zip_code: PropTypes.number,
    business_phone: PropTypes.number,
  }),
};

export default TechnicianReviewModal;
