/* eslint-disable indent */
import React, { useState } from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";

import AppService from "@/services/api/app-service";

// eslint-disable-next-line
import Custom from "./custom";

const TpaDropDown = ({
  onChange,
  defaultValue,
  value,
  disabled,
  error,
  isClearable,
}) => {
  const [fetchingData, setFetchingData] = useState(false);
  const [current, setCurrent] = useState(1);
  const [inputValue, setinputValue] = useState("");
  const [options, setOptions] = useState([]);

  const fetchSearchTpa = (c) => AppService.searchTpa(c);
  // hello
  const fetchPaginatedTpa = (currentPage, pageSize = 10) =>
    AppService.getTpas({ current: currentPage, pageSize });
  const fetchSingleTpa = (id) => AppService.getTpa(id);
  useQuery(["fetchPaginatedTpa", current], () => fetchPaginatedTpa(current), {
    enabled: !disabled,
    onSettled: (data) => {
      setOptions((prev) => [...prev, ...data?.tpas] || []);
    },
  });

  const defaultTpa =
    useQuery(
      ["getSingleTpa", defaultValue?._id],
      () => fetchSingleTpa(defaultValue?._id),
      {
        enabled: !!defaultValue,
        retry: 0,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
      },
    ) || null;

  const changeOptionsData = () => {
    setCurrent((prev) => prev + 1);
    setFetchingData(true);
    setTimeout(() => {
      if (inputValue.length > 0) {
        fetchSearchTpa(inputValue).then((data) => {
          setOptions(data);
          setFetchingData(false);
        });
      }
      setFetchingData(false);
    }, 1000);
  };

  const filterNames = () =>
    fetchSearchTpa(inputValue)
      .then((data) => {
        console.log(`data`, data);
        setOptions(data);
        return data;
      })
      .catch((err) => {
        console.log(`error`, err);
      });

  const promiseOptions = () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterNames(inputValue));
      }, 1000);
    });

  return (
    <div>
      <Custom
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
        isClearable={isClearable}
        options={options}
        value={
          typeof value !== "object"
            ? [
                {
                  name: defaultTpa?.data?.name,
                  _id: defaultTpa?.data?._id,
                },
              ]
            : value
        }
      />
    </div>
  );
};

TpaDropDown.propTypes = {
  onChange: PropTypes.func,
  defaultValue: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  disabled: PropTypes.bool,
  error: PropTypes.string,
  isClearable: PropTypes.bool,
};

TpaDropDown.defaultProps = {
  onChange: () => {},
  defaultValue: "",
  value: "",
  disabled: false,
  isClearable: true,
  error: "",
};

export default TpaDropDown;
