import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <SEO title={"Beers"} />
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
                <td><Link to={("/beers/" + node.alternative_id)}>{node.title}</Link></td>
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
    allBeersRecipes(filter: {id: {ne: "dummy"},
                             alternative_id: {ne: null},
                             folder_name: {nin: ["prospective"]}},
                    sort: {order: ASC, fields: stylename}) {
      edges {
        node {
          alternative_id
          fields {
            slug
          }
          folder_name
          title
          stylename
          abv
        }
      }
    }
  }
`
