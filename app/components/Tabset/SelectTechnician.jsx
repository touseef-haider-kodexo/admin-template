/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";

import Toggler from "@/components/Toggler";
import AppService from "@/services/api/app-service";
import IsLoadingHOC from "@/hoc/isLoading";
import { add_technician_info } from "@/containers/PageClaims/actions";

import Button from "../Button";
import NotificationStatus from "../Notification";

import * as S from "./styled";
import MapContainer from "./Map";
import TechnicianCard from "./TechnicianCard";

function TabPanel5(props) {
  const dispatch = useDispatch();
  const state = useSelector((st) => st.claim);
  const { personal_info } = useSelector((st) => st.claim);
  const [technicainArr, setTechniciansArr] = useState([]);
  const [miles, setMiles] = useState(10);
  const [current] = useState(1);
  const [pageSize] = useState(3);
  const [categoryId, setcategoryId] = useState("6113e1a5944fd70474e694b0");
  const [isModifiedArr, setisModifiedArr] = useState(false);
  const [technicianLocId, setTechnicianLocId] = useState(null);
  const [firstTech, setFirstTech] = useState(null);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isShowAllTech, setisShowAllTech] = useState(false);
  const [location, setLocation] = useState();
  const [, setSelectedTechnician] = useState(null);
  const [shouldFetchTech, setShouldFetchTech] = useState(false);
  const [excludedIds, setExcludedIds] = useState([]);
  const [lastDistance, setLastDistance] = useState(0);
  const [mergeTechArr, setMergeTechArr] = useState([]);

  const catName = state?.claim_info?.claim_type?.name;
  const catId = state?.claim_info?.claim_type?._id;
  // eslint-disable-next-line
  useEffect(() => {
    setLocation({
      lat: Number(
        personal_info?.dealership_info_lat_lng?.lat
          ? personal_info?.dealership_info_lat_lng?.lat
          : personal_info?.personal_info_lat_lng?.lat,
      ),
      lng: Number(
        personal_info?.dealership_info_lat_lng?.lng
          ? personal_info?.dealership_info_lat_lng?.lng
          : personal_info?.personal_info_lat_lng?.lng,
      ),
    });
  }, []);

  const fetchedSortedTech = (query) =>
    AppService.getTechnicianSortedByDistance(query);

  const fetchTechByLoc = async (queryKey) =>
    AppService.getTechnicianByLocationId(queryKey[0], queryKey[1]);

  // eslint-disable-next-line
  const { isLoading, data: sortedTechnicians } =
    useQuery(
      [
        "sorted_technicain",
        pageSize,
        isShowAllTech,
        location,
        categoryId,
        excludedIds,
        lastDistance,
      ],
      () =>
        fetchedSortedTech({
          ...location,
          miles,
          category: categoryId,
          minDistance: lastDistance,
          excludedIds: JSON.stringify(excludedIds),
          pageSize,
          current,
          isShowAllTech,
        }),
      {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        keepPreviousData: true,
        enabled:
          location?.lat && location?.lng ? Boolean(true) : Boolean(false),
        onSettled: ({ technicians }) => {
          if (Array.isArray(technicians) && technicians.length > 0) {
            setTechniciansArr(technicians);
            setMergeTechArr([...mergeTechArr, ...technicians]);
          }
        },
      },
    ) || [];

  const { total } = sortedTechnicians || {};

  const { data: technicainWithLoc } = useQuery(
    ["technician_by_location", technicianLocId, location],
    () => fetchTechByLoc([technicianLocId, location]),
    {
      onSuccess: (tech) => {
        console.log(`tech on success`, tech);
        setShouldFetchTech(false);
        setSelectedTechnician(tech);
      },

      enabled: shouldFetchTech ? Boolean(true) : Boolean(false),
      refetchOnMount: Boolean(false),
      refetchOnWindowFocus: Boolean(false),
      keepPreviousData: Boolean(true),
    },
  );
  useEffect(() => {
    if (isShowAllTech) {
      setMiles("");
      setcategoryId("");
      return;
    }
    setMiles(800);
    setcategoryId(catId);
  }, [isShowAllTech]);

  // use effect to fetch technician when tab set comes back to active
  useEffect(() => {
    if (state?.technician) {
      setTechnicianLocId(state?.technician);
      setShouldFetchTech(true);
    }
  }, []);

  // modify the array when tech. select from map.
  useEffect(() => {
    if (!Array.isArray(technicainArr) && !isModifiedArr) return;
    const index = technicainArr.findIndex((item) => item?._id === firstTech);
    if (index === -1) return;
    const copyTech = [...technicainArr];
    const temp = copyTech[0];
    copyTech[0] = copyTech[index];
    copyTech[index] = temp;
    setTechniciansArr(copyTech);
    setisModifiedArr(false);
  }, [isModifiedArr]);

  const handleContinue = async () => {
    dispatch(add_technician_info(technicianLocId ?? null));
    props.setValue((prevState) => prevState + 1);
  };

  const saveLastTechnicianStatus = () => {
    setExcludedIds(mergeTechArr.map((tech) => tech.locations._id));
    if (isShowAllTech) {
      setLastDistance(
        technicainArr?.at(-1)?.calculated_distance?.distance || 200,
      );
    } else {
      setLastDistance(0);
    }
  };

  useEffect(() => {
    const filteredArray = [...mergeTechArr]?.filter((t) =>
      t?.categories?.find((i) => i?.name === catName),
    );
    if (!isShowAllTech) {
      setMergeTechArr(filteredArray);
    }
  }, [isShowAllTech]);

  window.onscroll = props?.handleScroll;
  return (
    <S.TabPanel5 stickAtTop={props?.stickAtTop} claim_id={state?.claim_id}>
      <div className="next-btn">
        <button
          type="submit"
          ref={props.techInfoSubmitRef}
          onClick={handleContinue}
          className="save-btn"
        >
          Continue
        </button>
      </div>
      <div className="map">
        <MapContainer
          setTechnicianLocId={setTechnicianLocId}
          setSelectedTechnician={setSelectedTechnician}
          setFirstTech={setFirstTech}
          center={location}
          zoom={15}
          tech={technicainArr ?? []}
          setisModifiedArr={setisModifiedArr}
          technicianLocId={technicianLocId}
          isModifiedArr={isModifiedArr}
          allFetchedTech={technicainArr}
          isButtonPressed={isButtonPressed}
        />
      </div>
      <div className="slider">
        <div className="sorts">
          {!isLoading && (
            <Toggler
              label="Show All Technicians"
              onChange={() => {
                setisShowAllTech(!isShowAllTech);
                saveLastTechnicianStatus();
              }}
              value={isShowAllTech}
            />
          )}
        </div>
      </div>

      <div className="technicain-card-container">
        {technicainWithLoc && (
          <TechnicianCard
            setTechnicianLocId={setTechnicianLocId}
            setSelectedTechnician={setSelectedTechnician}
            technicianLocId={technicianLocId}
            categoryNames={technicainWithLoc?.categories}
            claim_location={location}
            claim_id={state?.claim_id}
            setIsButtonPressed={setIsButtonPressed}
            {...technicainWithLoc}
          />
        )}
        {Array.isArray(mergeTechArr)
          ? mergeTechArr
              ?.filter(
                (tech) =>
                  tech?.locations?._id !== technicainWithLoc?.locations?._id,
              )
              .map((val) => (
                <TechnicianCard
                  key={val?._id}
                  categoryNames={val?.categories}
                  setTechnicianLocId={setTechnicianLocId}
                  setSelectedTechnician={setSelectedTechnician}
                  technicianLocId={technicianLocId}
                  claim_id={state?.claim_id}
                  disabled={
                    val?.categories?.find((c) => c?.name === catName)
                      ? Boolean(false)
                      : Boolean(true)
                  }
                  claim_location={location}
                  setIsButtonPressed={setIsButtonPressed}
                  {...val}
                />
              ))
          : null}
        <div className="load-btn-container">
          <Button
            onClick={() => {
              if (total < 10) {
                NotificationStatus("warning", "No more technicians available");
                return;
              }
              saveLastTechnicianStatus();
              // setpageSize((prev) => prev + 4);
            }}
            hasBlueBackground={false}
            size="xsmall"
            value="Load More"
          />
        </div>
      </div>
    </S.TabPanel5>
  );
}

TabPanel5.propTypes = {
  setLoading: PropTypes.func,
  techInfoSubmitRef: PropTypes.func,
  setValue: PropTypes.func,
  stickAtTop: PropTypes.bool,
  handleScroll: PropTypes.func,
};

export default IsLoadingHOC(TabPanel5);
