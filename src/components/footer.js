import React from "react"

import { Col, Container, Row } from "react-bootstrap"

const Footer = () => {
  return (
    <footer>
      <Container fluid className="footer-wrapper text-center pb-5 pt-7">
        <Row className="g-0">
          <Col>
            <p>
              Copyright &copy; {new Date().getFullYear()}
              &nbsp; Elevate Learning (Pty) Ltd. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  )
}

export default Footer
