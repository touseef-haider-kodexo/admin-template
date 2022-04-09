/* eslint-disable */
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import * as yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";

import { ROLES } from "@/utils/constants";

import {
  add_vehicle_info,
  add_claim_info,
  add_personal_info,
} from "../../containers/PageClaims/actions";

import Button from "../Button";

import TabPanel2 from "./PersonalInfo";
import TabPanel4 from "./Damages";
import TabPanel6 from "./Review";
import * as S from "./styled";
import ClaimInfoView from "./View/ClaimInfo";
import PersonalInfoView from "./View/PersonalInfo";

function TabPanel(props) {
  const { children, index, value, ...other } = props;
  return (
    <div
      aria-labelledby={`scrollable-auto-tab-${index}`}
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      role="tabpanel"
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const infoSchema = {
  first_name: "",
  last_name: "",
  address: "",
  apt_suite: "",
  city: "",
  state: "",
  zip: "",
  phone: "",
  secondary_phone: "",
  email: "",
  secondary_email: "",
  d_name: "",
  d_service_advisor: "",
  d_phone: null,
  d_apt_suite: "",
  d_address: "",
  d_city: "",
  d_state: "",
  d_zip: "",
};

export default function MemberTabset({ claim }) {
  const [index, setIndex] = useState(null);

  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [info, setInfo] = useState(infoSchema);
  const { claim_id, dents, saved_dents } = useSelector((state) => state.claim);

  const [, setisReviewed] = useState(false);
  const claimInfoSubmitRef = useRef();
  const personalInfoSubmitRef = useRef();
  const vehicleInfoSubmitRef = useRef(null);
  const dentInfoSubmitRef = useRef();
  const techInfoSubmitRef = useRef();
  const reviewInfoSubmitRef = useRef();
  const notesInfoSubmitRef = useRef();
  const beforeAndAfterInfoSubmitRef = useRef();
  const [stickAtTop, setStickAtTop] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const [personalInfoLatLng, setPersonalInfoLatLng] = useState({
    lat: null,
    lng: null,
  });
  const [dealershipInfoLatLng, setDealershipInfoLatLng] = useState({
    lat: null,
    lng: null,
  });

  const [damageErrorMessage, setDamageErrorMessage] = useState(false);

  const schema = yup.object().shape({
    first_name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "*Only letters are allowed")
      .min(2, "*Minimum 2 characters")
      .max(80, "*Maximum 80 characters")
      .required("*First Name Required"),
    last_name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "*Only letters are allowed")
      .min(2, "*Minimum 2 characters")
      .max(80, "*Maximum 80 characters")
      .required("*Last Name Required”"),
    city: yup
      .string()
      .min(2, "Too Short!")
      .max(55, "Too Long!")
      .matches(/^[aA-zZ\s]+$/, "*Only letters are allowed")
      .required("*City Required"),
    address: yup.string().required("*Address Required"),
    apt_suite: yup.string(),
    state: yup
      .string()
      .min(2, "Too Short!")
      .max(55, "Too Long!")
      .matches(/^[aA-zZ\s]+$/, "*Only letters are allowed")
      .required("*State Required"),
    zip: yup
      .string()
      .matches(/^\d{5}(-\d{4})?$/, "*Invalid zip code")
      .min(4, "*Too Short")
      .max(5, "*Too Long")
      .typeError("zip  must be number")
      .required("*Zip Required"),
    phone: yup
      .string()
      .matches(/^\d{10}$/, "*Invalid phone number, must be 10 digits")
      .min(9, "*Too short")
      .max(10, "*Too long")
      .required("*Phone Required"),
    secondary_phone: yup
      .string()
      .matches(/^\d{10}$/, "*Invalid phone number, must be 10 digits")
      .min(9, "*Too short")
      .max(10, "*Too long")
      .nullable(),
    email: yup.string().trim().email().required("*Email Required"),
    secondary_email: yup
      .string()
      .trim()
      .email()
      .when("email", {
        is: (email) => email,
        then: yup
          .string()
          .trim()
          .email()
          .notOneOf(
            [yup.ref("email")],
            "*Secondary email should not be same as  email",
          ),
      }),
    d_name: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "*Only letters are allowed")
      .min(2, "*Minimum 2 characters")
      .max(80, "*Maximum 80 characters"),
    d_service_advisor: yup
      .string()
      .matches(/^[aA-zZ\s]+$/, "*Only letters are allowed")
      .min(2, "*Minimum 2 characters")
      .max(80, "*Maximum 80 characters"),

    d_phone: yup
      .string()
      .matches(/^\d{10}$/, "*Invalid phone number, must be 10 digits")
      .nullable(true),
    d_apt_suite: yup.string(),

    d_city: yup.string().matches(/^[aA-zZ\s]+$/, "*Only letters are allowed"),
    d_state: yup.string().matches(/^[aA-zZ\s]+$/, "*Only letters are allowed"),
    d_zip: yup
      .string()
      .matches(/^\d{5}(-\d{4})?$/, "*Invalid zip code")
      .min(4, "*Too Short")
      .max(5, "*Too Long")
      .typeError("zip must be number")
      .nullable(true),
    d_address: yup.string(),
  });

  // personal info
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: info,
    validationSchema: schema,
    validateOnBlur: false,
    validateOnChange: false,

    onSubmit: (values) => {
      const obj = {
        ...values,
        personal_info_lat_lng: { ...personalInfoLatLng },
        dealership_info_lat_lng: { ...dealershipInfoLatLng },
      };
      dispatch(add_personal_info(obj));

      if (value !== tabIndex) {
        setValue(tabIndex);
        setIndex(null);
        return;
      } else {
        setValue(1);
        setTabIndex(1);
        setIndex(null);

        return;
      }
    },
  });

  const handleChange = async (_a, newValue) => {
    setTabIndex(newValue);
    // eslint-disable-next-line no-console
    if (claim_id) {
      if (value == 1 && index == 2) {
        return formik.handleSubmit();
      } else if (value == 2) {
        if (dents?.length == saved_dents?.length) {
          setValue(newValue);
          if (newValue == 4) {
            return setValue(4);
          }
        } else {
          setDamageErrorMessage(true);
          return setValue(value);
        }
      } else {
        return setValue(newValue);
      }
      return;
    }
    if (value > newValue) {
      setValue(newValue);
    } else {
      // eslint-disable-next-line no-restricted-globals
      if (newValue === 1) {
        claimInfoSubmitRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
      } else if (newValue === 2) {
        personalInfoSubmitRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
      } else if (newValue === 3) {
        vehicleInfoSubmitRef.current.dispatchEvent(
          new Event("click", {
            cancelable: true,
            bubbles: true,
          }),
        );
      } else if (newValue === 4) {
        dentInfoSubmitRef.current.dispatchEvent(
          new Event("click", {
            cancelable: true,
            bubbles: true,
            buttons: 1,
          }),
        );
      } else if (newValue === 5) {
        techInfoSubmitRef.current.dispatchEvent(
          new Event("click", {
            cancelable: true,
            bubbles: true,
            buttons: 1,
          }),
        );
      } else if (newValue === 6) {
        reviewInfoSubmitRef.current.click();
      } else if (newValue === 7) {
        notesInfoSubmitRef.current.click();
      } else if (newValue === 8) {
        beforeAndAfterInfoSubmitRef.current.click();
      } else {
        setValue(newValue);
      }
    }
  };
  const handleScroll = () => {
    if (
      window.document.body.scrollTop > 150 ||
      window.document.documentElement.scrollTop > 150
    ) {
      setStickAtTop(true);
    } else {
      setStickAtTop(false);
    }
  };

  return (
    <S.Tabset member>
      <div>
        <Tabs
          aria-label="scrollable auto tabs example"
          indicatorColor="primary"
          onChange={handleChange}
          scrollButtons="auto"
          textColor="primary"
          value={value}
        >
          <Tab className="odd" label="Claim Info" {...a11yProps(0)} />

          <Tab label="Contact Info" {...a11yProps(1)} />
          <Tab label="Damages" {...a11yProps(2)} />
          <Tab label="Review" {...a11yProps(3)} />
        </Tabs>
      </div>
      <TabPanel className="tabpanel" index={0} value={value}>
        <div className="grid-panel">
          <ClaimInfoView
            handleScroll={handleScroll}
            stickAtTop={stickAtTop}
            setValue={setValue}
          />
        </div>
      </TabPanel>
      <TabPanel className="tabpanel" index={1} value={value}>
        <div className="grid-panel">
          {index === 2 ? (
            <TabPanel2
              stickAtTop={stickAtTop}
              handleScroll={handleScroll}
              value={value}
              personalInfoSubmitRef={personalInfoSubmitRef}
              setValue={setValue}
              info={info}
              setInfo={setInfo}
              formik={formik}
              setPersonalInfoLatLng={setPersonalInfoLatLng}
              setDealershipInfoLatLng={setDealershipInfoLatLng}
            />
          ) : (
            <PersonalInfoView
              handleScroll={handleScroll}
              stickAtTop={stickAtTop}
              setIndex={setIndex}
              setValue={setValue}
              personalInfo={claim}
              formik={formik}
            />
          )}
        </div>
      </TabPanel>

      <TabPanel className="tabpanel" index={2} value={value}>
        <TabPanel4
          stickAtTop={stickAtTop}
          handleScroll={handleScroll}
          onClickCancel={() => setValue(2)}
          setValue={setValue}
          dentInfoSubmitRef={dentInfoSubmitRef}
          value={value}
          damageErrorMessage={damageErrorMessage}
          setDamageErrorMessage={setDamageErrorMessage}
          transit={
            <Button
              onClick={() => setValue(4)}
              size="xsmall"
              value="Continue"
            />
          }
        />
      </TabPanel>

      <TabPanel className="tabpanel" index={3} value={value}>
        <TabPanel6
          handleScroll={handleScroll}
          stickAtTop={stickAtTop}
          value={value}
          setValue={setValue}
        />
      </TabPanel>
    </S.Tabset>
  );
}

MemberTabset.propTypes = {
  claim: PropTypes.shape({}).isRequired,
};
