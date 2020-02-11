import { Transforms, Editor, Text } from 'slate';
import { key } from '@components/editor/core/leafs/Strikethrough';
import toggleFormat from '@editor/formatters/toggleFormat';

export default (editor, status) => {
  toggleFormat(editor, 'mark', key, { status });
}