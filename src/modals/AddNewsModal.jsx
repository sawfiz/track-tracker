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

  // Convert a Date to yyyy-mm-dd
  const convertDateForInput = (date) => {
    const options = {
      timeZone: 'Asia/Singapore',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    };
    return date
      .toLocaleDateString('en-GB', options)
      .split('/')
      .reverse()
      .join('-');
  };

  // Input fields in the form
  // const [selectedDate, setSelectedDate] = useState());
  const [hasHeadline, setHasHeadline] = useState(true);
  const [today, setToday] = useState(() => convertDateForInput(new Date()));
  const [formData, setFormData] = useState({
    // date: today,
    date: today,
    headline: '',
    text: '',
    photoURL: '',
    publish: false,
    publishedBy: userInfo.name,
  });

  // Function to handle changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'headline' && value) {
      setHasHeadline(true);
    }
    setFormData({ ...formData, [name]: value });
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
    if (formData.date) {
      if (formData.headline) {
        setHasHeadline(true);
        await addDoc(newsCollection, formData);
        hideAddModal();
      } else {
        setHasHeadline(false);
      }
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
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
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
            Save
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
