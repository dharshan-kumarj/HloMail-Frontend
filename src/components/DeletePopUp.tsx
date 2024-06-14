import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/GenerateApiPopUP.css";

interface GenerateApiPopUpProps {
  show: boolean;
  onHide: () => void;
  onSubmit: () => void;
}

const GenerateApiPopUp: React.FC<GenerateApiPopUpProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(); // Return an array with input value and selected option
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fs-3 modal-title"
        >
          Delete Key
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} style={{ backgroundColor: "#EEEDF3" }}>
          <button
            type="submit"
            className="btn btn-primary submit"
            style={{ backgroundColor: "#aa14f0" }}
          >
            Delete key
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default GenerateApiPopUp;
