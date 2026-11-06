export interface Similarity {
  readonly jaccard: number;
  readonly cosine: number;
  readonly sharedTokens: number;
}
function tokens(text: string): Map<string, number> {
  if (typeof text !== 'string' || text.length > 1000000)
    throw new TypeError('Expected bounded text');
  const m = new Map<string, number>();
  for (const t of text.toLocaleLowerCase().match(/[\p{L}\p{N}]+/gu) ?? [])
    m.set(t, (m.get(t) ?? 0) + 1);
  return m;
}
export function compareText(first: string, second: string): Similarity {
  const a = tokens(first),
    b = tokens(second),
    shared = [...a.keys()].filter((k) => b.has(k)).length,
    union = new Set([...a.keys(), ...b.keys()]).size;
  let dot = 0,
    na = 0,
    nb = 0;
  for (const v of a.values()) na += v * v;
  for (const v of b.values()) nb += v * v;
  for (const [k, v] of a) dot += v * (b.get(k) ?? 0);
  return {
    jaccard: union ? shared / union : 1,
    cosine: na && nb ? dot / Math.sqrt(na * nb) : na === nb ? 1 : 0,
    sharedTokens: shared,
  };
}
