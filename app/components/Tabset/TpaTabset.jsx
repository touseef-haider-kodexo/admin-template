/* eslint-disable */
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

import TabPanel2 from "./PersonalInfo";
import TabPanel4 from "./Damages";
import * as S from "./styled";
import TabPanel1 from "./ClaimInfo";
import TabPanel3 from "./VehicleInfo";
import TabPanel7 from "./NotesHistory";

import Button from "../Button";
import {
  add_vehicle_info,
  add_claim_info,
  add_personal_info,
} from "../../containers/PageClaims/actions";

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

const claimInfoSchema = {
  TPA: "",
  role: "",
  claim_type: "",
  insurance_claim_number: "",
  status: "",
  prev_status: "",
  follow_up: "",
  date_recieved: "",
  date_assigned: "",
  date_scheduled: "",
  date_completed: "",
  tpa_billed: "",
  tech_invoice_recieved: "",
};

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
export default function TpaTabset({ claim, hasUpdatedByMember }) {
  const [, setIndex] = useState(null);

  const dispatch = useDispatch();
  const [value, setValue] = useState(0);
  const [claimInfo, setClaimInfo] = useState(claimInfoSchema);
  const [info, setInfo] = useState(infoSchema);
  const { claim_id, dents, saved_dents } = useSelector((state) => state.claim);
  const { currentUser } = useSelector((state) => state.global);

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
  const [prevStatus, setPrevStatus] = useState("");
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

  const [error, setError] = useState({
    vehicleError: false,
    makeError: false,
    modelError: false,
    typeError: false,
    vinError: false,
    message: "",
  });

  const [damageErrorMessage, setDamageErrorMessage] = useState(false);

  useEffect(() => {
    if (hasUpdatedByMember) {
      setisReviewed(hasUpdatedByMember);
    }
  }, [hasUpdatedByMember]);

  const schemaForClaimInfo = yup.object().shape({
    TPA: yup.mixed(),
    claim_type: yup.mixed().required("*Claim Type Required"),
    insurance_claim_number: yup
    .string()
    .required("*Insurance Claim Number Required"),
    status: yup.mixed().required("*Status is required"),
    follow_up: yup
      .date()
      .min(
        yup.ref("date_recieved"),
        "*Follow Up Date must be after Date Received",
      )
      .nullable()
      .transform((v) => (v instanceof Date && !Number.isNaN(v) ? v : null)),
    prev_status: yup.string().default(""),
    date_recieved: yup
      .date()
      .typeError("Must be in date format")
      .when("role", {
        is: ROLES.admin.value || ROLES.accountManager.value,
        then: yup
          .date()
          .required("*Date Received Required")
          .nullable()
          .transform((v) => (v instanceof Date && !Number.isNaN(v) ? v : null)),
      })
      .nullable()
      .transform((v) => (v instanceof Date && !Number.isNaN(v) ? v : null)),
    date_assigned: yup
      .date()
      .min(
        yup.ref("date_recieved"),
        "*Date Assigned must be after  Date Received",
      )
      .typeError("Must be in date format")
      .nullable()
      .transform((v) => (v instanceof Date && !Number.isNaN(v) ? v : null)),
    date_scheduled: yup
      .date()
      .min(
        yup.ref("date_recieved"),
        "*Date Scheduled must be after  Date Received",
      )
      .nullable()
      .transform((v) => (v instanceof Date && !Number.isNaN(v) ? v : null))
      .typeError("Must be in date format"),
    date_completed: yup
      .date()
      .min(
        yup.ref("date_recieved"),
        "*Date Completed must be after  Date Received",
      )
      .transform((v) => (v instanceof Date && !Number.isNaN(v) ? v : null))
      .nullable()
      .typeError("Must be in date format"),
    tpa_billed: yup
      .date()
      .min(yup.ref("date_recieved"), "*TPA Billed must be after  Date Received")
      .typeError("Must be in date format")
      .nullable()
      .transform((v) => (v instanceof Date && !Number.isNaN(v) ? v : null)),
    tech_invoice_recieved: yup
      .date()
      .min(
        yup.ref("date_recieved"),
        "*Tech Invoice Received must be after Date Received ",
      )
      .nullable()
      .transform((v) => (v instanceof Date && !Number.isNaN(v) ? v : null))
      .typeError("Must be in date format"),
  });

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

  // claim info
  const claimInfoFormik = useFormik({
    initialValues: claimInfo,
    enableReinitialize: true,
    validationSchema: schemaForClaimInfo,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values) => {
      const obj = {
        ...values,
        prev_status: prevStatus,
        TPA: currentUser?.TPA ? currentUser?.TPA : values?.TPA,
      };

      dispatch(add_claim_info(obj));
      if (value !== tabIndex) {
        setValue(tabIndex);
        return;
      } else {
        setValue(1);
        setTabIndex(1);

        return;
      }
    },
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
        return;
      } else {
        setValue(2);
        setTabIndex(2);

        return;
      }
    },
  });

  // vehicle info
  const handleVehicleClick = (next) => {
    if (
      (currentUser?.role === ROLES.tpaAdmin.value ||
        currentUser?.role === ROLES.tpaAccountManager.value) &&
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

      if (next == 0) {
        return setValue(0);
      }

      if (next) {
        setValue(next);
      } else {
        setValue((prev) => prev + 1);
        setTabIndex((prev) => prev + 1);
      }
    }
  };

  const handleChange = async (_a, newValue) => {
    // console.log(claimInfoFormik.errors);
    // console.log(formik.errors);
    // if (!claimInfoFormik.errors && !formik.errors) {
    setTabIndex(newValue);
    // }

    // eslint-disable-next-line no-console
    if (claim_id) {
      if (value == 0) {
        return claimInfoFormik.handleSubmit();
      } else if (value == 1) {
        return formik.handleSubmit();
      } else if (value == 2) {
        return handleVehicleClick(newValue);
      } else if (value == 3) {
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
      window.document.body.scrollTop > 170 ||
      window.document.documentElement.scrollTop > 170
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
          <Tab className="odd" label="Claim Info" {...a11yProps(0)} />

          <Tab label="Contact Info" {...a11yProps(1)} />
          <Tab label="Vehicle Info" {...a11yProps(2)} />
          <Tab label="Damages" {...a11yProps(3)} />
          <Tab label="Notes & History" {...a11yProps(4)} />
        </Tabs>
      </div>
      <TabPanel className="tabpanel" index={0} value={value}>
        <div className="grid-panel ">
          <TabPanel1
            value={value}
            claim={claim}
            claimInfoSubmitRef={claimInfoSubmitRef}
            setValue={setValue}
            claimInfo={claimInfo}
            setClaimInfo={setClaimInfo}
            setPrevStatus={setPrevStatus}
            claimInfoFormik={claimInfoFormik}
            stickAtTop={stickAtTop}
            handleScroll={handleScroll}
          />
        </div>
      </TabPanel>
      <TabPanel className="tabpanel" index={1} value={value}>
        <div className="grid-panel">
          <TabPanel2
            personalInfoSubmitRef={personalInfoSubmitRef}
            stickAtTop={stickAtTop}
            handleScroll={handleScroll}
            value={value}
            setValue={setValue}
            info={info}
            setInfo={setInfo}
            formik={formik}
            setPersonalInfoLatLng={setPersonalInfoLatLng}
            setDealershipInfoLatLng={setDealershipInfoLatLng}
          />
        </div>
      </TabPanel>
      <TabPanel className="tabpanel" index={2} value={value}>
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
          />
        </div>
      </TabPanel>

      <TabPanel className="tabpanel" index={3} value={value}>
        <TabPanel4
          onClickCancel={() => setValue(2)}
          setValue={setValue}
          dentInfoSubmitRef={dentInfoSubmitRef}
          value={value}
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
        />
      </TabPanel>
      <TabPanel className="tabpanel" index={4} value={value}>
        <TabPanel7
          notesInfoSubmitRef={notesInfoSubmitRef}
          setValue={setValue}
          value={value}
        />
      </TabPanel>
    </S.Tabset>
  );
}

TpaTabset.propTypes = {
  claim: PropTypes.objectOf(PropTypes.any),
  hasUpdatedByMember: PropTypes.bool,
};

TpaTabset.defaultProps = {
  claim: {},
  hasUpdatedByMember: false,
};
