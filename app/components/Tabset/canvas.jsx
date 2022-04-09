import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";

import { add_dent, is_reset_index } from "@/containers/PageClaims/actions";
import Mark from "@/assets/images/mark.svg";
import { ROLES } from "@/utils/constants";

import { vehicleImageURL } from "../../utils/axios";

import ImageMapper from "./canvasLib";

const CanvasView = ({ image: canvasImage, setcurrent }) => {
  // eslint-disable-next-line
  let Markers = new Array();

  // eslint-disable-next-line
  const Marker = function () {
    // eslint-disable-next-line
    this.Sprite = new Image();
    // eslint-disable-next-line
    this.Sprite.src = `${Mark}`;
    // eslint-disable-next-line
    this.Width = 10;
    // eslint-disable-next-line
    this.Height = 15;
    // eslint-disable-next-line
    this.XPos = 0;
    // eslint-disable-next-line
    this.YPos = 0;
  };

  const dispatch = useDispatch();

  const claim = useSelector((state) => state.claim);
  const { currentUser } = useSelector((state) => state.global);
  const mapperRef = useRef(null);
  const area = canvasImage?.MAP?.areas;

  const [positions, setpostions] = useState([]);

  function reDraw() {
    Markers = [];
    // eslint-disable-next-line
    const canvas = mapperRef?.current?.canvas;
    const ctx = canvas?.getContext("2d");
    const marker = new Marker();
    marker.XPos = positions[0]?.x;
    marker.YPos = positions[0]?.y;
    Markers.push(marker);
    draw(ctx);

    if (Array.isArray(claim?.dents) && claim?.dents.length === 0) {
      setpostions([]);
      return;
    }

    const marked_coordinates =
      (Array.isArray(claim?.dents) &&
        claim?.dents
          .filter((dent) => Number(dent?.canvas_id) === canvasImage?.id)
          .map((dent) => dent?.marked_coordinates)) ||
      [];

    if (marked_coordinates.length > 0) {
      setpostions(marked_coordinates);
      return;
    }
    setpostions([]);
  }

  useEffect(() => {
    reDraw();
  }, []);

  function resetCanvas() {
    // eslint-disable-next-line
    if (claim?.is_reset_index === canvasImage?.id) {
      const canvas = mapperRef?.current?.canvas;
      const ctx = canvas?.getContext("2d");
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  useEffect(() => {
    if (claim?.is_reset_index === canvasImage?.id) {
      resetCanvas();
      reDraw();
    }
  }, [claim?.dents]);

  useEffect(() => {
    if (positions.length < 0) {
      Markers = [];
    }
    const canvas = mapperRef?.current?.canvas;
    const ctx = canvas?.getContext("2d");
    setTimeout(() => {
      if (Array.isArray(positions)) {
        for (let j = 0; j < positions.length; j += 1) {
          const pos = positions[j];
          for (let i = 0; i < pos.length; i += 1) {
            const marker = new Marker();
            marker.XPos = pos[i]?.x;
            marker.YPos = pos[i]?.y;
            Markers.push(marker);
          }
          draw(ctx);
        }
      }
    }, 300);
  }, [positions?.length]);

  function getMousePos(canvas, evt) {
    const rect = canvas?.getBoundingClientRect();
    return {
      x: ((evt.clientX - rect.left) / (rect.right - rect.left)) * canvas.width,
      y: ((evt.clientY - rect.top) / (rect.bottom - rect.top)) * canvas.height,
    };
  }

  function calculateDents(selectedArea, index, mouse) {
    const canvasEle = mapperRef?.current?.canvas;
    // eslint-disable-next-line
    let { x, y } = getMousePos(canvasEle, mouse);

    if (selectedArea) {
      const foundObj = area?.find((val) => val?._id === selectedArea?._id);

      // eslint-disable-next-line
      const cords = Object.assign(
        {},
        {},
        {
          x,
          y,
        },
      );

      const obj = {
        ...foundObj,
        canvas_id: canvasImage?.id,
        description: "",
        internal_price: "",
        technician_price: "",
        add_ons: [],
        before_images: [],
        after_images: [],
        marked_coordinates: [cords],
        no_of_dents: 1,
        is_dent_saved: false,
        is_reset_index: false,
        saved: false,
        is_added_by_member:
          currentUser?.role === ROLES.member.value
            ? Boolean(true)
            : Boolean(false),
        is_added_by_tpas:
          currentUser?.role === ROLES.tpaAdmin.value ||
          currentUser?.role === ROLES.tpaAccountManager.value
            ? Boolean(true)
            : Boolean(false),
      };
      if (currentUser?.role === ROLES.member.value) {
        return obj;
      }
      return { ...obj, created_by: currentUser };
    }
    return {};
  }

  // When the user clicks their mouse on our canvas run this code
  function mouseClicked(selectedArea, index, mouse) {
    const canvas = mapperRef?.current?.canvas;
    const ctx = canvas?.getContext("2d");

    // eslint-disable-next-line
    let { x, y } = getMousePos(canvas, mouse);

    const marker = new Marker();
    marker.XPos = x;
    marker.YPos = y;
    marker.Sprite = new Image();
    marker.Sprite.src = `${Mark}`;
    marker.Width = 10;
    marker.Height = 15;

    Markers.push(marker);

    draw(ctx);
  }

  function draw(ctx) {
    for (let i = 0; i < Markers.length; i += 1) {
      const tempMarker = Markers[i];
      ctx?.drawImage(
        tempMarker.Sprite,
        tempMarker.XPos,
        tempMarker.YPos,
        tempMarker.Width,
        tempMarker.Height,
      );
    }
  }

  return (
    <div
      style={{
        overflow: "scroll",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <ImageMapper
        ref={mapperRef}
        src={`${vehicleImageURL}${canvasImage?.image}`}
        width={500}
        id={canvasImage?._id}
        imgWidth={800}
        map={canvasImage?.MAP}
        onClick={(areas, index, event) => {
          if (
            currentUser?.role !== ROLES.member.value ||
            (currentUser?.role === ROLES.member.value &&
              !claim?.claim_info?.has_updated_by_member)
          ) {
            mouseClicked(areas, index, event);
            const result = calculateDents(areas, index, event);
            setcurrent(claim?.dents?.length);
            dispatch(add_dent(result));
            dispatch(is_reset_index(null));
          }
        }}
      />
    </div>
  );
};

CanvasView.propTypes = {
  image: PropTypes.objectOf(PropTypes.any),
  setcurrent: PropTypes.func,
};

export default CanvasView;
