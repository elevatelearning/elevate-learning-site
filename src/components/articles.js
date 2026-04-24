import React from "react"

import { getSrc } from "gatsby-plugin-image"
import { Search } from "react-feather"
import { Button, Card, Col, Form, Row } from "react-bootstrap"
import { useStaticQuery, Link, graphql } from "gatsby"

const Articles = () => {
  const searchInputRef = React.useRef(null)
  const [isSearchOpen, setIsSearchOpen] = React.useState(false)
  const [query, setQuery] = React.useState("")
  const data = useStaticQuery(graphql`
    query ArticlesQuery {
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
                author
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
  const normalizedQuery = query.trim().toLowerCase()

  React.useEffect(() => {
    if (isSearchOpen) {
      searchInputRef.current?.focus()
    }
  }, [isSearchOpen])

  if (!articles.length) {
    return <p className="text-center">No insights published yet.</p>
  }

  const handleSearchToggle = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false)
      setQuery("")
      return
    }

    setIsSearchOpen(true)
  }

  const filteredArticles = articles.filter(({ node }) => {
    if (!normalizedQuery) {
      return true
    }

    const articleSettings = node.frontmatter.articleSettings || {}
    const searchContent = [
      node.frontmatter.title,
      articleSettings.author,
      articleSettings.description,
      node.excerpt
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase()

    return searchContent.includes(normalizedQuery)
  })

  const renderCardContent = node => {
    const articleSettings = node.frontmatter.articleSettings || {}
    return (
      <Card.Body>
        <Card.Title>
          <Link
            className="stretched-link"
            style={{ boxShadow: `none` }}
            to={node.fields.slug}
          >
            {node.frontmatter.title || node.fields.slug}
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
    )
  }

  const renderCard = ({ node }) => {
    const title = node.frontmatter.title || node.fields.slug

    return (
      <Card key={node.fields.slug}>
        <Card.Img src={getSrc(node.image)} alt={title} />
        {renderCardContent(node)}
      </Card>
    )
  }

  const showFeaturedLayout = !normalizedQuery
  const featuredArticle = showFeaturedLayout ? filteredArticles[0] : null
  const gridArticles = showFeaturedLayout ? filteredArticles.slice(1) : filteredArticles
  const resultLabel = `${filteredArticles.length} ${
    filteredArticles.length === 1 ? "article" : "articles"
  }`

  return (
    <>
      <Row className="g-0 mb-4">
        <Col>
          <div className="insights-search-toggle">
            <Button
              className="insights-search-toggle__button"
              type="button"
              variant="outline-primary"
              aria-controls="insights-search-panel"
              aria-expanded={isSearchOpen}
              onClick={handleSearchToggle}
            >
              <Search aria-hidden="true" size={18} />
              <span>
                {isSearchOpen
                  ? normalizedQuery
                    ? "Clear search"
                    : "Hide search"
                  : "Search articles"}
              </span>
            </Button>
          </div>
          {isSearchOpen ? (
            <div className="insights-search" id="insights-search-panel">
              <Form.Group
                className="insights-search__field"
                controlId="insights-search"
              >
                <Form.Label>Search articles</Form.Label>
                <Form.Control
                  ref={searchInputRef}
                  type="search"
                  placeholder="Search by title, author or topic"
                  value={query}
                  onChange={event => setQuery(event.target.value)}
                />
              </Form.Group>
              <p className="insights-search__results mb-0">
                {normalizedQuery
                  ? `${resultLabel} for "${query.trim()}".`
                  : `Browse ${resultLabel}.`}
              </p>
            </div>
          ) : null}
        </Col>
      </Row>
      {featuredArticle ? (
        <Row className="g-0">
          <Col>
            <Card className="card-horizontal mb-4">
              <Row className="g-0">
                <Col md={4}>
                  <Card.Img
                    src={getSrc(featuredArticle.node.image)}
                    alt={
                      featuredArticle.node.frontmatter.title ||
                      featuredArticle.node.fields.slug
                    }
                  />
                </Col>
                <Col md={8}>{renderCardContent(featuredArticle.node)}</Col>
              </Row>
            </Card>
          </Col>
        </Row>
      ) : null}
      {filteredArticles.length ? (
        <Row className="g-0">
          <Col>
            <div className="card-deck">
              {gridArticles.map(article => renderCard(article))}
            </div>
          </Col>
        </Row>
      ) : (
        <Row className="g-0">
          <Col>
            <p className="insights-search__empty text-center mb-0">
              No articles match "{query.trim()}". Try a broader keyword.
            </p>
          </Col>
        </Row>
      )}
    </>
  )
}

export default Articles
