import { ActivityIndicator, View } from "react-native";

import { useBikeContext } from "@/context/BikeContext";
import { useMaintenance } from "@/hooks/useMaintenance";
import { useServicesItems } from "@/hooks/useServicesItems";
import { Service } from "@/types/Service";
import { ServiceItem } from "../components/ServiceItem";

export default function ServicesScreen() {
  const { selectedBike } = useBikeContext();
  const { items: serviceItems, loading: loadingServices } = useServicesItems();

  const { items: maintenanceitems, loading: loadingMaitenance } =
    useMaintenance();

  if (selectedBike == null) return null;
  if (loadingServices || loadingMaitenance) return <ActivityIndicator />;

  const bikeMaitenance = maintenanceitems.filter(
    (m) => m.bikeId == selectedBike.id,
  );

  function getLastService(service: Service) {
    const serviceMaintenance = bikeMaitenance.filter(
      (m) => m.serviceId === service.id,
    );

    const last = serviceMaintenance.sort((a, b) => b.mileage - a.mileage)[0];

    return last;
  }

  const sortedServices = serviceItems
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
