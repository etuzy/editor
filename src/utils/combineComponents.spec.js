import combineComponents from './combineComponents';

describe('combine-components', () => {

  // ****
  test('one component, one tag', () => {

    const tag = 'P';
    const type = 'paragraph';
    const p = { tag, type, get: () => ({ type }) };

    const combined = combineComponents([ p ]);

    expect(typeof combined === 'object').toBe(true);
    expect(typeof combined[tag].get === 'function').toBe(true);
    expect(combined[tag].get()).toEqual({ type })
  });

  // ****
  test('multiple components, one tag', () => {

    const tagP = 'P';
    const typeP = 'paragraph';
    const p = { tag: tagP, type: typeP, get: () => ({ type: typeP }) };

    const tagH1 = 'H1';
    const typeH1 = 'heading-one';
    const h1 = { tag: tagH1, type: typeH1, get: () => ({ type: typeH1 }) };

    const combined = combineComponents([ p, h1 ]);

    expect(typeof combined === 'object').toBe(true);
    expect(typeof combined[tagP].get === 'function').toBe(true);
    expect(typeof combined[tagH1].get === 'function').toBe(true);
    expect(combined[tagP].get()).toEqual({ type: typeP })
    expect(combined[tagH1].get()).toEqual({ type: typeH1 })
  });

  // ****
  test('multiple components, multiple tags', () => {

    const tag1 = ['OL', 'UL'];
    const type1 = 'list';
    const l = { tag: tag1, type: type1, get: () => ({ type: type1 }) };

    const tag2 = ['H1', 'H2', 'H3'];
    const type2 = 'heading';
    const h = { tag: tag2, type: type2, get: () => ({ type: type2 }) };

    const combined = combineComponents([ l, h ]);

    expect(typeof combined === 'object').toBe(true);
    expect(typeof combined[tag1[0]].get === 'function').toBe(true);
    expect(typeof combined[tag1[1]].get === 'function').toBe(true);
    expect(typeof combined[tag2[0]].get === 'function').toBe(true);
    expect(typeof combined[tag2[1]].get === 'function').toBe(true);
    expect(typeof combined[tag2[2]].get === 'function').toBe(true);
    expect(combined[tag1[0]].get()).toEqual({ type: type1 })
    expect(combined[tag1[1]].get()).toEqual({ type: type1 })
    expect(combined[tag2[0]].get()).toEqual({ type: type2 })
    expect(combined[tag2[1]].get()).toEqual({ type: type2 })
    expect(combined[tag2[2]].get()).toEqual({ type: type2 })
  });

});
