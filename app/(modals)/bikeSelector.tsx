import BikeItem from "@/components/BikeItem";
import ExternalLink from "@/components/ui/InternalLink";
import { useBikeContext } from "@/context/BikeContext";
import { router, Stack } from "expo-router";
import React from "react";
import { Pressable, ScrollView, View } from "react-native";

export default function BikeSelector() {
  const { bikes, setSelectedBike } = useBikeContext();

  return (
    <>
      <Stack.Screen options={{ title: "Seleccionar Moto" }} />
      <ScrollView>
        <View style={{ gap: 16, paddingTop: 20 }}>
          {bikes.map((bike, index) => (
            <Pressable
              key={index}
              style={{ marginHorizontal: 16, marginVertical: 8 }}
              onPress={() => {
                setSelectedBike(bike);
                router.back();
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
