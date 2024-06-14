import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

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

  const handleSubmit = (event: { preventDefault: () => void }) => {
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
    >
      <Modal.Header closeButton>
        <Modal.Title className="fs-3">Change Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#EEEDF3' }}>
          <div className="mb-3">
            {/* <label htmlFor="inputValue" className="form-label">
              Enter a value:
            </label> */}
            <input
              type="text"
              className="form-control"
              placeholder="Edit API key’s name"
              id="inputValue"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{
              backgroundColor: '#00B707',
              padding: '0.5rem 13.3rem',
              fontSize: '0.9rem',
            }}
          >
            Save
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default EditApiPopUp;
