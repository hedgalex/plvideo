/**
 * Generate cyrb53 hash from a string
 * @param {string} str 
 * @param {number} seed 
 * @returns {number}
 */
function hashCode(str, seed) {
	if (!str)	return 0;
	seed = seed ? seed : 0;

  let h1 = 0xdeadbeef ^ seed,
    h2 = 0x41c6ce57 ^ seed;
  for (let i = 0, ch; i < str.length; i++) {
    ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }

  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);

  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
};

/**
 * Generate cyrb53 hash from strings
 * @param {string[]} args Arguments to generate the hash
 * @returns {number}
 */
function hash(...args) {
  return hashCode(args.join('-'));
};

module.exports = hash;