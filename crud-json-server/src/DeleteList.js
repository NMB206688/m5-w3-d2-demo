// src/DeleteList.js
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function DeleteList({
  id,
  singleTitle,
  singleAuthor,
  getSingleList,
  deleteList,
}) {
  const [show, setShow] = useState(false);

  const openAndLoad = async (e) => {
    await getSingleList(e, id);
    setShow(true);
  };

  return (
    <>
      <Button size="sm" variant="danger" onClick={openAndLoad}>
        Delete
      </Button>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Book #{id}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={singleTitle} disabled readOnly />
            </Form.Group>

            <Form.Group>
              <Form.Label>Author</Form.Label>
              <Form.Control type="text" value={singleAuthor} disabled readOnly />
            </Form.Group>
          </Form>
        </Modal.Body>

        {/* ✅ Correct tag */}
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Close
          </Button>
          <Button
            variant="danger"
            onClick={async (e) => {
              await deleteList(e, id);
              setShow(false);
            }}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
