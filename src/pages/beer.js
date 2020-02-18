import React from "react"
import Layout from "../components/layout"
import { graphql } from "gatsby";

const Beer = ({ data }) => {
    return (
      <Layout>
        <h2>{data.beersRecipes.title}</h2>
        <p>{data.beersRecipes.stylename}</p>
        <p>{data.beersRecipes.abv}% ABV</p>
        <p>{data.beersRecipes.notes}</p>
      </Layout>)
    ;
};

export const query = graphql`
  query($slug: String) {
    beersRecipes(fields: { slug: { eq: $slug } } ) {
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
`;

export default Beer;
