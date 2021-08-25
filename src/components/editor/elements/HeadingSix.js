import React from 'react';
import PropTypes from 'prop-types';

const HeadingSix = ({ children, attributes = {} }) => (
  <h6 {...attributes}>
    {children}
  </h6>
);

HeadingSix.propTypes = {
  children: PropTypes.any,
  attributes: PropTypes.object,
};

export default HeadingSix;
