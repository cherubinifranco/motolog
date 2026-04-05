import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useBikeContext } from "../context/BikeContext";

export default function BikeSelector() {
  const { bikes, selectedBike, setSelectedBike } = useBikeContext();
  const [expanded, setExpanded] = useState(false);

  const handleSelect = (bike: (typeof bikes)[0]) => {
    setSelectedBike(bike);
    setExpanded(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => setExpanded(!expanded)}
      >
        <Text style={styles.headerText}>
          {selectedBike
            ? `${selectedBike.brand} ${selectedBike.model}`
            : "Select a bike"}
        </Text>
        <Text style={styles.arrow}>{expanded ? "▲" : "▼"}</Text>
      </TouchableOpacity>

      {expanded && (
        <View style={styles.dropdown}>
          {bikes.map((bike) => (
            <TouchableOpacity
              key={bike.id + "bikeselector"}
              style={styles.bikeItem}
              onPress={() => handleSelect(bike)}
            >
              <Text>
                {bike.brand} {bike.model}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  headerText: {
    fontWeight: "bold",
  },
  arrow: {
    fontSize: 16,
  },
  dropdown: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderRadius: 12,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    zIndex: 10,
  },
  bikeItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
});
