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

  const [data, setData] = useState({name:'', email:'', mobile:'', children:[]});

  useEffect(() => {
    getAthletes();
    setData(user.data())
  }, []);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("🚀 ~ file: EditParentModal.js:26 ~ handleSubmit ~ data:", data)
    if (data.mobile) {
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
              <Form.Select name="child1" onChange={handleChange}>
                <option>-</option>
                {athletes.map((athlete)=>(<option key={athlete.id+'1'}>{athlete.data().name}</option>))}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Child 2 </InputGroup.Text>
              <Form.Select name="child2" onChange={handleChange}>
                <option>-</option>
                {athletes.map((athlete)=>(<option key={athlete.id+'2'}>{athlete.data().name}</option>))}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Child 3 </InputGroup.Text>
              <Form.Select name="child3" onChange={handleChange}>
                <option>-</option>
                {athletes.map((athlete)=>(<option key={athlete.id+'3'}>{athlete.data().name}</option>))}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Child 4 </InputGroup.Text>
              <Form.Select name="child4" onChange={handleChange}>
                <option>-</option>
                {athletes.map((athlete)=>(<option key={athlete.id+'4'}>{athlete.data().name}</option>))}
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
