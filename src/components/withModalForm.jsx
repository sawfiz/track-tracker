// Libraries
import React, { useState, useEffect } from 'react';
import { doc, addDoc, updateDoc } from 'firebase/firestore';
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
    const { initialData } = props;

    const [isSavingModalOpen, setIsSavingModalOpen] = useState(false);
    const [formData, setFormData] = useState({});

    // Set up initial state of formData
    useEffect(() => {
      // Populate formData with initialData when editing an existing record
      if (initialData) {
        setFormData(initialData.data());
      } else {
        // Initialize formData when creating a new record
        const initialFormData = {};
        inputConfig.forEach((input) => {
          initialFormData[input.name] = input.type === 'checkbox' ? false : '';
          initialFormData[input.name] =
            input.type === 'date' ? new Date().toISOString().split('T')[0] : '';
          // initialFormData[input.name] = '';
        });
        setFormData(initialFormData);
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
      setFormData({});
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
        closeModal();
      } catch (error) {
        console.error('Error adding data:', error);
      }
    };

    const handleSave = () => {
      setIsSavingModalOpen(true); // Show "Saving..." modal before starting save process

      if (!initialData) {
        // Perform save action with formData
        console.log('Saving...');

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
        setFormData(initialState);
      } else {
        // Update the existing record in Firestore
        updateData();
      }

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
                  const {
                    name,
                    type,
                    label,
                    rows,
                    placeholder,
                    options,
                    value,
                  } = input;
                  switch (type) {
                    case 'text':
                      return (
                        <InputGroup className="mb-2">
                          <InputGroup.Text>{label}</InputGroup.Text>
                          <Form.Control
                            key={name}
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
                            key={name}
                            name={name}
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
                            name={name}
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

        {/* "Saving..." modal */}
        <Modal
          show={isSavingModalOpen}
          // onHide={() => {}}
          backdrop="static"
          // centered
        >
          <div>
            <h2 className="  text-center">Saving...</h2>
          </div>
        </Modal>
      </React.Fragment>
    );
  };
}
