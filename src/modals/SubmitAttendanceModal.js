import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // Set the root element for the modal

const SubmitAttendanceModal = ({
  isOpen,
  handleClose,
  handleOverwrite,
  handleMerge,
}) => {
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
    } else if (selectedOption === 'merge') {
      handleMerge();
    }
    handleModalClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={handleModalClose}>
      <div>
        <h1>Choose an Option</h1>
      </div>
      <div>
        <button
          onClick={() => handleOptionSelect('overwrite')}
        >
          Overwrite
        </button>
        <button  onClick={() => handleOptionSelect('merge')}>
          Merge
        </button>
        <button onClick={handleModalClose}>
          Cancel
        </button>
      </div>
      <div>
        <button
          onClick={handleConfirm}
          disabled={!selectedOption}
        >
          Confirm
        </button>
      </div>
    </Modal>
  );
};

export default SubmitAttendanceModal;
