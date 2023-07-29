// Libraries
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
} from 'firebase/firestore';

// Config
import { db } from '../config/firebase';

// Styling
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/Form';

export default function EditAboutUs() {
  const aboutCollection = collection(db, 'about');

  const navigate = useNavigate();

  const [contentDocID, setContentDocID] = useState(null);
  const [empty, setEmpty] = useState(true);
  const [about, setAbout] = useState({ text: '' });

  const fetchData = async () => {
    const docRefs = await getDocs(aboutCollection);
    if (!docRefs.empty) {
      const content = docRefs.docs[0];
      setContentDocID(content.id);
      setEmpty(docRefs.empty);
      setAbout(content.data());
    }
  };

  useEffect(() => { 
    fetchData();
  }, []);

  const handleChange = (e) => {
    setAbout({ text: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (empty) { // About Us was empty
      try {
        await addDoc(aboutCollection, about);
        navigate('/admin');
      } catch (error) {
        console.error('Error adding about:', error);
      }
    } else {
      try {
        const contentDoc = doc(aboutCollection, contentDocID);
        await updateDoc(contentDoc, about);
        navigate('/admin');
      } catch (error) {
        console.error('Error editing about:', error);
      }
    }
  };

  const handleCancel = () => {
    navigate('/admin'); 
  }

  return (
    <main>
      <h2>Edit About Us</h2>
      <Form>
        <Form.Control
          autoFocus
          as="textarea"
          rows={16}
          name="about"
          value={about.text}
          onChange={handleChange}
        ></Form.Control>
      </Form>
      <div className='flex justify-around mt-4'>
        <Button variant="secondary" onClick={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </main>
  );
}
