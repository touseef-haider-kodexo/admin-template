/* eslint-disable*/
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useMutation, useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import isEqual from "react-fast-compare";

import camera from "@/assets/images/camera.webp";

import { ROLES, carTypes } from "@/utils/constants";
import AppService from "@/services/api/app-service";
import NotificationStatus from "@/components/Notification";
import IsLoadingHOC from "@/hoc/isLoading";
import {
  add_claim_info,
  add_personal_info,
  add_vehicle_info,
  add_dents,
  add_technician_info,
  set_claim_id,
  add_saved_dents,
  add_rating,
  add_additional_claim_items,
  set_emails,
  set_prev_technician,
  set_prev_number,
  set_prev_member_email,
  set_original_claim_info,
  remove_dents,
} from "@/containers/PageClaims/actions";

import DentImageSlider from "../Modal/dentImageSlider";
import makeStatus from "../../utils/status";

import CustomizedAccordions from "./CustomizedAccordions";
import * as S from "./styled";

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
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.func.isRequired,
  value: PropTypes.func.isRequired,
};

function TabPanel4({
  onClickCancel,
  onClickSave,
  setLoading,
  dentInfoSubmitRef,
  setValue,
  setDamageErrorMessage,
  damageErrorMessage,
  stickAtTop,
  ...props
}) {
  const [current, setcurrent] = useState(0);
  const [carType, setCarType] = useState(null);
  const [imageArr, setImageArr] = useState([]);
  const dispatch = useDispatch();
  const claim = useSelector((state) => state.claim);
  const { currentUser } = useSelector((state) => state.global);
  const [callAgain, setCallAgain] = useState(false);

  const params = new URLSearchParams(window.location.search);

  const getClaim = (id) => AppService.getParticularClaim(id);

  // ********************************************* START ********************************************************
  useQuery("claim", () => getClaim(params.get("id")), {
    onSuccess: (data) => {
      console.log("data", data);
      // eslint-disable-next-line
      const claim_info = {
        claim_type: data?.claim_type,
        TPA: data?.TPA,
        insurance_claim_number: data?.insurance_claim_number,
        dd_claim_number: data?.dd_claim_number,
        status: makeStatus(data?.status),
        follow_up: data?.follow_up,
        date_recieved: data?.date_recieved,
        date_assigned: data?.date_assigned,
        date_scheduled: data?.date_scheduled,
        date_completed: data?.date_completed,
        tpa_billed: data?.tpa_billed,
        tech_invoice_recieved: data?.tech_invoice_recieved,
        has_updated_by_member: data?.has_updated_by_member,
      };
      const info = {
        ...data?.personal_info,
        zip: data?.personal_info?.zip_code,
        d_name: data?.dealership?.name,
        d_service_advisor: data?.dealership?.service_advisor,
        d_phone: data?.dealership?.phone,
        d_address: data?.dealership?.address,
        d_apt_suite: data?.dealership?.apt_suite,
        d_city: data?.dealership?.city,
        d_state: data?.dealership?.state,
        d_zip: data?.dealership?.zip_code,
        dealership_info_lat_lng: data?.dealership?.dealership_info_lat_lng,
      };
      if (data?.personal_info?.secondary_phone) {
        dispatch(set_prev_number(data?.personal_info?.secondary_phone));
      } else {
        dispatch(set_prev_number(data?.personal_info?.phone));
      }
      if (data?.personal_info?.email) {
        // set prev member email
        dispatch(set_prev_member_email(data?.personal_info?.email));
      }
      if (data?.technician_location) {
        dispatch(
          set_prev_technician({
            technician_location: data?.technician_location,
            ...data?.technician,
          }),
        );
      }
      dispatch(add_personal_info(info));
      dispatch(add_dents([...data?.damages?.dents]));
      dispatch(add_saved_dents([...data?.damages?.dents]));
      dispatch(add_vehicle_info(data?.vehicle));
      dispatch(add_technician_info(data?.technician_location));
      dispatch(add_claim_info({ ...claim_info }));
      dispatch(set_claim_id(data?._id));
      dispatch(add_rating({ has_rating: data?.has_rating }));
      dispatch(add_additional_claim_items([...data?.additional_claim_items]));
      dispatch(set_emails(data?.emails));
      dispatch(set_original_claim_info(data));
      setValue((prev) => prev + 1);
      console.log("called again n again");
    },

    refetchOnWindowFocus: false,

    enabled: !!callAgain,
  });

  // ********************************************* END   ********************************************************

  const { isLoading } = useQuery(
    ["getCar", carType],
    () => AppService.getCarByCarTypeAndSubType(carType),
    {
      enabled: !!carType,
      onSuccess: (data) => {
        setLoading(false);
        if (
          String(claim?.claim_info?.claim_type?.name).toLowerCase() ===
          String("Wheel").toLowerCase()
        ) {
          let canvasImages = [];
          data?.map((item) => {
            let areas = item?.MAP?.areas?.filter(
              (area) =>
                String(area?.title).toLowerCase() ===
                  String("Left Front Wheel").toLowerCase() ||
                String(area?.title).toLowerCase() ===
                  String("Right Front Wheel").toLowerCase() ||
                String(area?.title).toLowerCase() ===
                  String("Left Rear Wheel").toLowerCase() ||
                String(area?.title).toLowerCase() ===
                  String("Right Rear Wheel").toLowerCase(),
            );
            canvasImages.push({
              ...item,
              MAP: { name: item?.MAP?.name, areas: areas },
            });
            setImageArr(canvasImages);
          });
          return;
        } else {
          setImageArr(data);
        }
      },

      onError: (err) => {
        console.log(err);
      },
    },
  );

  if (isLoading) {
    setLoading(true);
  }

  const post_claim = useMutation((data) => AppService.addClaim(data), {
    onSuccess: async () => {
      NotificationStatus("success", "Successfully created claim.");
      setValue((prevState) => prevState + 1);
    },
  });

  const post_carvana_claim = useMutation(
    (data) => AppService.addCarvanaClaim(data),
    {
      onSuccess: async () => {
        NotificationStatus("success", "Successfully created claim.");
        dispatch(add_claim_info(null));
        dispatch(add_vehicle_info(null));
        dispatch(set_original_claim_info(null));
        dispatch(set_claim_id(null));
        dispatch(remove_dents([]));
        dispatch(add_personal_info(null));
        props?.setClaimType(null);
        props?.setError({
          ...props?.error,
          claimTypeError: false,
        });
        setValue(0);
        props?.setInsuranceClaimNumber("");
      },
      onError: (err) => {
        NotificationStatus("error", err.message);
        console.log(err);
      },
    },
  );

  const update_claim = useMutation((data) => AppService.updateClaim(data), {
    onSuccess: async (data) => {
      NotificationStatus("success", "Successfully updated claim.");
      dispatch(set_claim_id(data?._id));

      setCallAgain(true);
    },
  });

  useEffect(() => {
    if (
      String(claim?.claim_info?.claim_type?.name).toLowerCase() ===
      carTypes.Interior.carType
    ) {
      setCarType({
        type: carTypes.Exterior.type,
      });
      return;
    }
    switch (String(claim?.vehicle_info?.type).toLowerCase()) {
      case carTypes.PassengerCar.carType:
        setCarType({
          type: carTypes.PassengerCar.type,
        });
        break;
      case carTypes.MultipurposePassengerVehicle.carType:
        setCarType({
          type: carTypes.MultipurposePassengerVehicle.type,
        });
        break;
      case carTypes.Motorcycle.carType:
        setCarType({
          type: carTypes.PassengerCar.type,
        });
        break;
      case carTypes.Truck.carType:
        setCarType({
          type: carTypes.Truck.type,
        });
        break;
      case carTypes.IncompleteVehicle.carType:
        setCarType({ type: carTypes.IncompleteVehicle.type });
        break;
      case carTypes.Bus.carType:
        setCarType({ type: carTypes.Truck.type });
        break;
      case carTypes.Trailer.carType:
        setCarType({ type: carTypes.Truck.type });
        break;
      case carTypes.LowSpeedVehicle.carType:
        setCarType({
          type: carTypes.PassengerCar.type,
        });
        break;

      default:
        break;
    }
    setDamageErrorMessage(false);
  }, []);

  const handleClick = async () => {
    const { claim_info, dents, personal_info, vehicle_info } = claim;

    const url = window.location.href;

    if (url.includes("carvana")) {
      post_carvana_claim.mutate({
        personal_info: {
          first_name: personal_info?.first_name,
          last_name: personal_info?.last_name,
          address: personal_info?.address,
          apt_suite: personal_info?.apt_suite,
          city: personal_info?.city,
          state: personal_info?.state,
          zip_code: personal_info?.zip,
          phone: personal_info?.phone,
          secondary_phone: personal_info?.secondary_phone,
          email: personal_info?.email,
          personal_info_lat_lng: { ...personal_info?.personal_info_lat_lng },
          secondary_email: personal_info?.secondary_email,
        },
        claim_type: claim_info?.claim_type,
        insurance_claim_number: props?.insuranceClaimNumber,
        damages: { dents },
        vehicle: vehicle_info,
      });
      return;
    }
    const obj = {
      ...claim_info,
      status: claim_info?.status?.value,
      prev_status: claim_info?.prev_status,
      TPA: claim_info?.TPA,
      damages: { dents: [...dents] },
      personal_info: {
        first_name: personal_info?.first_name,
        last_name: personal_info?.last_name,
        address: personal_info?.address,
        apt_suite: personal_info?.apt_suite,
        city: personal_info?.city,
        state: personal_info?.state,
        zip_code: personal_info?.zip,
        phone: personal_info?.phone,
        secondary_phone: personal_info?.secondary_phone,
        email: personal_info?.email,
        personal_info_lat_lng: { ...personal_info?.personal_info_lat_lng },
        secondary_email: personal_info?.secondary_email,
      },
      dealership: {
        name: personal_info?.d_name,
        service_advisor: personal_info?.d_service_advisor,
        phone: personal_info?.d_phone,
        address: personal_info?.d_address,
        apt_suite: personal_info?.d_apt_suite,
        city: personal_info?.d_city,
        state: personal_info?.d_state,
        zip_code: personal_info?.d_zip,
        dealership_info_lat_lng: {
          ...personal_info?.dealership_info_lat_lng,
        },
      },
      vehicle: vehicle_info,
    };
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    if (
      claim?.saved_dents?.length == claim?.dents?.length &&
      claim?.dents?.length > 0
    ) {
      setDamageErrorMessage(false);
      if (
        (currentUser?.role === ROLES.tpaAccountManager.value ||
          currentUser?.role === ROLES.tpaAdmin.value) &&
        !id
      ) {
        await post_claim.mutate(obj);
        return;
      } else if (
        (currentUser?.role === ROLES.tpaAccountManager.value ||
          currentUser?.role === ROLES.tpaAdmin.value) &&
        id
      ) {
        let originalObj = {
          ...claim?.original_claim_info,
          TPA: claim?.original_claim_info?.TPA,
          claim_type: claim?.original_claim_info?.claim_type,
          status: claim?.original_claim_info?.status,
          prev_status: claim?.original_claim_info?.status,
          damages: claim?.original_claim_info?.damages,
          personal_info: {
            ...claim?.original_claim_info?.personal_info,
          },
          dealership: {
            ...claim?.original_claim_info?.dealership,
          },
          vehicle: claim?.original_claim_info?.vehicle,
        };

        for (const key in obj) {
          if (
            obj[key] === undefined &&
            originalObj[key] !== "date_recieved" &&
            originalObj[key] !== "date_completed" &&
            originalObj[key] !== "date_scheduled" &&
            originalObj[key] !== "date_assigned" &&
            originalObj[key] !== "follow_up" &&
            originalObj[key] !== "tpa_billed" &&
            originalObj[key] !== "tech_invoice_recieved"
          ) {
            delete obj[key];
            delete originalObj[key];
          }

          if (typeof obj[key] === "object") {
            for (const key2 in obj[key]) {
              if (obj[key][key2] === undefined) {
                delete obj[key][key2];
                delete originalObj[key][key2];
              }
            }
          }
        }

        delete originalObj.last_requested_by_system_for_member;
        delete originalObj.last_requested_by_system_for_technician;
        delete originalObj.requested_by_member;
        delete originalObj.technician;
        delete originalObj.prev_technician;
        delete originalObj.additional_claim_items;
        delete originalObj.created_at;
        delete originalObj.has_rating;
        delete originalObj.technician_location;
        delete originalObj.requested_by_technician;
        delete obj.last_requested_by_system_for_member;
        delete obj.last_requested_by_system_for_technician;
        delete obj.role;
        delete obj.requested_by_member;
        delete obj.requested_by_technician;

        delete originalObj.profile;
        delete originalObj.last_updated_by;
        delete originalObj.__v;
        delete originalObj.emails;
        delete originalObj._id;

        if (isEqual({ ...obj }, { ...originalObj })) {
          return setValue((prev) => prev + 1);
        } else {
          await update_claim.mutate({ ...obj, _id: id });
          return;
        }
      }
      return setValue((prev) => prev + 1);
    } else {
      setDamageErrorMessage(true);
    }
  };

  return (
    <S.TabPanel4
      member={currentUser?.role === ROLES.member.value ? true : false}
      stickAtTop={stickAtTop}
    >
      <div className="dent-page-cont-btn" style={{ marginBottom: "10px" }}>
        <button
          type="submit"
          ref={dentInfoSubmitRef}
          onClick={handleClick}
          className="save-btn"
        >
          {currentUser?._id && !window.location.href.includes("carvana")
            ? "Continue"
            : "Submit claim for processing"}
        </button>
      </div>
      <div className="flex">
        {(window.location.href.includes("carvana") ||
          !(currentUser?._id || currentUser?.role === ROLES.member.value)) && (
          <div style={{ width: "100%" }}>
            <div className="flex mb-6 wrap">
              <p className="bold">Step 1:</p>
              <p className="justify-text">
                Scroll down and add image to claim damage
              </p>
            </div>
            <div className="flex mb-6 wrap">
              <p className="bold">Step 2:</p>
              <p className="justify-text">
                If reported damage is not shown below, select the panel on the
                vehicle where the damage is located.
              </p>
            </div>
            <div className="flex mb-6 wrap">
              <p className="bold">Step 3:</p>
              <p className="justify-text">
                Scroll down to open the damage details to add a description and
                image of the damage.
              </p>
            </div>
            <div className="flex mb-6 wrap">
              <p className="bold">Step 4:</p>
              <p className="justify-text"> Save</p>
            </div>
            <div className="flex mb-6 wrap">
              <p className="bold">Step 5:</p>
              <p className="justify-text">
                Add more damages or confirm and save.
              </p>
            </div>
            <div className="flex wrap">
              <img src={camera} />
              <p className="justify-text" className="damage-photo-desc">
                Photo Tip: Take a photo 3-5ft away, on a 45 degree angle, at eye
                level and out of the direct sunlight.
              </p>
            </div>
          </div>
        )}
      </div>
      <div className="save-error">
        {damageErrorMessage && (
          <small style={{ marginTop: "20px", fontSize: "13px" }}>
            {" "}
            Please save all the dents to continue{" "}
          </small>
        )}
      </div>

      <S.DamagesTabPanel1>
        {!isLoading && (
          <DentImageSlider
            setcurrent={setcurrent}
            images={
              Array.isArray(imageArr) && imageArr?.sort((a, b) => a?.id - b?.id)
            }
          />
        )}
        {(window.location.href.includes("carvana") ||
          !currentUser?._id ||
          currentUser?.role === ROLES.member.value) && (
          <p className="mobile-device-msg">
            If you are using a mobile device,press and hold on the vehicle to
            slide or use arrows to rotate the vehicle
          </p>
        )}
        <S.CustomizedAccordions>
          <div style={{ marginTop: "20px" }}>
            {Array.isArray(claim?.dents) &&
              claim?.dents.map((val, index) => {
                return (
                  <CustomizedAccordions
                    key={index}
                    edit={val?.is_edit && val?.is_edit}
                    index={index}
                    onClickCancel={onClickCancel}
                    onClickSave={onClickSave}
                    expand={current}
                    handleChange={setcurrent}
                    canvas_id={val?.canvas_id}
                    roles={[
                      ROLES.member.value,
                      ROLES.tpaAccountManager.value,
                      ROLES.tpaAdmin.value,
                      ROLES.admin.value,
                      ROLES.accountManager.value,
                    ]}
                    {...val}
                  />
                );
              })}
          </div>
        </S.CustomizedAccordions>
      </S.DamagesTabPanel1>
    </S.TabPanel4>
  );
}

TabPanel4.propTypes = {
  onClickCancel: PropTypes.func,
  onClickSave: PropTypes.func,
  transit: PropTypes.func,
};

TabPanel4.defaultProps = {
  setDamageErrorMessage: () => {},
};

export default IsLoadingHOC(TabPanel4);
