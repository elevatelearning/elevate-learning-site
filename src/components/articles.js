import React from "react"

import { getSrc } from "gatsby-plugin-image"
import { Card, Col, Row } from "react-bootstrap"
import { useStaticQuery, Link, graphql } from "gatsby"

const Articles = () => {
  const data = useStaticQuery(graphql`
    query ArticlesQuery {
      site {
        siteMetadata {
          title
        }
      }
      allMarkdownRemark(
        sort: { frontmatter: { articleSettings: { date: DESC } } }
      ) {
        edges {
          node {
            excerpt
            fields {
              slug
            }
            image {
              childImageSharp {
                gatsbyImageData(layout: FIXED, width: 600)
              }
            }
            frontmatter {
              title
              articleSettings {
                description
                date(formatString: "DD MMMM YYYY")
              }
            }
          }
        }
      }
    }
  `)

  const articles = data.allMarkdownRemark.edges

  if (!articles.length) {
    return <p className="text-center">No insights published yet.</p>
  }

  const cards = articles.slice(1).map(({ node }) => {
    const articleSettings = node.frontmatter.articleSettings || {}
    const title = node.frontmatter.title || node.fields.slug

    return (
      <Card key={title}>
        <Card.Img src={getSrc(node.image)} alt={title} />
        <Card.Body>
          <Card.Title>
            <Link
              className="stretched-link"
              style={{ boxShadow: `none` }}
              to={node.fields.slug}
            >
              {title}
            </Link>
          </Card.Title>
          <Card.Text
            dangerouslySetInnerHTML={{
              __html: articleSettings.description || node.excerpt
            }}
          />
          <Card.Footer>
            <small>{articleSettings.date}</small>
          </Card.Footer>
        </Card.Body>
      </Card>
    )
  })

  const card = articles[0].node
  const articleSettings = card.frontmatter.articleSettings || {}
  const title = card.frontmatter.title || card.fields.slug

  return (
    <>
      <Row className="g-0">
        <Col>
          <Card className="card-horizontal mb-4">
            <Row className="g-0">
              <Col md={4}>
                <Card.Img src={getSrc(card.image)} alt={title} />
              </Col>
              <Col md={8}>
                <Card.Body>
                  <Card.Title>
                    <Link
                      className="stretched-link"
                      style={{ boxShadow: `none` }}
                      to={card.fields.slug}
                    >
                      {title}
                    </Link>
                  </Card.Title>
                  <Card.Text
                    dangerouslySetInnerHTML={{
                      __html: articleSettings.description || card.excerpt
                    }}
                  />
                  <Card.Footer>
                    <small>{articleSettings.date}</small>
                  </Card.Footer>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row className="g-0">
        <Col>
          <div className="card-deck">{cards}</div>
        </Col>
      </Row>
    </>
  )
}

export default Articles
