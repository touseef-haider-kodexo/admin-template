import React from "react";
import { Link, useHistory } from "react-router-dom";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useQuery, useMutation } from "react-query";
import moment from "moment";

import eye from "@/assets/images/visibility.svg";
import AppService from "@/services/api/app-service";
import { baseImageURL } from "@/utils/axios";

import * as S from "./styled";

function GridClaim() {
  const history = useHistory();
  const add_seen_notification = useMutation((data) =>
    AppService.addSeenNotification(data),
  );
  const add_seen_claim = useMutation((data) => AppService.addSeenClaim(data));

  const { currentUser } = useSelector((state) => state.global);
  const { _id } = currentUser || { _id: "" };

  const { data: claimActivity } = useQuery(
    "getClaimActivity",
    () => AppService.getClaimActivity({ current: 1, pageSize: 5 }),
    {},
  ) || { data: [] };

  const { data: notifications } = useQuery("getNotification", () =>
    AppService.getNotification({ current: 1, pageSize: 5 }),
  ) || { data: [] };

  const recentClaimClick = async (id, check, claimId) => {
    if (!check) await add_seen_claim.mutateAsync(claimId);
    history.push(`/edit-claim?id=${id}&back=/`);
  };

  const notificationClick = async (id, screen, check, userId) => {
    if (!check) await add_seen_notification.mutateAsync(userId);
    let path = "";
    if (screen === "user") path = `systems/${screen}s/edit?id=${id}&back=/`;
    else if (screen === "tpas") path = `/tpas/edit?id=${id}&back=/`;
    else if (screen === "claim") path = `/edit-claim?id=${id}&back=/`;
    else if (screen === "technician")
      path = `/technicians/edit?id=${id}&back=/`;
    else path = `/${screen}/edit?id=${id}&back=/`;
    history.push(path);
  };
  return (
    <S.GridClaim>
      <div className="grid">
        <div className="notification">
          <p className="sub-head">Notifications</p>
          {Array.isArray(notifications?.notifications) &&
            notifications?.notifications?.map((obj) => {
              const data =
                obj.navigate_screen === "user"
                  ? obj.profile
                  : obj[obj.navigate_screen];
              const check = obj.seen_by.includes(_id);
              return (
                <div
                  key={obj.id}
                  // eslint-disable-next-line
                  className="flex j-btw flex-recent mouse-cursor"
                  onClick={() =>
                    notificationClick(
                      obj?.claim ? obj?.claim : data._id,
                      obj.navigate_screen,
                      check,
                      obj._id,
                    )
                  }
                  onKeyPress={() => {}}
                  role="button"
                  tabIndex="0"
                >
                  <div
                    className={clsx(
                      `${check ? "process" : "complete"} flex pl20`,
                    )}
                  >
                    {data?.profile_image === undefined ? (
                      <div className="oval  flex">
                        <p className="icon">
                          {data?.name?.charAt(0) || data?.full_name?.charAt(0)}
                        </p>
                      </div>
                    ) : (
                      <div className="profile-logo-container">
                        <img
                          alt="avatar"
                          className="profile-logo"
                          height="45"
                          src={baseImageURL + data?.profile_image}
                          width="45"
                        />
                      </div>
                    )}
                    <div className="pl20">
                      <p className="action">{obj.message}</p>
                      <p className="name">
                        {obj?.claim ? obj?.type : data?.name || data?.full_name}
                      </p>
                      <p className="name">
                        {moment(obj?.created_at).format(
                          "DD MMM YYYY h:mm:ss a",
                        )}
                      </p>
                    </div>
                  </div>
                  {!check && <img alt="eye" className="eye" src={eye} />}
                </div>
              );
            })}
          <div className="view">
            <Link to="/notifications">View More</Link>
          </div>
        </div>

        <div className="recent-claim">
          <p className="sub-head">Recent Claim Activity</p>
          {Array.isArray(claimActivity?.recentClaimActivity) &&
            claimActivity?.recentClaimActivity?.map((recent) => {
              const check = recent.seen_by.includes(_id);
              return (
                <div
                  // eslint-disable-next-line
                  key={recent?.claim_info?.dd_claim_number}
                  className="flex j-btw flex-recent mouse-cursor"
                  onClick={() =>
                    recentClaimClick(recent?.claim_info._id, check, recent._id)
                  }
                  onKeyPress={() => {}}
                  role="button"
                  tabIndex="0"
                >
                  <div
                    className={clsx(`${check ? "process" : "complete"} text`)}
                  >
                    <p className="who">
                      {recent?.title} {recent?.created_by?.full_name}
                    </p>
                    {recent?.claim_info?.personal_info?.last_name}{" "}
                    {recent?.claim_info?.personal_info?.first_name}.{" "}
                    {recent?.claim_info?.dd_claim_number}
                    <p className="who">
                      {moment(recent?.created_at).format(
                        "DD MMM YYYY h:mm:ss a",
                      )}
                    </p>
                  </div>
                  {!check && <img alt="eye" className="eye" src={eye} />}
                </div>
              );
            })}
          <div className="view">
            <Link to="/recent-claim-activity">View More</Link>
          </div>
        </div>
      </div>
    </S.GridClaim>
  );
}

GridClaim.propTypes = {};

export default GridClaim;
