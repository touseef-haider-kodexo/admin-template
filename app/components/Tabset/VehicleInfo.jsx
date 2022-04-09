import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useSelector, useDispatch } from "react-redux";
import { Client } from "@shaggytools/nhtsa-api-wrapper";
import { useQuery } from "react-query";

import * as D from "@/components/Input/styled";
import AppService from "@/services/api/app-service";
import MessageModal from "@/components/Modal/MessageModel";
import TextInput from "@/components/Input";
import IsLoadingHOC from "@/hoc/isLoading";
import { remove_dents } from "@/containers/PageClaims/actions";
import NotificationStatus from "@/components/Notification";

import GenericDropDown from "../DropDown/genericDropDown";
import MakeDropDown from "../DropDown/make";
import ModelDropDown from "../DropDown/modelDropDown";
import SelectCategoryDropDown from "../DropDown/SelectCategoryDropDown";

import * as S from "./styled";

function TabPanel({
  error,
  handleScroll,

  handleVehicleClick,
  make,
  model,
  setError,
  setLoading,
  setMake,
  setModel,
  setType,
  setVehicleYear,
  setVin,
  stickAtTop,
  type,
  vehicleInfoSubmitRef,
  vehicleYear,
  vin,
  ...props
}) {
  const dispatch = useDispatch();
  const { claim_id, vehicle_info } = useSelector((state) => state.claim);
  const { currentUser } = useSelector((state) => state.global);

  const [visible, setVisible] = useState(false);
  const [reviewed, setReviewed] = useState(null);
  const [typeData, setTypeData] = useState([]);
  const [yearData, setYearData] = useState([]);
  const [modelData, setModelData] = useState([]);

  const [vinChange, setVinChange] = useState(false);
  const getYears = () => AppService.getVehicleYears();

  useQuery(["vehicle_year"], () => getYears(), {
    onSuccess: (data) => {
      const vehicleData = data?.map((item) => ({
        value: item.year,
        label: item.year,
      }));
      setYearData(vehicleData);
    },
  });

  const getTypes = async (mod) => {
    const response = await Client.GetVehicleTypesForMakeId(mod?.Make_ID);
    const data = response?.Results;
    const vData = data?.map((item) => ({
      value: item.VehicleTypeId,
      label: item.VehicleTypeName,
    }));
    setTypeData(vData);
  };

  const getModels = async (makes) => {
    const response = await Client.GetModelsForMakeId(makes?.Make_ID);
    const data = response?.Results;
    setModelData(data);
  };

  useEffect(() => {
    if (make?.Make_ID) {
      getModels(make);
    }
  }, [make?.Make_ID]);

  useEffect(() => {
    if (model?.Make_ID) {
      getTypes(model);
    }
  }, [model?.Make_ID]);

  useEffect(() => {
    setVehicleYear({ label: vehicle_info?.year, value: vehicle_info?.year });
    setMake({ Make_Name: vehicle_info?.make });
    setModel({
      Model_Name: vehicle_info?.model,
    });
    setType({ value: vehicle_info?.type, label: vehicle_info?.type });
    setVin(vehicle_info?.vin);
  }, []);

  const getVehicleInfo = async (vinNo) => {
    setLoading(true);
    try {
      const { Results } = await Client.DecodeVinValues(vinNo);

      if (!Results[0]?.Make) {
        setError({
          ...error,
          vinError: true,
          message: "*Invalid Vin",
        });
      }
      const { Make, Model, ModelYear, VehicleType } = Results[0];

      if (
        Make !== make?.Make_Name ||
        Model !== model?.Model_Name ||
        Number(ModelYear) !== vehicleYear?.value ||
        VehicleType !== type?.label
      ) {
        if (claim_id && !reviewed) {
          setReviewed(Results[0]);
          setVinChange(true);
          setLoading(false);
          setVisible(true);
          return;
        }
        setLoading(false);
      } else {
        setReviewed(null);
        setLoading(false);
        return;
      }

      if (!Make || !Model || !ModelYear || !VehicleType) {
        setError({
          ...error,
          vinError: true,
          message: "*Invalid Vin",
        });
        setLoading(false);
        return;
      }
      setVehicleYear({
        value: ModelYear && Number(ModelYear),
        label: ModelYear && Number(ModelYear),
      });
      setError({
        ...error,
        vinError: false,
      });
      setMake({ Make_Name: Make, label: Make });
      setModel({ Model_Name: Model });
      setType({ label: VehicleType });
      dispatch(remove_dents([]));
    } catch (e) {
      setLoading(false);
      NotificationStatus("error", "Invalid Vin", "Please enter a valid VIN");
      setVehicleYear(null);
      setMake(null);
      setModel(null);
      setType(null);
    }
    setLoading(false);
  };

  const onChangeHandler = (text) => {
    if (text.length >= 11) {
      getVehicleInfo(text);
      setError({
        ...error,
        vinError: false,
        message: "",
      });
    }
    if (text.length < 11) {
      setError({
        ...error,
        vinError: true,
        message: "*Invalid Vin",
      });
    }
    if (text.length <= 0) {
      setVehicleYear(null);
      setMake(null);
      setModel(null);
      setType(null);
    }
    setVin(text);
  };

  const handleContinue = () => {
    if (vinChange) {
      const { Make, Model, ModelYear, VIN, VehicleType } = reviewed;

      setVin(VIN);
      setVehicleYear({
        value: ModelYear && Number(ModelYear),
        label: ModelYear && Number(ModelYear),
      });
      setMake({ Make_Name: Make, label: Make });
      setModel({ Model_Name: Model });
      setType({ label: VehicleType });
      setVisible(false);
      setVinChange(false);
      dispatch(remove_dents([]));
      setReviewed(null);

      return;
    }
    setMake(reviewed);
    setModel(null);
    setType(null);
    setVisible(false);
    setReviewed(null);

    dispatch(remove_dents([]));
  };

  const handleCancel = () => {
    setVisible(false);
    setReviewed(null);
  };
  window.onscroll = handleScroll;
  return (
    <S.TabPanel3 claim_id={claim_id} stickAtTop={stickAtTop}>
      <MessageModal
        handleCancel={handleCancel}
        handleContinue={handleContinue}
        messageTitle="dents"
        setVisible={setVisible}
        title="vehicle info"
        visible={visible}
        widthFit="width-fit"
      />
      <div className="next-btn">
        <button
          ref={vehicleInfoSubmitRef}
          className="save-btn"
          onClick={() => handleVehicleClick()}
          type="button"
        >
          Next
        </button>
      </div>
      <div className="gridy" />
      <div className="mb-15">
        <TextInput
          error={error.vinError ? error.message : ""}
          label="VIN"
          maxLength={17}
          onChange={(e) => onChangeHandler(e.target.value)}
          value={vin}
        />
      </div>
      <div className="gridy mb-15">
        <GenericDropDown
          data={Array.isArray(yearData) && yearData}
          error={error.vehicleError ? "Please select a year" : ""}
          label="Year"
          name="year"
          onChange={(option) => {
            setVehicleYear(option);
            setError({
              ...error,
              vehicleError: false,
              message: "",
            });
          }}
          value={vehicleYear}
        />
        <D.Select>
          <h6 className="input_label">Make</h6>
          <MakeDropDown
            disabled={!vehicleYear?.value ? Boolean(true) : Boolean(false)}
            error={error.makeError ? "Please select a make" : ""}
            label="Make"
            modelYear={vehicleYear?.value}
            name="make"
            onChange={(option) => {
              if (claim_id) {
                setReviewed(option);
                setVisible(true);
                return;
              }
              dispatch(remove_dents([]));
              setMake(option);
              setError({
                ...error,
                makeError: false,
                message: "",
              });
            }}
            value={make}
          />
        </D.Select>
        <ModelDropDown
          data={Array.isArray(modelData) && modelData}
          disabled={!make?.Make_Name ? Boolean(true) : Boolean(false)}
          error={error.modelError ? "Please select a model" : ""}
          label="Model"
          name="model"
          onChange={(option) => {
            setModel(option);
            setError({
              ...error,
              modelError: false,
              message: "",
            });
          }}
          value={model}
        />
        <GenericDropDown
          data={Array.isArray(typeData) && typeData}
          disabled={modelData?.length > 0 ? Boolean(false) : Boolean(true)}
          error={error.typeError ? "Please select a type" : ""}
          label="Type"
          name="type"
          onChange={(option) => {
            setType(option);
            setError({
              ...error,
              typeError: false,
              message: "",
            });
          }}
          value={type}
        />
        {(!currentUser?._id || window.location.href.includes("carvana")) && (
          <SelectCategoryDropDown
            error={error.claimTypeError ? "*Please select claim type" : ""}
            label="Claim Type"
            name="claim_type"
            onChange={(option) => {
              dispatch(remove_dents([]));
              props?.setClaimType(option);
            }}
            value={props?.claimType}
          />
        )}
      </div>
    </S.TabPanel3>
  );
}

TabPanel.propTypes = {
  setLoading: PropTypes.func.isRequired,
  vehicleInfoSubmitRef: PropTypes.func,
  handleScroll: PropTypes.func,
  stickAtTop: PropTypes.bool,
  handleVehicleClick: PropTypes.func,
  vehicleYear: PropTypes.objectOf(PropTypes.any),
  make: PropTypes.objectOf(PropTypes.any),
  setVehicleYear: PropTypes.func,
  setMake: PropTypes.func,
  model: PropTypes.objectOf(PropTypes.any),
  setModel: PropTypes.func,
  type: PropTypes.objectOf(PropTypes.any),
  setType: PropTypes.func,
  vin: PropTypes.string,
  setVin: PropTypes.func,
  error: PropTypes.objectOf(PropTypes.any),
  setError: PropTypes.func,
  setClaimType: PropTypes.func,
  claimType: PropTypes.objectOf(PropTypes.any),
};

export default IsLoadingHOC(TabPanel, ":loading");
