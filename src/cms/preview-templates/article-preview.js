import React from "react"

import { Col, Container, Row } from "react-bootstrap"

import FormatDate from "../../utils/format-date"
import LayoutPreview from "../../components/layout-preview"
import ShareButtons from "../../components/share-buttons"

const ArticlePreview = ({ entry, widgetFor }) => {
  const url = typeof window !== "undefined" ? window.location.href : ""
  const articleSettingsPath = ["data", "articleSettings"]

  return (
    <LayoutPreview>
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
                  <h1 itemProp="headline">{entry.getIn(["data", "title"])}</h1>
                  <p>
                    {FormatDate(
                      entry.getIn([...articleSettingsPath, "date"])
                    )}
                  </p>
                </header>
                <ShareButtons
                  url={url}
                  title={entry.getIn(["data", "title"])}
                  description={entry.getIn([
                    ...articleSettingsPath,
                    "description"
                  ])}
                />
              </div>
            </Col>
          </Row>
          <Row className="justify-content-center article-content py-3 py-md-5">
            <Col md={10} lg={8}>
              <section itemProp="articleBody">{widgetFor("body")}</section>
              <hr />
              <footer></footer>
            </Col>
          </Row>
        </Container>
      </article>
    </LayoutPreview>
  )
}

export default ArticlePreview
