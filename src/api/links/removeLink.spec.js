/** @jsx jsx */
import jsx from '../../editor/deserializer/deserializeJsx/deserializeJsx';
import withTest from '../../test-utils/withTest';
import initApi from '..';

describe('api: remove link', () => {

  // ***
  test('remove link with focus', () => {

    const initial = withTest(
      <editor>
        <block>
          <a href='test.com'>
            test.com
            <cursor />
          </a>
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text>
            test.com
            <cursor />
          </text>
        </block>
      </editor>
    );

    initApi(initial).removeLink();
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('remove link with selection - full', () => {

    const initial = withTest(
      <editor>
        <block>
          <anchor />
          <a href='test.com'>test.com</a>
          <focus />
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text>
            <anchor />
            test.com
            <focus />
          </text>
        </block>
      </editor>
    );

    initApi(initial).removeLink();
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

  // ***
  test('remove link with selection - partial', () => {

    const initial = withTest(
      <editor>
        <block>
          <anchor />
          <a href='test.com'>
            test<focus />.com
          </a>
        </block>
      </editor>
    );

    const expected = withTest(
      <editor>
        <block>
          <text>
            <anchor />test<focus />.com
          </text>
        </block>
      </editor>
    );

    initApi(initial).removeLink();
    expect(initial.children).toEqual(expected.children)
    expect(initial.selection).toEqual(expected.selection)
  })

})
