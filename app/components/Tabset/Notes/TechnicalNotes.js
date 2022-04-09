/* eslint-disable indent */
import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { useSelector } from "react-redux";
import moment from "moment";

import Modal from "@/components/Modal";
import AppService from "@/services/api/app-service";
import editIcon from "@/assets/images/edit.svg";
import deleteIcon from "@/assets/images/delete.svg";
import ImageButton from "@/components/ImageButton";
import TextInput from "@/components/Input";
import Button from "@/components/Button";

import * as S from "../styled";

const TechnicalNotes = () => {
  const [current] = useState(1);
  const { claim_id, technician_notes_data } = useSelector(
    (state) => state.claim,
  );
  const { currentUser } = useSelector((state) => state.global);

  const [pageSize, setPageSize] = useState(5);
  const [inputValue, setInputValue] = useState("");
  const [note, setNote] = useState({});
  const [visible, setVisible] = useState(false);
  const [error, setError] = useState({
    add: false,
    edit: false,
  });
  const [total, setTotal] = useState(0);
  const [data, setData] = useState([]);

  const getClaimNotes = async ({ queryKey }) =>
    AppService.getTechnicalClaimNotes({
      pageSize: queryKey[1],
      current,
      claim: claim_id,
    });
  const updateClaimNotes = async (params) =>
    AppService.updateClaimNotes(params);
  const deleteClaimNotes = async (id) => AppService.deleteClaimNotes(id);
  const addClaimNotes = async (params) => AppService.addClaimNotes(params);

  // for refetching and caching
  const queryCache = useQueryClient();

  // for fetching
  const { isSuccess, isFetching } = useQuery(
    ["technicalClaimNotes", pageSize, visible],
    getClaimNotes,
    {
      onSuccess: (_data) => {
        setTotal(_data.total);
        setData(_data.notes);
      },
      enabled: !!claim_id,
      keepPreviousData: true,
    },
  );

  // for posting
  const createNotes = useMutation((query) => addClaimNotes(query), {
    onSuccess: () => {
      // Query Invalidations
      // setPageSize((prevState) => prevState + 1);
      queryCache.invalidateQueries("technicalClaimNotes");
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

        queryCache.invalidateQueries("technicalClaimNotes");
      },
    },
  );

  // for deleting
  const deleteNotes = useMutation((id) => deleteClaimNotes(id), {
    onSuccess: () => {
      // Query Invalidations
      setVisible(false);
      queryCache.invalidateQueries("technicalClaimNotes");
    },
  });

  //   for adding notes on ENTER key
  const handleAdd = () => {
    const obj = {
      note: inputValue,
      claim: claim_id,
      type: "technical_notes",
      email: "",
      user: currentUser,
      technician_notes_data,
    };
    if (inputValue.length > 0) {
      createNotes.mutate(obj);
      setInputValue("");
    } else {
      setError({
        ...error,
        add: true,
      });
    }
  };

  // for changing the input which may be updated or deleted
  const modalInputChange = (e) => {
    if (e.target.value.length > 0) {
      setError({
        ...error,
        add: false,
      });
    }
    setNote({ ...note, note: e.target.value });
  };

  // for loading more notes
  const loadMoreNotes = () => {
    setPageSize((prevState) => prevState + 4);
  };

  // for modal pop up
  const showModal = (action, notes, id) => {
    setNote({ action, note: notes, id });
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
      type: "technical_notes",
      email: "",
    };
    if (note.note.length > 0) {
      updateNotes.mutate(obj);
    } else {
      setError({
        ...error,
        edit: true,
      });
    }
  };

  const handleInput = (e) => {
    if (e.target.value.length > 0) {
      setError({
        ...error,
        add: false,
      });
    }
    setInputValue(e.target.value);
  };

  const deleteConfirmationModal = (isVisible) => (
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
      visible={isVisible}
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
                // setdeleteId("");
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
              label="Technician Notes"
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
          data.map((i) => (
            <div className="chat-box-container">
              <S.ChatBox>
                <div className="chat-box-main">
                  <div className="note-wrapper">
                    <p style={{ fontSize: "small" }}> {i?.note} </p>
                  </div>
                  <div className="note-details-wrapper">
                    <p className="name flex">{i.created_by.first_name}</p>
                    <p className="time flex">
                      {" "}
                      On {moment(i?.created_at).format("MM:DD:YYYY")} at{" "}
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
        {
          // eslint-disable-next-line
          isSuccess && data?.length !== total ? (
            Array.isArray(data) && data.length > 0 ? (
              <div id="load-more-btn-div">
                <Button
                  onClick={loadMoreNotes}
                  value={isFetching ? "Loading..." : "Load More"}
                />
              </div>
            ) : null
          ) : null
        }
        {note.action === "Delete Note" && deleteConfirmationModal(visible)}
        {note.action === "Update Note" && editConfirmationModal(visible)}
      </div>
    </S.TabPanel7>
  );
};

export default TechnicalNotes;
