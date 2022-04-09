import React from "react";
import { useInjectReducer } from "redux-injectors";
import { useQuery } from "react-query";

import ReviewFlowMessage from "./ReviewFlowMessage";

import { key } from "@/containers/PageClaims/constant";
import reducer from "@/containers/PageClaims/reducer";
import AppService from "@/services/api/app-service";
import MemberReview from "@/components/Tabset/MemberReview";
import UnAuthPageLayout from "@/containers/PageLayout/unauthPageLayout";
import { CLAIM_STATUS } from "@/utils/constants";

function ReviewFlow() {
  useInjectReducer({ key, reducer });
  const params = new URLSearchParams(window.location.search);
  const getClaim = (id) => {
    console.log(id);
    return AppService.getParticularClaim(id);
  };

  const { data: claim, isLoading } = useQuery(
    "claim",
    () => getClaim(params.get("claimId")),
    {
      refetchOnWindowFocus: false,
      // esling-disable-next-line
      enabled: params.get("claimId") ? Boolean(true) : Boolean(false),
    },
  );

  if (isLoading) {
    return <div />;
  }

  console.log(claim);

  return (
    <UnAuthPageLayout
      title={`${
        claim?.dd_claim_number ? `Claim / ${claim?.dd_claim_number}` : "Claim "
      }`}
      member={Boolean(true)}
    >
      {claim?.status === CLAIM_STATUS.completed.value ? (
        <ReviewFlowMessage claim={claim} />
      ) : (
        <MemberReview
          // eslint-disable-next-line
          showMessage={true}
          claim={claim}
        />
      )}
    </UnAuthPageLayout>
  );
}

export default ReviewFlow;
