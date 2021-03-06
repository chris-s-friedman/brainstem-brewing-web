const path = require('path');
const slash = require('slash');
var slugify = require('slugify');

exports.onCreateNode = ({node, actions, getNode}) => {
  const { createNodeField } = actions
  if (node.internal.type === 'beers__recipes' && node.id != 'dummy') {
    const slug = slugify(node.title)
    console.log(slug)
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    })
  }
};

exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions;
    const result = await graphql(`
        query {
          allBeersRecipes(filter: {id: {ne: "dummy"}, alternative_id: {ne: null}}) {
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
        path: node.fields.slug,
        component: path.resolve("./src/pages/beer.js"),
        context: {
          slug: node.fields.slug, 
          folder_name: node.folder_name
        },
      });
  })
}
