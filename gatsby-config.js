require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`
})

const isProduction = process.env.CONTEXT === "production"

module.exports = {
  siteMetadata: {
    title: `Elevate Learning`,
    authors: [
      {
        name: `Kira Koopman`,
        summary: `Founder at Elevate Learning | Digital Learning Solutions Specialist`
      },
      {
        name: `Pasqua Lawrenson`,
        summary: `Learning Experience Design Specialist`
      },
      {
        name: `Kelsey Groenmeyer`,
        summary: `Learning Experience Design Specialist`
      },
      {
        name: `Lara Hilton`,
        summary: `Learning Experience Design Specialist`
      }
    ],
    description: `Elevate Learning is a full-service learning design consultancy. We partner with you to design and implement online and blended learning experiences.`,
    siteUrl: `https://www.elevatelearning.org/`,
    social: {
      twitter: `elevatelearnhq`
    }
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/insights`,
        name: `insights`
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/images`,
        name: `images`
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              backgroundColor: `transparent`,
              maxWidth: 630,
              quality: 90,
              withWebp: true
            }
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`
            }
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`
        ]
      }
    },
    {
      resolve: `gatsby-transformer-sharp`,
      options: {
        checkSupportedExtensions: false
      }
    },
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          quality: 70,
          formats: ["auto", "webp", "avif"],
          placeholder: "blurred"
        }
      }
    },
    ...(isProduction
      ? [
          {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
              trackingIds: [process.env.GA4_TRACKING_ID]
            }
          }
        ]
      : []),
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allMarkdownRemark } }) => {
              return allMarkdownRemark.nodes.map(node => {
                return Object.assign({}, node.frontmatter, {
                  author: node.frontmatter.author,
                  description: node.excerpt,
                  date: node.frontmatter.date,
                  url: site.siteMetadata.siteUrl + node.fields.slug,
                  guid: site.siteMetadata.siteUrl + node.fields.slug,
                  custom_elements: [{ "content:encoded": node.html }]
                })
              })
            },
            query: `
              {
                allMarkdownRemark(
                  sort: { frontmatter: { date: DESC } },
                ) {
                  nodes {
                    excerpt
                    html
                    fields {
                      slug
                    }
                    frontmatter {
                      title
                      date
                    }
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Elevate Learning Insights RSS Feed"
          }
        ]
      }
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Elevate Learning`,
        short_name: `Elevate`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#193446`,
        display: `minimal-ui`,
        icon: `${__dirname}/src/images/elevate-logo-no-text.png`
      }
    },
    {
      resolve: "gatsby-plugin-page-progress",
      options: {
        includePaths: [{ regex: "/insights/([^/]+)/?$" }],
        excludePaths: ["/"],
        height: 5,
        prependToBody: true,
        color: `#a9d8dd`,
        footerHeight: 500
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        sassOptions: {
          silenceDeprecations: [
            "import",
            "global-builtin",
            "if-function",
            "color-functions",
            "legacy-js-api",
            "slash-div"
          ]
        }
      }
    },
    `gatsby-plugin-smoothscroll`,
    `gatsby-plugin-netlify`,
    {
      resolve: `gatsby-plugin-nprogress`,
      options: {
        color: `tomato`,
        showSpinner: false
      }
    },
    {
      resolve: "gatsby-plugin-decap-cms",
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
        enableIdentityWidget: true,
        publicPath: `admin`,
        htmlTitle: `Elevate Learning CMS`,
        htmlFavicon: `${__dirname}/src/images/elevate-logo-no-text.png`,
        includeRobots: false
      }
    },
    {
      resolve: `gatsby-source-cloudinary`,
      options: {
        cloudName: process.env.CLOUDINARY_CLOUD_NAME,
        apiKey: process.env.CLOUDINARY_API_KEY,
        apiSecret: process.env.CLOUDINARY_API_SECRET,
        resourceType: `image`,
        prefix: `site-assets/`
      }
    }
  ]
}
