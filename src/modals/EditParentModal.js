import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { UserContext } from '../contexts/UserContext';
import { AthleteContext } from '../contexts/AthleteContext';

export default function EditParentModal({ show, hideModal, user }) {
  const { updateUser } = useContext(UserContext);
  const { athletes, getAthletes } = useContext(AthleteContext);

  const [data, setData] = useState({
    name: '',
    email: '',
    mobile: '',
    // children: new Set(),
    children: ['-', '-', '-', '-'],
  });

  useEffect(() => {
    getAthletes();
    setData((prevData) => ({
      ...prevData,
      name: user.data().name,
      email: user.data().email,
      mobile: user.data().mobile,
      children: user.data().children,
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('child')) {
      const childNumber = name.slice(-1);
      const childIndex = parseInt(childNumber, 10) - 1;
      const updatedChildren = [...data.children];
      updatedChildren[childIndex] = value;
      setData({ ...data, children: updatedChildren });
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.mobile) {
      // const updatedData = { ...data, children: Array.from(data.children) };
      updateUser(user, data);
      hideModal();
    } else {
      alert('Please enter a mobile number.');
    }
  };
  return (
    <Modal show={show} onHide={hideModal} backdrop="static" centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Edit a Parent</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Control
              className="mb-3"
              disabled
              name="name"
              value={data.name}
            />
            <Form.Control
              className="mb-3"
              disabled
              name="email"
              value={data.email}
            />
            <InputGroup className="mb-3">
              <InputGroup.Text>Mobile </InputGroup.Text>
              <Form.Control
                name="mobile"
                type="number"
                value={data.mobile}
                onChange={handleChange}
              ></Form.Control>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Child 1 </InputGroup.Text>
              <Form.Select
                name="child1"
                value={data.children[0]}
                onChange={handleChange}
              >
                <option>-</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id + '0'} value={athlete.id}>{athlete.data().name}</option>
                ))}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Child 2 </InputGroup.Text>
              <Form.Select name="child2" value={data.children[1]} onChange={handleChange}>
                <option>-</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id + '1'} value={athlete.id}>{athlete.data().name}</option>
                ))}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Child 3 </InputGroup.Text>
              <Form.Select name="child3" value={data.children[2]} onChange={handleChange}>
                <option>-</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id + '2'} value={athlete.id}>{athlete.data().name}</option>
                ))}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Child 4 </InputGroup.Text>
              <Form.Select name="child4" value={data.children[3]} onChange={handleChange}>
                <option>-</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id + '3'} value={athlete.id}>{athlete.data().name}</option>
                ))}
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
