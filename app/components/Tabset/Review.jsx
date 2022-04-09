/* eslint-disable */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery } from "react-query";
import moment from "moment";
import isEqual from "react-fast-compare";

import Button from "../Button";
import CheckboxInput from "../Input/CheckboxInput";
import * as Input from "../Input/styled";
import makeStatus from "../../utils/status";
import GenericDropDown from "../DropDown/genericDropDown";

import * as S from "./styled";
import TechnicianCard from "./TechnicianCard";
import Editable from "./Editable";
import EditDamages from "./EditDamages";
import MemberDamages from "./MemberDamages";
import RatingStar from "./RatingStar";

import edit from "@/assets/images/edit.svg";
import AppService from "@/services/api/app-service";
import NotificationStatus from "@/components/Notification";
import {
  set_technician_notes_data,
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
} from "@/containers/PageClaims/actions";
import {
  EMAIL_NOTIFICATIONS,
  ROLES,
  CLAIM_STATUS,
  TECHNICIAN_ASSIGNMENT,
  CONFIRMATION_OF_CLAIM,
} from "@/utils/constants";
import Modal from "@/components/Modal";
import { calculatePercentage } from "../../utils/calcPercentage";
import {
  getTotalTechnicianPricePerDent,
  getRAndIPriceForTPA,
  getRAndIPriceForTechnician,
  getTotalInternalPricePerDent,
} from "../../utils/dentPriceCalculation";

const labels = {
  1: "Bad",
  2: "Poor",
  3: "Good",
  4: "Good+",
  5: "Excellent+",
};

