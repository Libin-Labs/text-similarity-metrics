import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('identical token sets score one', () => {
  assert.deepEqual(api.compareText('red blue', 'blue red'), {
    jaccard: 1,
    cosine: 1,
    sharedTokens: 2,
  });
});
test('frequency similarity distinguishes repetition', () => {
  const x = api.compareText('red blue blue', 'blue red');
  assert.equal(x.jaccard, 1);
  assert.ok(x.cosine < 1);
});
test('disjoint inputs score zero', () => {
  assert.deepEqual(api.compareText('red', 'blue'), { jaccard: 0, cosine: 0, sharedTokens: 0 });
});
test('case and punctuation do not affect tokens', () => {
  assert.equal(api.compareText('HELLO, world!', 'hello world').jaccard, 1);
});
test('both empty inputs are identical', () => {
  assert.deepEqual(api.compareText('', ''), { jaccard: 1, cosine: 1, sharedTokens: 0 });
});
test('rejects non-string input', () => {
  assert.throws(() => api.compareText('ok', null), TypeError);
});
