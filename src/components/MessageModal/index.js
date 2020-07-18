import React from "react";
import { Modal, Button } from "react-bootstrap";
import PropTypes from "prop-types";

function MessageModal({ modelData, onClick }) {
  return (
    <Modal show={modelData.visibility} onHide={onClick}>
      <Modal.Header closeButton>
        <Modal.Title>Alert Message</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-danger">{modelData.message}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onClick}>
          Noted
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

MessageModal.propTypes = {
  modelData: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default MessageModal;
