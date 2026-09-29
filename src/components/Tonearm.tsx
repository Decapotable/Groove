import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import { colors } from '@/constants/colors';

type Props = {
  /** Largeur du pivot (le composant fait `pivot` × `length`). */
  pivot: number;
  length: number;
};

/** Bras de platine stylisé. Le pivot est en haut, au centre de la boîte : pivoter autour de (pivot/2, pivot/2). */
export function Tonearm({ pivot, length }: Props) {
  const cx = pivot / 2;
  const headY = length - pivot * 0.32;

  return (
    <Svg width={pivot} height={length} viewBox={`0 0 ${pivot} ${length}`}>
      {/* Embase */}
      <Circle cx={cx} cy={cx} r={cx * 0.98} fill={colors.blackRaised} stroke={colors.warmGrey} strokeWidth={1} />
      <Circle cx={cx} cy={cx} r={cx * 0.55} fill={colors.copper} />
      <Circle cx={cx} cy={cx} r={cx * 0.18} fill={colors.black} />
      {/* Contrepoids */}
      <Rect x={cx - pivot * 0.16} y={-pivot * 0.05} width={pivot * 0.32} height={pivot * 0.28} rx={3} fill={colors.warmGrey} />
      {/* Bras */}
      <Path
        d={`M${cx} ${cx} L${cx} ${headY - pivot * 0.5} L${cx - pivot * 0.16} ${headY - pivot * 0.05}`}
        stroke={colors.ivory}
        strokeWidth={pivot * 0.075}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Cellule et aiguille */}
      <G>
        <Rect
          x={cx - pivot * 0.36}
          y={headY - pivot * 0.08}
          width={pivot * 0.28}
          height={pivot * 0.42}
          rx={2}
          fill={colors.ivory}
        />
        <Rect x={cx - pivot * 0.24} y={headY + pivot * 0.3} width={pivot * 0.04} height={pivot * 0.1} fill={colors.copperBright} />
      </G>
    </Svg>
  );
}
