import { types } from '@config/common';
import serializeHtml from '@editor/serializer/serializeHtml/serializeHtml';
import clean from '@utils/test/clean';

describe('serialize html', () => {

  // ****
  test('serialize html works with headings', () => {

    const nodes = [
      { type: types.h1, children: [{ text: 'marketmuse' }] },
      { type: types.h2, children: [{ text: 'marketmuse' }] },
      { type: types.h3, children: [{ text: 'marketmuse' }] },
      { type: types.h4, children: [{ text: 'marketmuse' }] },
      { type: types.h5, children: [{ text: 'marketmuse' }] },
      { type: types.h6, children: [{ text: 'marketmuse' }] },
    ];

    const serialized = clean(serializeHtml(nodes));
    let expected = '';
    expected += '<h1>marketmuse</h1>';
    expected += '<h2>marketmuse</h2>';
    expected += '<h3>marketmuse</h3>';
    expected += '<h4>marketmuse</h4>';
    expected += '<h5>marketmuse</h5>';
    expected += '<h6>marketmuse</h6>';

    expect(serialized).toEqual(expected)
  });

});
