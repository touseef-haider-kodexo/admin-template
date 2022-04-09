/* eslint-disable indent */
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";

import * as S from "./styled";
import RatingStar from "./RatingStar";

import { baseImageURL } from "@/utils/axios";
import Pointer from "@/assets/images/pointer.png";

const mapStyles = {
  height: "40vh",
  width: "95%",
};

export const MapContainer = ({
  center,
  google,
  isModifiedArr,
  setFirstTech,
  technicianLocId,
  setisModifiedArr,
  setTechnicianLocId,
  setSelectedTechnician,
  tech,
  zoom,
}) => {
  const [showingInfoWindow, setShowingInfoWindow] = useState(false);
  const [activeMarker, setActiveMarker] = useState({});
  const [technician, setTechnician] = useState(null);
  const [isMapLoaded, setisMapLoaded] = useState(false);

  let markers = [];

  const onMarkerClick = (val, marker, e, isButtonClicked) => {
    setActiveMarker(marker);
    setFirstTech(val?.detail?.locations?._id);
    setTechnicianLocId(val?.detail?.locations?._id);
    setSelectedTechnician(val?.detail);
    setTechnician(val.detail);
    setShowingInfoWindow(true);
    if (!isButtonClicked) {
      setisModifiedArr(true);
    } else {
      setisModifiedArr(false);
    }
    // !isButtonClicked ? setisModifiedArr(true) : setisModifiedArr(false);
  };

  // eslint-disable-next-line
  const onClose = (props) => {
    if (showingInfoWindow) {
      setShowingInfoWindow(false);
      setActiveMarker(null);
    }
  };

  // select the technician on map when select tech. button is pressed.
  useEffect(() => {
    if (!isModifiedArr && technicianLocId) {
      const marker = markers.find(
        ({ detail }) => detail?.locations?._id === technicianLocId,
      );
      if (marker) {
        // eslint-disable-next-line
        marker["animation"] = "1";
        onMarkerClick({ detail: marker.detail }, marker, null, true);
      }
    }
  }, [technicianLocId]);

  // eslint-disable-next-line
  return (
    <>
      <Map
        google={google}
        zoom={zoom}
        style={mapStyles}
        initialCenter={center}
        onIdle={() => setisMapLoaded(true)}
      >
        {isMapLoaded && tech
          ? tech.map((i) => (
              <Marker
                ref={(e) => {
                  if (e) {
                    markers = [...markers, e.marker];
                  }
                }}
                key={i?._id}
                name={i?.name}
                detail={i}
                icon={{
                  url: Pointer,
                  // eslint-disable-next-line
                  scaledSize: new google.maps.Size(40, 40),
                }}
                title={i?.name}
                animation={
                  // eslint-disable-next-line
                  activeMarker
                    ? i?.name === activeMarker.title
                      ? "1"
                      : "0"
                    : "0"
                }
                onClick={onMarkerClick}
                position={{
                  lat: i?.locations?.location?.coordinates[1],
                  lng: i?.locations?.location?.coordinates[0],
                }}
              />
            ))
          : null}
        <InfoWindow
          marker={activeMarker}
          visible={showingInfoWindow}
          onClose={onClose}
          position={{
            lat: technician?.locations.location?.coordinates[1],
            lng: technician?.locations.location?.coordinates[0],
          }}
        >
          <S.InfoWindow>
            <div className="profile-info-container">
              <img
                alt="profile"
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
                src={`${baseImageURL}${technician?.business_logo}`}
              />
              <p>{technician?.business_name}</p>
              <div className="rating-container ">
                <RatingStar
                  disabled={Boolean(true)}
                  size="small"
                  defaultValue={technician?.avg_rating}
                />
                <div>({technician?.ratings?.length})</div>
              </div>
            </div>

            <div>{technician?.locations?.business_address_one}</div>
          </S.InfoWindow>
        </InfoWindow>
      </Map>
    </>
  );
};

MapContainer.propTypes = {
  tech: PropTypes.arrayOf(PropTypes.object),
  zoom: PropTypes.number,
  google: PropTypes.shape({}),
  center: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  isModifiedArr: PropTypes.bool,
  setSelectedTechnician: PropTypes.func,
  setTechnicianLocId: PropTypes.func,
  setisModifiedArr: PropTypes.func,
  setFirstTech: PropTypes.func,
  technicianLocId: PropTypes.string,
};

MapContainer.defaultProps = {
  tech: [],
  zoom: 12,
  center: {
    lat: 24.89761942811483,
    lng: 67.07740932557202,
  },
  isModifiedArr: false,
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyCT8tgryBs-D7w05IHPMmHkFeZwxMfFIuE",
})(MapContainer);
