const path = require("path")
const slash = require("slash")
var slugify = require("slugify")
const axios = require("axios") // to pull the fermentation api
const crypto = require(`crypto`)
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

let config = {
  headers: {
    "X-API-KEY": process.env.brewersfriend_api_key,
  },
}

const fetchFermentation = session_id =>
  axios.get(
    `https://api.brewersfriend.com/v1/fermentation/` + session_id,
    config
  )

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNode, createNodeField } = actions
  if (node.internal.type === "beers__recipes" && node.id != "dummy") {
    const slug = slugify(node.title)
    console.log(slug)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
  if (node.internal.type === "beers__brewsessions" && node.id != "dummy") {
    const slug = slugify("bs-" + node.recipe_title + "-bsno-" + node.batchcode)
    console.log(slug)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
    let session_id = node.alternative_id
    console.log(session_id)
    axios
      .get(
        `https://api.brewersfriend.com/v1/fermentation/` + session_id,
        config
      )
      .then(function(res) {
        console.log(
          "|------------------|\n" +
            "|  fetched " +
            session_id +
            "  |\n" +
            "| status code: " +
            res.status +
            " |\n" +
            "|------------------|"
        )
        if (res.status == 200) {
          res.data.readings.map(reading => {
            // Create your node object
            const readingNode = {
              // Required fields
              id: reading.id,
              parent: "__SOURCE__",
              internal: {
                type: `fermentationReading`, // name of the graphQL query --> allRandomUser {}
                // contentDigest will be added just after
                // but it is required
              },
              children: [],

              // Other fields that you want to query with graphQl
              gravity: reading.gravity,
              gravity_unit: reading.gravity_unit,
              temp: reading.temp,
              temp_unit: reading.temp_unit,
              ph: reading.ph,
              comment: reading.comment,
              eventtype: reading.eventtype,
              created_at: reading.created_at,
              source: reading.source,
              name: reading.name,
              annotation: reading.annotation,
              interaval: reading.interval,
              beer: reading.beer,
              ip: reading.ip,
              recipe_id: reading.recipe_id,
              brewevent_id: reading.brewevent_id,
              session_id: session_id,
            }

            // Get content digest of node. (Required field)
            const contentDigest = crypto
              .createHash(`md5`)
              .update(JSON.stringify(readingNode))
              .digest(`hex`)
            // add it to userNode
            readingNode.internal.contentDigest = contentDigest

            // Create node with the gatsby createNode() API
            createNode(readingNode)
          })
        }
      })
      .catch(function(error) {
        console.log("Failed attempt to fetch fermentation for" + session_id)
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.log(error.response.data)
          console.log(error.response.status)
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request)
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log("Error", error.message)
        }
      })
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
      allBeersRecipes(
        filter: { id: { ne: "dummy" }, alternative_id: { ne: null } }
      ) {
        edges {
          node {
            alternative_id
            title
            fields {
              slug
            }
            folder_name
          }
        }
      }
    }
  `)
  result.data.allBeersRecipes.edges.forEach(({ node }) => {
    createPage({
      path: "beers/" + node.alternative_id,
      component: path.resolve("./src/pages/beer.js"),
      context: {
        slug: node.fields.slug,
        folder_name: node.folder_name,
        recipe_id: node.alternative_id,
      },
    })
  })
}
