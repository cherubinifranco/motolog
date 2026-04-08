import { useEffect, useState } from "react";
import { View } from "react-native";

import SkeletonLoaderItem from "@/components/emptyBlocks/SkeletonLoaderItem";
import { useBikeContext } from "@/context/BikeContext";
import { useServiceContext } from "@/context/ServiceContext";
import { useServiceLogService } from "@/hooks/useServiceLogsService";
import { ServiceWithStatus } from "@/types/Service";
import { ItemWithIcon } from "./ui/ItemWithIcon";

export default function ServicesScreen() {
  const { services } = useServiceContext();
  const { selectedBike } = useBikeContext();
  const { getLastServiceBike } = useServiceLogService();

  const [loading, setLoading] = useState(true);
  const [sortedServices, setSortedServices] = useState<ServiceWithStatus[]>([]);

  useEffect(() => {
    if (!selectedBike || services.length === 0) return;

    const loadServices = async () => {
      const result = await Promise.all(
        services.map(async (service) => {
          const last = await getLastServiceBike({
            serviceId: service.id,
            bikeId: selectedBike.id,
          });

          const kmRemaining = last
            ? service.changeEvery - (selectedBike.currentKm - last.mileage)
            : service.changeEvery - selectedBike.currentKm;

          const changeAt = last
            ? service.changeEvery + (selectedBike.currentKm - last.mileage)
            : service.changeEvery;

          return { ...service, kmRemaining, changeAt };
        }),
      );

      result.sort((a, b) => a.kmRemaining - b.kmRemaining);
      setSortedServices(result);
      setLoading(false);
    };

    loadServices();
  }, [services, selectedBike]);

  if (selectedBike == null) return null;

  if (loading) {
    return [1, 2, 3, 4, 5].map((index) => <SkeletonLoaderItem key={index} />);
  }

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
            ? `${(-service.kmRemaining).toLocaleString()} km pasados`
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
