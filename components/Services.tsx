import { Text, View } from "react-native";

import { useBikeContext } from "@/context/BikeContext";
import { useMaintenance } from "@/hooks/useMaintenance";
import { Service } from "@/types/Service";
import { ServiceItem } from "../components/ServiceItem";
import { useServicesItems } from "../hooks/useServicesItems";

export default function ServicesScreen() {
  const { selectedBike } = useBikeContext();
  const { items, loading } = useServicesItems();
  const bikeId = selectedBike?.id;

  const { maintenance } = useMaintenance(bikeId);

  if (selectedBike == null) return null;

  if (loading) return <Text>Loading...</Text>;

  function getLastService(service: Service) {
    if (selectedBike == null) return 0;

    const serviceMaintenance = maintenance.filter(
      (m) => m.serviceId === service.id,
    );

    const last = serviceMaintenance.sort((a, b) => b.mileage - a.mileage)[0];

    return last;
  }

  const sortedServices = items
    .map((service) => {
      const last = getLastService(service);
      const kmRemaining = last
        ? service.changeEvery - (selectedBike.currentKm - last.mileage)
        : service.changeEvery - selectedBike.currentKm;

      const changeAt = last
        ? service.changeEvery + (selectedBike.currentKm - last.mileage)
        : service.changeEvery;
      return { ...service, kmRemaining: kmRemaining, changeAt: changeAt };
    })
    .sort((a, b) => a.kmRemaining - b.kmRemaining);

  return (
    <View>
      {sortedServices.map((service) => (
        <ServiceItem
          key={service.id}
          icon={service.icon}
          title={service.title}
          changeAt={service.changeAt}
          kmRemaining={service.kmRemaining}
        />
      ))}
    </View>
  );
}
