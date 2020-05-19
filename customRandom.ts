export type RandomGenerator = (size: number) => Uint8Array | Uint16Array | Uint32Array;

export const customRandom = (random: RandomGenerator, alphabet: string, size: number) => {
  const mask = (2 << Math.log(alphabet.length - 1) / Math.LN2) - 1;
  const step = -~(1.6 * mask * size / alphabet.length);

  return () => {
    let id = "";
    while (true) {
      const bytes = random(step);
      let i = step;
      while (i--) {
        // If random byte is bigger than alphabet even after bitmask,
        // we refuse it by `|| ''`.
        id += alphabet[bytes[i] & mask] || '';
        if (id.length === +size) return id;
      }
    }
  };

}

export default customRandom;