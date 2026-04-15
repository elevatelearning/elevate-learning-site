import React from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTwitter } from "@fortawesome/free-brands-svg-icons"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { useStaticQuery, graphql } from "gatsby"

const Bio = ({ selected }) => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      images: allFile(
        filter: {
          extension: { regex: "/(jpg)|(jpeg)|(png)/" }
          sourceInstanceName: { eq: "images" }
        }
      ) {
        edges {
          node {
            relativePath
            name
            childImageSharp {
              gatsbyImageData(
                layout: FIXED
                width: 80
                placeholder: BLURRED
                formats: [AUTO, WEBP, AVIF]
              )
            }
          }
        }
      }
      site {
        siteMetadata {
          authors {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const authors = data.site.siteMetadata?.authors
  const author = authors.find(author => author.name.includes(selected))

  const social = data.site.siteMetadata?.social
  const file = data.images?.edges.find(n => {
    return n.node.relativePath.includes(
      author.name.replace(/\s+/g, "-").toLowerCase()
    )
  })
  const photo = getImage(file.node.childImageSharp)

  return (
    <div className="bio">
      <GatsbyImage
        className="avatar"
        imgStyle={{
          borderRadius: `50%`
        }}
        image={photo}
        alt={author?.name || ``}
      />
      {author?.name && (
        <p>
          Written by <strong>{author.name}</strong>
          <br />
          {author?.summary || null}
          {` `}
          <br />
          <strong>
            <a href={`https://twitter.com/${social?.twitter || ``}`}>
              <FontAwesomeIcon icon={faTwitter} size="1x" />
              &nbsp;{social?.twitter || ``}
            </a>
          </strong>
        </p>
      )}
    </div>
  )
}

export default Bio
