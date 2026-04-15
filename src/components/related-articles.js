import React from "react"

import { Card, Col, Container, Row } from "react-bootstrap"
import { getSrc } from "gatsby-plugin-image"
import { Link } from "gatsby"

const RelatedArticles = ({ previous, next }) => {
  const articles = [previous, next].filter(Boolean)

  if (!articles.length) return null

  const renderCard = article => {
    const title = article.frontmatter.title || article.fields.slug

    return (
      <Col key={article.id} md={6} xl={5}>
        <Card className="related-card h-100">
          {article.image && (
            <Card.Img src={getSrc(article.image)} alt={title} />
          )}
          <Card.Body>
            <Card.Title>
              <Link
                className="related-card-link stretched-link"
                to={article.fields.slug}
              >
                {title}
              </Link>
            </Card.Title>
            <Card.Text
              dangerouslySetInnerHTML={{
                __html: article.frontmatter.description || article.excerpt
              }}
            />
          </Card.Body>
          <Card.Footer>
            <small>{article.frontmatter.date}</small>
          </Card.Footer>
        </Card>
      </Col>
    )
  }

  return (
    <Container fluid className="related-wrapper mb-4">
      <Row className="justify-content-center">
        <Col xl={10}>
          <Row className="related-grid justify-content-center g-4">
            {articles.map(renderCard)}
          </Row>
        </Col>
      </Row>
    </Container>
  )
}

export default RelatedArticles