function TabPanel6({ setValue, stickAtTop, handleScroll }) {
  const dispatch = useDispatch();
  const [totalInternalPrice, setTotalInternalPrice] = useState(0);
  const [totalTechnicalPrice, setTotalTechnicalPrice] = useState(0);
  const [constantTechnicalPrice, setConstantTechnicalPrice] = useState(0);
  const [constantInternalPrice, setConstantInternalPrice] = useState(0);
  const [memberVisible, setMemberVisible] = useState(false);
  const [message, setMessage] = useState("");

  const [checkboxNotification, setCheckboxNotification] = useState({
    checked_customer: false,
    checked_technician: false,
    checked_tpa: false,
  });

  const [checkboxForTPAEmails, setCheckboxForTPAEmails] = useState({
    checked_tpa_primary: false,
    checked_tpa_secondary: false,
  });

  const [notifyEmailArrError, setNotifyEmailArrError] = useState({
    member: false,
    tpa: false,
    technician: false,
  });

  const [timelines, setTimelines] = useState(0);
  const [timelinesHover, setTimelinesHover] = useState(-1);
  const [qualityHover, setQualityHover] = useState(-1);
  const [quality, setQuality] = useState(0);
  const [communicationsHover, setCommunicationsHover] = useState(-1);
  const [communications, setCommunications] = useState(0);
  const [notifyEmailArr, setnotifyEmailArr] = useState([]);
  const [tpaEmails, setTpaEmails] = useState([]);
  const [additionalItems, setadditionalItems] = useState([]);
  const [claimId, setClaimId] = useState("");
  const [location, setLocation] = useState();
  const [visible, setVisible] = useState(false);
  const [delayFor3Sec, setDelayFor3Sec] = useState(false);
  const [techPrice, setTechPrice] = useState([]);
  const [tpaPrice, setTpaPrice] = useState([]);
  const [memberEmailNot, setMemberEmailNot] = useState(null);
  const [techEmailNot, setTechEmailNot] = useState(null);
  const [tpaEmailNot, setTpaEmailNot] = useState(null);
  const [callAgain, setCallAgain] = useState(false);
  const [equal, setEqual] = useState(false);

  const { currentUser } = useSelector((state) => state.global);
  const {
    claim_info,
    dents,
    has_rating,
    personal_info,
    vehicle_info,
    claim_id,
    technician,
    additional_claim_items,
    emails,
    prev_technician,
    prev_number,
    prev_member_email,
    original_claim_info,
  } = useSelector((state) => state.claim);

  const params = new URLSearchParams(window.location.search);

  const getClaim = (id) => AppService.getParticularClaim(id);

  const { data: additionalClaimItems } = useQuery(
    "getAdditinalClaimItem",
    () => AppService.getAdditinalClaimItem(),
    {
      enabled:
        currentUser?.role !== ROLES.member.value
          ? Boolean(true)
          : Boolean(false),
    },
  );

  const { data: technicianByLocation, isSuccess } = useQuery(
    ["technician_by_location", technician, location],
    () => AppService.getTechnicianByLocationId(technician, location),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      keepPreviousData: false,
      enabled:
        currentUser?.role !== ROLES.member.value && technician
          ? Boolean(true)
          : Boolean(false),
    },
  );

  // ********************************************* START ********************************************************
  useQuery("claim", () => getClaim(params.get("id")), {
    onSuccess: (data) => {
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
      // console.log("called again n again");
    },

    refetchOnWindowFocus: false,

    enabled: !!callAgain,
  });

  // ********************************************* END   ********************************************************

  const post_claim = useMutation((data) => AppService.addClaim(data), {
    onSuccess: async (data) => {
      await dispatch(set_claim_id(data?._id));
      await dispatch(
        set_technician_notes_data({
          email: technicianByLocation?.email,
          insurance_claim_number: insurance_claim_number,
          full_name: technicianByLocation?.name,
        }),
      );
      NotificationStatus("success", "Successfully created claim.");
      if (status?.value === "completed") {
        setVisible(true);
      } else {
        setValue((prev) => prev + 1);
      }
    },
  });

  const post_member_info_claim = useMutation(
    (data) => AppService.memberInfoClaim(data),
    {
      onSuccess: async () => {
        NotificationStatus("success", "Successfully updated claim.");
        window.location.reload();
        setMessage("Thank you for confirming this information");
      },
    },
  );

  const addRating = useMutation((data) => AppService.addTechncianRating(data), {
    onSuccess: async () => {
      dispatch(add_rating({ has_rating: true }));
      NotificationStatus("success", "Successfully added rating.");
      await update_claim.mutate({
        _id: claimId,
        vehicle: vehicle_info,
        technician_location: technician,
        damages: {
          dents: dents,
        },
        has_rating: true,
      });
      setVisible(false);
      setValue((prev) => prev + 1);
    },
  });

  const update_claim = useMutation((data) => AppService.updateClaim(data), {
    onSuccess: async (data) => {
      dispatch(set_claim_id(data?._id));
      dispatch(set_prev_member_email(data?.personal_info?.email));
      if (data?.personal_info?.secondary_phone) {
        dispatch(set_prev_number(data?.personal_info?.secondary_phone));
      } else {
        dispatch(set_prev_number(data?.personal_info?.phone));
      }
      dispatch(
        set_prev_technician({
          technician_location: technician,
          ...technicianByLocation,
        }),
      );
      dispatch(add_technician_info(data?.technician_location));

      dispatch(
        set_technician_notes_data({
          email: technicianByLocation?.email,
          insurance_claim_number: insurance_claim_number,
          full_name: technicianByLocation?.name,
        }),
      );
      const claim_info = {
        claim_type: data?.claim_type,
        TPA: data?.TPA,
        insurance_claim_number: data?.insurance_claim_number,
        dd_claim_number: data?.dd_claim_number,
        status: makeStatus(data?.status),
        prev_status: data?.status,
        follow_up: data?.follow_up,
        date_recieved: data?.date_recieved,
        date_assigned: data?.date_assigned,
        date_scheduled: data?.date_scheduled,
        date_completed: data?.date_completed,
        tpa_billed: data?.tpa_billed,
        tech_invoice_recieved: data?.tech_invoice_recieved,
        has_updated_by_member: data?.has_updated_by_member,
      };
      dispatch(add_claim_info({ ...claim_info }));

      setClaimId(data?._id);
      NotificationStatus("success", "Successfully updated claim.");
      if (status?.value === "completed" && !has_rating && technician) {
        setVisible(true);
      } else {
        setCallAgain(true);
      }
    },
  });

  // console.log("additionalItems", additionalItems);

  // eslint-disable-next-line
  useEffect(() => {
    if (claim_id && additional_claim_items) {
      setadditionalItems([...additional_claim_items]);
      setTechPrice([...additional_claim_items]);
      setTpaPrice([...additional_claim_items]);
    } else {
      setadditionalItems([]);
    }
    const lat = Number(
      personal_info?.dealership_info_lat_lng?.lat
        ? personal_info?.dealership_info_lat_lng?.lat
        : personal_info?.personal_info_lat_lng?.lat,
    );
    const lng = Number(
      personal_info?.dealership_info_lat_lng?.lng
        ? personal_info?.dealership_info_lat_lng?.lng
        : personal_info?.personal_info_lat_lng?.lng,
    );
    setLocation({
      lat,
      lng,
    });
  }, []);

  const {
    claim_type,
    dd_claim_number,
    date_recieved,
    date_assigned,
    date_scheduled,
    date_completed,
    insurance_claim_number,
    status,
    TPA,
    follow_up,
    tpa_billed,
    tech_invoice_recieved,
  } = claim_info || "";

  const {
    address,
    apt_suite,
    email,
    first_name,
    last_name,
    phone,
    secondary_email,
    secondary_phone,
    d_name,
    d_phone,
    d_address,
    d_state,
  } = personal_info || "";

  // eslint-disable-next-line
  let { make, model, vin, year } = vehicle_info || "";

  // eslint-disable-next-line
  let {} = dents || [];

  const { checked_customer, checked_technician, checked_tpa } =
    checkboxNotification;
  const { checked_tpa_primary, checked_tpa_secondary } = checkboxForTPAEmails;

  useEffect(() => {
    calculateAdditionalPrice();
  }, [
    additionalItems.slice(0),
    isSuccess,
    technicianByLocation,
    TPA,
    technician,
  ]);

  const calculateAdditionalPrice = () => {
    let Techtotal = 0;
    let TPAtotal = 0;

    additionalItems.map((item) => {
      let techAdditionalClaimItems =
        technicianByLocation?.additional_claim?.find((claimItem) => {
          return claimItem?.category === item?.claim_items;
        });
      let tpaAdditionalClaimItems = TPA?.additional_claim?.find((claimItem) => {
        return claimItem?.category === item?.claim_items;
      });

      if (item?.price > 0) {
        Techtotal += item?.price;
        TPAtotal += item?.price;
      } else if (item?.technician_price) {
        Techtotal += item?.technician_price;
      } else if (techAdditionalClaimItems?.technician_price) {
        Techtotal += techAdditionalClaimItems?.technician_price;
      } else {
        Techtotal += additionalClaimItems?.find(
          (i) => i?._id === item?.claim_items,
        )?.price;
      }

      if (item?.internal_price) {
        TPAtotal += item?.internal_price;
      } else if (tpaAdditionalClaimItems?.internal_price) {
        TPAtotal += tpaAdditionalClaimItems?.internal_price;
      } else {
        TPAtotal += additionalClaimItems?.find(
          (i) => i?._id === item?.claim_items,
        )?.price;
      }
    });

    setTotalTechnicalPrice(
      constantTechnicalPrice + (isNaN(Techtotal) ? 0 : Techtotal),
    );

    setTotalInternalPrice(
      constantInternalPrice + (isNaN(TPAtotal) ? 0 : TPAtotal),
    );
  };

  // console.log("additionalItems", additionalItems);

  const handlecheckboxCategoryChange = (event, item) => {
    const itemExist =
      Array.isArray(additionalItems) &&
      additionalItems.findIndex((i) => i?.claim_items === item?._id);

    if (itemExist > -1) {
      additionalItems.splice(itemExist, 1);

      tpaPrice.splice(itemExist, 1);
      techPrice.splice(itemExist, 1);

      setadditionalItems([...additionalItems]);
      setTpaPrice([...tpaPrice]);
      setTechPrice([...techPrice]);
      return;
    } else {
      let techAdditionalClaimItems =
        technicianByLocation?.additional_claim?.find((claimItem) => {
          return claimItem?.category === item?._id;
        });
      let tpaAdditionalClaimItems = TPA?.additional_claim?.find((claimItem) => {
        return claimItem?.category === item?._id;
      });

      setadditionalItems([
        ...additionalItems,
        {
          claim_items: item?._id,
          technician_price: techAdditionalClaimItems?.technician_price,
          internal_price: tpaAdditionalClaimItems?.internal_price,
        },
      ]);
      setTechPrice([
        ...techPrice,
        {
          claim_items: item?._id,
          technician_price: techAdditionalClaimItems?.technician_price,
          internal_price: tpaAdditionalClaimItems?.internal_price,
        },
      ]);
      setTpaPrice([
        ...tpaPrice,
        {
          claim_items: item?._id,
          technician_price: techAdditionalClaimItems?.technician_price,
          internal_price: tpaAdditionalClaimItems?.internal_price,
        },
      ]);
    }
  };

  const amountChangeHandler = (e, id) => {
    let items = [...additionalItems];
    let techItems = [...techPrice];
    let tpaItems = [...tpaPrice];
    let additional = items?.find((i) => i?.claim_items === id);
    let techAdditional = techItems?.find((i) => i?.claim_items === id);
    let tpaAdditional = tpaItems?.find((i) => i?.claim_items === id);
    let index = items?.findIndex((i) => i?.claim_items === id);

    let anotherItems = items?.filter((i) => i?._id !== id);
    let techAdditionalItems = techItems?.filter((i) => i?._id !== id);
    let tpaAdditionalItems = tpaItems?.filter((i) => i?._id !== id);
    anotherItems[index] = { ...additional, price: Number(e.target.value) };
    techAdditionalItems[index] = {
      ...techAdditional,
      price: Number(e.target.value),
    };
    tpaAdditionalItems[index] = {
      ...tpaAdditional,
      price: Number(e.target.value),
    };
    setadditionalItems([...anotherItems]);
    setTechPrice([...techAdditionalItems]);
    setTpaPrice([...tpaAdditionalItems]);
  };

  const isEqualTo = () => {
    const obj = {
      ...claim_info,
      status: claim_info?.status?.value,
      prev_status: claim_info?.prev_status,
      TPA: claim_info?.TPA,
      damages: claim_info?.damages,
      date_assigned: claim_info?.date_assigned,
      date_completed: claim_info?.date_completed,
      date_recieved: claim_info?.date_recieved,
      date_scheduled: claim_info?.date_scheduled,
      tech_invoice_recieved: claim_info?.tech_invoice_recieved,
      tpa_billed: claim_info?.tpa_billed,
      follow_up: claim_info?.follow_up,
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
        phone: personal_info?.d_phone ? personal_info?.d_phone : null,
        address: personal_info?.d_address,
        apt_suite: personal_info?.d_apt_suite,
        city: personal_info?.d_city,
        state: personal_info?.d_state,
        zip_code: personal_info?.d_zip ? personal_info?.d_zip : null,
        dealership_info_lat_lng: {
          ...personal_info?.dealership_info_lat_lng,
        },
      },
      vehicle: vehicle_info ?? {},
      has_rating: has_rating,
      technician: technicianByLocation ?? null,
      total_internal_price: totalInternalPrice ?? 0,
      total_technician_price: totalTechnicalPrice ?? 0,
      additional_claim_items: additionalItems ?? [],
      additional: additionalClaimItems ?? [],
      emails: notifyEmailArr ?? [],
      technician_location: technician
        ? technicianByLocation?.locations?._id
        : null,
      prev_technician: prev_technician ?? null,
      prev_number: prev_number ?? null,
      prev_member_email: prev_member_email ?? null,
    };

    const id = params.get("id");
    if (!id) {
      obj.requested_by_member =
        claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
        personal_info?.email
          ? true
          : false;
      obj.requested_by_technician =
        claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
        technicianByLocation?.locations?._id
          ? true
          : false;
    }

    if (currentUser?.role !== ROLES.member.value && id) {
      let updatedClaim = {
        ...obj,
        _id: id,
      };

      if (claim_info?.prev_status !== claim_info?.status?.value) {
        updatedClaim.requested_by_member =
          claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
          personal_info?.email
            ? true
            : false;
        updatedClaim.requested_by_technician =
          claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
          technicianByLocation?.locations?._id
            ? true
            : false;
        updatedClaim.status_changed = true;
      } else {
        updatedClaim.status_changed = false;
      }

      const memberNumber = personal_info?.secondary_phone
        ? personal_info?.secondary_phone
        : personal_info?.phone;
      if (prev_number !== memberNumber) {
        updatedClaim.phone_changed = true;
        updatedClaim.requested_by_member =
          claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
          memberNumber
            ? true
            : false;
      } else {
        updatedClaim.phone_changed = false;
      }
      if (prev_member_email !== personal_info?.email) {
        updatedClaim.member_email_changed = true;
        updatedClaim.requested_by_member =
          claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
          personal_info?.email
            ? true
            : false;
      } else {
        updatedClaim.member_email_changed = false;
      }
      if (
        prev_technician?.technician_location !==
          technicianByLocation?.locations?._id &&
        claim_info.status.value === CLAIM_STATUS.in_process.value
      ) {
        updatedClaim.technician_changed = true;
        updatedClaim.requested_by_technician = technicianByLocation?.locations
          ?._id
          ? true
          : false;
      } else {
        updatedClaim.technician_changed = false;
      }

      let originalObj = {
        ...original_claim_info,

        personal_info: {
          ...original_claim_info?.personal_info,
        },
        dealership: {
          ...original_claim_info?.dealership,
        },
        additional: additionalClaimItems && additionalClaimItems,
        member_email_changed: updatedClaim.member_email_changed,
        phone_changed: updatedClaim.phone_changed,
        technician_changed: updatedClaim.technician_changed,
        status_changed: updatedClaim.status_changed,

        emails: emails || [],
        prev_number: prev_number,
        prev_status: claim_info?.prev_status,
        prev_member_email: prev_member_email,
        prev_technician: prev_technician,
        role: currentUser?.role,
        _id: id,
        total_internal_price: totalInternalPrice,
        total_technician_price: totalTechnicalPrice,
      };

      delete originalObj.last_requested_by_system_for_member;
      delete originalObj.last_requested_by_system_for_technician;
      delete originalObj.carvana_verified;
      delete updatedClaim.last_requested_by_system_for_member;
      delete updatedClaim.last_requested_by_system_for_technician;

      delete originalObj.profile;
      delete originalObj.last_updated_by;
      delete originalObj.__v;

      for (const key in updatedClaim) {
        if (
          updatedClaim[key] === undefined &&
          originalObj[key] !== "date_recieved" &&
          originalObj[key] !== "date_completed" &&
          originalObj[key] !== "date_scheduled" &&
          originalObj[key] !== "date_assigned" &&
          originalObj[key] !== "follow_up" &&
          originalObj[key] !== "tpa_billed" &&
          originalObj[key] !== "tech_invoice_recieved"
        ) {
          delete updatedClaim[key];
          delete originalObj[key];
        }

        if (typeof updatedClaim[key] === "object") {
          for (const key2 in updatedClaim[key]) {
            if (updatedClaim[key][key2] === undefined) {
              delete updatedClaim[key][key2];
              delete originalObj[key][key2];
            }
          }
        }
      }
      delete originalObj.created_at;
      delete updatedClaim.__v;
      // delete updatedClaim?.technician?.calculated_distance;
      // delete updatedClaim?.technician?.categories;
      delete updatedClaim?.role;
      delete originalObj?.role;
      if (updatedClaim?.additional_claim_items?.length === 0) {
        delete originalObj?.additional_claim_items;
        delete updatedClaim?.additional_claim_items;
      }
      delete updatedClaim?.additional;
      delete originalObj?.additional;

      if (!updatedClaim.hasOwnProperty("requested_by_member")) {
        delete originalObj.requested_by_member;
      }
      if (!updatedClaim.hasOwnProperty("requested_by_technician")) {
        delete originalObj.requested_by_technician;
      }

      console.log(
        "originalObj",
        originalObj,
      ); /* Updating the claim in the database. */

      console.log("updatedClaim", updatedClaim);

      if (isEqual({ ...updatedClaim }, { ...originalObj })) {
        return true;
      } else {
        return false;
      }
    }
  };

  useEffect(() => {
    if (isEqualTo()) {
      setEqual(true);
    } else {
      setEqual(false);
    }
  }, [additionalItems, technicianByLocation]);

  const addOnPrice = (dent) => {
    let { add_ons } = dent || {};
    let addOnsToSave = [];
    if (!Array.isArray(add_ons) || add_ons.length <= 0) return 0;

    const technician_dent_price = getTotalTechnicianPricePerDent(
      dent,
      technicianByLocation,
    );

    const tpa_dent_price = getTotalInternalPricePerDent(dent, TPA);

    add_ons?.map((add_on, index) => {
      let add_on_technician_price;
      let add_on_internal_price;

      add_on_internal_price = TPA?.tpa_misc_categories?.find(
        (t_a_on) => t_a_on?.misc_category_id?._id === add_on?.category?._id,
      )?.internal_price;
      add_on_technician_price =
        technicianByLocation?.technician_misc_categories?.find((t_a_on) => {
          return t_a_on?.misc_category_id === add_on?.category?._id;
        })?.technician_price;

      //
      if (add_on?.add_on_internal_price) {
        addOnsToSave[index] = {
          ...add_on,
          add_on_internal_price: add_on?.add_on_internal_price,
        };
      }
      if (add_on?.add_on_technician_price) {
        addOnsToSave[index] = {
          ...add_on,
          add_on_technician_price: add_on?.add_on_technician_price,
        };
      }
      if (!add_on?.add_on_internal_price && add_on_internal_price) {
        console.log("add_on_internal_price------->", add_on_internal_price);

        addOnsToSave[index] = {
          ...add_on,
          add_on_internal_price: calculatePercentage(
            add_on_internal_price,
            tpa_dent_price,
          ),
        };
      }
      if (!add_on?.add_on_technician_price && add_on_technician_price) {
        console.log("technician_dent_price------->", technician_dent_price);
        addOnsToSave[index] = {
          ...add_on,
          add_on_technician_price: calculatePercentage(
            add_on_technician_price,
            technician_dent_price,
          ),
        };
      }
      if (!add_on_technician_price || !add_on_internal_price) {
        addOnsToSave[index] = {
          ...add_on,
        };
      }
    });

    console.log("addOnsToSave", addOnsToSave);

    return addOnsToSave;
  };

  const calculateAdditionalPriceOfTechnician = (item) => {
    let Techtotal = 0;
    let techAdditionalClaimItems = technicianByLocation?.additional_claim?.find(
      (claimItem) => {
        return claimItem?.category === item?.claim_items;
      },
    );
    if (item?.price > 0) {
      Techtotal += item?.price;
    } else if (item?.technician_price) {
      Techtotal += item?.technician_price;
    } else if (techAdditionalClaimItems?.technician_price) {
      Techtotal += techAdditionalClaimItems?.technician_price;
    } else {
      Techtotal += additionalClaimItems?.find(
        (i) => i?._id === item?.claim_items,
      )?.price;
    }

    return isNaN(Techtotal) ? 0 : Techtotal;
  };

  const calculateAdditionalPriceOfTPA = (item) => {
    let TPAtotal = 0;
    let tpaAdditionalClaimItems = TPA?.additional_claim?.find((claimItem) => {
      return claimItem?.category === item?.claim_items;
    });
    if (item?.price > 0) {
      TPAtotal += item?.price;
    } else if (item?.internal_price) {
      TPAtotal += item?.internal_price;
    } else if (tpaAdditionalClaimItems?.internal_price) {
      TPAtotal += tpaAdditionalClaimItems?.internal_price;
    } else {
      TPAtotal += additionalClaimItems?.find(
        (i) => i?._id === item?.claim_items,
      )?.price;
    }

    return isNaN(TPAtotal) ? 0 : TPAtotal;
  };

  const submitClaim = async () => {
    try {
      if (
        !tpaEmailNot?.value &&
        !techEmailNot?.value &&
        !memberEmailNot?.value &&
        checked_customer &&
        checked_technician &&
        checked_tpa
      ) {
        setNotifyEmailArrError({
          member: true,
          tpa: true,
          technician: true,
        });
        return;
      } else if (!tpaEmailNot?.value && checked_tpa) {
        setNotifyEmailArrError({
          ...notifyEmailArrError,
          tpa: true,
        });
        return;
      } else if (!techEmailNot?.value && checked_technician) {
        setNotifyEmailArrError({
          ...notifyEmailArrError,
          technician: true,
        });
        return;
      } else if (!memberEmailNot?.value && checked_customer) {
        setNotifyEmailArrError({
          ...notifyEmailArrError,
          member: true,
        });
        return;
      }
      setDelayFor3Sec(true);
      setTimeout(() => {
        setDelayFor3Sec(false);
      }, 3000);
      const params = new URLSearchParams(window.location.search);

      const additional = [];

      additionalItems?.map((additionalItem) => {
        additional.push({
          ...additionalItem,
          technician_price:
            calculateAdditionalPriceOfTechnician(additionalItem),
          internal_price: calculateAdditionalPriceOfTPA(additionalItem),
        });
      });

      const d = [];
      // eslint-disable-next-line
      await dents?.map(async (dent) => {
        const technician_price = getTotalTechnicianPricePerDent(
          dent,
          technicianByLocation,
        );

        const internal_price = getTotalInternalPricePerDent(dent, TPA);

        const rAndIPriceForTechnician = getRAndIPriceForTechnician(
          dent,
          technicianByLocation,
          dent?.amount && dent?.amount,
          dent?.r_and_i[0],
        );

        const rAndIPriceForTPA = getRAndIPriceForTPA(
          dent,
          TPA,
          dent?.amount && dent?.amount,
          dent?.r_and_i[0],
        );

        const addOns = addOnPrice(dent);
        console.log("addOns", addOns);

        const obj = {
          technician_price,
          internal_price,
          technician_r_and_i_price: rAndIPriceForTechnician,
          tpa_r_and_i_price: rAndIPriceForTPA,
          add_ons: addOns?.length > 0 ? addOns : [],
        };

        d.push({
          ...dent,
          ...obj,
        });
      });

      console.log("dents", d);

      const obj = {
        ...claim_info,
        status: claim_info?.status?.value,
        prev_status: claim_info?.prev_status,
        TPA: claim_info?.TPA,
        date_assigned: claim_info?.date_assigned,
        date_completed: claim_info?.date_completed,
        date_recieved: claim_info?.date_recieved,
        date_scheduled: claim_info?.date_scheduled,
        tech_invoice_recieved: claim_info?.tech_invoice_recieved,
        tpa_billed: claim_info?.tpa_billed,
        follow_up: claim_info?.follow_up,
        damages: { dents: [...d] },
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
          phone: personal_info?.d_phone ? personal_info?.d_phone : null,
          address: personal_info?.d_address,
          apt_suite: personal_info?.d_apt_suite,
          city: personal_info?.d_city,
          state: personal_info?.d_state,
          zip_code: personal_info?.d_zip ? personal_info?.d_zip : null,
          dealership_info_lat_lng: {
            ...personal_info?.dealership_info_lat_lng,
          },
        },
        vehicle: vehicle_info ?? {},
        has_rating: has_rating,
        technician: technicianByLocation ?? null,
        total_internal_price: totalInternalPrice ?? 0,
        total_technician_price: totalTechnicalPrice ?? 0,
        additional_claim_items: additional ?? [],
        additional: additionalClaimItems ?? [],
        emails: notifyEmailArr ?? [],
        technician_location: technician
          ? technicianByLocation?.locations?._id
          : null,
        prev_technician: prev_technician ?? null,
        prev_number: prev_number ?? null,
        prev_member_email: prev_member_email ?? null,
      };

      const id = params.get("id");
      if (!id) {
        obj.requested_by_member =
          claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
          personal_info?.email
            ? true
            : false;
        obj.requested_by_technician =
          claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
          technicianByLocation?.locations?._id
            ? true
            : false;
      }

      if (currentUser?.role === ROLES.member.value) {
        setMemberVisible(true);
        return;
      } else if (currentUser?.role !== ROLES.member.value && id) {
        let updatedClaim = {
          ...obj,
          _id: id,
        };

        if (claim_info?.prev_status !== claim_info?.status?.value) {
          updatedClaim.requested_by_member =
            claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
            personal_info?.email
              ? true
              : false;
          updatedClaim.requested_by_technician =
            claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
            technicianByLocation?.locations?._id
              ? true
              : false;
          updatedClaim.status_changed = true;
        } else {
          updatedClaim.status_changed = false;
        }

        const memberNumber = personal_info?.secondary_phone
          ? personal_info?.secondary_phone
          : personal_info?.phone;
        if (prev_number !== memberNumber) {
          updatedClaim.phone_changed = true;
          updatedClaim.requested_by_member =
            claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
            memberNumber
              ? true
              : false;
        } else {
          updatedClaim.phone_changed = false;
        }
        if (prev_member_email !== personal_info?.email) {
          updatedClaim.member_email_changed = true;
          updatedClaim.requested_by_member =
            claim_info?.status?.value === CLAIM_STATUS.in_process.value &&
            personal_info?.email
              ? true
              : false;
        } else {
          updatedClaim.member_email_changed = false;
        }
        if (
          prev_technician?.technician_location !==
            technicianByLocation?.locations?._id &&
          claim_info.status.value === CLAIM_STATUS.in_process.value
        ) {
          updatedClaim.technician_changed = true;
          updatedClaim.requested_by_technician = technicianByLocation?.locations
            ?._id
            ? true
            : false;
        } else {
          updatedClaim.technician_changed = false;
        }

        let originalObj = {
          ...original_claim_info,

          personal_info: {
            ...original_claim_info?.personal_info,
          },
          dealership: {
            ...original_claim_info?.dealership,
          },
          additional: additionalClaimItems && additionalClaimItems,
          member_email_changed: updatedClaim.member_email_changed,
          phone_changed: updatedClaim.phone_changed,
          technician_changed: updatedClaim.technician_changed,
          status_changed: updatedClaim.status_changed,

          emails: emails || [],
          prev_number: prev_number,
          prev_status: claim_info?.prev_status,
          prev_member_email: prev_member_email,
          prev_technician: prev_technician,
          role: currentUser?.role,
          _id: id,
          total_internal_price: totalInternalPrice,
          total_technician_price: totalTechnicalPrice,
        };

        delete originalObj.last_requested_by_system_for_member;
        delete originalObj.last_requested_by_system_for_technician;
        delete originalObj.carvana_verified;
        delete updatedClaim.last_requested_by_system_for_member;
        delete updatedClaim.last_requested_by_system_for_technician;

        delete originalObj.profile;
        delete originalObj.last_updated_by;
        delete originalObj.__v;

        for (const key in updatedClaim) {
          if (
            updatedClaim[key] === undefined &&
            originalObj[key] !== "date_recieved" &&
            originalObj[key] !== "date_completed" &&
            originalObj[key] !== "date_scheduled" &&
            originalObj[key] !== "date_assigned" &&
            originalObj[key] !== "follow_up" &&
            originalObj[key] !== "tpa_billed" &&
            originalObj[key] !== "tech_invoice_recieved"
          ) {
            delete updatedClaim[key];
            delete originalObj[key];
          }

          if (typeof updatedClaim[key] === "object") {
            for (const key2 in updatedClaim[key]) {
              if (updatedClaim[key][key2] === undefined) {
                delete updatedClaim[key][key2];
                delete originalObj[key][key2];
              }
            }
          }
        }
        delete originalObj.created_at;
        delete updatedClaim.__v;
        // delete updatedClaim?.technician?.calculated_distance;
        // delete updatedClaim?.technician?.categories;
        delete updatedClaim?.role;
        delete originalObj?.role;

        if (!updatedClaim.hasOwnProperty("requested_by_member")) {
          delete originalObj.requested_by_member;
        }
        if (!updatedClaim.hasOwnProperty("requested_by_technician")) {
          delete originalObj.requested_by_technician;
        }
        if (isEqual({ ...updatedClaim }, { ...originalObj })) {
          setValue((prev) => prev + 1);
          return;
        } else {
          await update_claim.mutate(updatedClaim);
          dispatch(set_emails([...notifyEmailArr]));
          dispatch(add_additional_claim_items([...additionalItems]));
          return;
        }
      } else {
        if (!claim_id) {
          await post_claim.mutate(obj);
          dispatch(set_emails([...notifyEmailArr]));
          dispatch(add_additional_claim_items([...additionalItems]));
          return;
        }
        NotificationStatus("info", "Claim is already created");
        return setValue((prev) => prev + 1);
      }
    } catch (error) {
      // eslint-disable-next-line
      console.log(`error`, error);
    }
  };

  const handleNotificationChange = (e) => {
    if (e.target.name === "technician") {
      let notifyEmails = [...notifyEmailArr];
      let exists = notifyEmails?.find((item) => {
        return item?.type === e.target.name;
      });
      if (exists) {
        let filteredEmail = notifyEmails?.filter((item) => {
          return item?.email !== technicianByLocation?.email;
        });
        setnotifyEmailArr([...filteredEmail]);
        setCheckboxNotification({
          ...checkboxNotification,
          checked_technician: false,
        });
        setTechEmailNot(null);
        setNotifyEmailArrError({
          ...notifyEmailArrError,
          technician: false,
        });
        // eslint-disable-next-line
        return;
      }
      setCheckboxNotification({
        ...checkboxNotification,
        checked_technician: true,
      });
      notifyEmails?.push({
        email: technicianByLocation?.email,
        type: e.target.name,
      });
      setnotifyEmailArr([...notifyEmails]);
    }
    if (e.target.name === "customer") {
      let notifyEmails = [...notifyEmailArr];

      let exists = notifyEmails?.find((item) => {
        return item?.type === e.target.name;
      });
      if (exists) {
        let filteredEmail = notifyEmails?.filter((item) => {
          return item?.email !== personal_info?.email;
        });
        setnotifyEmailArr([...filteredEmail]);
        setCheckboxNotification({
          ...checkboxNotification,
          checked_customer: false,
        });
        setMemberEmailNot(null);
        setNotifyEmailArrError({
          ...notifyEmailArrError,
          member: false,
        });

        // eslint-disable-next-line
        return;
      }
      setCheckboxNotification({
        ...checkboxNotification,
        checked_customer: true,
      });
      // eslint-disable-next-line
      notifyEmails?.push({
        email: personal_info.email,
        type: e.target.name,
      });
      setnotifyEmailArr([...notifyEmails]);
    }
    if (e.target.name === "tpa") {
      let notifyEmails = [...notifyEmailArr];

      let exists = notifyEmails?.find((item) => {
        return item?.type === e.target.name;
      });
      if (exists) {
        let filteredEmail = notifyEmails?.filter((item) => {
          return item?.type !== e.target.name;
        });

        setnotifyEmailArr([...filteredEmail]);
        setCheckboxNotification({
          ...checkboxNotification,
          checked_tpa: false,
        });
        setTpaEmailNot(null);
        setNotifyEmailArrError({
          ...notifyEmailArrError,
          tpa: false,
        });

        return;
      }
      notifyEmails?.push({
        email: TPA?.email,
        secondary_email: TPA?.secondary_email,
        type: e.target.name,
        checked: e.target.checked,
      });
      setCheckboxNotification({
        ...checkboxNotification,
        checked_tpa: true,
      });
      setCheckboxForTPAEmails({
        ...checkboxForTPAEmails,
        checked_tpa_primary: true,
        checked_tpa_secondary: true,
      });
      setnotifyEmailArr([...notifyEmails]);
      let tpaEmails = [];
      tpaEmails.push({
        email: TPA?.email,
      });
      tpaEmails.push({
        secondary_email: TPA?.secondary_email,
      });
      setTpaEmails(tpaEmails);
    }
  };

  console.log("notifyEmailArr", notifyEmailArr);

  const handleTPAEmailsChange = (e) => {
    if (!checkboxNotification.checked_tpa) {
      return;
    }
    if (e.target.name === "primary") {
      let exists = [...tpaEmails]?.find((item) => {
        return item?.email === TPA?.email;
      });

      if (exists) {
        let filteredEmail = [...tpaEmails].filter((item) => {
          return item?.email !== TPA?.email;
        });
        let notifyEmail = [...notifyEmailArr];
        let index = notifyEmail?.findIndex((item) => {
          return item?.type === "tpa";
        });

        notifyEmail[index] = {
          ...notifyEmail[index],
          email: null,
        };
        setnotifyEmailArr([...notifyEmail]);
        setTpaEmails([...filteredEmail]);
        setCheckboxForTPAEmails({
          ...checkboxForTPAEmails,
          checked_tpa_primary: false,
        });
      } else {
        setCheckboxForTPAEmails({
          ...checkboxForTPAEmails,
          checked_tpa_primary: true,
        });
        let notiyEmails = [...notifyEmailArr];
        let index = notiyEmails?.findIndex((item) => {
          return item?.type === "tpa";
        });
        notiyEmails[index] = {
          ...notiyEmails[index],
          email: TPA?.email,
        };
        setnotifyEmailArr(
          // eslint-disable-next-line
          [...notiyEmails],
        );
        tpaEmails?.push({
          email: TPA?.email,
          type: e.target.name,
          primaryChecked: e.target.checked,
        });
      }
    } else {
      let exists = [...tpaEmails]?.find((item) => {
        return item?.secondary_email === TPA?.secondary_email;
      });
      if (exists) {
        let filteredEmail = [...tpaEmails]?.filter((item) => {
          return item?.secondary_email !== TPA?.secondary_email;
        });
        let notifyEmail = [...notifyEmailArr];
        let index = notifyEmail?.findIndex((item) => {
          return item?.type === "tpa";
        });
        notifyEmail[index] = {
          ...notifyEmail[index],
          secondary_email: null,
        };
        setnotifyEmailArr([...notifyEmail]);
        setTpaEmails([...filteredEmail]);
        setCheckboxForTPAEmails({
          ...checkboxForTPAEmails,
          checked_tpa_secondary: false,
        });
      } else {
        setCheckboxForTPAEmails({
          ...checkboxForTPAEmails,
          checked_tpa_secondary: true,
        });
        let notifyEmail = [...notifyEmailArr];
        let index = notifyEmail?.findIndex((item) => {
          return item?.type === "tpa";
        });
        notifyEmail[index] = {
          ...notifyEmail[index],
          secondary_email: TPA?.secondary_email,
        };
        setnotifyEmailArr([...notifyEmail]);
        tpaEmails?.push({
          secondary_email: TPA?.secondary_email,
          type: e.target.name,
          secondaryChecked: e.target.checked,
        });
      }
    }
  };

  const handleMemberUpdate = async () => {
    try {
      const params = new URLSearchParams(window.location.search);
      const obj = {
        damages: { dents: [...dents] },
        has_updated_by_member: true,
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
          personal_info_lat_lng: {
            ...personal_info?.personal_info_lat_lng,
          },
          secondary_email: personal_info?.secondary_email,
        },
        _id: params.get("id"),
      };
      if (!claim_info?.has_updated_by_member) {
        await post_member_info_claim.mutateAsync(obj);
      } else {
        NotificationStatus("Failed", "Please contact Dent Doc Team ");
      }
      setMemberVisible(false);
    } catch (error) {
      console.log(error);
    }
  };

  window.onscroll = handleScroll;

  const getAdditionalPrice = (id, price) => {
    let addPrice = additionalItems?.find((i) => i.claim_items === id)?.price;
    if (addPrice) {
      return addPrice;
    }
    return price;
  };

  return (
    <S.TabPanel6 claim_id={claim_id}>
      <div className="next-btn">
        <Button
          onClick={submitClaim}
          stickAtTop={stickAtTop}
          disabled={
            (currentUser?.role === ROLES.member.value &&
            claim_info?.has_updated_by_member
              ? true
              : false) || (delayFor3Sec ? true : false)
          }
          size={currentUser?.role === ROLES.member.value ? "medium" : "xsmall"}
          style={{
            padding:
              currentUser?.role === ROLES.member.value && "5px 10px 28px",
          }}
          value={
            new URLSearchParams(window.location.search).get("id") &&
            !equal &&
            currentUser?.role !== ROLES.member.value
              ? "Update"
              : currentUser?.role !== ROLES.member.value
              ? "Continue "
              : "Continue & Save Info"
          }
        />
      </div>
      <h1>{message}</h1>
      <Modal
        modalContent={
          <div style={{ padding: "10px" }} className="modal-content-main">
            <h1 className="modal-title">Are you sure?</h1>
            <div className="modal-text-input-container">
              <p className="modal-input-label">
                Once you saved these changes,they cannot be updated again unless
                you speak with the Dent Doc team member
              </p>
            </div>
            <div className="modal-btn-parent">
              <button
                style={{ marginTop: "25px" }}
                className="modal-light-btn"
                onClick={() => {
                  setMemberVisible(false);
                }}
                type="button"
              >
                Cancel
              </button>
              <div>
                <Button
                  style={{
                    marginTop: "25px",
                    fontSize: "12px",
                  }}
                  onClick={handleMemberUpdate}
                  size="small"
                  value="Continue & Update"
                />
              </div>
            </div>
          </div>
        }
        setVisible={setMemberVisible}
        visible={memberVisible}
        widthFit="width-fit"
      />
      <Modal
        changeWidth={true}
        modalContent={
          <div>
            <h1 style={{ fontSize: "20px", fontWeight: "bolder" }}>
              <b>{technicianByLocation?.business_name}</b>
            </h1>
            <div className="feedbacks">
              <div
                style={{
                  marginTop: "40px",
                }}
                className="feedback rating-star"
              >
                <p className="feedback-text">Timelines</p>
                <div className="flex flex-star">
                  <RatingStar
                    value={timelines}
                    name="timelines"
                    size="large"
                    onChangeActive={(event, newHover) => {
                      setTimelinesHover(newHover);
                    }}
                    onChange={(event, newValue) => setTimelines(newValue)}
                  />
                </div>
                <p className="feedback-text start-paragraph ash">
                  {timelines !== null &&
                    labels[timelinesHover !== -1 ? timelinesHover : timelines]}
                </p>
              </div>
              <div
                style={{
                  marginTop: "20px",
                }}
                className="feedback rating-star"
              >
                <p className="feedback-text">Quality {"  "}</p>
                <div className="flex flex-star">
                  <RatingStar
                    name="quality"
                    value={quality}
                    size="large"
                    onChangeActive={(event, newHover) => {
                      setQualityHover(newHover);
                    }}
                    onChange={(event, newValue) => setQuality(newValue)}
                  />
                </div>
                <p className="feedback-text start-paragraph ash">
                  {quality !== null &&
                    labels[qualityHover !== -1 ? qualityHover : quality]}
                </p>
              </div>
              <div
                style={{
                  marginTop: "20px",
                }}
                className="feedback rating-star"
              >
                <p className="feedback-text">Communications</p>
                <div className="flex flex-star">
                  <RatingStar
                    size="large"
                    name="communications"
                    onChangeActive={(event, newHover) => {
                      setCommunicationsHover(newHover);
                    }}
                    onChange={(event, newValue) => setCommunications(newValue)}
                    value={communications}
                  />
                </div>
                <p className="feedback-text start-paragraph ash">
                  {" "}
                  {communications !== null &&
                    labels[
                      communicationsHover !== -1
                        ? communicationsHover
                        : communications
                    ]}
                </p>
              </div>
            </div>
            <div className="feedback-btn start-btn">
              <Button
                onClick={async () => {
                  const obj = {
                    _id: technicianByLocation?._id,
                    timelines: timelines,
                    quality: quality,
                    communications: communications,
                    claim_id: claimId,
                  };
                  await addRating.mutate(obj);
                }}
                size="auto"
                value="Submit Rating"
              />
            </div>
          </div>
        }
        visible={visible}
        setVisible={setVisible}
        widthFit="width-fit"
      />

      <div className="flex j-btw panel6-flex">
        <div className="editables">
          <Editable
            content={
              <div className="editable-content">
                <div className="editable-grid">
                  <p className="text ash">Claim Type</p>
                  <p className="text black">{claim_type?.name}</p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">TPA</p>
                  <p className="text black">{TPA?.name}</p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Insurance Claim Number</p>
                  <p className="text black">{insurance_claim_number}</p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Dent Doc Claim Number</p>
                  <p className="text black">{dd_claim_number}</p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Status</p>
                  <p className="text black">{status?.label}</p>
                </div>

                <div className="editable-grid">
                  <p className="text ash">Date Follow Up</p>
                  <p className="text black">
                    {follow_up
                      ? moment(follow_up).format("MM/DD/YYYY")
                      : "-------------"}
                  </p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Date Received</p>
                  <p className="text black">
                    {date_recieved
                      ? moment(date_recieved).format("MM/DD/YYYY")
                      : "-------------"}
                  </p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Date Assigned</p>
                  <p className="text black">
                    {date_assigned
                      ? moment(date_assigned).format("MM/DD/YYYY")
                      : "-------------"}
                  </p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Date Completed</p>
                  <p className="text black">
                    {date_completed
                      ? moment(date_completed).format("MM/DD/YYYY")
                      : "-------------"}
                  </p>
                </div>

                <div className="editable-grid">
                  <p className="text ash">Date Scheduled</p>
                  <p className="text black">
                    {date_scheduled
                      ? moment(date_scheduled).format("MM/DD/YYYY")
                      : "-------------"}
                  </p>
                </div>

                <div className="editable-grid">
                  <p className="text ash">TPA Billed</p>
                  <p className="text black">
                    {tpa_billed
                      ? moment(tpa_billed).format("MM/DD/YYYY")
                      : "-------------"}
                  </p>
                </div>

                <div className="editable-grid no-border">
                  <p className="text ash">Tech. Invoice Recieved</p>
                  <p className="text black">
                    {tech_invoice_recieved
                      ? moment(tech_invoice_recieved).format("MM/DD/YYYY")
                      : "-------------"}
                  </p>
                </div>
              </div>
            }
            edit={
              currentUser?.role !== ROLES.member.value && (
                <button
                  onClick={() => setValue(0)}
                  className="edit"
                  type="button"
                >
                  {" "}
                  <img alt="edit" src={edit} /> Edit
                </button>
              )
            }
            title="Claim Info"
          />
          <Editable
            content={
              <div className="editable-content">
                <div className="editable-grid">
                  <p className="text ash">First Name</p>
                  <p className="text black">{first_name}</p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Last Name</p>
                  <p className="text black">{last_name}</p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Address</p>
                  <p className="text black">
                    {address} {apt_suite}
                  </p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Phone</p>
                  <p className="text black">{phone}</p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Secondary Phone</p>
                  <p className="text black">{secondary_phone}</p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Email</p>
                  <p className="text black">{email}</p>
                </div>
                <div className="editable-grid no-border">
                  <p className="text ash">Secondary Email</p>
                  <p className="text black">{secondary_email}</p>
                </div>
              </div>
            }
            edit={
              <button
                onClick={() => setValue(1)}
                className="edit"
                type="button"
              >
                {" "}
                <img alt="edit" src={edit} /> Edit
              </button>
            }
            title="Contact Info"
          />
          {currentUser?.role !== ROLES.member.value && (
            <Editable
              content={
                <div className="editable-content">
                  {" "}
                  <div className="editable-grid">
                    <p className="text ash">Name</p>
                    <p className="text black">{d_name && d_name}</p>
                  </div>
                  <div className="editable-grid">
                    <p className="text ash">Phone</p>
                    <p className="text black">{d_phone && d_phone}</p>
                  </div>
                  <div className="editable-grid">
                    <p className="text ash">Address</p>
                    <p className="text black">{d_address && d_address}</p>
                  </div>
                  <div className="editable-grid no-border">
                    <p className="text ash">State</p>
                    <p className="text black">{d_state && d_state}</p>
                  </div>
                </div>
              }
              edit={
                <button
                  onClick={() => setValue(1)}
                  className="edit"
                  type="button"
                >
                  {" "}
                  <img alt="edit" src={edit} /> Edit
                </button>
              }
              title="Dealership Info"
            />
          )}
          <Editable
            content={
              <div className="editable-content">
                {" "}
                <div className="editable-grid">
                  <p className="text ash">Vehicle Year</p>
                  <p className="text black">{year}</p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Make</p>
                  <p className="text black">{make}</p>
                </div>
                <div className="editable-grid">
                  <p className="text ash">Model</p>
                  <p className="text black">{model}</p>
                </div>
                <div className="editable-grid no-border">
                  <p className="text ash">VIN</p>
                  <p className="text black">{vin}</p>
                </div>
              </div>
            }
            edit={
              currentUser?.role !== ROLES.member.value && (
                <button
                  onClick={() => setValue(2)}
                  className="edit"
                  type="button"
                >
                  {" "}
                  <img alt="edit" src={edit} /> Edit
                </button>
              )
            }
            title="Vehicle Info"
          />
          <Editable
            content={
              currentUser?.role !== ROLES.member.value ? (
                <EditDamages
                  tpaPrice={tpaPrice}
                  techPrice={techPrice}
                  additionalClaimItems={additionalClaimItems}
                  additionalItems={additionalItems}
                  setTotalInternalPrice={setTotalInternalPrice}
                  totalTechnicalPrice={totalTechnicalPrice}
                  setConstantInternalPrice={setConstantInternalPrice}
                  setConstantTechnicalPrice={setConstantTechnicalPrice}
                  setTotalTechnicalPrice={setTotalTechnicalPrice}
                  totalInternalPrice={totalInternalPrice}
                  technician={technicianByLocation}
                />
              ) : (
                <MemberDamages />
              )
            }
            edit={
              <button
                onClick={() => {
                  currentUser?.role !== ROLES.member.value
                    ? setValue(3)
                    : setValue(2);
                }}
                className="edit"
                type="button"
              >
                {" "}
                <img alt="edit" src={edit} /> Edit
              </button>
            }
            title="Damages"
          />

          {currentUser?.role !== ROLES.member.value && technicianByLocation && (
            <Editable
              content={
                <TechnicianCard
                  {...technicianByLocation}
                  avg_rating={technicianByLocation?.avg_rating}
                  technician_id={technician}
                  categoryNames={technicianByLocation?.categories}
                  hasSelectButton={false}
                  claim_location={location}
                  columnSize={20}
                />
              }
              edit={
                <button
                  onClick={() => setValue(4)}
                  className="edit"
                  type="button"
                >
                  {" "}
                  <img alt="edit" src={edit} /> Edit
                </button>
              }
              title="Selected Technician"
            />
          )}
          {currentUser?.role !== ROLES.member.value && (
            <div className="additional">
              <p className="additional-heading">Additional Items</p>
              <div className="additional-content">
                {Array.isArray(additionalClaimItems) &&
                  additionalClaimItems.map((item, index) => (
                    <div
                      key={index}
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "100%",
                        display: "flex",
                        padding: "10px",
                        flexDirection: "column",
                      }}
                    >
                      <div className="flex lhs">
                        <CheckboxInput
                          checked={Boolean(
                            Array.isArray(additionalItems) &&
                              additionalItems.find((additional_item) => {
                                return (
                                  additional_item?.claim_items === item?._id
                                );
                              }),
                          )}
                          name={item?.name}
                          onChange={(e) =>
                            handlecheckboxCategoryChange(e, item)
                          }
                        />

                        <p className="label">{item?.name}</p>
                        <div className="flex">
                          <p className="currency">$</p>
                          {Array.isArray(additionalItems) && (
                            <div className="currency-input">
                              <Input.Wrapper>
                                <input
                                  className="input"
                                  disabled={
                                    [...additionalItems]?.find(
                                      (i) => i?.claim_items === item?._id,
                                    )
                                      ? false
                                      : true
                                  }
                                  onChange={(e) =>
                                    amountChangeHandler(e, item?._id)
                                  }
                                  min={0}
                                  step={1}
                                  defaultValue={getAdditionalPrice(
                                    item?._id,
                                    item?.price,
                                  )}
                                  maxLength={5}
                                  value={
                                    getAdditionalPrice(
                                      item?._id,
                                      item?.price,
                                    ) === item?.price
                                      ? ""
                                      : getAdditionalPrice(
                                          item?._id,
                                          item?.price,
                                        )
                                  }
                                  type="number"
                                />
                              </Input.Wrapper>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}
          {currentUser?.role !== ROLES.member.value && (
            <div className="additional email-notification">
              <p className="additional-heading">Email Notification</p>
              <div className="additional-content">
                <div className="lhs">
                  <div className="mb-6">
                    <div className="mb-6">
                      <div className="flex mb-6">
                        <CheckboxInput
                          checked={checked_customer}
                          name="customer"
                          onChange={handleNotificationChange}
                        />
                        <p className="label">Notify Customer</p>
                      </div>
                      <div style={{ width: "100%" }}>
                        <GenericDropDown
                          data={
                            technicianByLocation?._id
                              ? EMAIL_NOTIFICATIONS.customer
                              : EMAIL_NOTIFICATIONS.customer.filter(
                                  (item) =>
                                    item.value !== TECHNICIAN_ASSIGNMENT,
                                )
                          }
                          value={memberEmailNot}
                          error={
                            notifyEmailArrError?.member
                              ? "Please select an option"
                              : ""
                          }
                          disabled={!checked_customer}
                          onChange={(value) => {
                            const notifyArr = [...notifyEmailArr];
                            if (checked_customer) {
                              const index = notifyArr?.findIndex(
                                (n) => n?.type === "customer",
                              );
                              notifyArr[index] = {
                                ...notifyArr[index],

                                note: value?.value,
                              };
                              if (value?.value === CONFIRMATION_OF_CLAIM) {
                                notifyArr[index] = {
                                  ...notifyArr[index],

                                  confirmation_of_claim: true,
                                };
                              }
                              if (value?.value === TECHNICIAN_ASSIGNMENT) {
                                notifyArr[index] = {
                                  ...notifyArr[index],

                                  technician_assignment: true,
                                };
                              }
                            }

                            setMemberEmailNot(value);
                            setnotifyEmailArr(notifyArr);
                            setNotifyEmailArrError({
                              ...notifyEmailArrError,
                              member: false,
                            });
                          }}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex mb-6">
                      <CheckboxInput
                        checked={checked_technician}
                        disabled={technicianByLocation?._id ? false : true}
                        name="technician"
                        onChange={handleNotificationChange}
                      />
                      <p className="label">Notify Technician</p>
                    </div>
                    <div>
                      <GenericDropDown
                        data={EMAIL_NOTIFICATIONS.technician}
                        value={techEmailNot}
                        disabled={!checked_technician}
                        error={
                          notifyEmailArrError?.technician
                            ? "Please select an option"
                            : ""
                        }
                        onChange={(value) => {
                          const notifyArr = [...notifyEmailArr];
                          if (checked_technician) {
                            const index = notifyArr?.findIndex(
                              (n) => n?.type === "technician",
                            );
                            notifyArr[index] = {
                              ...notifyArr[index],

                              note: value?.value,
                            };
                            setnotifyEmailArr(notifyArr);
                          }
                          setTechEmailNot(value);
                          setnotifyEmailArr(notifyArr);
                          setNotifyEmailArrError({
                            ...notifyEmailArrError,
                            technician: false,
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className=" rhs">
                  <div className="flex mb-6">
                    <CheckboxInput
                      checked={checked_tpa}
                      name="tpa"
                      onChange={handleNotificationChange}
                    />
                    <p className="label">Notify TPA</p>
                  </div>
                  {checked_tpa && (
                    <>
                      <div className="flex mb-6">
                        <CheckboxInput
                          checked={checked_tpa && checked_tpa_primary}
                          name="primary"
                          onChange={handleTPAEmailsChange}
                        />
                        <p className="label">{TPA?.email}</p>
                      </div>
                      {TPA?.secondary_email && (
                        <div className="flex mb-6">
                          <CheckboxInput
                            checked={checked_tpa && checked_tpa_secondary}
                            name="secondary"
                            onChange={handleTPAEmailsChange}
                          />
                          <p className="label">{TPA?.secondary_email}</p>
                        </div>
                      )}
                    </>
                  )}
                  <GenericDropDown
                    data={EMAIL_NOTIFICATIONS.tpa}
                    value={tpaEmailNot}
                    disabled={!checked_tpa}
                    error={
                      notifyEmailArrError?.tpa ? "Please select an option" : ""
                    }
                    onChange={(value) => {
                      const notifyArr = [...notifyEmailArr];
                      if (
                        checked_tpa ||
                        checked_tpa_primary ||
                        checked_tpa_secondary
                      ) {
                        const index = notifyArr?.findIndex(
                          (n) => n?.type === "tpa",
                        );
                        notifyArr[index] = {
                          ...notifyArr[index],

                          note: value?.value,
                        };
                        setnotifyEmailArr(notifyArr);
                      }
                      setTpaEmailNot(value);
                      setnotifyEmailArr(notifyArr);
                      setNotifyEmailArrError({
                        ...notifyEmailArrError,
                        tpa: false,
                      });
                      // console.log(value);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </S.TabPanel6>
  );
}

TabPanel6.propTypes = {
  next: PropTypes.func,
  stickAtTop: PropTypes.bool,
  handleScroll: PropTypes.func,
  setValue: PropTypes.func,
  reviewInfoSubmitRef: PropTypes.func,
};

export default TabPanel6;
