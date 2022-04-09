//
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { useMutation, useQuery } from "react-query";
import moment from "moment";

import Toggler from "@/components/Toggler";
import AppService from "@/services/api/app-service";
import NotificationStatus from "@/components/Notification";
import { showNotesAndHistory } from "@/utils/UI";

import { ROLES, CLAIM_STATUS } from "../../utils/constants";
import Button from "../Button";

import InternalNotes from "./Notes/InternalNotes";
import SimpleNotes from "./Notes/SimpleNotes";
import TechnicalNotes from "./Notes/TechnicalNotes";
import * as S from "./styled";

const TabPanel7 = ({
  setValue,
  notesInfoSubmitRef,
  stickAtTop,
  handleScroll,
}) => {
  const [memberFeedback, setMemberFeedback] = useState(false);
  const [technicianFeedback, setTechnicianFeedback] = useState(false);

  const { claim_id, claim_info, technician } = useSelector(
    (state) => state.claim,
  );
  const { currentUser } = useSelector((state) => state.global);

  const { data: claimData } = useQuery(
    "getClaim",
    () => AppService.getParticularClaim(claim_id),
    {
      onSuccess: (data) => {
        setMemberFeedback(data.requested_by_member);
        setTechnicianFeedback(data.requested_by_technician);
      },
      onError: () => {
        setMemberFeedback(false);
        setTechnicianFeedback(false);
      },
      enabled: claim_id !== null,
    },
  );

  window.onscroll = handleScroll;

  const memberRequest = useMutation(
    (data) => AppService.requestedByMemberOrTechnician(data),
    {
      onSuccess: async () => {
        NotificationStatus("success", "Successfully updated claim.");
      },
      onError: () => {
        setMemberFeedback(false);
      },
    },
  );
  const TechnicianRequest = useMutation(
    (data) => AppService.requestedByMemberOrTechnician(data),
    {
      onSuccess: async () => {
        NotificationStatus("success", "Successfully updated claim.");
      },
      onError: () => {
        setTechnicianFeedback(false);
      },
    },
  );
  const requestManually = useMutation(
    (data) => AppService.manuallyRequested(data),
    {
      onSuccess: async () => {
        NotificationStatus("success", "Successfully requested.");
      },
    },
  );

  const handleClick = () => {
    if (
      currentUser?.role === ROLES.tpaAccountManager.value ||
      currentUser?.role === ROLES.tpaAdmin.value
    ) {
      setValue(0);
    } else {
      setValue((prevState) => prevState + 1);
    }
  };
  window.onscroll = handleScroll;
  return (
    <S.NotesUI stickAtTop={stickAtTop} claim_id={claim_id}>
      {showNotesAndHistory(currentUser, ROLES) && (
        <div className="note-div">
          <button
            type="submit"
            ref={notesInfoSubmitRef}
            onClick={handleClick}
            size="xsmall"
            className="save-btn"
          >
            Continue
          </button>
        </div>
      )}
      {showNotesAndHistory(currentUser, ROLES) && (
        <div className="feedbacks">
          <div>
            <p>Request Member Feedback</p>
            <div className="member-feedback">
              <Toggler
                hasLabelBefore={Boolean(true)}
                label="Automated feedback request"
                onChange={() => {
                  if (
                    memberFeedback ||
                    claim_info?.status?.value === CLAIM_STATUS.in_process.value
                  ) {
                    memberRequest.mutate({
                      _id: claim_id,
                      member: true,
                      requested_by_member: !memberFeedback,
                    });
                    setMemberFeedback(!memberFeedback);
                  }
                }}
                value={memberFeedback}
              />
              <p className="last-requested">
                Last requested by system on{" "}
                {claimData?.last_requested_by_system_for_member &&
                  moment(claimData?.last_requested_by_system_for_member).format(
                    "MMM DD, YYYY hh:mm A",
                  )}
              </p>

              <div className="manually-btn">
                <Button
                  onClick={() => {
                    requestManually.mutate({
                      technician: false,
                      member: true,
                      claim_id,
                    });
                  }}
                  size="large"
                  value="Manually Request Feedback"
                />
              </div>
            </div>
          </div>
          <div>
            <p>Request Technician Feedback</p>
            <div className="technician-feedback">
              <Toggler
                hasLabelBefore={Boolean(true)}
                label="Automated feedback request"
                onChange={() => {
                  if (
                    technicianFeedback ||
                    claim_info?.status?.value === CLAIM_STATUS.in_process.value
                  ) {
                    TechnicianRequest.mutate({
                      _id: claim_id,
                      member: false,

                      requested_by_technician: !technicianFeedback,
                    });
                    setTechnicianFeedback(!technicianFeedback);
                  }
                }}
                // eslint-disable-next-line
                disabled={technician ? false : true}
                value={technicianFeedback}
              />
              <p className="last-requested">
                Last requested by system on{" "}
                {claimData?.last_requested_by_system_for_technician &&
                  moment(
                    claimData?.last_requested_by_system_for_technician,
                  ).format("MMM DD, YYYY hh:mm A")}
              </p>

              <div className="manually-btn">
                <Button
                  onClick={() => {
                    requestManually.mutate({
                      technician: true,
                      member: false,
                      claim_id,
                    });
                  }}
                  // eslint-disable-next-line
                  disabled={technician ? false : true}
                  size="large"
                  value="Manually Request Feedback"
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {showNotesAndHistory(currentUser, ROLES) && <TechnicalNotes />}
      <SimpleNotes />
      {showNotesAndHistory(currentUser, ROLES) && <InternalNotes />}
    </S.NotesUI>
  );
};

TabPanel7.propTypes = {
  setValue: PropTypes.func,
  stickAtTop: PropTypes.bool,
  notesInfoSubmitRef: PropTypes.func,
  handleScroll: PropTypes.func,
};

export default TabPanel7;
