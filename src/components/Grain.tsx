import { Image, StyleSheet, View } from 'react-native';

/** Grain analogique très léger, en surimpression permanente. Ne capte aucun événement. */
export function Grain() {
  return (
    <View pointerEvents="none" style={styles.grain}>
      <Image accessible={false} source={require('../../assets/images/grain.png')} resizeMode="repeat" style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  grain: { ...StyleSheet.absoluteFill, opacity: 0.32, zIndex: 100 },
  image: { width: '100%', height: '100%' },
});
