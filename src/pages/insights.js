import React from "react"

import { graphql, useStaticQuery } from "gatsby"
import { Col, Container, Row } from "react-bootstrap"

import Articles from "../components/articles"
import Layout from "../components/layout"
import Seo from "../components/seo"
import ShareButtons from "../components/share-buttons"

const Insights = () => {
  const { site } = useStaticQuery(graphql`
    query InsightsPageShareUrl {
      site {
        siteMetadata {
          siteUrl
        }
      }
    }
  `)

  const url = new URL("/insights/", site.siteMetadata.siteUrl).toString()

  return (
    <Layout>
      <Container className="insights-wrapper pb-5" id="insights">
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <div className="jumbotron text-center py-4 py-md-5 py-lg-7 my-1">
              <h1>Featured Insights</h1>
              <p className="lead text-center mt-3">
                Our latest thinking, projects and insights into digital
                learning.
              </p>
              <ShareButtons
                url={url}
                title="Elevate Learning Insights"
                description="Our latest thinking on the issues that matter most in digital learning experiences."
              />
            </div>
          </Col>
        </Row>
        <Articles />
      </Container>
    </Layout>
  )
}

export default Insights

export const Head = () => <Seo title="Our Insights" />
