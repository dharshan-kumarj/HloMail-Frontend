import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import "../styles/edit_api_popup.css";

interface EditApiPopUpProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (value: string) => void;
}

const EditApiPopUp: React.FC<EditApiPopUpProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(inputValue);
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="edit-api-modal"
    >
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title className="fs-3">Change Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Edit API key's name"
              id="inputValue"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary save-button">
            Save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditApiPopUp;