import React from "react"

import { Col, Container, Row } from "react-bootstrap"

import Layout from "../components/layout"

const Index = () => {
  return (
    <Layout>
      <Container
        fluid
        className="legal-wrapper mt-7 mt-lg-8 py-6"
        id="terms-of-use"
      >
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <h1 className="mb-5">Terms of use</h1>
            <p>
              Elevate Learning and its affiliates ("Elevate Learning" or "we")
              provides its content on its websites or applications that post a
              link to this Terms of Use (the “Site”) subject to the following
              terms and conditions (the “Terms”). We may periodically change the
              Terms without prior notice, so please check back from time to
              time. These Terms were last updated on December 20, 2020. By
              accessing and using this Site, you agree to these Terms. For an
              explanation of Elevate Learning’s practices and policies related
              to the collection, use, and storage of our users’ information,
              please read our Privacy Policy.
            </p>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Index
