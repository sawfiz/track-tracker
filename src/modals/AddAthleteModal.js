import React, { useContext, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { AthleteDetailsContext } from '../contexts/AthleteDetailsContext';

export default function AddAthleteModal({ show }) {
  const { closeAddModal, addAthlete } = useContext(AthleteDetailsContext);

  // Input fields in the form
  const [formData, setFormData] = useState({
    name: '',
    active: false,
    gender: '',
    birthdate: '',
    school: '',
    phone: 0,
    father: '',
    mother: '',
    role: 'athlete',
    photoURL: '',
  });

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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleChangeCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleChangePhoto = async (e) => {
    const file = e.target.files[0];
    // Upload the photo to Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `athlete_photos/${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    // Update the photoURL field in the form data
    setFormData({ ...formData, photoURL: downloadURL });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.name) {
      setHasNoName(false);
      if (formData.gender) {
        setHasNoGendar(false);

        addAthlete(formData);
        closeAddModal();
      } else {
        setHasNoGendar(true);
      }
      setHasNoName(true);
    }
  };

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
              <InputGroup className="mb-3">
                <InputGroup.Text>Name </InputGroup.Text>
                <Form.Control
                  isInvalid={hasNoName}
                  autoFocus
                  placeholder="Name"
                  name="name"
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
                  onChange={handleChangeCheckbox}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>Gender </InputGroup.Text>
                <Form.Select
                  isInvalid={hasNoGender}
                  name="gender"
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
                  onChange={handleChange}
                  placeholder="Date of Birth"
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>School </InputGroup.Text>
                <Form.Control
                  placeholder="School"
                  name="school"
                  onChange={handleChange}
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Text>Phone </InputGroup.Text>
                <Form.Control
                  type="number"
                  placeholder="Phone"
                  name="phone"
                  onChange={handleChange}
                />
              </InputGroup>
              
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={closeAddModal}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    </div>
  );
}
