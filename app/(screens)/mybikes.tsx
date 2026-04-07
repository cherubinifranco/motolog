import BikeItem from "@/components/BikeItem";
import ExternalLink from "@/components/ui/ExternalLink";
import { useBikeContext } from "@/context/BikeContext";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function MiMotoScreen() {
  const insets = useSafeAreaInsets();

  const { bikes, setSelectedBike } = useBikeContext();

  return (
    <>
      <Stack.Screen options={{ title: "Motos" }} />
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
              icon="add"
              href="../newBikeModal"
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
