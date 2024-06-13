import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

interface GenerateApiPopUpProps {
  show: boolean;
  onHide: () => void;
  onSubmit: (value: [string, string]) => void;
}

const GenerateApiPopUp: React.FC<GenerateApiPopUpProps> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState("option1"); // Default select option

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit([selectValue, inputValue]); // Return an array with input value and selected option
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>GenerateApiPopUp</Modal.Title>
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
          <div className="mb-3">
            <label htmlFor="selectValue" className="form-label">
              Choose an option:
            </label>
            <select
              className="form-control"
              id="selectValue"
              value={selectValue}
              onChange={(event) => setSelectValue(event.target.value)}
            >
              <option value="contact">contact</option>
              <option value="noreply">noreply</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default GenerateApiPopUp;
