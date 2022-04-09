//
import React, { useState } from "react";
import { PropTypes } from "prop-types";
import { useMutation } from "react-query";

import Button from "@/components/Button";
import Toggler from "@/components/Toggler";
import DateInput from "@/components/Input/DateInput";
import AppService from "@/services/api/app-service";
import NotificationStatus from "@/components/Notification";

import TextArea from "../Input/TextArea";

import * as S from "./styled";

function MemberReview({ claim }) {
  const params = new URLSearchParams(window.location.search);
  const claim_id = params.get("claimId");

  const addClaimNotes = async (data) => AppService.addClaimNotes(data);

  const [contactedCustomer, setContactedCustomer] = useState(false);
  const [customerRepairScheduled, setCustomerRepairScheduled] = useState(false);
  const [customerRepairCompleted, setCustomerRepairCompleted] = useState(false);
  const [scheduledDate, setScheduledDate] = useState(null);
  const [completedDate, setCompletedDate] = useState(null);
  const [comments, setComments] = useState("");

  const [errors, setErrors] = useState({
    contactedCustomer: false,
    customerRepairScheduled: false,
    customerRepairCompleted: false,
  });

  // for posting
  const createNotes = useMutation((param) => addClaimNotes(param), {
    onSuccess: () => {
      NotificationStatus("success", "Feedback submitted successfully");
      setContactedCustomer(false);
      setCustomerRepairScheduled(false);
      setCustomerRepairCompleted(false);
      setScheduledDate(null);
      setCompletedDate(null);
      setComments("");
    },
    onError: (err) => {
      NotificationStatus("error", err.message);
    },
  });

  const handleFeedback = () => {
    console.log("Entered int this area");
    if (customerRepairScheduled) {
      if (!scheduledDate) {
        setErrors({
          ...errors,
          customerRepairScheduled: true,
        });
        return;
      }
    }
    if (customerRepairCompleted) {
      if (!completedDate) {
        setErrors({
          ...errors,
          customerRepairCompleted: true,
        });
        return;
      }
    }
    const arr = [
      {
        question: "Have you been contacted by your assigned technician?",
        answer: contactedCustomer ? `yes,` : "no",
      },
      {
        question: "Have your repairs been scheduled?",
        answer: customerRepairScheduled ? `yes,${scheduledDate}` : "no",
      },
      {
        question: "Have your repairs been completed?",
        answer: customerRepairCompleted ? `yes,${completedDate}` : "no",
      },
    ];
    const obj = {
      note: comments,
      claim: claim_id,
      q_n_a: arr,
      feedback_by_member: true,
      type: "internal_notes",
    };
    console.log("obj", obj);
    createNotes.mutate(obj);
  };
  return (
    <S.TechnicianReviewPage>
      <div className="tech-container">
        <div>
          <div className="feedback-btn">
            <Button
              value="Submit Feedback"
              size="small"
              className="btn-primary"
              onClick={handleFeedback}
            />
          </div>
          <p className="tech-pad ">Good afternoon,</p>
          <p className="tech-pad ">
            We are following up on the status your auto reconditioning claim.
          </p>
          <div className="claim-info tech-pad ">
            <p>Claim {claim?.dd_claim_number}</p>
            <p>{claim?.personal_info?.first_name}</p>
            <p>
              {claim?.vehicle?.year} {claim?.vehicle?.make}{" "}
              {claim?.vehicle?.model}
            </p>
          </div>
          <div className="questions tech-pad">
            <Toggler
              checkedChildren="Yes"
              unCheckedChildren="No"
              hasLabelBefore={false}
              label="Have you been contacted by your assigned technician?"
              onChange={() => {
                setContactedCustomer(!contactedCustomer);
              }}
              value={contactedCustomer}
            />
          </div>
          <div className="questions tech-pad">
            <Toggler
              checkedChildren="Yes"
              unCheckedChildren="No"
              hasLabelBefore={false}
              label="Have your repairs been scheduled?"
              onChange={() => {
                setCustomerRepairScheduled(!customerRepairScheduled);
              }}
              value={customerRepairScheduled}
            />
          </div>
          <div className="date tech-pad">
            <DateInput
              label="Date Scheduled"
              name="date_scheduled"
              onChange={(value) => {
                setErrors({
                  ...errors,
                  customerRepairScheduled: false,
                });
                setScheduledDate(value);
              }}
              value={scheduledDate}
              error={
                errors.customerRepairScheduled
                  ? "*Date scheduled is required"
                  : ""
              }
            />
          </div>
          <div className="questions tech-pad ">
            <Toggler
              checkedChildren="Yes"
              unCheckedChildren="No"
              hasLabelBefore={false}
              label="Have your repairs been completed?"
              onChange={() => {
                setCustomerRepairCompleted(!customerRepairCompleted);
              }}
              value={customerRepairCompleted}
            />
          </div>
          <div className="date tech-pad">
            <DateInput
              label="Date Completed"
              name="date_completed"
              onChange={(value) => {
                setCompletedDate(value);
                setErrors({
                  ...errors,
                  customerRepairCompleted: false,
                });
              }}
              value={completedDate}
              error={
                errors.customerRepairCompleted
                  ? "*Date completed is required"
                  : ""
              }
            />
          </div>
          <div className="tech-text-area ">
            <TextArea
              label="Comments"
              placeholder="Enter your comments here..."
              name="comments"
              onChange={(e) => {
                setComments(e.target.value);
              }}
              style={{ height: "60px" }}
              value={comments}
            />
          </div>
          <p className="tech-pad">
            Please respond with an update so that we may help expedite the claim
            if necessary.
          </p>
          <div className="conclusion tech-pad ">
            <p>Thank you.</p>
            <p>The 1-800-Dent Doc Team</p>
          </div>
        </div>
      </div>
    </S.TechnicianReviewPage>
  );
}

MemberReview.propTypes = {
  claim: PropTypes.objectOf({
    dd_claim_number: PropTypes.string,
    personal_info: PropTypes.objectOf({
      first_name: PropTypes.string,
    }),
    vehicle: PropTypes.objectOf({
      year: PropTypes.string,
      make: PropTypes.string,
      model: PropTypes.string,
    }),
  }),
};

export default MemberReview;
