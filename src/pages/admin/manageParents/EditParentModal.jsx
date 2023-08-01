// Libraries
import React, { useContext, useState, useEffect } from 'react';

// Contexts
import { UserContext } from '../../../contexts/UserContext';
import { AthleteContext } from '../../../contexts/AthleteContext';

// Styling
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

export default function EditParentModal({ show, hideModal, user }) {
  const { updateUser, getUserData } = useContext(UserContext);
  const { athletes, getAthletes, updateAthleteParent } =
    useContext(AthleteContext);
  const [children, setChildren] = useState(['', '', '', '']);

  const [data, setData] = useState({
    name: '',
    email: '',
    gender: '',
    mobile: '',
  });

  const [child2Disabled, setChild2Disabled] = useState(true);
  const [child3Disabled, setChild3Disabled] = useState(true);
  const [child4Disabled, setChild4Disabled] = useState(true);

  useEffect(() => {
    if (children[0] && children[0] !== '-') {
      setChild2Disabled(false);
    }
    if (children[1] && children[1] !== '-') {
      setChild3Disabled(false);
    }
    if (children[2] && children[2] !== '-') {
      setChild4Disabled(false);
    }
  }, [children]);

  const fetchData = async () => {
    const data = await getUserData(user.id);
    setData((prevData) => ({
      ...prevData,
      name: data.name,
      email: data.email,
      gender: data.gender,
      mobile: data.mobile,
    }));
    if (data.children) {
      setChildren(data.children);
    }
  };

  useEffect(() => {
    fetchData();
    getAthletes();
  }, []);

  // Fetch parent data again when modal is open/closed
  // I should only need to fetch data when the modal closes
  // But adding an if (show) does not show the uptodate data
  useEffect(() => {
    fetchData();
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('child')) {
      const childNumber = name.slice(-1);
      const childIndex = parseInt(childNumber, 10) - 1;
      const updatedChildren = [...children];
      updatedChildren[childIndex] = value;
      // In case a parent assigned a child to '-'
      const filteredChildren = updatedChildren.filter((child) => child !== '-');
      setChildren(filteredChildren);
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.mobile) {
      const childrenSet = new Set(children);
      const childrenArray = Array.from(childrenSet);
      const updatedData = { ...data, children: childrenArray };
      childrenArray.forEach((child) => {
        updateAthleteParent(child, data.name, data.gender);
      });
      updateUser(user, updatedData);
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
              <InputGroup.Text>Gender</InputGroup.Text>
              <Form.Select
                name="gender"
                value={data.gender}
                onChange={handleChange}
              >
                <option>-</option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </InputGroup>
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
                value={children[0]}
                onChange={handleChange}
              >
                <option>-</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id + '0'} value={athlete.id}>
                    {athlete.data().name}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Child 2 </InputGroup.Text>
              <Form.Select
                name="child2"
                disabled={child2Disabled}
                value={children[1]}
                onChange={handleChange}
              >
                <option>-</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id + '1'} value={athlete.id}>
                    {athlete.data().name}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Child 3 </InputGroup.Text>
              <Form.Select
                name="child3"
                disabled={child3Disabled}
                value={children[2]}
                onChange={handleChange}
              >
                <option>-</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id + '2'} value={athlete.id}>
                    {athlete.data().name}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text>Child 4 </InputGroup.Text>
              <Form.Select
                name="child4"
                disabled={child4Disabled}
                value={children[3]}
                onChange={handleChange}
              >
                <option>-</option>
                {athletes.map((athlete) => (
                  <option key={athlete.id + '3'} value={athlete.id}>
                    {athlete.data().name}
                  </option>
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
