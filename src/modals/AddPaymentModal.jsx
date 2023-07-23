// Libraries
import React, { useState, useContext, useEffect } from 'react';
import { collection, addDoc } from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

// Contexts
import { UserContext } from '../contexts/UserContext';
import { AthleteContext } from '../contexts/AthleteContext';

// Styling
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';

export default function AddPaymentModal({
  show,
  closePaymentModal,
  athleteID,
}) {
  const { userInfo } = useContext(UserContext);
  const { getAthleteInfo } = useContext(AthleteContext);
  const [data, setData] = useState({});
  const paymentsCollection = collection(db, 'users', athleteID, 'payments');

  // Input fields in the form
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0], // Set initial value to today's date
    amount: 0,
    paidBy: '',
    for: '',
    recordedBy: userInfo.name,
  });

  const resetFormData = () => {
    // Reset the form data to its initial values or an empty state
    setFormData({
      date: new Date().toISOString().split('T')[0], // Set initial value to today's date
      amount: null,
      paidBy: '',
      for: '',
      recordedBy: userInfo.name,
    });
  };

  const fetchData = async () => {
    const info = await getAthleteInfo(athleteID);
    setData(info);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addPayment = async () => {
    try {
      await addDoc(paymentsCollection, formData);
    } catch (error) {
      console.error('Error adding payment:', error);
    }
  };

  const handleChange = (e) => {
    const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
    // setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    resetFormData();
    closePaymentModal();
  }

  const handleSubmit = () => {
    if (formData.date && formData.amount && formData.for) {
      // Both date and note fields are filled
      // Perform the submission logic here
      addPayment();
      alert('Form submitted successfully!');
      resetFormData();
      closePaymentModal();
    } else {
      // Date or note field is missing
      alert('Note can not be empty!');
    }
  };

  return (
    <Modal show={show} onHide={closePaymentModal} backdrop="static" centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>New Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>Date</InputGroup.Text>
              <Form.Control
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Amount</InputGroup.Text>
              <Form.Control
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Paid By</InputGroup.Text>
              <Form.Select
                name="paidBy"
                value={formData.paidBy}
                onChange={handleChange}
              >
                <option>-</option>
                <option>{data.father}</option>
                <option>{data.mother}</option>
              </Form.Select>
            </InputGroup>

            <Form.Control
              as="textarea"
              rows={3}
              name="for"
              placeholder="Purpose of the payment..."
              onChange={handleChange}
            />
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
