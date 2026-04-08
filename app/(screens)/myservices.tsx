import ExternalLink from "@/components/ui/InternalLink";
import { ItemWithIcon } from "@/components/ui/ItemWithIcon";
import { useServiceContext } from "@/context/ServiceContext";
import { Service } from "@/types/Service";
import { router, Stack } from "expo-router";
import { ScrollView } from "react-native";

export default function MyServiceScreen() {
  const { services, setSelectedService } = useServiceContext();

  const handleSelectService = (service: Service) => {
    if (!service) return;
    setSelectedService(service);
    router.push("/(screens)/serviceDetail");
  };

  return (
    <>
      <Stack.Screen options={{ title: "Servicios" }} />

      <ScrollView style={{ padding: 16 }}>
        {services.map((el, index) => (
          <ItemWithIcon
            onPress={() => handleSelectService(el)}
            title={el.title}
            subtitle={el.changeEvery !== 0 ? `Cada ${el.changeEvery} km` : ""}
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
