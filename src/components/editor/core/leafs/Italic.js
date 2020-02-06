import React from 'react';
import PropTypes from 'prop-types';

const Italic = React.forwardRef(({ children, style, className, ...rest }, ref) => (
  <i style={style} className={className}>
    {children}
  </i>
));

Italic.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  style: PropTypes.object,
};

export default Italic;
export const component = Italic;
export const tags = ['i', 'em'];
export const key = 'italic';
export const get = () => ({ [key]: true });
