require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Brainstem Brewing`,
  },
  plugins:[
    // Typography
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
    // Google Analytics
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-111428441-3',
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true
      }
    },
    // BrewersFriend API
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "beers__",
        url: `https://api.brewersfriend.com/v1/recipes`,
        method: "get",
        headers: {
          "X-API-KEY": process.env.brewersfriend_api_key
        },
      name: `recipes`,
      entityLevel: 'recipes'
      },
    },
  ],
}
