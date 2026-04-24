import React from "react"

import { graphql } from "gatsby"
import { Col, Container, Row } from "react-bootstrap"

import Bio from "../components/bio"
import DownloadInfographic from "../components/download-infographic"
import Layout from "../components/layout"
import RelatedArticles from "../components/related-articles"
import Seo from "../components/seo"
import ShareButtons from "../components/share-buttons"
import { splitArticleHtmlByInfographics } from "../utils/infographic-embed"

const ArticleTemplate = ({ data }) => {
  const article = data.article
  const articleSettings = article.frontmatter.articleSettings || {}
  const url = new URL(
    article.fields.slug,
    data.site.siteMetadata.siteUrl
  ).toString()
  const articleContent = splitArticleHtmlByInfographics(article.html)

  return (
    <Layout>
      <article
        className="article mb-5"
        itemScope
        itemType="http://schema.org/Article"
      >
        <Container fluid>
          <Row className="justify-content-center article-header">
            <Col md={10} lg={8}>
              <div className="jumbotron text-center py-4 py-md-5 py-lg-7 my-1">
                <header>
                  <h1 itemProp="headline">{article.frontmatter.title}</h1>
                  <p>{articleSettings.date}</p>
                </header>
                <ShareButtons
                  url={url}
                  title={article.frontmatter.title}
                  description={articleSettings.description || article.excerpt}
                />
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center article-content py-3 py-md-5">
            <Col md={10} lg={8}>
              <section itemProp="articleBody">
                {articleContent.map((block, index) => {
                  if (block.type === "infographic") {
                    return (
                      <DownloadInfographic
                        key={`infographic-${index}`}
                        previewUrl={block.previewUrl}
                        posterUrl={block.posterUrl}
                        embedded
                      />
                    )
                  }

                  return (
                    <div
                      key={`html-${index}`}
                      dangerouslySetInnerHTML={{ __html: block.html }}
                    />
                  )
                })}
              </section>
              <hr />
              <footer>
                <Bio selected={articleSettings.author} />
              </footer>
            </Col>
          </Row>
        </Container>
      </article>
      <RelatedArticles previous={data.previous} next={data.next} />
    </Layout>
  )
}

export default ArticleTemplate

export const Head = ({ data }) => {
  const articleSettings = data.article.frontmatter.articleSettings || {}

  return (
    <Seo
      title={data.article.frontmatter.title}
      description={articleSettings.description || data.article.excerpt}
    />
  )
}

export const pageQuery = graphql`
  query ArticleBySlug($id: String!, $previousId: String, $nextId: String) {
    site {
      siteMetadata {
        title
        siteUrl
      }
    }
    article: markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        articleSettings {
          date(formatString: "DD MMMM YYYY")
          description
          author
        }
      }
      fields {
        slug
      }
    }
    previous: markdownRemark(id: { eq: $previousId }) {
      id
      excerpt(pruneLength: 160)
      image {
        childImageSharp {
          gatsbyImageData(layout: FIXED)
        }
      }
      frontmatter {
        title
        articleSettings {
          date(formatString: "DD MMMM YYYY")
          description
          author
        }
      }
      fields {
        slug
      }
    }
    next: markdownRemark(id: { eq: $nextId }) {
      id
      excerpt(pruneLength: 160)
      image {
        childImageSharp {
          gatsbyImageData(layout: FIXED)
        }
      }
      frontmatter {
        title
        articleSettings {
          date(formatString: "DD MMMM YYYY")
          description
          author
        }
      }
      fields {
        slug
      }
    }
  }
`
