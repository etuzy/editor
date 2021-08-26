import React from 'react';
import PropTypes from 'prop-types';

const HeadingFive = ({ children, attributes = {} }) => (
  <h5 {...attributes}>
    {children}
  </h5>
);

HeadingFive.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
};

export default HeadingFive;
