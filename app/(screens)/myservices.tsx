import ExternalLink from "@/components/ui/ExternalLink";
import { ItemWithIcon } from "@/components/ui/ItemWithIcon";
import { useServiceContext } from "@/context/ServiceContext";
import { Stack } from "expo-router";
import { ScrollView } from "react-native";

export default function MyServiceScreen() {
  const { services } = useServiceContext();

  return (
    <>
      <Stack.Screen options={{ title: "Servicios" }} />

      <ScrollView style={{ padding: 16 }}>
        {services.map((el, index) => (
          <ItemWithIcon
            title={el.title}
            subtitle={`Cada ${el.changeEvery} km`}
            key={index}
            icon={el.icon}
            iconColor="orange"
          />
        ))}

        <ExternalLink
          text="Crear otro servicio"
          icon="add"
          href="../newServiceModal"
        />
      </ScrollView>
    </>
  );
}
