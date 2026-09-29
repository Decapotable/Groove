import Svg, { Circle, G, Path, Rect } from 'react-native-svg';

import type { Album } from '@/data/albums';

type Props = { cover: Album['cover']; size: number };

/** Zone réservée à l'illustration (en % du côté) : le reste est le panneau typographique. */
export const ART_TOP = 6;
export const ART_HEIGHT = 68;

/** Assombrit (factor < 1) une couleur hexadécimale `#RRGGBB`. */
function shade(hex: string, factor: number) {
  const channel = (start: number) =>
    Math.round(parseInt(hex.slice(start, start + 2), 16) * factor)
      .toString(16)
      .padStart(2, '0');
  return `#${channel(1)}${channel(3)}${channel(5)}`;
}

/** Illustration abstraite d'une pochette : un motif géométrique par album, posé sur un panneau plus sombre. */
export function CoverArt({ cover, size }: Props) {
  const { motif, background, ink, accent } = cover;

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Rect width={100} height={100} fill={shade(background, 0.72)} />
      <Svg x={0} y={ART_TOP} width={100} height={ART_HEIGHT} viewBox="0 0 100 100">
        <Rect width={100} height={100} fill={background} />
        {motif === 'horizon' && (
          <G>
            <Circle cx={64} cy={58} r={30} fill={accent} opacity={0.9} />
            <Rect x={0} y={58} width={100} height={42} fill={background} opacity={0.92} />
            <Rect x={0} y={58} width={100} height={0.8} fill={ink} />
            <Rect x={14} y={14} width={0.8} height={44} fill={ink} opacity={0.6} />
          </G>
        )}
        {motif === 'steps' && (
          <G fill={accent}>
            <Rect x={10} y={68} width={16} height={22} />
            <Rect x={30} y={54} width={16} height={36} />
            <Rect x={50} y={40} width={16} height={50} />
            <Rect x={70} y={26} width={16} height={64} />
            <Rect x={10} y={92} width={76} height={1} fill={ink} />
          </G>
        )}
        {motif === 'clock' && (
          <G>
            <Circle cx={50} cy={50} r={36} fill="none" stroke={ink} strokeWidth={1.4} />
            <Path d="M50 14 A36 36 0 0 1 86 50 L50 50 Z" fill={accent} />
            <Path d="M50 86 A36 36 0 0 1 14 50 L50 50 Z" fill={ink} />
            <Circle cx={50} cy={50} r={3} fill={background} />
          </G>
        )}
        {motif === 'corners' && (
          <G fill={accent}>
            <Path d="M0 0 H46 A46 46 0 0 1 0 46 Z" />
            <Path d="M100 100 H54 A46 46 0 0 1 100 54 Z" />
            <Path d="M100 0 V30 A30 30 0 0 1 70 0 Z" fill={ink} opacity={0.85} />
            <Path d="M0 100 V70 A30 30 0 0 1 30 100 Z" fill={ink} opacity={0.85} />
          </G>
        )}
        {motif === 'stripes' && (
          <G fill={accent}>
            {[8, 20, 30, 44, 52, 66, 76, 88].map((x, i) => (
              <Rect key={x} x={x} y={i % 2 ? 22 : 10} width={i % 3 === 0 ? 7 : 4} height={i % 2 ? 62 : 74} />
            ))}
            <Rect x={8} y={90} width={84} height={1} fill={ink} />
          </G>
        )}
        {motif === 'orbit' && (
          <G>
            <Circle cx={50} cy={50} r={34} fill="none" stroke={ink} strokeWidth={0.9} opacity={0.6} />
            <Circle cx={50} cy={50} r={22} fill="none" stroke={ink} strokeWidth={0.9} opacity={0.4} />
            <Circle cx={50} cy={50} r={9} fill={accent} />
            <Circle cx={78} cy={30} r={3.4} fill={ink} />
          </G>
        )}
        {motif === 'waltz' && (
          <G fill="none" stroke={ink} strokeWidth={1.4}>
            <Path d="M-4 66 C 24 30, 50 90, 104 44" />
            <Path d="M-4 74 C 24 38, 50 98, 104 52" opacity={0.6} />
            <Path d="M-4 82 C 24 46, 50 106, 104 60" opacity={0.3} />
            <Circle cx={72} cy={26} r={9} fill={accent} stroke="none" opacity={0.7} />
          </G>
        )}
        {motif === 'split' && (
          <G>
            <Path d="M0 100 L100 0 V100 Z" fill={ink} />
            <Circle cx={34} cy={36} r={20} fill={accent} />
          </G>
        )}
        {motif === 'monolith' && (
          <G>
            <Rect x={0} y={72} width={100} height={28} fill={ink} opacity={0.08} />
            <Rect x={38} y={12} width={24} height={72} fill={accent} />
            <Rect x={38} y={84} width={24} height={1} fill={ink} />
            <Circle cx={80} cy={22} r={5} fill={ink} opacity={0.85} />
          </G>
        )}
        {motif === 'sun' && (
          <G>
            <Circle cx={50} cy={52} r={26} fill="none" stroke={accent} strokeWidth={1.6} />
            <Circle cx={50} cy={52} r={16} fill={accent} opacity={0.9} />
          </G>
        )}
      </Svg>
    </Svg>
  );
}
