import React from "react"

import { Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SmoothAnchorLink from "../components/smooth-anchor-link"

const NotFoundPage = () => {
  return (
    <Layout>
      <Container className="not-found pt-6 pt-md-7" id="not-found">
        <Row className="text-center">
          <Col>
            <h1>404 page not found</h1>
            <p className="mt-3">
              The page you are looking for might have been moved or renamed.
            </p>
            <p>
              We apologize for any inconvenience. Please double-check the URL or
              try the following:
            </p>
            <p>
              Visit our <SmoothAnchorLink to="/#home" title="Home" /> page or
              use the navigation menu to find what you need.
            </p>
            <p>
              <SmoothAnchorLink to="/#contact" title="Contact" /> us if you're
              still having a problem.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <Seo title="404: Not Found" />
