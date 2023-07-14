import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';

const S = {
  Entry: styled.div`
    margin: 0.3rem 0;
  `,
};

export default function EditAthleteModal({
  show,
  athleteInfo,
  handleChange,
  handleChangeCheckbox,
  handleChangePhoto,
  handleSubmit,
  hasNoName,
  hasNoGender
}) {
  const { closeEditModal } = useContext(AthleteDetailsContext);

  return (
    <Modal show={show} onHide={closeEditModal} backdrop="static" centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Edit Athlete</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <S.Entry>
              <Form.Control
                isInvalid={hasNoName}
                autoFocus
                placeholder="Name"
                name="name"
                value={athleteInfo.name}
                onChange={handleChange}
              />
            </S.Entry>
            <S.Entry>
              <InputGroup className="mb-3">
                <InputGroup.Text>Photo </InputGroup.Text>
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={handleChangePhoto}
                />
              </InputGroup>
            </S.Entry>
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

            <S.Entry>
              <Form.Control
                placeholder="School"
                name="school"
                value={athleteInfo.school}
                onChange={handleChange}
              />
            </S.Entry>
            <S.Entry>
              <Form.Control
                type="number"
                placeholder="Phone"
                name="phone"
                value={athleteInfo.phone}
                onChange={handleChange}
              />
            </S.Entry>

            <InputGroup className="mb-3">
              <InputGroup.Text>Father </InputGroup.Text>
              <Form.Select
                name="father"
                value={athleteInfo.father}
                onChange={handleChange}
              >
                <option>-</option>
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Mother </InputGroup.Text>
              <Form.Select
                name="mother"
                value={athleteInfo.mother}
                onChange={handleChange}
              >
                <option>-</option>
              </Form.Select>
            </InputGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeEditModal}>
            Close
          </Button>
          {/* <Button variant="primary" onClick={handleSubmit}> */}
          <Button variant="primary" onClick={handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
