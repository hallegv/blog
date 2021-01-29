import React, { useState, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";

export default function PostModal(props) {
  const { postId, show, closePostModal } = props;
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => response.json())
      .then((json) => setPost(json));
  }, [setPost, postId]);

  if (!post) {
    return <Spinner animation="grow" variant="light" />;
  }

  return (
    <Modal show={show} onHide={closePostModal}>
      <Modal.Header closeButton>
        <Modal.Title>{post?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{post?.body}</Modal.Body>
    </Modal>
  );
}
