import React from "react";
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/DeleteApiPopUp.css";

interface DeleteApiPopUpProps {
  show: boolean;
  onHide: () => void;
  onSubmit: () => void;
}

const DeleteApiPopUp: React.FC<DeleteApiPopUpProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit();
    onHide();
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="delete-api-modal"
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
        <form onSubmit={handleSubmit}>
          <div className="text-center mb-4">
            Are you sure you want to delete API key? This action cannot be
            undone.
          </div>
          <div className="d-flex justify-content-center">
            <button
              type="submit"
              className="btn btn-danger delete-button"
            >
              Delete key
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default DeleteApiPopUp;