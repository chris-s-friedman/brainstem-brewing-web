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
      [// put a table for session notes here]
    </Layout>
  )
}

export const query = graphql`
  query($recipe_id: String) {
    allBeersBrewsessions(filter: {recipeid: {eq: $recipe_id}}) {
      nodes {
        alternative_id
        batchcode
        recipeid
        recipe_title
        phase
      }
    }
    beersRecipes(alternative_id: {eq: $recipe_id}) {
      abv
      alternative_id
      brew_sessions
      title
      stylename
      og
      fg
      fields {
        slug
      }
      folder_name
      notes
  }
}
`

export default Beer
