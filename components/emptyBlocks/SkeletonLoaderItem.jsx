import React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function SkeletonLoaderItem() {
  const pulse = React.useRef(new Animated.Value(0.3)).current;

  React.useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0.3,
          duration: 600,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, []);

  return (
    <View style={styles.card}>
      <View style={styles.cardRow}>
        <Animated.View style={[styles.iconPlaceholder, { opacity: pulse }]} />
        <View style={styles.cardInfo}>
          <Animated.View
            style={[styles.titlePlaceholder, { opacity: pulse }]}
          />
          <Animated.View
            style={[styles.subtitlePlaceholder, { opacity: pulse }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  cardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  cardInfo: {
    flex: 1,
    justifyContent: "center",
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#E0E0E0",
  },
  titlePlaceholder: {
    width: "50%",
    height: 16,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
    marginBottom: 6,
  },
  subtitlePlaceholder: {
    width: "30%",
    height: 12,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
});
