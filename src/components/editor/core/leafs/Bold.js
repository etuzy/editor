import React from 'react';
import PropTypes from 'prop-types';

const Bold = ({ children, style, className, ...rest }) => (
  <b
    style={style}
    className={className}
    // {...rest}
  >
    {children}
  </b>
);

Bold.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Bold;
export const tag = ['B', 'STRONG'];
export const key = 'bold';
export const get = () => ({ [key]: true });
