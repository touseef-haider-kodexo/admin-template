import React from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

function ReviewFlowMessage({ claim }) {
  return (
    <S.TechnicianReviewPage>
      <div className="review-message-cont">
        <div>
          <p className="tech-pad ">Good afternoon,</p>
          <p className="tech-pad ">
            This auto reconditioning claim has been completed.
          </p>
          <div className="claim-info tech-pad ">
            <p>Claim {claim?.dd_claim_number}</p>
            <p>{claim?.personal_info?.first_name}</p>
            <p>
              {claim?.vehicle?.year} {claim?.vehicle?.make}{" "}
              {claim?.vehicle?.model}
            </p>
          </div>

          <p className="tech-pad">
            Please reach out to a 1-800-Dent-Doc representative if you have any
            questions
          </p>
          <div className="conclusion tech-pad " style={{ marginTop: "50px" }}>
            <p>Thank you.</p>
            <p>The 1-800-Dent Doc Team</p>
          </div>
        </div>
      </div>
    </S.TechnicianReviewPage>
  );
}

ReviewFlowMessage.propTypes = {
  claim: PropTypes.objectOf(PropTypes.any),
};

export default ReviewFlowMessage;
