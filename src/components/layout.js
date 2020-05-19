import React from "react"
import { useStaticQuery, Link } from "gatsby"
import styles from "./layout.module.css"

const ListLink = props => (
  <li style={{ display: `inline-block`, marginRight: `1rem` }}>
    <Link to={props.to}>{props.children}</Link>
  </li>
)

export default ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  )
  return (
    <div style={{ margin: `3rem auto`, maxWidth: 650, padding: `0 1rem` }}>
      <header style={{ marginBottom: `1.5rem` }}>
        <Link to="/" style={{ textShadow: `none`, backgroundImage: `none` }}>
          <h3 style={{ display: `inline` }}>{data.site.siteMetadata.title}</h3>
        </Link>
        <ul style={{ listStyle: `none`, float: `right` }}>
          <ListLink to="/">Home</ListLink>
          <ListLink to="/on_tap">On Tap</ListLink>
          <ListLink to="/beers/">Beers</ListLink>
          <ListLink to="/about/">About</ListLink>
        </ul>
      </header>
      {children}
      <div className={styles.footer}>
        <div style={{width: "50%", margin:"0 auto"}}>
        <div style={{ textAlign: 'left', float: 'left' }}>
          <p>Brewed by <a href="https://www.chris-s-friedman.com">Chris Friedman</a></p>
        </div>
        <div style={{ textAlign: 'right', float: 'right' }}>
          <p><a href="https://github.com/chris-s-friedman/brainstem-brewing-web">Github</a></p>
        </div>
        <div style={{textAlign: 'center'}}>
          <p>Built with love, using <a href ="https://www.gatsbyjs.org/">Gatsby</a></p>
        </div>
        </div>
      </div>
    </div>
  )
}
