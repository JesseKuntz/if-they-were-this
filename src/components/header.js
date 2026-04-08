import Link from 'next/link';
import PropTypes from 'prop-types';

import Navigate from './navigate';

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: 'hotpink',
    }}
    className="scroll-piece"
  >
    <Navigate start={true} />
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `20px`,
      }}
    >
      <h1>
        <Link
          href="/"
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
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
