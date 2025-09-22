// src/CreateList.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function CreateList({ title, author, handleChange, createList }) {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>Create</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Create New Book</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                name="title"
                value={title}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter author"
                name="author"
                value={author}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button
            variant="success"
            onClick={async (e) => {
              await createList(e);
              setShow(false);
            }}
          >
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
