/*eslint-disable */
import React, { useState, useEffect } from "react";
import { Table, Card } from "antd";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import moment from "moment";
import clsx from "clsx";

import PageLayout from "../PageLayout";
// import * as D from "../PageSystem/styled";

import * as S from "./styled";

import AppService from "@/services/api/app-service";
import Storage from "@/utils/storage";
import { baseImageURL } from "@/utils/axios";

export default function Notifications() {
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.global);
  const { _id } = currentUser;
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const fetchNotification = ({ current = 1, pageSize = 10 }) =>
    AppService.getNotification({ pageSize, current });

  const { data: notificationsData, isLoading } = useQuery(
    ["getNotification", pagination],
    () => fetchNotification(pagination),
    {
      keepPreviousData: true,
    },
  ) || { data: [], notifications: [] };
  const { notifications, total: notificationTotal } = notificationsData || {};
  // console.log(notifications);

  // const { data: notificationTotal } = useQuery("getNotificationTotal", () =>
  //   AppService.getNotificationTotal(),
  // ) || {
  //   data: [],
  // };
  const add_seen_notification = useMutation((data) =>
    AppService.addSeenNotification(data),
  );

  useEffect(() => {
    setTotal(notificationTotal);
  }, [notificationTotal]);

  useEffect(() => {
    const ps = Storage.get("pageSizeNotification");
    if (ps !== undefined)
      setPagination({
        ...pagination,
        pageSize: ps,
      });
  }, []);

  useEffect(() => {
    window.document.title = "Notifications";
    return () => {
      window.document.title = "Dent Doc Connect";
    };
  }, []);

  const handleTableChange = (pag) => {
    setPagination(pag);
    Storage.set("pageSizeNotification", pag.pageSize);
  };

  const notificationClick = async (id, screen, check, userId) => {
    if (!check) await add_seen_notification.mutateAsync(userId);
    let path = "";
    if (screen === "user") path = `systems/${screen}s/edit?id=${id}&back=/`;
    else if (screen === "tpas") path = `/tpas/edit?id=${id}&back=/`;
    else if (screen === "technician")
      path = `/technicians/edit?id=${id}&back=/`;
    else path = `/${screen}/edit?id=${id}&back=/`;
    history.push(path);
  };

  const columns = [
    {
      title: "Status",
      // dataIndex: 'full_name',
      render: (obj) => {
        const data =
          obj.navigate_screen === "user"
            ? obj.profile
            : obj[obj.navigate_screen];
        const check = obj.seen_by.includes(_id);
        return (
          <div
            onKeyPress={(e) => {
              console.log(e.key);
            }}
            focusable="true"
            className="flex mouse-cursor"
            // eslint-disable-next-line
            onClick={() =>
              notificationClick(data._id, obj.navigate_screen, check, obj._id)
            }
          >
            <div
              className={clsx(`${check ? "process" : "complete"} flex pl20`)}
            >
              {data?.profile_image === undefined ? (
                <div className="oval mr-30 flex">
                  <p className="icon">
                    {obj[obj.navigate_screen]?.name?.charAt(0)}
                  </p>
                </div>
              ) : (
                <div className="profile-logo-container">
                  <img
                    width="45"
                    height="45"
                    alt="avatar"
                    className="profile-logo"
                    src={baseImageURL + data?.profile_image}
                  />
                </div>
              )}

              <div className="text">
                <p className="action">{obj.message}</p>
                <p className="name">{data?.name || data?.full_name}</p>
              </div>
            </div>
          </div>
        );
      },
      width: "90%",
    },
    {
      title: "Created At",
      render: (obj) => moment(obj.created_at).format("MMM DD, YYYY hh:mm A"),
      width: "10%",
    },
  ];

  const renderTable = React.useMemo(() => {
    return (
      <div className="main">
        <Table
          columns={columns}
          dataSource={notifications}
          loading={isLoading}
          onChange={handleTableChange}
          pagination={{
            current: pagination.current || 1,
            pageSize: pagination.pageSize,
            showSizeChanger: true,
            total,
          }}
          showHeader={false}
          sticky={false}
        />
        <p className="pagination-show">
          Showing {pagination.current ? pagination.current : 1} -{" "}
          {pagination.pageSize ? pagination.pageSize : 10} of {total}
        </p>
      </div>
    );
  }, [pagination, isLoading, notifications, total]);

  return (
    <PageLayout title="Notifications">
      {/* <D.Users> */}
      <S.Notifications>
        <Card id="card">{renderTable}</Card>
      </S.Notifications>
      {/* </D.Users> */}
    </PageLayout>
  );
}
