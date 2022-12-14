import { types } from '@config/common';
import toggleFormat from '@editor/formatters/toggleFormat';

export default (editor, level, status) => {
  let useType = null;
  if (level === 1) useType = types.h1;
  if (level === 2) useType = types.h2;
  if (level === 3) useType = types.h3;
  if (level === 4) useType = types.h4;
  if (level === 5) useType = types.h5;
  if (level === 6) useType = types.h6;

  if (useType) {
    toggleFormat(editor, 'block', useType, { status });
  }
}
