import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <div>
        <h1>Beers</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Style</th>
              <th>ABV</th>
            </tr>
          </thead>
          <tbody>
            {data.allBeersRecipes.edges.map(({ node }, index) => (
              <tr key={index}>
                <td><Link to={node.fields.slug}>{node.title}</Link></td>
                <td>{node.stylename}</td>
                <td>{node.abv}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
export const query = graphql`
  query {
    allBeersRecipes(filter: {id: {ne: "dummy"}, alternative_id: {ne: null}}) {
      edges {
        node {
          fields {
            slug
          }
          title
          stylename
          abv
        }
      }
    }
  }
`
