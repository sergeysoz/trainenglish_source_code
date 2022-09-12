/**
 * I use hash table singleton for entries
 * has been fetched at least once.
 * If an entry is in the hash, we do not fetch.
 * The hash works as a cache.
 */

const hash = {};

export function addToHash(entry) {
  if (entry.word) {
    hash[Symbol.for(entry.word)] = entry;
    return;
  }
  hash[Symbol.for(entry.noMatchedWord)] = entry;
  return;
}

// Using the hash for caching not only entries:
export function addToHashCustom(key, value) {
  hash[Symbol.for(key.toString())] = value;
  return;
}

export function isInHash(word) {
  return hash[Symbol.for(word)] ? true : false;
}

export function readFromHash(word) {
  if (hash[Symbol.for(word)]) return hash[Symbol.for(word)];
}
