import React, { useState, useContext, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import { UserContext } from '../contexts/UserContext';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function AddNotesModal({ show, closeNotesModal, athleteID }) {
  const { userInfo } = useContext(UserContext);
  const notesCollection = collection(db, 'users', athleteID, 'notes');

  // Input fields in the form
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0], // Set initial value to today's date
    note: '',
    by: userInfo.name,
  });

  const addNote = async () => {
    try {
      // await addDoc(notesCollection, athleteID);
      await addDoc(notesCollection, formData);
    } catch (error) {
      console.error('Error adding book:', error);
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (formData.date && formData.note) {
      // Both date and note fields are filled
      // Perform the submission logic here
      addNote();
      alert('Form submitted successfully!');
      closeNotesModal();
    } else {
      // Date or note field is missing
      alert('Note can not be empty!');
    }
  };

  return (
    <Modal show={show} onHide={closeNotesModal} backdrop="static" centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>New Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>Date</InputGroup.Text>
              <Form.Control type="date" name="date" value={formData.date} onChange={handleChange} />
            </InputGroup>

            <Form.Control as="textarea" rows={3} name="note" onChange={handleChange} />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeNotesModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
