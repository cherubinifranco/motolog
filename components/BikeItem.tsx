import { BASIC } from "@/styles/basicStyles";
import { Bike } from "@/types/Bike";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, View } from "react-native";

export default function BikeItem({ bike }: { bike: Bike }) {
  return (
    <View>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop", // Honda CBR roja (puedes cambiarla)
        }}
        style={styles.motoImage}
        resizeMode="cover"
      />
      <View style={[BASIC.littleShadow, styles.itemContainer]}>
        <Text>{bike.model}</Text>
        <Text>{bike.year}</Text>
        <Text>{bike.currentKm} Km</Text>

        <Ionicons name="chevron-forward" size={24} color="rgb(114, 114, 114)" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  motoImage: {
    width: "100%",
    height: 180,
    position: "relative",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 16,
    paddingLeft: 24,
    width: "100%",
  },
});
