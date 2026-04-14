import React from "react"

import { Button, Col, Container, Row } from "react-bootstrap"
import scrollTo from "gatsby-plugin-smoothscroll"

const About = () => {
  return (
    <Container fluid className="about-wrapper" id="about">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <div className="jumbotron pt-4 pt-md-5 pt-lg-7">
            <h1 className="display-5">Elevated Experiential Learning</h1>
            <p className="lead text-justify mt-3">
              When you partner with Elevate Learning, our curriculum and
              learning design specialists, content experts, coaches and
              facilitators work with you to ensure that we design a learning
              programme that embeds relevant and leading-edge online learning
              theory and pedagogy.
            </p>
            <p className="lead text-justify mt-3">
              Our programme, curriculum development and learning design process
              is grounded by rigorous academic frameworks, and brought to life
              through experiential, practical and interactive learning.
            </p>
            <p className="lead text-justify mt-3">
              By adopting a flipped or blended classroom approach to learning,
              you're ensured that new knowledge is both embedded and practically
              applied. And by continuously closing the feedback loop in this
              way, you'll see improved individual performance, productivity and
              engagement, moving you one step closer to your organisational and
              development goals.
            </p>
            <Button
              variant="outline-primary"
              onClick={() => scrollTo("#contact")}
              className="btn btn-xxl d-none d-lg-block mt-5 link-no-style"
            >
              Partner with Elevate
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default About
