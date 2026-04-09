import ExternalLink from "@/components/ui/InternalLink";
import { ItemWithIcon } from "@/components/ui/ItemWithIcon";
import { useServiceContext } from "@/context/ServiceContext";
import { router, Stack } from "expo-router";
import React from "react";
import { ScrollView, View } from "react-native";

export default function serviceSelector() {
  const { services, setSelectedService } = useServiceContext();

  return (
    <>
      <Stack.Screen options={{ title: "Seleccionar Servicio" }} />
      <ScrollView>
        <View style={{ gap: 0, padding: 16 }}>
          {services.map((service, index) => (
            <ItemWithIcon
              key={index}
              icon={service.icon}
              title={service.title}
              onPress={() => {
                setSelectedService(service);
                router.back();
              }}
            />
          ))}

          <View style={{ paddingHorizontal: 16, marginTop: 20 }}>
            <ExternalLink
              text="Añadir otro servicio"
              icon="add"
              href="../newServiceModal"
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
}
