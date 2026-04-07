import React from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

export default function SkeletonLoaderLogs() {
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
    <View style={styles.historialCard}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.row}>
          <Animated.View style={[styles.iconPlaceholder, { opacity: pulse }]} />
          <Animated.View
            style={[styles.titlePlaceholder, { opacity: pulse }]}
          />
        </View>
        <Animated.View style={[styles.datePlaceholder, { opacity: pulse }]} />
      </View>

      {/* Detalles */}
      <View style={styles.detallesRow}>
        <Animated.View style={[styles.detailPlaceholder, { opacity: pulse }]} />
        <Animated.View style={[styles.detailPlaceholder, { opacity: pulse }]} />
      </View>

      {/* Notas */}
      <Animated.View style={[styles.notePlaceholder, { opacity: pulse }]} />

      {/* Ver más */}
      <Animated.View style={[styles.verMasPlaceholder, { opacity: pulse }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  historialCard: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 3,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  detallesRow: {
    flexDirection: "row",
    gap: 24,
    marginBottom: 12,
  },
  iconPlaceholder: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#E0E0E0",
  },
  titlePlaceholder: {
    width: 120,
    height: 18,
    borderRadius: 4,
  },
  datePlaceholder: {
    width: 60,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  detailPlaceholder: {
    width: 80,
    height: 16,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
  notePlaceholder: {
    width: "90%",
    height: 14,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
    marginBottom: 12,
  },
  verMasPlaceholder: {
    width: 100,
    height: 14,
    borderRadius: 4,
    backgroundColor: "#E0E0E0",
  },
});
