import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { graphql } from "gatsby"

const Beer = ({ data }) => {
  const beerdetails =
    "https://www.brewersfriend.com/homebrew/recipe/view/" +
    data.beersRecipes.alternative_id

  return (
    <Layout>
      <SEO title={data.beersRecipes.title} />
      <h2>{data.beersRecipes.title}</h2>
      <p>{data.beersRecipes.stylename}</p>
      <p>{data.beersRecipes.abv}% ABV</p>
      <p>
        <a target="_blank" rel="noopener noreferrer" href={beerdetails}>
          Beer Details
        </a>
      </p>
      <p>{data.beersRecipes.notes}</p>
    </Layout>
  )
}

export const query = graphql`
  query($slug: String) {
    beersRecipes(fields: { slug: { eq: $slug } }) {
      abv
      title
      alternative_id
      og
      fg
      stylename
      notes
      fields {
        slug
      }
    }
  }
`

export default Beer
