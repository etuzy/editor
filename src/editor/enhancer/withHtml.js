import { Transforms } from 'slate';
import deserializeHtml from '@editor/deserializer/deserializeHtml';

export default (editor, { htmlDeserializerOptions }) => {

  editor.insertData = data => {
    const htmlString = data.getData('text/html');

    if (htmlString) {
      const fragment = deserializeHtml({ htmlDeserializerOptions })(htmlString)
      Transforms.insertFragment(editor, fragment)
      return;
    }

    editor.insertData(data);
  }

  return editor;
}
