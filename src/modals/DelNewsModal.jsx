import React from 'react';
import styled from 'styled-components';

// Styling
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const S = {
  Buttons: styled.div`
    margin: 1rem;
    display: flex;
    justify-content: space-around;
  `,
};

export default function DelNewsModal({ show, hideDelModal, deleteNews }) {
  return (
    <Modal show={show} onHide={hideDelModal} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>Are you sure you want to delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <S.Buttons>
          <Button
            variant="danger"
            onClick={deleteNews}
          >
            Delete
          </Button>
          <Button variant="secondary" onClick={hideDelModal}>
            Cancel
          </Button>
        </S.Buttons>
      </Modal.Body>
    </Modal>
  );
}
