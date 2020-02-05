import { Editor, Transforms } from 'slate';
import getDocumentEdgePoint from '@editor/utils/getDocumentEdgePoint';
import ensureFocus from '@editor/focus/ensureFocus';

export default editor => {
  ensureFocus(editor);

  // get start and end
  const startPoint = getDocumentEdgePoint(editor, { edge: 'start' });
  const endPoint = getDocumentEdgePoint(editor);

  // select
  Transforms.select(editor, {
    anchor: startPoint,
    focus: endPoint,
  })
}