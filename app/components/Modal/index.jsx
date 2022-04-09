import React, { useEffect } from "react";
import PropTypes from "prop-types";

import close from "@/assets/images/xclose.svg";

// eslint-disable-next-line
import * as S from "./styled";

export default function Modal({
  modalContent,
  setVisible,
  changeWidth,
  trigger,
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

  window.onclick = (e) => {
    if (show && e.target.className === "backdrop display-block") {
      setVisible(false);
    }
  };

  return (
    <S.Modal changeWidth={changeWidth ?? false}>
      <div id="modal">
        <ModalTrigger handleClose={hideModal} show={show} widthFit={widthFit}>
          {modalContent}
        </ModalTrigger>
        {trigger && (
          <button className="button fade-btn" onClick={showModal} type="button">
            {trigger}
          </button>
        )}
      </div>
    </S.Modal>
  );
}

Modal.propTypes = {
  modalContent: PropTypes.func,
  setVisible: PropTypes.func,
  changeWidth: PropTypes.string,

  trigger: PropTypes.func,
  visible: PropTypes.bool,
  widthFit: PropTypes.string,
};

Modal.defaultProps = {
  visible: true,
};

const ModalTrigger = ({ children, handleClose, show, widthFit }) => {
  const showHideClassName = show
    ? "backdrop display-block"
    : "backdrop display-none";

  return (
    <div className={showHideClassName}>
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
