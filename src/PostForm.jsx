import React, { useState } from "react";
import { Form, Button, Card } from "react-bootstrap";

export default function PostForm(props) {
  const { addPostToList } = props;
  const [checked, setChecked] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    addPostToList({ id: String(Math.random() * 1000 + 100), title, body });
    setTitle("");
    setBody("");
    setChecked(false);
  }
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Check
        type="checkbox"
        label="Add Post"
        checked={checked}
        onChange={() => setChecked((prevState) => !prevState)}
      />
      {checked && (
        <>
          <Form.Group>
            <Form.Control
              type="input"
              placeholder="Title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Post Body</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              value={body}
              onChange={(event) => setBody(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </>
      )}
      <hr></hr>
    </Form>
  );
}
