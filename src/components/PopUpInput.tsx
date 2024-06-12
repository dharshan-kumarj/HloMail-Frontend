import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

interface PopUpInputProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (value: string) => void;
}

const PopUpInput: React.FC<PopUpInputProps> = ({ show, onHide, onSubmit }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    onSubmit(inputValue);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>PopUpInput</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="inputValue" className="form-label">
              Enter a value:
            </label>
            <input
              type="text"
              className="form-control"
              id="inputValue"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default PopUpInput;