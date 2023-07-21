// Libraries
import React from 'react'

// Styling
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';

export default function SignOutModal({show, hideModal, handleSignout, handleSignOut}) {
  return (
    <Modal show={show} onHide={hideModal} centered backdrop="static">
      <Modal.Header>
        <Modal.Title>Logout</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={hideModal}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={handleSignOut}
        >
          Log Out
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
