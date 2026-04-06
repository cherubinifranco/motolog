import ExternalLink from "@/components/ui/ExternalLink";
import { useServiceContext } from "@/context/ServiceContext";
import { ScrollView, Text, View } from "react-native";

export default function MyServiceScreen() {
  const { services } = useServiceContext();
  return (
    <ScrollView style={{ padding: 16 }}>
      {services.map((el, index) => (
        <View key={index}>
          <Text>{el.title}</Text>
        </View>
      ))}
      <ExternalLink
        text="Crear otro servicio"
        icon="add"
        href="../newServiceModal"
      />
    </ScrollView>
  );
}
