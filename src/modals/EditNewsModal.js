// Libraries
import React from 'react';

// Styling
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';

// Code
export default function EditNewsModal({
  show,
  news,
  hasHeadline,
  hideEditModal,
  handleChange,
  handleChangeCheckbox,
  handleChangePhoto,
  handleSubmit,
}) {
  const {date, headline, text, photoURL, publish} = news;

  return (
    <Modal show={show} onHide={hideEditModal} backdrop="static" centered>
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Edit News</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text>Date</InputGroup.Text>
              <Form.Control
                type="date"
                name="date"
                value={date}
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
                name="headline"
                value={headline}
                onChange={handleChange}
              />
            </InputGroup>

            <Form.Control
              as="textarea"
              rows={8}
              name="text"
              value={text}
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
                checked={publish}
                onChange={handleChangeCheckbox}
              />
            </InputGroup>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={hideEditModal}>
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
