import React, { useContext, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../contexts/UserContext';

export default function UnmanagedUserModal({ show, hideModal, user }) {
  const {updateUser} = useContext(UserContext)
  const [data, setData] = useState(null)

  const handleChange = (e) => {
    setData({ ...user.data(), [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data && data.role !== '-') {
      console.log("🚀 ~ file: UnmanagedUserModal.js:12 ~ handleChange ~ data:", data)
      updateUser(user, data)
    } else {
      alert("Please assign a role to the user.")
    }

  };

  return (
    <Modal show={show} onHide={hideModal} backdrop="static" centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Assign new user a role</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Control disabled name="name" value={user.data().name} />
            <Form.Control disabled name="email" value={user.data().email} />
            <InputGroup className="mb-3">
              <InputGroup.Text>Role </InputGroup.Text>
              <Form.Select name="role" onChange={handleChange}>
                <option>-</option>
                <option>Parent</option>
                <option>Athlete</option>
                <option>Coach</option>
              </Form.Select>
            </InputGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={hideModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </Modal>
  );
}
