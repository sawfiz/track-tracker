// Libraries
import React, { useState, useEffect } from 'react';
import { doc, addDoc, updateDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

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
    const { initialData } = props;

    const [isSavingModalOpen, setIsSavingModalOpen] = useState(false);
    const [formData, setFormData] = useState(null);

    const setInitFormData = () => {
      // Initialize formData when creating a new record
      const initialFormData = {};
      inputConfig.forEach((input) => {
        switch (input.type) {
          case 'checkbox':
            initialFormData[input.name] = false;
            break;
          case 'date':
            initialFormData[input.name] = new Date()
              .toISOString()
              .split('T')[0];
            break;
          case 'hidden':
            initialFormData[input.name] = input.value;
            break;
          default:
            initialFormData[input.name] = '';
            break;
        }
      });
      console.log("🚀 ~ file: withModalForm.jsx:47 ~ setInitFormData ~ initialFormData:", initialFormData)
      setFormData(initialFormData);
    };

    // Set up initial state of formData
    useEffect(() => {
      console.log('Modal Form mounted');
      // Populate formData with initialData when editing an existing record
      console.log("🚀 ~ file: withModalForm.jsx:58 ~ useEffect ~ initialData:", initialData)
      if (initialData) {
        setFormData(initialData.data());
      } else {
        setInitFormData();
        console.log("set initial data");
      }
      return () => {
        console.log('Modal Form unmounted');
      }
    }, []);

    // Filter the inputs that are required for submitting
    const requiredInputs = inputConfig.filter((input) => input.required);

    // Disable the Save button when uploading a photo
    const [isUploading, setIsUploading] = useState(false);

    const handleInputChange = async (event) => {
      const { name, value, type, checked, files } = event.target;
      let inputValue;
      if (type === 'checkbox') {
        inputValue = checked;
      } else if (type === 'file') {
        setIsUploading(true);
        const file = files[0];
        // Upload the photo to Firebase Storage
        const storage = getStorage();
        const storageRef = ref(storage, `athlete_photos/${file.name}`);
        await uploadBytes(storageRef, file);
        inputValue = await getDownloadURL(storageRef);
        setIsUploading(false);
        // The save button is disabled during uploading using the isUploading state
      } else {
        inputValue = value;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: inputValue,
      }));
    };

    const handleCancel = () => {
      setInitFormData();
      closeModal();
    };

    const addData = async (dataToSave) => {
      try {
        await addDoc(collectionVariable, dataToSave);
      } catch (error) {
        console.error('Error adding data:', error);
      }
    };

    const updateData = async () => {
      try {
        const contentDoc = doc(collectionVariable, initialData.id);
        await updateDoc(contentDoc, formData);
      } catch (error) {
        console.error('Error adding data:', error);
      }
    };

    function delay(time) {
      return new Promise((resolve) => setTimeout(resolve, time));
    }

    const handleSave = async () => {
      setIsSavingModalOpen(true); // Show "Saving..." modal before starting save process

      if (!initialData) {
        // Perform save action with formData

        // Verify all required fills are valid
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

        // Add hidden additonal data to formData, e.g. {role: 'athlete'}
        const dataToSave = { ...formData };
        const hiddenInput = inputConfig.find(
          (input) => input.type === 'hidden'
        );
        if (hiddenInput) {
          dataToSave[hiddenInput.name] = hiddenInput.value;
        }

        addData(dataToSave);
        setInitFormData();
      } else {
        // Update the existing record in Firestore
        updateData();
      }
      await delay(200);
      closeModal();
      setIsSavingModalOpen(false); // Show the "Saving..." modal
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
        { props.showModal && formData && (
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
                    const myKey = uuidv4()
                    
                    switch (type) {
                      case 'text':
                        return (
                          <InputGroup className="mb-2">
                            <InputGroup.Text>{label}</InputGroup.Text>
                            <Form.Control
                              // key={name}
                              key={myKey}
                              type="text"
                              name={name}
                              value={formData[name]}
                              onChange={handleInputChange}
                            />
                          </InputGroup>
                        );

                      case 'number':
                        return (
                          <InputGroup className="mb-2">
                            <InputGroup.Text>{label}</InputGroup.Text>
                            <Form.Control
                              // key={name}
                              key={myKey}
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
                            // key={name}
                            key={myKey}
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
                              // key={name}
                              key={myKey}
                              type="date"
                              name={name}
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
                              // key={name}
                              key={myKey}
                              name={name}
                              value={formData[name]}
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
                              // key={name}
                              key={myKey}
                              type="checkbox"
                              name={name}
                              checked={formData[name]}
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
                              // key={name}
                              key={myKey}
                              name={name}
                              type="file"
                              accept="image/*"
                              onChange={handleInputChange}
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
                <Button
                  variant="primary"
                  onClick={handleSave}
                  disabled={isUploading}
                >
                  {props.saveLabel || 'Save'}
                </Button>
              </Modal.Footer>
            </Modal.Dialog>
          </Modal>
        )}

        {/* "Saving..." modal */}
        <Modal
          show={isSavingModalOpen}
          backdrop="static"
          z-index="2000"
          centered
          className="  bg-slate-400 opacity-50"
        >
          <div>
            <h2 className="  text-center">Saving...</h2>
          </div>
        </Modal>
      </React.Fragment>
    );
  };
}
