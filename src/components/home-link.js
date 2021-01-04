import React from 'react';

import { Link } from 'gatsby';

import StarIconImage from '../images/icon.svg';

const HomeLink = () => (
  <div className="icon-container">
    <Link to="/">
      <img src={StarIconImage} className="home-link" />
    </Link>
  </div>
);

export default HomeLink;
