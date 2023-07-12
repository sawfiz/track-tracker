import React, { useContext } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import styled from 'styled-components';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';

const S = {};
S.Section = styled.div`
  margin: 1rem 0;
  border: 1px dashed hotpink;
  padding: 1rem;
`;
S.Entry = styled.div`
  margin: 0.3rem 0;
`;
S.Input = styled.input`
  position: absolute;
  left: 7rem;
`;
S.Select = styled.select`
  position: absolute;
  left: 7rem;
`;
S.Button = styled.button`
  margin: auto;
`;

export default function AddAthleteModal({ show, handleClose }) {
  const {  closeAddModal } = useContext(
    AthleteDetailsContext
  );
  return (
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal show={show} onHide={closeAddModal} backdrop="static" centered>
        <Modal.Dialog>
          <Modal.Header closeButton>
            <Modal.Title>New Athlete</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Form>
              <S.Entry>
                <Form.Control autoFocus placeholder="Name" />
              </S.Entry>
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Gender </InputGroup.Text>
                <Form.Select>
                  <option>-</option>
                  <option>Male</option>
                  <option>Female</option>
                </Form.Select>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Birthdate</InputGroup.Text>
                <Form.Control
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                />
              </InputGroup>

              <S.Entry>
                <Form.Control placeholder="School" />
              </S.Entry>
              <S.Entry>
                <Form.Control placeholder="Phone" />
              </S.Entry>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Father </InputGroup.Text>
                <Form.Select>
                  <option>-</option>
                </Form.Select>
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">Mother </InputGroup.Text>
                <Form.Select>
                  <option>-</option>
                </Form.Select>
              </InputGroup>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeAddModal}>
              Close
            </Button>
            <Button variant="primary">Save changes</Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
