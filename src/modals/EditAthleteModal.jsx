// Libraries
import React, { useContext } from 'react';

// Contexts
import { AthleteContext } from '../contexts/AthleteContext';

// Styling
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function EditAthleteModal({
  show,
  athleteInfo,
  handleChange,
  handleChangeCheckbox,
  handleChangePhoto,
  handleSubmit,
  hasNoName,
  hasNoGender,
}) {
  const { closeEditModal } = useContext(AthleteContext);

  return (
    <Modal show={show} onHide={closeEditModal} backdrop="static" centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Edit Athlete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>Name </InputGroup.Text>
              <Form.Control
                isInvalid={hasNoName}
                autoFocus
                placeholder="Name"
                name="name"
                value={athleteInfo.name}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Photo </InputGroup.Text>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleChangePhoto}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Active </InputGroup.Text>
              <Form.Check
                type="checkbox"
                name="active"
                checked={athleteInfo.active}
                onChange={handleChangeCheckbox}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Gender </InputGroup.Text>
              <Form.Select
                isInvalid={hasNoGender}
                name="gender"
                value={athleteInfo.gender}
                onChange={handleChange}
              >
                <option>-</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Birthdate</InputGroup.Text>
              <Form.Control
                type="date"
                name="birthdate"
                value={athleteInfo.birthdate}
                onChange={handleChange}
                placeholder="Date of Birth"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>School </InputGroup.Text>
              <Form.Control
                name="school"
                value={athleteInfo.school}
                onChange={handleChange}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Phone </InputGroup.Text>
              <Form.Control
                type="number"
                name="phone"
                value={athleteInfo.phone}
                onChange={handleChange}
              />
            </InputGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
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
