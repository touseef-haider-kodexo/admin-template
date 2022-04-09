import React, { useEffect } from "react";
import PropTypes from "prop-types";

import * as S from "./styled";

import close from "@/assets/images/xclose.svg";
import Button from "@/components/Button";

export default function MessageModal({
  title,
  setVisible,
  changeWidth,
  messageTitle,
  trigger,
  handleContinue,
  handleCancel,
  visible,
  widthFit,
}) {
  const [show, setShow] = React.useState(false);
  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
    setVisible(false);
  };

  useEffect(() => {
    setShow(visible);
  }, [visible]);

  return (
    <S.Modal changeWidth={changeWidth ?? false}>
      <ModalTrigger handleClose={hideModal} show={show} widthFit={widthFit}>
        <div className="modal-content-main">
          <h1 className="modal-title">Are you sure?</h1>
          <div
            className="modal-text-input-container"
            style={{ marginTop: "10px" }}
          >
            <p className="modal-input-label">
              {`Looks like you are about to the change the ${title}
              for this claim's customer. If you save this change, the 
              ${messageTitle} will need to be reselected`}
            </p>
          </div>
          <div className="modal-btn-parent" style={{ marginTop: "20px" }}>
            <button
              className="modal-light-btn"
              onClick={handleCancel}
              type="button"
            >
              <span>Cancel</span>
            </button>
            <div>
              <Button
                style={{
                  fontSize: "13px",
                }}
                onClick={handleContinue}
                size="small"
                value="Save & Continue"
              />
            </div>
          </div>
        </div>
      </ModalTrigger>
      {trigger && (
        <button className="button fade-btn" onClick={showModal} type="button">
          {trigger}
        </button>
      )}
    </S.Modal>
  );
}

MessageModal.propTypes = {
  setVisible: PropTypes.func,
  handleContinue: PropTypes.func,
  handleCancel: PropTypes.func,
  trigger: PropTypes.func,
  visible: PropTypes.bool,
  widthFit: PropTypes.string,
  title: PropTypes.string,
  changeWidth: PropTypes.bool,
  messageTitle: PropTypes.string,
};

MessageModal.defaultProps = {
  visible: true,
};

const ModalTrigger = ({ children, handleClose, show, widthFit }) => {
  const showHideClassName = show
    ? "backdrop display-block"
    : "backdrop display-none";

  return (
    <div
      onKeyPress={() => {}}
      role="presentation"
      onClick={(e) => {
        if (show && e.currentTarget.className === "backdrop display-block") {
          handleClose();
        }
      }}
      className={showHideClassName}
    >
      <section className={`modal-main  image-modal ${widthFit}`}>
        {children}
        <button
          className="fade-btn abs-btn"
          onClick={handleClose}
          type="button"
        >
          <img alt="close" src={close} />
        </button>
      </section>
    </div>
  );
};

ModalTrigger.propTypes = {
  children: PropTypes.func,
  handleClose: PropTypes.func,
  show: PropTypes.func,
  widthFit: PropTypes.string,
};
