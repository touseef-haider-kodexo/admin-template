//
import React, { useState, useEffect } from "react";
import { Table, Card } from "antd";
import clsx from "clsx";
import moment from "moment";
import { useQuery, useMutation } from "react-query";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import AppService from "@/services/api/app-service";
import Storage from "@/utils/storage";

import PageLayout from "../PageLayout";
// import * as D from "../PageSystem/styled";

import * as S from "./styled";

export default function RecentActivity() {
  const history = useHistory();
  const { currentUser } = useSelector((state) => state.global);
  const { _id } = currentUser;
  const add_seen_claim = useMutation((data) => AppService.addSeenClaim(data));

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });
  const [total, setTotal] = useState(0);
  const fetchClaimActivity = ({ current = 1, pageSize = 10 }) =>
    AppService.getClaimActivity({ pageSize, current });

  const { data: claimActivityData, isLoading } = useQuery(
    ["getClaimActivity", pagination],
    () => fetchClaimActivity(pagination),
    {
      keepPreviousData: true,
    },
  ) || {
    data: {
      recentClaimActivity: [],
      total: 0,
    },
  };
  // console.log(claimActivityData);
  const { recentClaimActivity: claimActivity, total: claimActivityTotal } =
    claimActivityData || {};
  // console.log(claimActivity);

  // const { data: claimActivityTotal } = useQuery("getClaimActivityTotal", () =>
  //   AppService.getClaimActivityTotal(),
  // ) || {
  //   data: [],
  // };

  useEffect(() => {
    window.document.title = "Recent Claim Activity";
    return () => {
      window.document.title = "Dent Doc Connect";
    };
  }, []);

  useEffect(() => {
    setTotal(claimActivityTotal);
  }, [claimActivityTotal]);

  useEffect(() => {
    const ps = Storage.get("pageSizeRecentClaimActivity");
    if (ps !== undefined)
      setPagination({
        ...pagination,
        pageSize: ps,
      });
  }, []);

  const handleTableChange = (pag) => {
    setPagination(pag);
    Storage.set("pageSizeRecentClaimActivity", pag.pageSize);
  };

  const recentClaimClick = async (id, check, claimId) => {
    if (!check) await add_seen_claim.mutateAsync(claimId);
    history.push(`/edit-claim?id=${id}`);
  };

  const columns = [
    {
      title: "Status",
      // dataIndex: 'full_name',
      render: (obj) => {
        const check = obj?.seen_by.includes(_id);
        return (
          //  eslint-disable-next-line
          <div
            className={clsx(
              `${check ? "process" : "complete"} text mouse-cursor`,
            )}
            //  eslint-disable-next-line
            onClick={() =>
              recentClaimClick(obj.claim_info?._id, check, obj._id)
            }
          >
            <p className="who">
              {obj?.title} {obj?.created_by?.full_name}
            </p>
            {obj?.claim_info?.personal_info?.last_name}{" "}
            {obj?.claim_info?.personal_info?.first_name[0]}.{" "}
            {obj?.claim_info?.dd_claim_number}
          </div>
        );
      },
      width: "90%",
    },
    {
      title: "Created At",
      // dataIndex: 'role',
      render: (obj) => moment(obj?.created_at).format("MMM DD, YYYY hh:mm A"),
      width: "15%",
    },
  ];

  const renderTable = React.useMemo(
    () => (
      <div className="main">
        <Table
          columns={columns}
          dataSource={Array.isArray(claimActivity) ? claimActivity : []}
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
    ),
    [claimActivity, isLoading, pagination, total],
  );
  return (
    <PageLayout title="Recent Claim Activity">
      {/* <D.Users> */}
      <S.RecentActivity>
        <Card id="card">{renderTable}</Card>
      </S.RecentActivity>
      {/* </D.Users> */}
    </PageLayout>
  );
}
