// Libraries
import React from 'react';

// Styling
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export default function DelNewsModal({ show, hideDelModal, deleteNews }) {
  return (
    <Modal show={show} onHide={hideDelModal} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>Are you sure you want to delete?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='m-4 flex justify-around '>
          <Button variant="danger" onClick={deleteNews}>
            Delete
          </Button>
          <Button variant="secondary" onClick={hideDelModal}>
            Cancel
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
