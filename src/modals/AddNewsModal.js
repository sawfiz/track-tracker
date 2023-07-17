// Libraries
import React, { useState, useContext } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Config
import { db } from '../config/firebase';

// Contexts
import { UserContext } from '../contexts/UserContext';

// Styling
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

// Code
export default function AddNewsModal({ show, hideAddModal }) {
  const newsCollection = collection(db, 'news');
  const { userInfo } = useContext(UserContext);

  // Input fields in the form
  const [formData, setFormData] = useState({
    date: '',
    headline: '',
    text: '',
    photoURL: '',
    publish: false,
    publishedBy: userInfo.name,
  });

  const [hasDate, setHasDate] = useState(false);
  const [hasHeadline, setHasHeadline] = useState(false);

  // Function to handle changes in the form
  const handleChange = (e) => {
    if (e.target.name === 'date' && e.target.value) {
      setHasDate(true);
    }
    if (e.target.name === 'headline' && e.target.value) {
      setHasHeadline(true);
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

  const handleChangeCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formData);

    if (formData.date) {
      setHasDate(true);
      if (formData.headline) {
        setHasHeadline(true);
        await addDoc(newsCollection, formData);
        hideAddModal();
      } else {
        setHasHeadline(false);
      }
      setHasDate(false);
    }
  };

  return (
    <Modal show={show} onHide={hideAddModal} backdrop="static" centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>New News Item</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>Date</InputGroup.Text>
              <Form.Control
                isInvalid={!hasDate}
                type="date"
                name="date"
                onChange={handleChange}
                placeholder="Date of Birth"
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Headline</InputGroup.Text>
              <Form.Control
                autoFocus
                isInvalid={!hasHeadline}
                as="textarea"
                rows={2}
                placeholder=""
                name="headline"
                onChange={handleChange}
              />
            </InputGroup>

            <Form.Control
              as="textarea"
              rows={8}
              placeholder="Enter news here..."
              name="text"
              onChange={handleChange}
            />

            <InputGroup className="mb-3">
              <InputGroup.Text>Photo </InputGroup.Text>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleChangePhoto}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text>Publish </InputGroup.Text>
              <Form.Check
                type="checkbox"
                name="publish"
                onChange={handleChangeCheckbox}
              />
            </InputGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={hideAddModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Add
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
