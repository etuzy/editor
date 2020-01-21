import React from 'react';
import PropTypes from 'prop-types';

const ListNumbered = ({ children, style, className, ...rest }) => (
  <ol
    style={style}
    className={className}
    {...rest}
  >
    {children}
  </ol>
);

ListNumbered.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default ListNumbered;
export const tag = 'OL';
export const type = 'numbered-list';
export const get = () => ({ type });
