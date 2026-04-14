import React from "react"

import { GatsbyImage, getImage } from "gatsby-plugin-image"
import { StaticQuery, graphql } from "gatsby"

const Image = props => (
  <StaticQuery
    query={graphql`
      query {
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
                  width: 500
                  placeholder: BLURRED
                  formats: [AUTO, WEBP, AVIF]
                )
              }
            }
          }
        }
      }
    `}
    render={data => {
      const file = data.images.edges.find(n => {
        return n.node.relativePath.includes(props.filename)
      })

      if (!file) {
        return null
      }

      const photo = getImage(file.node.childImageSharp)

      return <GatsbyImage image={photo} alt={props.alt} />
    }}
  />
)

export default Image
