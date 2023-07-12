import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

const S = {};
S.Section = styled.div`
  display: flex;
  justify-content: space-around;
`;

export default function SubmitAttendanceModal ({
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
      <Modal.Header >
        <Modal.Title>Data on this day already exists.</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <p>Make a choice</p>
        <S.Section>
          <Button variant="primary" onClick={() => handleOptionSelect('overwrite')}>
            Overwrite
          </Button>
          {/* <Button variant="primary" onClick={() => handleOptionSelect('merge')}>
            Merge
          </Button> */}
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
        </S.Section>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleConfirm} disabled={!selectedOption}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
