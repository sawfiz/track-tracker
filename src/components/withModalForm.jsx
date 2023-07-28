// Libraries
import React, { useState } from 'react';
import { addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Styling
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';

// Higher Order Component
export default function withModalForm(
  WrappedComponent,
  inputConfig,
  collectionVariable
) {
  return function WithModalForm(props) {
    const initialState = {};

    const requiredInputs = inputConfig.filter((input) => input.required);

    inputConfig.forEach((input) => {
      initialState[input.name] = input.type === 'checkbox' ? false : '';
      initialState[input.name] =
        input.type === 'date' ? new Date().toISOString().split('T')[0] : '';
    });

    const [formData, setFormData] = useState(initialState);

    const handleInputChange = (event) => {
      const { name, value, type, checkedgir } = event.target;
      const inputValue =
        type === 'checkbox' ? checked : value;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    };

    const handlePhotoChange = async (e) => {
      const file = e.target.files[0];
      // Upload the photo to Firebase Storage
      const storage = getStorage();
      const storageRef = ref(storage, `athlete_photos/${file.name}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
      // Update the photoURL field in the form data
      setFormData({ ...formData, photoURL: downloadURL });
    };

    const handleCancel = () => {
      setFormData(initialState);
      closeModal();
    };

    const addData = async () => {
      try {
        await addDoc(collectionVariable, formData);
      } catch (error) {
        console.error('Error adding data:', error);
      }
    };

    const handleSave = () => {
      // Perform save action with formData
      console.log('Saving...');

      const isFormValid = requiredInputs.every((input) => {
        const value = formData[input.name];
        if (input.type === 'checkbox') {
          return value === true;
        } else {
          return value.trim() !== '';
        }
      });

      if (!isFormValid) {
        alert('Please fill in all required fields.');
        return; // Prevent saving the form if any required fields are empty
      }
      console.log(formData);
      addData();
      setFormData(initialState);
      closeModal();
    };

    const openModal = () => {
      props.setShowModal(true);
    };

    const closeModal = () => {
      props.setShowModal(false);
    };

    return (
      <React.Fragment>
        <WrappedComponent openModal={openModal} {...props} />
        <Modal
          show={props.showModal}
          onHide={closeModal}
          backdrop="static"
          centered
        >
          <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {inputConfig.map((input) => {
                  const { name, type, label, rows, placeholder, options } =
                    input;
                  switch (type) {
                    case 'text':
                    case 'number':
                      return (
                        <InputGroup className="mb-2">
                          <InputGroup.Text>{label}</InputGroup.Text>
                          <Form.Control
                            key={name}
                            type="number"
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      );

                    case 'textarea':
                      return (
                        <Form.Control
                          className="mb-2"
                          key={name}
                          as="textarea"
                          rows={rows}
                          name={name}
                          value={formData[name]}
                          placeholder={placeholder}
                          onChange={handleInputChange}
                        />
                      );

                    case 'date':
                      return (
                        <InputGroup className="mb-2">
                          <InputGroup.Text>{label}</InputGroup.Text>
                          <Form.Control
                            key={name}
                            type="date"
                            name="date"
                            value={formData[name]}
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                      );

                    case 'select':
                      return (
                        <InputGroup className="mb-2">
                          <InputGroup.Text>{label}</InputGroup.Text>
                          <Form.Select
                            key={name}
                            name="paidBy"
                            value={formData.paidBy}
                            onChange={handleInputChange}
                          >
                            {options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Form.Select>
                        </InputGroup>
                      );

                    case 'checkbox':
                      return (
                        <InputGroup className="mb-3">
                          <InputGroup.Text>{label} </InputGroup.Text>
                          <Form.Check
                            key={name}
                            type="checkbox"
                            name="publish"
                            onChange={handleInputChange}
                            className="m-auto"
                          />
                        </InputGroup>
                      );

                    case 'file':
                      return (
                        <InputGroup className="mb-2">
                          <InputGroup.Text>{label} </InputGroup.Text>
                          <Form.Control
                            key={name}
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                          />
                        </InputGroup>
                      );

                    default:
                      return null;
                  }
                })}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCancel}>
                {props.cancelLabel || 'Cancel'}
              </Button>
              <Button variant="primary" onClick={handleSave}>
                {props.saveLabel || 'Save'}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </React.Fragment>
    );
  };
}
