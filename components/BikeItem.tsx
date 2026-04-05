import { BASIC } from "@/styles/basicStyles";
import { Bike } from "@/types/Bike";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View } from "react-native";
import ImageBanner from "./ImageBanner";

export default function BikeItem({ bike }: { bike: Bike }) {
  return (
    <View>
      <ImageBanner imageUri={bike.imageUri} style={styles.motoImage} />
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
