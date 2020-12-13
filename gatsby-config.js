require('dotenv').config()

module.exports = {
  siteMetadata: {
    title: `If They Were This`,
    description: `A celebrity quiz game! Put your pop-culture knowledge to the test.`,
    author: `Jesse Kuntz`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    {
      resolve: 'gatsby-source-graphql',
      options: {
        typeName: 'Fauna',
        fieldName: 'fauna',
        url: 'https://graphql.fauna.com/graphql',
        headers: {
          Authorization: `Bearer ${process.env.FAUNA_SERVER_SECRET}`,
        },
      },
    },
    {
      resolve: 'gatsby-plugin-apollo',
      options: {
        uri: 'https://example.com/graphql',
      },
    },
  ],
}
