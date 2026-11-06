import * as api from '@lp-labs/text-similarity-metrics';
import { compareText } from '@lp-labs/text-similarity-metrics';
const result = compareText('red blue blue', 'blue red');
if (result.jaccard !== 1 || result.cosine >= 1)
  throw new Error('Expected set and frequency scores');
// @ts-expect-error invalid argument must be rejected by declarations
api.compareText('', 4);
