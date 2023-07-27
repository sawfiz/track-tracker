// Libraries
import React, { useState } from 'react';

// Styling
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';


// import firebase from 'firebase/app';
// import 'firebase/firestore';

// Initialize Firebase (make sure you have your own Firebase config)
// const firebaseConfig = {
// Your Firebase config goes here
// };

// if (!firebase.apps.length) {
//   firebase.initializeApp(firebaseConfig);
// }

// const firestore = firebase.firestore();

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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleInputChange = (event) => {
      const { name, value, type, checked } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === 'checkbox' ? checked : value,
      }));
    };

    const handleDateChange = (date, name) => {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: date,
      }));
    };

    const handleCancel = () => {
      setFormData(initialState);
      closeModal();
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
      setFormData(initialState);
      closeModal();
      // firestore.collection(collectionVariable).add(formData)
      //   .then(() => {
      //     console.log('Data saved successfully:', formData);
      //     closeModal();
      //   })
      //   .catch((error) => {
      //     console.error('Error saving data:', error);
      //   });
    };

    const openModal = () => {
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setIsModalOpen(false);
    };

    return (
      <React.Fragment>
        <WrappedComponent openModal={openModal} {...props} />
        <Modal
          show={isModalOpen}
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
                  const { name, type, label, rows } = input;
                  switch (type) {
                    case 'text':
                    case 'number':
                      return (
                        <div key={name}>
                          <label>{label}</label>
                          <input
                            type={type}
                            name={name}
                            value={formData[name]}
                            onChange={handleInputChange}
                          />
                        </div>
                      );
                    case 'textarea':
                      return (
                        // <div key={name}>
                        //   <label>{label}</label>
                        //   <textarea
                        //     name={name}
                        //     value={formData[name]}
                        //     onChange={handleInputChange}
                        //   />
                        // </div>
                        <Form.Control
                          as="textarea"
                          rows={rows}
                          name={name}
                          value={formData[name]}
                          onChange={handleInputChange}
                        />
                      );
                    case 'checkbox':
                      return (
                        <div key={name}>
                          <label>
                            <input
                              type="checkbox"
                              name={name}
                              checked={formData[name]}
                              onChange={handleInputChange}
                            />
                            {label}
                          </label>
                        </div>
                      );
                    case 'date':
                      return (
                        <InputGroup className="mb-3">
                          <InputGroup.Text>Date</InputGroup.Text>
                          <Form.Control
                            type="date"
                            name="date"
                            value={formData[name]}
                            onChange={handleInputChange}
                          />
                        </InputGroup>
                        // <div key={name}>
                        //   <label>{label}</label>
                        //   <DatePicker
                        //     selected={
                        //       formData[name] ? new Date(formData[name]) : null
                        //     }
                        //     onChange={(date) => handleDateChange(date, name)}
                        //     placeholderText="Select a date"
                        //   />
                        // </div>
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
