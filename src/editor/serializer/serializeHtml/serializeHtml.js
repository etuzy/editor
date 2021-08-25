import { types } from '@config/common';

const serializeHtml = (node = {}) => {

  // base case: leaf
  if (node.hasOwnProperty('text')) {
    let out = node.text;

    if (node[types.s]) out = `<s>${out}</s>`;
    if (node[types.u]) out = `<u>${out}</u>`;
    if (node[types.i]) out = `<i>${out}</i>`;
    if (node[types.b]) out = `<b>${out}</b>`;

    return out;
  }

  // this is not a text node, and has no children
  // silently handle the case by returning empty string
  if (!node.children) {
    return '';
  }

  // paragraph
  if (node.type === types.p) {
    return `<p>${serializeHtmlNodes(node.children)}</p>`;
  }

  // headings
  if (node.type === types.h1) return `<h1>${serializeHtmlNodes(node.children)}</h1>`;
  if (node.type === types.h2) return `<h2>${serializeHtmlNodes(node.children)}</h2>`;
  if (node.type === types.h3) return `<h3>${serializeHtmlNodes(node.children)}</h3>`;
  if (node.type === types.h4) return `<h4>${serializeHtmlNodes(node.children)}</h4>`;
  if (node.type === types.h5) return `<h5>${serializeHtmlNodes(node.children)}</h5>`;
  if (node.type === types.h6) return `<h6>${serializeHtmlNodes(node.children)}</h6>`;

  // link
  if (node.type === types.a) {
    return `<a href="${node.href}">${serializeHtmlNodes(node.children)}</a>`;
  }

  // blockquote
  if (node.type === types.q) {
    return `<blockquote>${serializeHtmlNodes(node.children)}</blockquote>`;
  }

  // lists
  if (node.type === types.ul) return `<ul>\n${serializeHtmlNodes(node.children, '\n')}\n</ul>`;
  if (node.type === types.ol) return `<ol>\n${serializeHtmlNodes(node.children, '\n')}\n</ol>`;
  if (node.type === types.li) return `<li>${serializeHtmlNodes(node.children)}</li>`;

  // base case: invalid input
  // return empty string
  return '';
};

const serializeHtmlNodes = (nodes, delim = '') => {
  const useNodes = Array.isArray(nodes) ? nodes : [nodes];
  return useNodes.filter(Boolean).map(serializeHtml).join(delim);
}

export default data => {
  return serializeHtmlNodes(data, '\n');
};
