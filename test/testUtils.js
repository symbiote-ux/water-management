const { assert } = require('chai');
const { parseInput } = require('../src/utils');

describe('parseInput', () => {
  it('should split the input into commands when guest are present', () => {
    const input = ['ALLOT_WATER 2 3:7', 'ADD_GUESTS 2', 'ADD_GUESTS 3', 'BILL'];
    const expected = [
      ['ALLOT_WATER', '2', '3:7'],
      ['ADD_GUESTS', '2'],
      ['ADD_GUESTS', '3'],
      ['BILL'],
    ];
    assert.deepStrictEqual(parseInput(input), expected);
  });
  it('should split the input into commands when guest are absent', () => {
    const input = ['ALLOT_WATER 2 1:2', 'BILL'];
    const expected = [['ALLOT_WATER', '2', '1:2'], ['BILL']];
    assert.deepStrictEqual(parseInput(input), expected);
  });
});
