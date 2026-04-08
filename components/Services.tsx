import { View } from "react-native";

import SkeletonLoaderItem from "@/components/emptyBlocks/SkeletonLoaderItem";
import { useBikeContext } from "@/context/BikeContext";
import { useServiceContext } from "@/context/ServiceContext";
import { useMaintenance } from "@/hooks/useMaintenance";
import { Service } from "@/types/Service";
import { ItemWithIcon } from "./ui/ItemWithIcon";

export default function ServicesScreen() {
  const { services } = useServiceContext();
  const { selectedBike } = useBikeContext();

  const { items: maintenanceitems, loading: loadingMaitenance } =
    useMaintenance();

  if (selectedBike == null) return null;
  if (loadingMaitenance)
    return [1, 2, 3, 4, 5].map((index) => <SkeletonLoaderItem key={index} />);

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

  const sortedServices = services
    .map((service) => {
      const last = getLastService(service);
      console.log(last);
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
      {sortedServices.map((service) => {
        const status =
          service.kmRemaining < 0
            ? "red"
            : service.kmRemaining < 1000
              ? "orange"
              : "green";
        const sub =
          service.kmRemaining < 0
            ? `${(service.kmRemaining * -1).toLocaleString()} km pasados`
            : service.kmRemaining < 1000
              ? `${service.kmRemaining.toLocaleString()} km restantes`
              : `${service.kmRemaining.toLocaleString()} km restantes`;
        return (
          <ItemWithIcon
            key={service.id}
            icon={service.icon}
            title={service.title}
            iconColor={status}
            subtitle={sub}
            onPress={() => alert(service.kmRemaining)}
          />
        );
      })}
    </View>
  );
}
