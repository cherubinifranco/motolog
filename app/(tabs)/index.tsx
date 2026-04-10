import AppBanner from "@/components/AppBanner";
import BikeSelector from "@/components/BikeSelector";
import CurrentKm from "@/components/CurrentKm";
import EmptyStateBike from "@/components/emptyBlocks/EmptyStateBike";
import ImageBanner from "@/components/ImageBanner";
import InternalLink from "@/components/ui/InternalLink";
import { useBikeContext } from "@/context/BikeContext";
import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ServicesScreen from "../../components/Services";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { selectedBike } = useBikeContext();

  return (
    <View style={{ flex: 1, paddingTop: insets.top }}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <AppBanner />

        {selectedBike ? (
          <View>
            <BikeSelector />

            <ImageBanner imageUri={selectedBike.imageUri} />

            <CurrentKm />

            <Text style={styles.sectionTitle}>Estado de mantenimientos</Text>

            <ServicesScreen />

            <View style={{ paddingTop: 20 }}>
              <InternalLink
                href="../newServiceLogModal"
                icon="add"
                text="Registrar Mantenimiento"
              />
            </View>
          </View>
        ) : (
          <EmptyStateBike />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 8,
    color: "#111",
  },
  bigButton: {
    backgroundColor: "#ff7b28",
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginVertical: 24,
  },
  bigButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
