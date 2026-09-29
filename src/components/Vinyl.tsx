import { memo } from 'react';
import Svg, { Circle, Defs, LinearGradient, Path, RadialGradient, Stop } from 'react-native-svg';

import { colors } from '@/constants/colors';

type Props = {
  size: number;
  /** Couleur de l'étiquette centrale. */
  labelColor?: string;
};

const GROOVES = [0.47, 0.445, 0.42, 0.395, 0.37, 0.345, 0.32, 0.295, 0.27];

/** Secteur de reflet centré sur le disque, entre deux angles (degrés). */
function wedge(c: number, startDeg: number, endDeg: number) {
  const point = (deg: number) => {
    const rad = (deg * Math.PI) / 180;
    return `${c + c * Math.cos(rad)} ${c + c * Math.sin(rad)}`;
  };
  return `M${c} ${c} L${point(startDeg)} A${c} ${c} 0 0 1 ${point(endDeg)} Z`;
}

/** Disque vinyle vectoriel (sillons, reflets, étiquette). La rotation est appliquée depuis l'extérieur. */
export const Vinyl = memo(function Vinyl({ size, labelColor = colors.copper }: Props) {
  const c = size / 2;
  const labelRadius = size * 0.17;

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <Defs>
        <RadialGradient id="disc" cx="50%" cy="50%" r="50%">
          <Stop offset="0" stopColor="#2A2621" />
          <Stop offset="0.55" stopColor="#1A1714" />
          <Stop offset="1" stopColor="#0F0D0B" />
        </RadialGradient>
        <RadialGradient id="sheen" cx="50%" cy="50%" r="50%">
          <Stop offset="0.2" stopColor="#FFFFFF" stopOpacity="0" />
          <Stop offset="1" stopColor="#FFFFFF" stopOpacity="0.24" />
        </RadialGradient>
        <LinearGradient id="rim" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={colors.ivory} stopOpacity="0.5" />
          <Stop offset="1" stopColor={colors.ivory} stopOpacity="0.08" />
        </LinearGradient>
      </Defs>
      <Circle cx={c} cy={c} r={c - 1} fill="url(#disc)" />
      <Circle cx={c} cy={c} r={c - 1} fill="none" stroke="url(#rim)" strokeWidth={1.4} />
      {GROOVES.map((r) => (
        <Circle key={r} cx={c} cy={c} r={size * r} fill="none" stroke="#FFFFFF" strokeOpacity={0.07} strokeWidth={0.8} />
      ))}
      <Circle cx={c} cy={c} r={size * 0.235} fill="none" stroke="#FFFFFF" strokeOpacity={0.16} strokeWidth={1} />
      {/* Anneaux pointillés irréguliers : ils rendent la rotation lisible */}
      <Circle cx={c} cy={c} r={size * 0.33} fill="none" stroke="#FFFFFF" strokeOpacity={0.22} strokeWidth={2} strokeDasharray={`${size * 0.09} ${size * 0.05} ${size * 0.02} ${size * 0.06}`} />
      <Circle cx={c} cy={c} r={size * 0.41} fill="none" stroke="#FFFFFF" strokeOpacity={0.16} strokeWidth={1.6} strokeDasharray={`${size * 0.16} ${size * 0.11} ${size * 0.04} ${size * 0.13}`} />
      <Path d={wedge(c, -68, -40)} fill="url(#sheen)" />
      <Path d={wedge(c, 112, 140)} fill="url(#sheen)" />
      <Circle cx={c} cy={c} r={labelRadius} fill={labelColor} />
      {/* Demi-étiquette assombrie + repère : l'étiquette n'est plus symétrique */}
      <Path d={`M${c - labelRadius} ${c} A${labelRadius} ${labelRadius} 0 0 1 ${c + labelRadius} ${c} Z`} fill={colors.black} fillOpacity={0.28} />
      <Circle cx={c} cy={c - labelRadius * 0.62} r={labelRadius * 0.11} fill={colors.ivory} />
      <Circle cx={c} cy={c} r={labelRadius * 0.72} fill="none" stroke={colors.black} strokeOpacity={0.25} strokeWidth={0.8} />
      <Circle cx={c} cy={c} r={labelRadius * 0.16} fill={colors.black} />
      <Circle cx={c} cy={c} r={size * 0.006} fill={colors.ivory} />
    </Svg>
  );
});
