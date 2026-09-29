/** Palette GROOVE : noir profond, ivoire, cuivre, gris chaud. */
export const colors = {
  black: '#0A0908',
  blackRaised: '#141210',
  blackLine: '#26221E',
  ivory: '#EFE8D8',
  ivoryDim: '#B9B2A3',
  copper: '#C8642B',
  copperBright: '#E27B3A',
  warmGrey: '#7A736A',
} as const;

export type ColorToken = keyof typeof colors;
