import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";

import { ROLES } from "@/utils/constants";

import Button from "../Button";
import {
  add_vehicle_info,
  add_claim_info,
  add_personal_info,
} from "../../containers/PageClaims/actions";

import TabPanel2 from "./PersonalInfo";
import TabPanel4 from "./Damages";
import * as S from "./styled";
import TabPanel3 from "./VehicleInfo";

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
export default function CarvanaTabset({ hasUpdatedByMember }) {
  const dispatch = useDispatch();
  const [insuranceClaimNumberError, setInsuranceClaimNumberError] =
    useState(false);
  const [insuranceClaimNumber, setInsuranceClaimNumber] = useState("");
  const [value, setValue] = useState(0);
  const [info, setInfo] = useState(infoSchema);
  const { claim_info } = useSelector((state) => state.claim);
  const { currentUser } = useSelector((state) => state.global);

  const [, setisReviewed] = useState(false);
  const personalInfoSubmitRef = useRef(null);
  const vehicleInfoSubmitRef = useRef(null);
  const dentInfoSubmitRef = useRef(null);
  const [stickAtTop, setStickAtTop] = useState(false);
  const [, setTabIndex] = useState(0);
  const [personalInfoLatLng, setPersonalInfoLatLng] = useState({
    lat: null,
    lng: null,
  });
  const [dealershipInfoLatLng, setDealershipInfoLatLng] = useState({
    lat: null,
    lng: null,
  });

  const [vehicleYear, setVehicleYear] = useState(null);
  const [make, setMake] = useState(null);
  const [model, setModel] = useState(null);
  const [type, setType] = useState(null);
  const [vin, setVin] = useState("");
  const [claimType, setClaimType] = useState(null);

  const [error, setError] = useState({
    vehicleError: false,
    makeError: false,
    modelError: false,
    typeError: false,
    vinError: false,
    claimTypeError: false,
    message: "",
  });

  const [damageErrorMessage, setDamageErrorMessage] = useState(false);

  useEffect(() => {
    if (hasUpdatedByMember) {
      setisReviewed(hasUpdatedByMember);
    }
  }, [hasUpdatedByMember]);

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
      if (!insuranceClaimNumber) {
        setInsuranceClaimNumberError(true);
        // eslint-disable-next-line
        return;
      }
      dispatch(add_personal_info(obj));
      setInsuranceClaimNumberError(false);

      setValue(1);
      setTabIndex(1);
    },
  });

  // vehicle info
  const handleVehicleClick = (next) => {
    if (
      (currentUser?.role === ROLES.tpaAdmin.value ||
        currentUser?.role === ROLES.tpaAccountManager.value ||
        !currentUser?._id) &&
      !vin
    ) {
      setError({
        vinError: true,
        message: "*Vin is required",
      });
      return;
    }
    if (
      !vehicleYear?.value &&
      !make?.Make_Name &&
      !model?.Model_Name &&
      !type?.label
    ) {
      setError({
        vehicleError: true,
        makeError: true,
        modelError: true,
        typeError: true,
      });
      return;
    }
    if (!vehicleYear?.value) {
      setError({
        vehicleError: true,
      });
      return;
    }
    if (!make?.Make_Name) {
      setError({
        makeError: true,
      });
      return;
    }
    if (!model?.Model_Name) {
      setError({
        modelError: true,
      });
      return;
    }
    if (!type?.label) {
      setError({
        typeError: true,
      });
      return;
    }
    if (!claimType) {
      setError({
        ...error,
        claimTypeError: true,
      });
      return;
    }
    if (
      vehicleYear?.value &&
      make?.Make_Name &&
      model?.Model_Name &&
      type?.label
    ) {
      dispatch(
        add_vehicle_info({
          year: vehicleYear?.value,
          make: make?.Make_Name,
          model: model?.Model_Name,
          type: type?.label,
          vin: vin?.length >= 11 ? vin : "",
        }),
      );
      dispatch(add_claim_info({ ...claim_info, claim_type: claimType }));

      if (next === 0) {
        setTabIndex(0);
        setValue(0);
        //   eslint-disable-next-line
        return;
      }

      if (next) {
        setValue(next);
        setTabIndex(0);
      } else {
        setValue((prev) => prev + 1);
        setTabIndex(0);
      }
    }
  };

  const handleChange = async (_a, newValue) => {
    if (value > newValue) {
      setValue(newValue);
    } else {
      // eslint-disable-next-line
      if (newValue === 1) {
        personalInfoSubmitRef.current.dispatchEvent(
          new Event("submit", { cancelable: true, bubbles: true }),
        );
      } else if (newValue === 2) {
        vehicleInfoSubmitRef.current.dispatchEvent(
          new Event("click", {
            cancelable: true,
            bubbles: true,
          }),
        );
      } else if (newValue === 3) {
        dentInfoSubmitRef.current.dispatchEvent(
          new Event("click", {
            cancelable: true,
            bubbles: true,
            buttons: 1,
          }),
        );
      } else {
        return setValue(newValue);
      }
    }
    return null;
  };

  const handleScroll = () => {
    if (
      window.document.body.scrollTop > 70 ||
      window.document.documentElement.scrollTop > 70
    ) {
      setStickAtTop(true);
    } else {
      setStickAtTop(false);
    }
  };
  return (
    <S.Tabset>
      <div>
        <Tabs
          aria-label="scrollable auto tabs example"
          indicatorColor="primary"
          onChange={handleChange}
          scrollButtons="auto"
          textColor="primary"
          value={value}
        >
          <Tab label="Contact Info" {...a11yProps(0)} />
          <Tab label="Vehicle Info" {...a11yProps(1)} />
          <Tab label="Damages" {...a11yProps(2)} />
        </Tabs>
      </div>

      <TabPanel className="tabpanel" index={0} value={value}>
        <div className="grid-panel">
          <TabPanel2
            personalInfoSubmitRef={personalInfoSubmitRef}
            stickAtTop={stickAtTop}
            handleScroll={handleScroll}
            insuranceClaimNumber={insuranceClaimNumber}
            setInsuranceClaimNumber={setInsuranceClaimNumber}
            insuranceClaimNumberError={insuranceClaimNumberError}
            value={value}
            setValue={setValue}
            info={info}
            infoSchema={infoSchema}
            setInfo={setInfo}
            carvana={Boolean(true)}
            formik={formik}
            setPersonalInfoLatLng={setPersonalInfoLatLng}
            setDealershipInfoLatLng={setDealershipInfoLatLng}
          />
        </div>
      </TabPanel>
      <TabPanel className="tabpanel" index={1} value={value}>
        <div className="grid-panel">
          <TabPanel3
            vehicleInfoSubmitRef={vehicleInfoSubmitRef}
            handleScroll={handleScroll}
            stickAtTop={stickAtTop}
            value={value}
            handleVehicleClick={handleVehicleClick}
            setValue={setValue}
            vehicleYear={vehicleYear}
            setVehicleYear={setVehicleYear}
            make={make}
            setMake={setMake}
            model={model}
            setModel={setModel}
            type={type}
            setType={setType}
            vin={vin}
            setVin={setVin}
            error={error}
            setError={setError}
            claimType={claimType}
            setClaimType={setClaimType}
          />
        </div>
      </TabPanel>

      <TabPanel className="tabpanel" index={2} value={value}>
        <TabPanel4
          onClickCancel={() => setValue(2)}
          setValue={setValue}
          dentInfoSubmitRef={dentInfoSubmitRef}
          value={value}
          insuranceClaimNumber={insuranceClaimNumber}
          setInsuranceClaimNumber={setInsuranceClaimNumber}
          stickAtTop={stickAtTop}
          handleScroll={handleScroll}
          damageErrorMessage={damageErrorMessage}
          setDamageErrorMessage={setDamageErrorMessage}
          transit={
            <Button
              onClick={() => setValue(4)}
              size="xsmall"
              value="Continue"
            />
          }
          setClaimType={setClaimType}
          setError={setError}
          error={error}
        />
      </TabPanel>
    </S.Tabset>
  );
}

CarvanaTabset.propTypes = {
  claim: PropTypes.objectOf(PropTypes.any),
  hasUpdatedByMember: PropTypes.bool,
};

CarvanaTabset.defaultProps = {
  claim: {},
  hasUpdatedByMember: false,
};
