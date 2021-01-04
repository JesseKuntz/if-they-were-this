import React from 'react';
import PropTypes from 'prop-types';

function scroll(up) {
  return window.scrollBy({
    top: document.documentElement.clientHeight * (up ? -1 : 1),
    behavior: 'smooth',
  });
}

function getClass(up, start) {
  const baseClass = 'navigate-arrow';

  if (up) {
    return `${baseClass} up`;
  }

  if (start) {
    return `${baseClass} down start`;
  }

  return `${baseClass} down`;
}

const Navigate = ({ up, start }) => {
  return (
    <div className={getClass(up, start)} onClick={() => scroll(up)}>
      ^
    </div>
  );
};

Navigate.propTypes = {
  up: PropTypes.bool,
  start: PropTypes.bool,
};

export { scroll };

export default Navigate;
