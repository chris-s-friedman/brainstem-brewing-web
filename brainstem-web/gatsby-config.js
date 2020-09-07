require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: `Brainstem Brewing`,
    description: `Basement-based homebrewing in West Philly`,
    author: `Chris Friedman`,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Brainstem Brewing`,
        short_name: `Brainstem`,
        start_url: `/`,
        background_color: `#6b37bf`,
        theme_color: `#6b37bf`,
        // Enables "Add to Homescreen" prompt and disables browser UI (including back button)
        // see https://developers.google.com/web/fundamentals/web-app-manifest/#display
        display: `standalone`,
        icon: `src/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // React Helmet
    `gatsby-plugin-react-helmet`,
    // Favicon
    //`gatsby-plugin-favicon`,
    // Typography
    {
      resolve: "gatsby-plugin-typography",
      options: {
        pathToConfigModule: "src/utils/typography",
      },
    },
    // Google Analytics
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-111428441-3",
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
    // BrewersFriend API Recipes Endpoint
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "beers__",
        url: `https://api.brewersfriend.com/v1/recipes`,
        method: "get",
        headers: {
          "X-API-KEY": process.env.brewersfriend_api_key,
        },
        params: {
          limit: 999,
        },
        name: `recipes`,
        entityLevel: "recipes",
      },
    },
    //BrewersFriend API Sessions Endpoint
    {
      resolve: "gatsby-source-apiserver",
      options: {
        typePrefix: "beers__",
        url: `https://api.brewersfriend.com/v1/brewsessions`,
        method: "get",
        headers: {
          "X-API-KEY": process.env.brewersfriend_api_key,
        },
        params: {
          limit: 999,
        },
        name: `brewsessions`,
        entityLevel: "brewsessions",
      },
    },
  ],
}
