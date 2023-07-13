import React, { useContext, useState, useEffect } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
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
S.Center = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function EditAthleteModal({ show }) {
  const { athleteToEdit, getAthleteInfo, updateAthlete, closeEditModal } =
    useContext(AthleteDetailsContext);

  const [athleteInfo, setAthleteInfo] = useState({
    name: '',
    photoURL: '', 
    active: false,
    gender: '',
    birthdate: '',
    school: '',
    phone: '',
    father: '',
    mother: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAthleteInfo(athleteToEdit);
      // As some fields may not have data, simply assigning data will
      // cause warning.  e.g. father was '', but if data retrieved does not
      // have value, it will be assigned undefined, causing warning.
      setAthleteInfo({...athleteInfo, data});
    };
    fetchData();
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

    setAthleteInfo({ ...athleteInfo, [e.target.name]: e.target.value });
  };

  // Function to handle a checkbox change in the form
  const handleChangeCheckbox = (e) => {
    setAthleteInfo({ ...athleteInfo, [e.target.name]: e.target.checked });
  };

  // Function to handle adding a photo in the form
  const handleChangePhoto = async (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `athlete_photos/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    // Update the photoURL field in the form data
    setAthleteInfo({ ...athleteInfo, photoURL: downloadURL });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (athleteInfo.name) {
      setHasNoName(false);
      if (athleteInfo.gender) {
        setHasNoGendar(false);
        updateAthlete(athleteInfo);
        closeEditModal();
      } else {
        setHasNoGendar(true);
      }
      setHasNoName(true);
    }
  };

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
              <S.Center>
                <Form.Check
                  type="checkbox"
                  name="active"
                  checked={athleteInfo.active}
                  onChange={handleChangeCheckbox}
                />
              </S.Center>
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
