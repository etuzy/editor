import React from 'react';
import PropTypes from 'prop-types';

const HeadingFour = ({ children, attributes = {} }) => (
  <h4 {...attributes}>
    {children}
  </h4>
);

HeadingFour.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
};

export default HeadingFour;
