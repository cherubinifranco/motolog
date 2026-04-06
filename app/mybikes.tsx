import BikeItem from "@/components/BikeItem";
import ExternalLink from "@/components/ui/ExternalLink";
import { useBikeContext } from "@/context/BikeContext";
import { router } from "expo-router";
import React from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MiMotoScreen() {
  const insets = useSafeAreaInsets();

  const { bikes, setSelectedBike } = useBikeContext();

  return (
    <ScrollView>
      <View style={{ gap: 16, paddingTop: 20 }}>
        {bikes.map((bike, index) => (
          <Pressable
            key={index}
            style={{ marginHorizontal: 16, marginVertical: 8 }}
            onPress={() => {
              setSelectedBike(bike);
              router.push("/bikedetail");
            }}
          >
            <BikeItem bike={bike} key={index} />
          </Pressable>
        ))}

        <View style={{ paddingHorizontal: 16 }}>
          <ExternalLink
            text="Añadir otra moto"
            icon="add-circle-sharp"
            href="../newBikeModal"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  editarMotoButton: {
    backgroundColor: "#FF6200",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 16,
    borderRadius: 16,
    marginBottom: 10,
  },
  editarMotoText: {
    color: "#FFF",
    fontSize: 17,
    fontWeight: "600",
  },
});
