import { BarController } from "chart.js";
import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/GenerateApiPopUP.css';

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
  const [selectValue, setSelectValue] = useState("contact"); // Default select option

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit([selectValue, inputValue]); // Return an array with input value and selected option
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
        <Modal.Title id="contained-modal-title-vcenter" className="fs-3 modal-title">
          Create Key
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#EEEDF3' }}>
          <div className="mb-3">
            {/* <label htmlFor="inputValue h2 text-center" className="form-label">
            Name your API key
            </label> */}
            <input
              type="text"
              className="form-control"
              id="inputValue"
              placeholder="Name your API key"
              value={inputValue}
              onChange={(event) => setInputValue(event.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="selectValue" className="form-label">
              Choose API type:
            </label>
            <select
              className="form-control"
              id="selectValue"
              value={selectValue}
              onChange={(event) => setSelectValue(event.target.value)}
            >
              <option value="contact">Contact</option>
              <option value="noreply">No reply</option>
            </select>
          </div>
          <button type="submit" className="btn btn-primary submit" style={{ backgroundColor: '#aa14f0' }}>
          Generate key
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default GenerateApiPopUp;
