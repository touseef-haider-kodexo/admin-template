/*eslint-disable */
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import moment from "moment";
import { useSelector } from "react-redux";

import * as S from "../styled";

import {
  TPA_CLAIM_CREATED,
  TECHNICIAN_ASSIGNMENT,
  STATUS_REQUEST,
  TECHNICIAN_CLAIM_ASSIGNMENT,
  CONFIRMATION_OF_CLAIM,
} from "@/utils/constants";
import Modal from "@/components/Modal";
import AppService from "@/services/api/app-service";
import editIcon from "@/assets/images/edit.svg";
import deleteIcon from "@/assets/images/delete.svg";
import ImageButton from "@/components/ImageButton";
import TextInput from "@/components/Input";
import Button from "@/components/Button";

const InternalNotes = () => {
  const [current] = useState(1);
  const { claim_id } = useSelector((state) => state.claim);
  const { currentUser } = useSelector((state) => state.global);
  const [pageSize, setPageSize] = useState(5);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState({
    add: false,
    edit: false,
  });
  const [note, setNote] = useState({});
  const [visible, setVisible] = useState(false);
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  const getClaimNotes = ({ queryKey }) =>
    AppService.getInternalClaimNotes({
      pageSize: queryKey[1],
      current,
      claim: claim_id,
    });

  const updateClaimNotes = async (data) => AppService.updateClaimNotes(data);
  const deleteClaimNotes = async (id) => AppService.deleteClaimNotes(id);
  const addClaimNotes = async (data) => AppService.addClaimNotes(data);

  // for refetching and caching
  const queryCache = useQueryClient();

  // for fetching
  const { isSuccess, isFetching } = useQuery(
    ["internalNotes", pageSize, visible],
    getClaimNotes,
    {
      onSuccess: (data) => {
        setTotal(data.total);
        setData(data.notes);
      },
      enabled: !!claim_id,
      keepPreviousData: true,
    },
  );

  // for posting
  const createNotes = useMutation((params) => addClaimNotes(params), {
    onSuccess: () => {
      // Query Invalidations
      queryCache.invalidateQueries("internalNotes");
      // setPageSize((prevState) => prevState + 1);
    },
  });

  // for updating
  const updateNotes = useMutation(
    (params) => {
      updateClaimNotes(params);
    },
    {
      onSuccess: () => {
        // Query Invalidations
        setVisible(false);

        queryCache.invalidateQueries("internalNotes");
      },
    },
  );

  // for deleting
  const deleteNotes = useMutation((id) => deleteClaimNotes(id), {
    onSuccess: () => {
      // Query Invalidations
      setVisible(false);

      queryCache.invalidateQueries("internalNotes");
    },
  });

  //   for adding notes on ENTER key
  const handleAdd = () => {
    const obj = {
      note: inputValue,
      claim: claim_id,
      user: currentUser,
      type: "internal_notes",
    };
    if (inputValue.length > 0) {
      createNotes.mutate(obj);
      setInputValue("");
    } else {
      setError({
        add: true,
        edit: false,
      });
    }
  };

  // for changing the input which may be updated or deleted
  const modalInputChange = (e) => {
    setNote({ ...note, note: e.target.value });
    setError({
      add: false,
      edit: false,
    });
  };

  // for loading more notes
  const loadMoreNotes = () => {
    setPageSize((prevState) => prevState + 4);
  };

  // for modal pop up
  const showModal = (action, note, id) => {
    setNote({ action, note, id });
    setVisible(true);
  };

  // for deleting the notes
  const handleDelete = () => {
    deleteNotes.mutate(note.id);
  };

  // for updating the notes
  const handleSave = async () => {
    const obj = {
      note: note.note,
      _id: note.id,
      type: "internal_notes",
    };
    if (note.note.length > 0) {
      await updateNotes.mutate(obj);
    } else {
      setError({
        add: false,
        edit: true,
      });
    }
  };

  const handleInput = (e) => {
    setInputValue(e.target.value);
    setError({
      add: false,
      edit: false,
    });
  };

  const deleteConfirmationModal = (visible) => (
    <Modal
      modalContent={
        <div className="modal-content-main">
          <h1 className="modal-title">Are you sure you want to delete this?</h1>
          <div className="modal-text-input-container">
            <p className="modal-input-label">
              Once you delete this, it can not be recovered.
            </p>
          </div>
          <br />
          <div className="modal-btn-parent">
            <button
              className="modal-light-btn"
              onClick={() => {
                setVisible(false);
              }}
              type="button"
            >
              <span>Cancel</span>
            </button>
            <div>
              <Button
                onClick={() => {
                  handleDelete();
                }}
                size="xsmall"
                value="Delete"
              />
            </div>
          </div>
        </div>
      }
      setVisible={setVisible}
      visible={visible}
      widthFit="width-fit"
    />
  );

  const editConfirmationModal = (isVisible) => (
    <Modal
      modalContent={
        <div className="modal-content-main">
          <h1 className="modal-title">Are you sure you want to edit this?</h1>
          <div className="modal-text-input-container">
            <TextInput
              onChange={modalInputChange}
              value={note.note}
              placeholder="Enter your note here"
              multiLine
              error={error?.edit ? "Please enter a note" : ""}
            />
            <br />
          </div>
          <div className="modal-btn-parent">
            <button
              className="modal-light-btn"
              onClick={() => {
                setVisible(false);
              }}
              type="button"
            >
              <span>Cancel</span>
            </button>
            <div>
              <Button
                onClick={() => {
                  handleSave();
                }}
                size="xsmall"
                value="Save"
              />
            </div>
          </div>
        </div>
      }
      setVisible={setVisible}
      visible={isVisible}
      widthFit="width-fit"
    />
  );

  return (
    <S.TabPanel7>
      <div id="container">
        <div className="inputs">
          <div style={{ width: "100%" }}>
            <TextInput
              label="Internal Notes"
              value={inputValue}
              onChange={handleInput}
              disabled={!claim_id}
              error={error?.add ? "Please enter a note" : ""}
            />
          </div>
          <Button
            className="note-btn"
            label="add"
            size="small"
            value="Add Comment"
            onClick={handleAdd}
          />
        </div>
        {isSuccess &&
          Array.isArray(data) &&
          data?.map((i) => (
            <div className="chat-box-container">
              <S.ChatBox
                feedback={
                  i?.feedback_by_member || i?.feedback_by_technician
                    ? true
                    : false
                }
              >
                {i?.feedback_by_member || i?.feedback_by_technician
                  ? i?.q_n_a?.map((j, index) => (
                      <div style={{ marginBottom: "10px" }}>
                        <p style={{ fontSize: "small" }}>{j?.question}</p>
                        <strong
                          style={{
                            fontSize: "small",
                            color: "black",
                          }}
                        >
                          {j?.answer?.split(",")[0]}
                        </strong>
                        <br />
                        <strong
                          style={{
                            fontSize: "small",
                            color: "black",
                          }}
                        >
                          {index == 1 && (
                            <span>
                              Date Scheduled:
                              {j?.answer?.split(",")[1] &&
                                moment(j?.answer?.split(",")[1]).format(
                                  "MM:DD:YYYY",
                                )}
                            </span>
                          )}
                          {index == 2 && (
                            <span>
                              Date Completed:
                              {j?.answer?.split(",")[1] &&
                                moment(j?.answer?.split(",")[1]).format(
                                  "MM:DD:YYYY",
                                )}
                            </span>
                          )}
                        </strong>
                      </div>
                    ))
                  : ""}
                <div className="chat-box-main">
                  <div className="note-wrapper">
                    {i?.feedback_by_member || i?.feedback_by_technician ? (
                      <div style={{ marginTop: "10px" }}>
                        <p style={{ fontSize: "small" }}>Comments</p>
                        <b
                          style={{
                            fontSize: "small",
                            color: "black",
                          }}
                        >
                          {i?.note}
                        </b>
                      </div>
                    ) : (
                      <p style={{ fontSize: "small" }}>
                        {i?.note === CONFIRMATION_OF_CLAIM ||
                        i?.note === TECHNICIAN_ASSIGNMENT ? (
                          <b>Email sent to member: </b>
                        ) : i?.note === TECHNICIAN_CLAIM_ASSIGNMENT ? (
                          <b>Email sent to technician: </b>
                        ) : i?.note === TPA_CLAIM_CREATED ? (
                          <b>Email sent to TPA: </b>
                        ) : (
                          ""
                        )}
                        {i.note}{" "}
                      </p>
                    )}
                  </div>
                  <div className="note-details-wrapper">
                    <p className="name flex">
                      {i?.feedback_by_member
                        ? "Member"
                        : i?.feedback_by_technician
                        ? "Technician"
                        : i?.created_by?.first_name}
                    </p>
                    <p className="time flex">
                      On {" " + moment(i?.created_at).format("MM:DD:YYYY")} at{" "}
                      {moment(i?.created_at).format("hh:mm A")}
                    </p>{" "}
                  </div>
                </div>
              </S.ChatBox>
              <div className="chat-info">
                <div style={{ display: "flex" }}>
                  <div>
                    <ImageButton
                      img={editIcon}
                      onClick={() => showModal("Update Note", i.note, i._id)}
                    />
                  </div>
                  <div>
                    <ImageButton
                      img={deleteIcon}
                      onClick={() => showModal("Delete Note", i.note, i._id)}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        {isSuccess && data?.length !== total ? (
          Array.isArray(data) && data.length > 0 ? (
            <div id="load-more-btn-div">
              <Button
                onClick={loadMoreNotes}
                value={isFetching ? "Loading..." : "Load More"}
              />
            </div>
          ) : null
        ) : null}
        {note.action === "Delete Note" && deleteConfirmationModal(visible)}
        {note.action === "Update Note" && editConfirmationModal(visible)}
      </div>
    </S.TabPanel7>
  );
};

export default InternalNotes;
