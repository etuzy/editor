import React from 'react';
import PropTypes from 'prop-types';
import combineComponents from '../../utils/combineComponents';

import Blockquote, * as bq from './core/elements/Blockquote';
import Paragraph, * as p from './core/elements/Paragraph';
import Heading, * as h from './core/elements/Heading';
import Link, * as a from './core/elements/Link';
import ListBulleted, * as ul from './core/elements/ListBulleted';
import ListNumbered, * as ol from './core/elements/ListNumbered';
import ListItem, * as li from './core/elements/ListItem';

const Element = ({ attributes, children, element = {} }) => {
  const pass = Object.assign({}, attributes, element);
  switch (element.type) {
    case bq.type: return <Blockquote {...pass}>{children}</Blockquote>
    case p.type: return <Paragraph {...pass}>{children}</Paragraph>
    case h.type: return <Heading {...pass}>{children}</Heading>
    case a.type: return <Link {...pass}>{children}</Link>
    case ul.type: return <ListBulleted {...pass}>{children}</ListBulleted>
    case ol.type: return <ListNumbered {...pass}>{children}</ListNumbered>
    case li.type: return <ListItem {...pass}>{children}</ListItem>
    default: return <Paragraph {...pass}>{children}</Paragraph>
  }
};

Element.propTypes = {
  attributes: PropTypes.object,
  element: PropTypes.object,
  children: PropTypes.any,
};

export default Element;
export const elements = combineComponents([
  bq,
  p,
  h,
  a,
  ul,
  ol,
  li,
]);