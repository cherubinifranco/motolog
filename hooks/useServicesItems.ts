import { Service } from "@/types/Service";
import { useEffect, useState } from "react";

export const MOCK_SERVICES: Service[] = [
  {
    id: 1,
    title: "Cambio de Aceite",
    changeEvery: 4000,
    icon: "water-outline",
  },
  {
    id: 2,
    title: "Transmision",
    changeEvery: 1000,
    icon: "link",
  },
  {
    id: 3,
    title: "Pads de Freno",
    changeEvery: 15000,
    icon: "disc-outline",
  },
  {
    id: 4,
    title: "Bujia",
    changeEvery: 10000,
    icon: "flash-outline",
  },
  {
    id: 5,
    title: "Filtro de Aire",
    changeEvery: 12000,
    icon: "filter-outline",
  },
];

export const useServicesItems = () => {
  const [items, setItems] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadItems = async () => {
      try {
        const data = MOCK_SERVICES;
        setItems(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadItems();
  }, []);

  return { items, loading, error };
};
