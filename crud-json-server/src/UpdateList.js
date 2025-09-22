// src/UpdateList.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function UpdateList({
  id,
  singleTitle,
  singleAuthor,
  getSingleList,
  handleChange,
  updateList
}) {
  const [show, setShow] = useState(false);

  const openAndLoad = async (e) => {
    await getSingleList(e, id);
    setShow(true);
  };

  return (
    <>
      <Button size="sm" variant="warning" onClick={openAndLoad}>Update</Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Update Book #{id}</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="singleTitle"
                value={singleTitle}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="singleAuthor"
                value={singleAuthor}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>Close</Button>
          <Button
            variant="warning"
            onClick={async (e) => {
              await updateList(e, id);
              setShow(false);
            }}
          >
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
