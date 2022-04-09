import React, { useState } from "react";
import PropTypes from "prop-types";
import { Client } from "@shaggytools/nhtsa-api-wrapper";

import Generic from "./vehicleApiDropDown";

const MakeDropDown = ({
  onChange,
  defaultValue,
  value,
  disabled,
  error,
  modelYear,
}) => {
  const [fetchingData, setFetchingData] = useState(false);
  const [inputValue, setinputValue] = useState("");
  const [options, setOptions] = useState([]);

  const fetchSearch = (c) =>
    Client.GetModelsForMakeYear({ make: c, modelYear });

  const removeDuplicates = (arr) => {
    const list = arr.reduce((accumulator, thing) => {
      if (
        !accumulator.filter(
          (duplicate) => thing.Make_Name === duplicate.Make_Name,
        )[0]
      ) {
        accumulator.push(thing);
      }
      return accumulator;
    }, []);
    return list;
  };

  const changeOptionsData = () => {
    setFetchingData(true);
    setTimeout(() => {
      fetchSearch(inputValue).then((data) => {
        setOptions(removeDuplicates(data?.Results));
        setFetchingData(false);
      });
      setFetchingData(false);
    }, 1000);
  };

  const filterNames = () =>
    fetchSearch(inputValue)
      .then((data) => removeDuplicates(data?.Results))
      .catch((err) => console.log(`error`, err));

  const promiseOptions = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterNames());
      }, 1000);
    });

  return (
    <div>
      <Generic
        disabled={disabled}
        error={error}
        changeOptionsData={changeOptionsData}
        fetchingData={fetchingData}
        loadOptions={promiseOptions}
        onChange={onChange}
        defaultValue={defaultValue}
        onInputChangeHandler={(val) => {
          setinputValue(val);
        }}
        options={options}
        value={value}
      />
    </div>
  );
};

MakeDropDown.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  modelYear: PropTypes.string,
};

MakeDropDown.defaultProps = {
  onChange: () => {},
  defaultValue: "",
  value: "",
  disabled: false,
  error: "",
};

export default MakeDropDown;
