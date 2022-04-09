/* eslint-disable*/
import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import Toggle from "./Toggle";
import * as S from "./styled";

import process from "@/assets/images/process.svg";
import pending from "@/assets/images/pending.svg";
import registered from "@/assets/images/registered.svg";
import scheduled from "@/assets/images/scheduled.svg";
import followup from "@/assets/images/followup.svg";
import closed from "@/assets/images/closed.svg";
import complete from "@/assets/images/complete.svg";
import AppService from "@/services/api/app-service";
import { ROLES } from "../../utils/constants";

const statusSchema = [
  {
    img: process,
    name: "In Process",
    count: 0,
    id: "in_process",
    class: "process",
  },

  {
    img: pending,
    name: "Pending",
    count: 0,
    id: "pending",
    class: "pending",
  },

  {
    img: registered,
    name: "Pending Verification",
    count: 0,
    id: "pending_verification",
    class: "registered",
  },
  {
    img: scheduled,
    name: "Scheduled",
    count: 0,
    id: "scheduled",
    class: "scheduled ",
  },
  {
    img: followup,
    name: "Follow Up",
    count: 0,
    id: "follow_up",
    class: "followup",
  },
  {
    img: closed,
    name: "Closed",
    count: 0,
    id: "closed",
    class: "closed",
  },
  {
    img: complete,
    name: "Complete",
    count: 0,
    id: "completed",
    class: "complete",
  },
];

function Statuses() {
  const [listed, setListed] = useState("me");
  const { currentUser } = useSelector((state) => state.global);

  const { data: claimStatus } = useQuery(["getAllClaim", listed], () =>
    AppService.getAllClaimStatus(listed),
  ) || { data: [] };
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    if (claimStatus) {
      const tempStatuses = [];
      // eslint-disable-next-line array-callback-return
      statusSchema?.filter((status) => {
        const index =
          Array.isArray(claimStatus) &&
          claimStatus?.findIndex(({ _id }) => _id === status.id);
        if (index === -1) tempStatuses.push(status);
        else tempStatuses.push({ ...status, count: claimStatus[index]?.count });
        return index === -1;
      });

      setStatuses(tempStatuses);
    }
  }, [claimStatus]);

  const [listedMe, setListedMe] = useState(true);
  const [listedAll, setListedAll] = useState(false);

  return (
    <S.Statuses>
      <div className="flex j-btw with-toggle">
        <p className="sub-head">Claim Statuses</p>
        <Toggle
          handleToggle={() => {
            if (listed === "me") {
              setListed("me");
              setListedMe(true);
              setListedAll(false);
            } else {
              setListed("all");
              setListedMe(false);
              setListedAll(true);
            }
          }}
          listedMe={listedMe}
          setListed={setListed}
          setListedMe={setListedMe}
          setListedAll={setListedAll}
          listedAll={listedAll}
          _role={currentUser?.role}
        />
      </div>
      <div className="grid ">
        {currentUser?.role === ROLES.tpaAdmin.value ||
        currentUser?.role === ROLES.tpaAccountManager.value
          ? statuses
              ?.filter(
                (status) =>
                  status.id !== "follow_up" &&
                  status.id !== "pending_verification",
              )
              .map((status) => (
                <Link
                  key={status?.name}
                  className={clsx(`${status?.class} flex grid-flex`)}
                  to={`/claims?listed=${listed}&status=${status?.id}`}
                >
                  <img key={status?.email} alt="icon" src={status?.img} />
                  <div className="text">
                    <p className="name">{status?.name}</p>
                    <p className="count">{status?.count}</p>
                  </div>
                </Link>
              ))
          : statuses?.map((status) => (
              <Link
                key={status?.name}
                className={clsx(`${status?.class} flex grid-flex`)}
                to={`/claims?listed=${listed}&status=${status?.id}`}
              >
                <img key={status?.email} alt="icon" src={status?.img} />
                <div className="text">
                  <p className="name">{status?.name}</p>
                  <p className="count">{status?.count}</p>
                </div>
              </Link>
            ))}
      </div>
    </S.Statuses>
  );
}

Statuses.propTypes = {};

export default Statuses;
