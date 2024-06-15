import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface CopyApiPopUpProps {
  show: boolean;
  onHide: () => void;
  onSubmit: () => void;
  copySuccess: boolean;
}

const CopyApiPopUp: React.FC<CopyApiPopUpProps> = ({
  show,
  onHide,
  onSubmit,
  copySuccess,
}) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Copy API Key</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {copySuccess ? (
        <div className="success-message">API Key copied to clipboard!</div>
      ) : (
        <p>Are you sure you want to copy this API key to your clipboard?</p>
      )}
    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={onSubmit}>
        Copy API Key
      </Button>
    </Modal.Footer>
  </Modal>
);

export default CopyApiPopUp;