// Libraries
import React, { useState } from 'react';

// Styling
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function SubmitAttendanceModal({
  show,
  handleClose,
  handleOverwrite,
  // handleMerge,
}) {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleModalClose = () => {
    setSelectedOption(null);
    handleClose();
  };

  const handleConfirm = () => {
    if (selectedOption === 'overwrite') {
      handleOverwrite();
      // } else if (selectedOption === 'merge') {
      //   handleMerge();
    }
    handleModalClose();
  };

  return (
    <Modal show={show} onHide={handleModalClose} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>Data on this day already exists.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Make a choice</p>
        <div className='flex justify-around'>
          <Button
            variant="primary"
            onClick={() => handleOptionSelect('overwrite')}
          >
            Overwrite
          </Button>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="primary"
          onClick={handleConfirm}
          disabled={!selectedOption}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
