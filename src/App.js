import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import PostForm from "./PostForm";
import PostList from "./PostList";
import PostModal from "./PostModal";
import About from "./pages/About";
import Home from "./pages/Home";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [postId, setPostId] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(`https://jsonplaceholder.typicode.com/posts`)
      .then((response) => response.json())
      .then((json) => {
        setPosts(json);
        setLoading(false);
      });
  }, [setLoading, setPosts]);

  function addPostToList(newPost) {
    setPosts([newPost, ...posts]);
  }

  function deletePost(postId) {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  }

  function displayPostInModal(postId) {
    setPostId(postId);
    setShow(true);
  }
  function closePostModal() {
    setShow(false);
  }
  return (
    <>
      <Container className="p-3 mb-2 bg-info text-black">
        <Row className="justify-content-md-center" style={{ marginTop: 60 }}>
          <Col className="p-3 mb-2 bg-info text-white" xs lg="2">
            <h1 style={{ textAlign: "center" }}> Halle's Blog!</h1>
          </Col>
        </Row>

        <Router>
          <div className="container">
            <nav>
              <ul>
                <li style={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                  <Link to="/pages/about">About</Link>
                </li>
                <li style={{ fontFamily: "sans-serif", fontSize: "30px" }}>
                  <Link to="/pages/home">Home</Link>
                </li>
              </ul>
            </nav>
            <Switch>
              <Route exact path="/" component={App} />
              <Route exact path="/pages/home" component={Home} />
              <Route exact path="/pages/about" component={About} />
            </Switch>
          </div>
        </Router>

        <Row style={{ marginTop: 20 }}>
          <Col xs lg="2">
            <PostForm addPostToList={addPostToList} />
          </Col>
        </Row>
        <Row className="justify-content-md-center" style={{ marginTop: 20 }}>
          <Col xs>
            <PostList
              posts={posts}
              deletePost={deletePost}
              displayPostInModal={displayPostInModal}
            />
          </Col>
        </Row>
        <PostModal closePostModal={closePostModal} show={show} />
      </Container>
    </>
  );
}

export default App;
