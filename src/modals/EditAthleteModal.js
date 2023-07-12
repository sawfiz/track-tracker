import React, { useContext, useState, useEffect } from 'react';
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

export default function EditAthleteModal({ show }) {
  const { athleteToEdit, athleteInfo, getAthleteInfo, closeEditModal } =
  useContext(AthleteDetailsContext);
    
    useEffect(() => {
      getAthleteInfo(athleteToEdit);
    }, []);



  const [hasNoName, setHasNoName] = useState(false);
  const [hasNoGender, setHasNoGendar] = useState(false);

  // Function to handle changes in the form
  const handleChange = (e) => {
    if (e.target.name === 'name' && e.target.value) {
      setHasNoName(false);
    }
    if (e.target.name === 'gender' && e.target.value) {
      setHasNoGendar(false);
    }

    // setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(
    //   '🚀 ~ file: EditAthleteModal.js:80 ~ handleChange ~ formData:',
    //   formData
    // );
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (formData.name) {
  //     setHasNoName(false);
  //     if (formData.gender) {
  //       setHasNoGendar(false);
  //       addAthlete(formData);
  //       closeAddModal();
  //     } else {
  //       setHasNoGendar(true);
  //     }
  //     setHasNoName(true);
  //   }
  // };

  return (
    <Modal show={show} onHide={closeEditModal} backdrop="static" centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>New Athlete</Modal.Title>
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
              <Form.Select name="father" 
              value={athleteInfo.father}
              onChange={handleChange}>
                <option>-</option>
              </Form.Select>
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Mother </InputGroup.Text>
              <Form.Select name="mother" 
               value={athleteInfo.mother}
               onChange={handleChange}>
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
          <Button variant="primary">Save changes</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
