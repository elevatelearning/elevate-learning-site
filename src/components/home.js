import React from "react"

import { Button, Col, Container, Row } from "react-bootstrap"
import scrollTo from "gatsby-plugin-smoothscroll"

const Home = () => {
  return (
    <Container fluid className="home-wrapper" id="home">
      <Row className="justify-content-md-center">
        <Col md={10} lg={8}>
          <div className="jumbotron py-6 py-md-7">
            <h1>Customised, User-Centered Learning Experiences</h1>
            <p className="lead text-justify mt-3">
              Elevate Learning is a full-service learning design consultancy. We
              partner with you to design and implement online and blended
              learning experiences, organisation-specific learning programmes,
              and experiential content and workshops.
            </p>
            <Button
              variant="outline-primary"
              onClick={() => scrollTo("#services")}
              className="btn btn-xl d-none d-lg-block mt-5 link-no-style"
            >
              Learn more
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Home
