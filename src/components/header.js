import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

import Navigate from './navigate'

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: 'hotpink',
    }}
    className="scroll-piece"
  >
    <Navigate />
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `20px`,
      }}
    >
      <h1 className="sparkle" style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
