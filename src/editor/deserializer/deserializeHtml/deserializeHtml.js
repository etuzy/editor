import merge from 'lodash/merge';
import cleanHtml from '@utils/cleanHtml';
import strategiesToDict from '@editor/deserializer/deserializeHtml/utils/strategiesToDict';
import extractAttributes from '@editor/deserializer/deserializeHtml/utils/extractAttributes';
import combineOptions from '@editor/deserializer/deserializeHtml/utils/combineOptions';
import postDeserializeNormalization from '@editor/deserializer/deserialize/postDeserializeNormalization';

import deserialize, {
  STYLE_TAG,
  CHILDREN_ARGS,
  CHILDREN_LEAF_ARGS,
  CHILDREN_NODE_ARGS,
} from '@editor/deserializer/deserialize';

// strategy constants
export const TEXT = 'text';
export const TEXT_CHILDREN = 'textChildren';
export const CONTINUE = 'continue';
export const CONTINUE_TEXT = 'continueText';
export const SKIP = 'skip';

const deserializeHtml = (options = {}, el, inherit = {}) => {

  const {

    // adjust render behaviour
    // key (string): tag names
    // value (string or function( el: HTMLElement, attrs: object ) -> string) - parse
    // configuration, or fn that receives el and attributes, and returns configuration
    // possible values: normal (default), text, textChildren, continue, continueText and skip
    strategiesDict = {},

    // transform HTMLElement
    transforms,

  } = options;

  let current = el;
  let htmlAttrs = extractAttributes(el);

  // if a transform function provided, re-set
  // current to the HTMLElement returned from it
  if (Array.isArray(transforms)) {
    transforms.forEach(transform => {
      if (typeof transform === 'function') {
        current = transform(current);
      }
    })
  }

  // if invalid node returned from transform function, return
  if (!current) return [];

  let { nodeType, nodeName, textContent } = current;

  // extract tag settings
  let strategy = strategiesDict[nodeName.toLowerCase()];
  // if strategy is a function
  // execute it to get the settings
  if (typeof strategy === 'function') {
    strategy = strategy(current, htmlAttrs);
  }

  // get deserialize strategy for this tag
  let strategySkip = strategy === SKIP;
  let strategyContinue = strategy === CONTINUE;
  let strategyContinueText = strategy === CONTINUE_TEXT;
  let strategyText = strategy === TEXT;
  let strategyTextChildren = strategy === TEXT_CHILDREN;

  // parser instructions ---

  // html deserializer runs from leafs to root.
  // pre-deserialize current node to see if its
  // children should inherit any properties
  const _inherited = inherit._instructions || {};
  const pre = deserialize(nodeName, htmlAttrs, [], { pre: true });
  const _instructionsForChildren = merge({}, _inherited, pre._instructions);
  const _instructionsForCurrentNode = merge({}, _instructionsForChildren, pre._instructionsTag);
  const isStyleTag = _instructionsForCurrentNode[STYLE_TAG];
  const childrenArgs = _instructionsForCurrentNode[CHILDREN_ARGS] || {};
  const childrenLeafArgs = _instructionsForCurrentNode[CHILDREN_LEAF_ARGS];
  const childrenNodeArgs = _instructionsForCurrentNode[CHILDREN_NODE_ARGS];

  // get data on current node
  const isText = nodeType === window.Node.TEXT_NODE;
  const isElement = nodeType === window.Node.ELEMENT_NODE;
  const isLink = nodeName === 'A';
  const isList = nodeName === 'UL' || nodeName === 'OL';
  const hasTextContent = !!textContent;
  // enhance current nodes args
  let instructionArgs = { ...childrenArgs }
  if (isText) instructionArgs = { ...instructionArgs, ...childrenLeafArgs }
  if (isElement) instructionArgs = { ...instructionArgs, ...childrenNodeArgs }

  // forced settings ---

  // do not parse style tags as individual tags
  if (isStyleTag) strategyContinue = true;
  // only evaluate element nodes (ie. <p>, <div> etc.)
  if (!isElement && !isText) strategyContinue = true;
  // if an element has nothing in it to render, ignore
  if (!hasTextContent) strategySkip = true;
  // if text node, its content is its children
  if (isText) strategyText = true;
  // if a link has no href, treat it as a text node
  if (isLink && !htmlAttrs.href) strategyText = true;

  // deserialize --

  // skip node and all its children
  if (strategySkip) {
    return [];
  }

  // skip current node and continue with children as text
  if (strategyContinueText) {
    return deserialize('#text', { ...instructionArgs }, Array.from(current.children)
      .map(child => child.textContent)
      .join(' '));
  }

  // parse node and all its children as text node
  if (strategyText) {
    return deserialize('#text', { ...instructionArgs }, textContent);
  }

  // parse node normally and its children as text
  if (strategyTextChildren) {
    return deserialize(nodeName, { ...htmlAttrs, ...instructionArgs }, textContent);
  }

  // deserialize children
  let children = Array.from(current.childNodes)
    .map(child => deserializeHtml(options, child, { _instructions: _instructionsForChildren }))
    .flat()

  // skip current node and continue with children
  if (strategyContinue) {
    return children;
  }

  if (isList) {
    children = children.filter(item => item.type === 'list-item')
  }

  // parse node and children normally
  return deserialize(nodeName, { ...htmlAttrs, ...instructionArgs }, children);
}

export default (htmlDeserializerOptionsList = []) => (...strs) => {

  // cover tag function usage (ie. invocation with template literals)
  const html = Array.isArray(strs[0]) ? String.raw(...strs) : strs[0];
  const clean = cleanHtml(html);
  const parsed = new window.DOMParser().parseFromString(clean, 'text/html');
  const rootEl = parsed.documentElement;

  const {
    transforms,
    strategies,
  } = combineOptions(htmlDeserializerOptionsList);

  return postDeserializeNormalization(
    deserializeHtml({
      transforms,
      strategiesDict: strategiesToDict(strategies)
    }, rootEl, {})
  );
};
